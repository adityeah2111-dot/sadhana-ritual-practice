import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import razorpayConfig, { formatAmount, RAZORPAY_PLAN_IDS } from '@/lib/razorpay';
import { toast } from 'sonner';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface PaymentOptions {
    planId: 'monthly' | 'yearly';
    onSuccess?: (paymentId: string) => void;
    onFailure?: (error: any) => void;
}

interface Subscription {
    id: string;
    plan: 'free' | 'monthly' | 'yearly';
    status: string;
    current_period_end: string | null;
    trial_end: string | null;
}

export function usePayment() {
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Load Razorpay script dynamically
     */
    const loadRazorpayScript = (): Promise<boolean> => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    /**
     * Fetch user's current subscription
     */
    const fetchSubscription = async () => {
        if (!user) return null;

        setIsLoading(true);
        try {
            // Using 'any' cast until database types are regenerated after migration
            const { data, error } = await (supabase as any)
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .eq('status', 'active')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (error && error.code !== 'PGRST116') {
                throw error;
            }

            if (data) {
                setSubscription({
                    id: data.id,
                    plan: data.plan,
                    status: data.status,
                    current_period_end: data.current_period_end,
                    trial_end: data.trial_end,
                });
            }
            return data;
        } catch (error) {
            console.error('Error fetching subscription:', error);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Create a payment order on the server
     */
    const createOrder = async (planId: 'monthly' | 'yearly') => {
        if (!user) {
            throw new Error('User not authenticated');
        }

        const plan = razorpayConfig.plans[planId];

        const { data, error } = await supabase.functions.invoke('create-payment-order', {
            body: {
                amount: plan.amount,
                currency: plan.currency,
                planId: RAZORPAY_PLAN_IDS[planId],
                userId: user.id,
            },
        });

        if (error) throw error;
        return data;
    };

    /**
     * Verify payment on the server
     */
    const verifyPayment = async (paymentData: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
    }) => {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
            body: {
                ...paymentData,
                userId: user?.id,
            },
        });

        if (error) throw error;
        return data;
    };

    /**
     * Initiate payment flow
     */
    const initiatePayment = async ({ planId, onSuccess, onFailure }: PaymentOptions) => {
        if (!user) {
            toast.error('Please sign in to continue');
            return;
        }

        setIsProcessing(true);

        try {
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                throw new Error('Failed to load Razorpay. Please check your internet connection.');
            }

            const orderData = await createOrder(planId);
            const plan = razorpayConfig.plans[planId];

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
                        const result = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (result.verified) {
                            toast.success('Payment successful! Your subscription is now active.');
                            await fetchSubscription();
                            onSuccess?.(response.razorpay_payment_id);
                        } else {
                            throw new Error('Payment verification failed');
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        toast.error('Payment verification failed. Please contact support.');
                        onFailure?.(error);
                    }
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error: any) {
            console.error('Payment initiation error:', error);
            toast.error(error.message || 'Failed to initiate payment');
            onFailure?.(error);
        } finally {
            setIsProcessing(false);
        }
    };

    /**
     * Cancel subscription
     */
    const cancelSubscription = async () => {
        if (!user || !subscription) {
            toast.error('No active subscription found');
            return;
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

            toast.success('Subscription cancelled successfully');
            await fetchSubscription();
        } catch (error: any) {
            console.error('Error cancelling subscription:', error);
            toast.error(error.message || 'Failed to cancel subscription');
        } finally {
            setIsProcessing(false);
        }
    };

    /**
     * Fetch payment history
     */
    const fetchPaymentHistory = async () => {
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
    };

    return {
        subscription,
        isProcessing,
        isLoading,
        initiatePayment,
        fetchSubscription,
        cancelSubscription,
        fetchPaymentHistory,
        formatAmount,
    };
}
