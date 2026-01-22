# Deploy Razorpay Integration to Supabase

Complete deployment guide for the payment system.

## Prerequisites

1. **Supabase CLI** - Choose ONE method:

   ### Method A: Using npx (No Installation - Easiest)
   ```bash
   # Just use 'npx supabase' instead of 'supabase' for all commands
   npx supabase --version
   ```

   ### Method B: Scoop (Windows)
   ```bash
   # Install Scoop first
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   irm get.scoop.sh | iex
   
   # Install Supabase CLI
   scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
   scoop install supabase
   ```

   ### Method C: Chocolatey (Windows)
   ```bash
   choco install supabase
   ```

   ### Method D: Direct Download
   - Download from: https://github.com/supabase/cli/releases
   - Get the `.exe` for Windows
   - Add to PATH or run from download location

   **⚠️ Note**: `npm install -g supabase` is NOT supported!

2. **Razorpay Account** with API keys:
   - Sign up at https://dashboard.razorpay.com/
   - Get your Key ID and Key Secret

## Step 1: Link to Your Supabase Project

```bash
# Login to Supabase
supabase login

# Link to your remote project
supabase link --project-ref ywlnqbbuczhpsbnudnml
```

When prompted, enter your database password (from Supabase project settings).

## Step 2: Apply Database Migration

### Option A: Via CLI (Recommended)
```bash
supabase db push
```

### Option B: Via Supabase Dashboard
1. Go to https://supabase.com/dashboard/project/ywlnqbbuczhpsbnudnml/sql
2. Click "New Query"
3. Copy and paste the content from:
   ```
   supabase/migrations/20260122120000_razorpay_payments.sql
   ```
4. Click "Run"

Verify tables created:
- Go to **Table Editor** → You should see `subscriptions` and `payments` tables

## Step 3: Set Edge Function Secrets

```bash
# Set Razorpay credentials
supabase secrets set RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
supabase secrets set RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXX

# Verify secrets are set
supabase secrets list
```

**Important**: Never commit these secrets to Git!

## Step 4: Deploy Edge Functions

Deploy all three functions:

```bash
# Deploy create-payment-order function
supabase functions deploy create-payment-order

# Deploy verify-payment function
supabase functions deploy verify-payment

# Deploy cancel-subscription function
supabase functions deploy cancel-subscription
```

**Expected output** for each:
```
Deploying function create-payment-order from ./supabase/functions/create-payment-order
✓ Function deployed successfully
Function URL: https://ywlnqbbuczhpsbnudnml.supabase.co/functions/v1/create-payment-order
```

## Step 5: Update Frontend Environment Variables

Add to `.env.local`:
```env
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
```

**DO NOT** add `RAZORPAY_KEY_SECRET` to frontend env - it stays server-side only!

## Step 6: Test the Integration

### A. Test Database
```sql
-- Run in SQL Editor
SELECT * FROM subscriptions;
SELECT * FROM payments;
```

### B. Test Edge Functions

Using curl or Postman:

```bash
# Test create-payment-order
curl -X POST \
  'https://wymyrtwesynrowdivsrf.supabase.co/functions/v1/create-payment-order' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "amount": 29900,
    "currency": "INR",
    "planId": "plan_monthly",
    "userId": "YOUR_USER_ID"
  }'
```

Expected response:
```json
{
  "orderId": "order_XXXXXXXXXXXX",
  "amount": 29900,
  "currency": "INR"
}
```

### C. Test Frontend Flow

1. Start your app: `npm run dev`
2. Navigate to `/checkout`
3. Select a plan
4. Click "Start 7-Day Free Trial"
5. Complete payment with test card: `4111 1111 1111 1111`

## Step 7: Verify Deployment

Check the following:

✅ **Database Tables**:
```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public' 
  AND tablename IN ('subscriptions', 'payments');
```

✅ **RLS Policies**:
```sql
SELECT tablename, policyname FROM pg_policies 
  WHERE schemaname = 'public';
```

✅ **Edge Functions**:
```bash
supabase functions list
```

✅ **Secrets**:
```bash
supabase secrets list
```

## Step 8: Production Checklist

Before going live:

- [ ] Switch to **live** Razorpay keys (remove `test_` prefix)
- [ ] Update secrets with live keys:
  ```bash
  supabase secrets set RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX
  supabase secrets set RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXX
  ```
- [ ] Test with real payment (₹1 test)
- [ ] Set up webhook endpoints (for subscription updates)
- [ ] Configure Razorpay webhook URL:
  ```
  https://ywlnqbbuczhpsbnudnml.supabase.co/functions/v1/razorpay-webhook
  ```
- [ ] Enable production mode in frontend
- [ ] Monitor logs: `supabase functions logs create-payment-order`

## Troubleshooting

### Function deployment fails
```bash
# Check function logs
supabase functions logs create-payment-order --tail

# Re-deploy with verbose output
supabase functions deploy create-payment-order --debug
```

### Migration fails
```bash
# Check migration status
supabase migration list

# Reset and reapply (CAREFUL: loses data)
supabase db reset
```

### Secrets not working
```bash
# Unset and reset
supabase secrets unset RAZORPAY_KEY_ID
supabase secrets set RAZORPAY_KEY_ID=new_value
```

### Edge Function 500 errors
Check logs:
```bash
supabase functions logs verify-payment --tail
```

Common issues:
- Wrong secret names
- Missing database permissions
- Invalid Razorpay credentials

## Monitoring & Logs

### View function logs
```bash
# Real-time logs
supabase functions logs create-payment-order --tail

# Specific time range
supabase functions logs verify-payment --since 1h
```

### Database logs
Go to: https://supabase.com/dashboard/project/ywlnqbbuczhpsbnudnml/logs/explorer

## Rollback (If Needed)

### Rollback Edge Functions
```bash
# List versions
supabase functions list

# Deploy previous version (if available)
# Or delete and redeploy
supabase functions delete create-payment-order
```

### Rollback Database Migration
```bash
# Create a new migration that reverses changes
supabase migration new rollback_payments

# Add DROP statements
# Then push
supabase db push
```

## Next Steps

1. **Set up webhooks** - For automatic subscription status updates
2. **Add error tracking** - Sentry or similar
3. **Monitor payments** - Set up alerts for failed payments
4. **Test refunds** - Implement refund endpoint
5. **Add analytics** - Track conversion rates

## Resources

- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
- [Edge Functions Guide](https://supabase.com/docs/guides/functions)
- [Razorpay Docs](https://razorpay.com/docs/)
- Your Project: https://supabase.com/dashboard/project/ywlnqbbuczhpsbnudnml
