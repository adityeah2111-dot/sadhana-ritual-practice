import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { createHmac } from 'https://deno.land/std@0.168.0/node/crypto.ts';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            userId
        } = await req.json();

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields', verified: false }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Verify signature
        const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET')!;
        const generatedSignature = createHmac('sha256', keySecret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        const isValid = generatedSignature === razorpay_signature;

        if (!isValid) {
            console.error('Payment signature verification failed');
            return new Response(
                JSON.stringify({ error: 'Invalid signature', verified: false }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Signature is valid - save payment and update subscription
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Get payment details from Razorpay (optional but recommended)
        // For now, we'll save what we have

        // Save payment record
        const { error: paymentError } = await supabase
            .from('payments')
            .insert({
                user_id: userId,
                razorpay_payment_id: razorpay_payment_id,
                razorpay_order_id: razorpay_order_id,
                razorpay_signature: razorpay_signature,
                amount: 29900, // Get from order details in production
                currency: 'INR',
                status: 'captured',
                method: 'razorpay',
            });

        if (paymentError) {
            console.error('Error saving payment:', paymentError);
        }

        // Update or create subscription
        const now = new Date();
        const periodEnd = new Date();
        periodEnd.setMonth(periodEnd.getMonth() + 1); // Monthly subscription

        const { error: subError } = await supabase
            .from('subscriptions')
            .upsert({
                user_id: userId,
                plan: 'monthly',
                status: 'active',
                razorpay_payment_id: razorpay_payment_id,
                current_period_start: now.toISOString(),
                current_period_end: periodEnd.toISOString(),
                updated_at: now.toISOString(),
            }, {
                onConflict: 'user_id,status',
            });

        if (subError) {
            console.error('Error updating subscription:', subError);
        }

        console.log(`Payment verified and subscription activated for user ${userId}`);

        return new Response(
            JSON.stringify({ verified: true, message: 'Payment verified successfully' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    } catch (error: any) {
        console.error('Error verifying payment:', error);
        return new Response(
            JSON.stringify({ error: error.message || 'Verification failed', verified: false }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
