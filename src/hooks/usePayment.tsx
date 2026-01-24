import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import razorpayConfig, { formatAmount, RAZORPAY_PLAN_IDS, type PlanType } from '@/lib/razorpay';
import { toast } from 'sonner';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface PaymentOptions {
    planId: PlanType;
    onSuccess?: (paymentId: string) => void;
    onFailure?: (error: Error) => void;
}

interface Subscription {
    id: string;
    plan: PlanType;
    status: string;
    current_period_end: string | null;
    trial_end: string | null;
}

export function usePayment() {
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Load Razorpay script dynamically
     */
    const loadRazorpayScript = useCallback((): Promise<boolean> => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => {
                console.error('Failed to load Razorpay script');
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }, []);

    /**
     * Fetch user's current subscription
     */
    const fetchSubscription = useCallback(async () => {
        if (!user) return null;

        setIsLoading(true);
        setError(null);

        try {
            const { data, error: fetchError } = await (supabase as any)
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .eq('status', 'active')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (fetchError && fetchError.code !== 'PGRST116') {
                throw fetchError;
            }

            if (data) {
                const sub: Subscription = {
                    id: data.id,
                    plan: data.plan,
                    status: data.status,
                    current_period_end: data.current_period_end,
                    trial_end: data.trial_end,
                };
                setSubscription(sub);
                return sub;
            }

            setSubscription(null);
            return null;
        } catch (err: any) {
            const errorMsg = err.message || 'Failed to fetch subscription';
            setError(errorMsg);
            console.error('Error fetching subscription:', err);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    /**
     * Create a payment order on the server
     */
    const createOrder = async (planId: PlanType) => {
        if (!user) {
            throw new Error('User not authenticated');
        }

        if (planId === 'free') {
            throw new Error('Cannot create payment order for free plan');
        }

        const plan = razorpayConfig.plans[planId];

        try {
            const { data, error } = await supabase.functions.invoke('create-payment-order', {
                body: {
                    amount: plan.amount,
                    currency: plan.currency,
                    planId: RAZORPAY_PLAN_IDS[planId as keyof typeof RAZORPAY_PLAN_IDS],
                    userId: user.id,
                },
            });

            if (error) throw error;

            if (!data || !data.orderId) {
                throw new Error('Invalid response from payment service');
            }

            return data;
        } catch (err: any) {
            console.error('Create order error:', err);
            throw new Error(err.message || 'Failed to create payment order');
        }
    };

    /**
     * Verify payment on the server
     */
    const verifyPayment = async (paymentData: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
    }) => {
        try {
            const { data, error } = await supabase.functions.invoke('verify-payment', {
                body: {
                    ...paymentData,
                    userId: user?.id,
                },
            });

            if (error) throw error;

            if (!data || !data.verified) {
                throw new Error('Payment verification failed');
            }

            return data;
        } catch (err: any) {
            console.error('Verify payment error:', err);
            throw new Error(err.message || 'Failed to verify payment');
        }
    };

    /**
     * Initiate payment flow
     */
    const initiatePayment = useCallback(async ({ planId, onSuccess, onFailure }: PaymentOptions) => {
        if (!user) {
            toast.error('Please sign in to continue');
            onFailure?.(new Error('User not authenticated'));
            return;
        }

        if (planId === 'free') {
            toast.error('Free trial does not require payment');
            onFailure?.(new Error('Invalid plan'));
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            // 1. Load Razorpay script
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                throw new Error('Failed to load payment system. Please check your internet connection.');
            }

            // 2. Create order on server
            toast.loading('Preparing payment...', { id: 'payment-init' });
            const orderData = await createOrder(planId);
            const plan = razorpayConfig.plans[planId];
            toast.dismiss('payment-init');

            // 3. Prepare Razorpay options
            const options = {
                key: razorpayConfig.keyId,
                amount: plan.amount,
                currency: plan.currency,
                name: 'Sadhana',
                description: plan.description,
                image: '/logo.png',
                order_id: orderData.orderId,
                prefill: {
                    name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
                    email: user.email || '',
                },
                notes: {
                    planId: planId,
                    planName: plan.name,
                },
                theme: razorpayConfig.paymentOptions.theme,
                modal: {
                    backdropclose: false,
                    escape: false,
                    handleback: true,
                    confirm_close: true,
                    animation: true,
                    ondismiss: function () {
                        setIsProcessing(false);
                        toast.info('Payment cancelled');
                        onFailure?.(new Error('Payment cancelled by user'));
                    },
                },
                retry: razorpayConfig.paymentOptions.retry,
                handler: async function (response: any) {
                    try {
                        toast.loading('Verifying payment...', { id: 'payment-verify' });

                        const result = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        toast.dismiss('payment-verify');

                        if (result.verified) {
                            toast.success('🎉 Payment successful! Welcome to Sadhana Pro!', {
                                duration: 5000,
                            });
                            await fetchSubscription();
                            onSuccess?.(response.razorpay_payment_id);
                        } else {
                            throw new Error('Payment verification failed');
                        }
                    } catch (error: any) {
                        toast.dismiss('payment-verify');
                        console.error('Payment verification error:', error);
                        toast.error(error.message || 'Payment verification failed. Please contact support.');
                        setError(error.message);
                        onFailure?.(error);
                    } finally {
                        setIsProcessing(false);
                    }
                },
            };

            // 4. Open Razorpay checkout
            const razorpay = new window.Razorpay(options);

            razorpay.on('payment.failed', function (response: any) {
                setIsProcessing(false);
                const errorMsg = response.error?.description || 'Payment failed';
                toast.error(errorMsg);
                setError(errorMsg);
                onFailure?.(new Error(errorMsg));
            });

            razorpay.open();
        } catch (error: any) {
            console.error('Payment initiation error:', error);
            const errorMsg = error.message || 'Failed to initiate payment';
            toast.error(errorMsg);
            setError(errorMsg);
            onFailure?.(error);
            setIsProcessing(false);
        }
    }, [user, loadRazorpayScript, fetchSubscription]);

    /**
     * Cancel subscription
     */
    const cancelSubscription = useCallback(async () => {
        if (!user || !subscription) {
            toast.error('No active subscription found');
            return false;
        }

        try {
            setIsProcessing(true);

            const { error } = await supabase.functions.invoke('cancel-subscription', {
                body: {
                    subscriptionId: subscription.id,
                    userId: user.id,
                },
            });

            if (error) throw error;

            toast.success('Subscription cancelled. Access continues until period end.');
            await fetchSubscription();
            return true;
        } catch (error: any) {
            console.error('Error cancelling subscription:', error);
            toast.error(error.message || 'Failed to cancel subscription');
            return false;
        } finally {
            setIsProcessing(false);
        }
    }, [user, subscription, fetchSubscription]);

    /**
     * Fetch payment history
     */
    const fetchPaymentHistory = useCallback(async () => {
        if (!user) return [];

        const { data, error } = await (supabase as any)
            .from('payments')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching payment history:', error);
            return [];
        }

        return data || [];
    }, [user]);

    return {
        subscription,
        isProcessing,
        isLoading,
        error,
        initiatePayment,
        fetchSubscription,
        cancelSubscription,
        fetchPaymentHistory,
        formatAmount,
    };
}
