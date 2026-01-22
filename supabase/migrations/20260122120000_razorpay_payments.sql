-- Subscriptions and Payments Schema for Razorpay Integration

-- Create enum for subscription status
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired', 'paused');

-- Create enum for plan types
CREATE TYPE subscription_plan AS ENUM ('free', 'monthly', 'yearly');

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Razorpay integration fields
  razorpay_subscription_id TEXT UNIQUE,
  razorpay_customer_id TEXT,
  razorpay_plan_id TEXT,
  
  -- Subscription details
  plan subscription_plan NOT NULL DEFAULT 'free',
  status subscription_status NOT NULL DEFAULT 'active',
  
  -- Billing dates
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  trial_end TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure one active subscription per user
  CONSTRAINT unique_active_subscription UNIQUE (user_id, status)
);

-- Create payments table for payment history
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  
  -- Razorpay payment details
  razorpay_payment_id TEXT UNIQUE NOT NULL,
  razorpay_order_id TEXT,
  razorpay_signature TEXT,
  
  -- Payment info
  amount INTEGER NOT NULL, -- Amount in paise (INR)
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL, -- authorized, captured, refunded, failed
  method TEXT, -- card, upi, netbanking, wallet
  
  -- Additional details
  description TEXT,
  notes JSONB DEFAULT '{}',
  
  -- Metadata
  payment_metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  captured_at TIMESTAMP WITH TIME ZONE,
  refunded_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
CREATE POLICY "Users can view their own subscriptions"
ON public.subscriptions FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions"
ON public.subscriptions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions"
ON public.subscriptions FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for payments
CREATE POLICY "Users can view their own payments"
ON public.payments FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all payments"
ON public.payments FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create indexes for efficient queries
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_subscriptions_razorpay_id ON public.subscriptions(razorpay_subscription_id);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_subscription_id ON public.payments(subscription_id);
CREATE INDEX idx_payments_razorpay_payment_id ON public.payments(razorpay_payment_id);
CREATE INDEX idx_payments_status ON public.payments(status);

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to check if user has active subscription
CREATE OR REPLACE FUNCTION public.has_active_subscription(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.subscriptions
    WHERE user_id = p_user_id
      AND status = 'active'
      AND (current_period_end IS NULL OR current_period_end > now())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's current subscription
CREATE OR REPLACE FUNCTION public.get_current_subscription(p_user_id UUID)
RETURNS TABLE (
  plan subscription_plan,
  status subscription_status,
  current_period_end TIMESTAMP WITH TIME ZONE,
  is_trial BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.plan,
    s.status,
    s.current_period_end,
    (s.trial_end IS NOT NULL AND s.trial_end > now()) as is_trial
  FROM public.subscriptions s
  WHERE s.user_id = p_user_id
    AND s.status IN ('active', 'paused')
  ORDER BY s.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create free subscription for new users
CREATE OR REPLACE FUNCTION public.create_free_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.subscriptions (
    user_id,
    plan,
    status,
    current_period_start,
    trial_end
  ) VALUES (
    NEW.user_id,
    'free',
    'active',
    now(),
    now() + INTERVAL '7 days' -- 7-day free trial
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create free subscription when profile is created
CREATE TRIGGER on_profile_created_free_subscription
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.create_free_subscription();

-- View for user subscription dashboard
CREATE OR REPLACE VIEW public.user_subscription_info AS
SELECT 
  s.user_id,
  s.plan,
  s.status,
  s.current_period_start,
  s.current_period_end,
  s.trial_end,
  (s.trial_end IS NOT NULL AND s.trial_end > now()) as is_in_trial,
  (s.current_period_end IS NOT NULL AND s.current_period_end > now()) as is_active,
  (SELECT COUNT(*) FROM public.payments WHERE user_id = s.user_id AND status = 'captured') as total_payments,
  (SELECT SUM(amount) FROM public.payments WHERE user_id = s.user_id AND status = 'captured') as total_spent
FROM public.subscriptions s
WHERE s.status IN ('active', 'paused');

-- Grant access
GRANT SELECT ON public.user_subscription_info TO authenticated;

-- Comments for documentation
COMMENT ON TABLE public.subscriptions IS 'User subscription data with Razorpay integration';
COMMENT ON TABLE public.payments IS 'Payment transaction history';
COMMENT ON COLUMN public.payments.amount IS 'Amount in smallest currency unit (paise for INR)';
COMMENT ON FUNCTION public.has_active_subscription IS 'Check if user has valid active subscription';
