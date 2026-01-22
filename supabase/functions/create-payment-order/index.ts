// Follow this to Deno setup for Edge Functions
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import Razorpay from 'https://esm.sh/razorpay@2.9.2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const razorpay = new Razorpay({
            key_id: Deno.env.get('RAZORPAY_KEY_ID')!,
            key_secret: Deno.env.get('RAZORPAY_KEY_SECRET')!,
        });

        const { amount, currency, planId, userId } = await req.json();

        // Validate input
        if (!amount || !currency || !userId) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: amount, // Amount in paise
            currency: currency,
            receipt: `receipt_${userId}_${Date.now()}`,
            notes: {
                userId: userId,
                planId: planId,
            },
        });

        // Initialize Supabase client with service role for database operations
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Optionally store the order in database for reference
        // This helps with tracking and reconciliation
        console.log(`Created order ${order.id} for user ${userId}`);

        return new Response(
            JSON.stringify({
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    } catch (error: any) {
        console.error('Error creating payment order:', error);
        return new Response(
            JSON.stringify({ error: error.message || 'Failed to create order' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
