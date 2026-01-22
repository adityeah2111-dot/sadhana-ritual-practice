import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { subscriptionId, userId } = await req.json();

        if (!subscriptionId || !userId) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Verify ownership
        const { data: subscription, error: fetchError } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('id', subscriptionId)
            .eq('user_id', userId)
            .single();

        if (fetchError || !subscription) {
            return new Response(
                JSON.stringify({ error: 'Subscription not found' }),
                { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Cancel the subscription (mark as cancelled, keep access until period end)
        const { error: updateError } = await supabase
            .from('subscriptions')
            .update({
                status: 'cancelled',
                cancelled_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .eq('id', subscriptionId);

        if (updateError) {
            throw updateError;
        }

        // If there's a Razorpay subscription ID, cancel it there too
        if (subscription.razorpay_subscription_id) {
            // TODO: Call Razorpay API to cancel subscription
            // const razorpay = new Razorpay({ key_id, key_secret });
            // await razorpay.subscriptions.cancel(subscription.razorpay_subscription_id);
        }

        console.log(`Subscription ${subscriptionId} cancelled for user ${userId}`);

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Subscription cancelled. Access continues until period end.',
                accessUntil: subscription.current_period_end,
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    } catch (error: any) {
        console.error('Error cancelling subscription:', error);
        return new Response(
            JSON.stringify({ error: error.message || 'Failed to cancel subscription' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
