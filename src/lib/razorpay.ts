/**
 * Razorpay Configuration
 * 
 * Environment variables needed:
 * - VITE_RAZORPAY_KEY_ID: Your Razorpay key_id (public)
 * - RAZORPAY_KEY_SECRET: Your Razorpay key_secret (server-side only, never expose)
 */

export const razorpayConfig = {
    keyId: import.meta.env.VITE_RAZORPAY_KEY_ID || '',

    // Pricing plans (amounts in paise - INR)
    plans: {
        monthly: {
            id: 'plan_monthly',
            name: 'Monthly Plan',
            amount: 29900, // ₹299
            currency: 'INR',
            period: 'monthly',
            interval: 1,
            description: 'Full access to Sadhana',
        },
        yearly: {
            id: 'plan_yearly',
            name: 'Yearly Plan',
            amount: 239900, // ₹2,399 (₹199.92/month - 33% off)
            currency: 'INR',
            period: 'yearly',
            interval: 12,
            description: 'Full access to Sadhana - Save 33%',
        },
    },

    // Payment options
    paymentOptions: {
        currency: 'INR',
        theme: {
            color: '#c41e3a', // Sadhana primary color
            backdrop_color: 'rgba(10, 10, 10, 0.9)',
        },
        modal: {
            backdropclose: false,
            escape: false,
            handleback: true,
            confirm_close: true,
            ondismiss: () => {
                console.log('Payment modal dismissed');
            },
            animation: true,
        },
        retry: {
            enabled: true,
            max_count: 3,
        },
    },

    // For production, set to false
    testMode: import.meta.env.DEV,
} as const;

/**
 * Razorpay plan IDs from dashboard
 * Update these with actual plan IDs from Razorpay dashboard
 */
export const RAZORPAY_PLAN_IDS = {
    monthly: 'plan_' + (import.meta.env.VITE_RAZORPAY_MONTHLY_PLAN_ID || 'monthly'),
    yearly: 'plan_' + (import.meta.env.VITE_RAZORPAY_YEARLY_PLAN_ID || 'yearly'),
} as const;

/**
 * Format amount from paise to rupees
 */
export function formatAmount(amountInPaise: number): string {
    const rupees = amountInPaise / 100;
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(rupees);
}

/**
 * Convert rupees to paise
 */
export function toPaise(rupees: number): number {
    return Math.round(rupees * 100);
}

/**
 * Validate Razorpay signature
 * This should be done server-side for security
 */
export function generateSignature(
    orderId: string,
    paymentId: string,
    secret: string
): string {
    // This is just for reference - actual signature verification MUST happen server-side
    const crypto = require('crypto');
    const text = orderId + '|' + paymentId;
    const signature = crypto
        .createHmac('sha256', secret)
        .update(text)
        .digest('hex');
    return signature;
}

/**
 * Check if Razorpay is properly configured
 */
export function isRazorpayConfigured(): boolean {
    return Boolean(razorpayConfig.keyId && razorpayConfig.keyId.startsWith('rzp_'));
}

/**
 * Get plan details by ID
 */
export function getPlanDetails(planId: 'monthly' | 'yearly') {
    return razorpayConfig.plans[planId];
}

export default razorpayConfig;
