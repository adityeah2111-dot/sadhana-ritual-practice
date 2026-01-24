/**
 * Razorpay Configuration - Enhanced Version
 * 
 * Environment variables needed:
 * - VITE_RAZORPAY_KEY_ID: Your Razorpay key_id (public)
 */

/**
 * Plan type definition
 */
export type PlanType = 'free' | 'monthly' | 'yearly' | 'lifetime';

// Define the Plan interface to handle optional properties
export interface Plan {
    id: string;
    name: string;
    amount: number;
    currency: string;
    period: string;
    interval: number;
    description: string;
    features: string[];
    savings?: number;
    badge?: string;
    originalAmount?: number;
}

export const razorpayConfig = {
    keyId: import.meta.env.VITE_RAZORPAY_KEY_ID || '',

    // Pricing plans (amounts in paise - INR)
    plans: {
        free: {
            id: 'plan_free',
            name: '7-Day Free Trial',
            amount: 0,
            currency: 'INR',
            period: 'trial',
            interval: 7,
            description: 'Try all features free for 7 days',
            features: [
                'Full access to all features',
                'Unlimited practice sessions',
                'Progress tracking',
                'No credit card required',
            ],
        },
        monthly: {
            id: 'plan_monthly',
            name: 'Monthly Pro',
            amount: 29900, // ₹299
            currency: 'INR',
            period: 'monthly',
            interval: 1,
            description: 'Full access to Sadhana Pro',
            features: [
                'Unlimited practice sessions',
                'Advanced analytics',
                'Priority support',
                'Ad-free experience',
                'Custom practice schedules',
                'Export your data',
            ],
        },
        yearly: {
            id: 'plan_yearly',
            name: 'Yearly Pro',
            amount: 239900, // ₹2,399 (~₹200/month - 33% savings)
            currency: 'INR',
            period: 'yearly',
            interval: 12,
            description: 'Best value - Save 33%',
            savings: 119900, // ₹1,199 total savings
            features: [
                'Everything in Monthly',
                'Save ₹1,199 per year',
                'Annual insights report',
                'Early access to new features',
                'Lifetime updates',
                'Priority support',
            ],
            badge: 'Best Value',
        },
        lifetime: {
            id: 'plan_lifetime',
            name: 'Lifetime Access',
            amount: 499900, // ₹4,999 (Original: ₹9,999 - 50% off)
            originalAmount: 999900, // ₹9,999
            currency: 'INR',
            period: 'lifetime',
            interval: 0,
            description: 'Pay once, own forever',
            savings: 500000, // ₹5,000 savings
            features: [
                'Everything in Yearly',
                'One-time payment forever',
                'All future updates included',
                'Founder badge',
                'Dedicated support',
                'Priority feature requests',
                'Early beta access',
            ],
            badge: 'Limited Offer',
        },
    } as Record<PlanType, Plan>,

    // Payment options for Razorpay checkout
    paymentOptions: {
        currency: 'INR',
        theme: {
            color: '#c41e3a', // Sadhana primary crimson
            backdrop_color: 'rgba(10, 10, 10, 0.95)',
        },
        modal: {
            backdropclose: false,
            escape: false,
            handleback: true,
            confirm_close: true,
            animation: true,
        },
        retry: {
            enabled: true,
            max_count: 3,
        },
        remember_customer: true,
    },

    // Test mode flag
    testMode: import.meta.env.DEV,
} as const;

/**
 * Razorpay plan IDs from dashboard
 * These must match the actual plan IDs created in Razorpay dashboard
 */
export const RAZORPAY_PLAN_IDS = {
    monthly: import.meta.env.VITE_RAZORPAY_MONTHLY_PLAN_ID || 'plan_monthly',
    yearly: import.meta.env.VITE_RAZORPAY_YEARLY_PLAN_ID || 'plan_yearly',
    lifetime: import.meta.env.VITE_RAZORPAY_LIFETIME_PLAN_ID || 'plan_lifetime',
} as const;



/**
 * Format amount from paise to rupees with proper Indian formatting
 */
export function formatAmount(amountInPaise: number, showDecimals = false): string {
    const rupees = amountInPaise / 100;
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: showDecimals ? 2 : 0,
        maximumFractionDigits: showDecimals ? 2 : 0,
    }).format(rupees);
}

/**
 * Convert rupees to paise
 */
export function toPaise(rupees: number): number {
    return Math.round(rupees * 100);
}

/**
 * Calculate monthly equivalent price for yearly plan
 */
export function getMonthlyEquivalent(yearlyAmountInPaise: number): string {
    const monthlyAmount = yearlyAmountInPaise / 12;
    return formatAmount(Math.round(monthlyAmount));
}

/**
 * Calculate savings percentage
 */
export function getSavingsPercentage(originalAmount: number, discountedAmount: number): number {
    return Math.round(((originalAmount - discountedAmount) / originalAmount) * 100);
}

/**
 * Check if Razorpay is properly configured
 */
export function isRazorpayConfigured(): boolean {
    const keyId = razorpayConfig.keyId;
    const isValid = Boolean(keyId && (keyId.startsWith('rzp_test_') || keyId.startsWith('rzp_live_')));

    if (!isValid && import.meta.env.DEV) {
        console.warn('⚠️ Razorpay Key ID not configured. Add VITE_RAZORPAY_KEY_ID to your .env.local file');
    }

    return isValid;
}

/**
 * Get plan details by ID
 */
export function getPlanDetails(planId: PlanType) {
    return razorpayConfig.plans[planId];
}

/**
 * Get all available plans
 */
export function getAllPlans() {
    return Object.values(razorpayConfig.plans);
}

/**
 * Get payment plans (excluding free trial)
 */
export function getPaymentPlans(): Array<typeof razorpayConfig.plans.monthly> {
    const { free, ...paymentPlans } = razorpayConfig.plans;
    return Object.values(paymentPlans);
}

export default razorpayConfig;
