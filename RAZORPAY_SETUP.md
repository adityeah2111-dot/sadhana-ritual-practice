# Razorpay Integration Guide

## Quick Setup

### 1. Get Razorpay API Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to **Settings** → **API Keys**
3. Generate/copy your **Key ID** and **Key Secret**

### 2. Configure Environment Variables

Add to `.env.local`:
```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

Add to Supabase Edge Functions secrets:
```bash
supabase secrets set RAZORPAY_KEY_ID=rzp_test_xxxxx
supabase secrets set RAZORPAY_KEY_SECRET=your_key_secret
```

### 3. Apply Database Migration

Run in Supabase SQL Editor:
```
supabase/migrations/20260122120000_razorpay_payments.sql
```

### 4. Deploy Edge Functions

```bash
supabase functions deploy create-payment-order
supabase functions deploy verify-payment
supabase functions deploy cancel-subscription
```

## Pricing Plans

| Plan | Price | Features |
|------|-------|----------|
| Monthly | ₹299/month | Full access |
| Yearly | ₹2,399/year | 33% savings |

## Testing

Use Razorpay test cards:
- **Success**: 4111 1111 1111 1111
- **UPI**: success@razorpay

## Security

- ✅ Signature verification on server
- ✅ Row-level security on all tables
- ✅ Secret keys stored in Edge Functions only
- ✅ HTTPS only

## Files Created

- `src/lib/razorpay.ts` - Config
- `src/hooks/usePayment.tsx` - Payment hook
- `src/pages/Checkout.tsx` - Checkout UI
- `supabase/functions/` - 3 Edge Functions
- `supabase/migrations/20260122120000_razorpay_payments.sql` - Database
