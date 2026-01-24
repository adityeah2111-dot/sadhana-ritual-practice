# Quick Deployment Script for Razorpay Edge Functions

Write-Host "🚀 Deploying Razorpay Edge Functions..." -ForegroundColor Cyan

# Deploy create-payment-order
Write-Host "`n📦 Deploying create-payment-order..." -ForegroundColor Yellow
npx supabase functions deploy create-payment-order

# Deploy verify-payment
Write-Host "`n✅ Deploying verify-payment..." -ForegroundColor Yellow
npx supabase functions deploy verify-payment

# Deploy cancel-subscription
Write-Host "`n❌ Deploying cancel-subscription..." -ForegroundColor Yellow
npx supabase functions deploy cancel-subscription

Write-Host "`n✨ All Edge Functions deployed!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Set Razorpay secrets:" -ForegroundColor White
Write-Host "   npx supabase secrets set RAZORPAY_KEY_ID=rzp_test_xxx" -ForegroundColor Gray
Write-Host "   npx supabase secrets set RAZORPAY_KEY_SECRET=xxx" -ForegroundColor Gray
Write-Host "`n2. Verify deployment:" -ForegroundColor White
Write-Host "   npx supabase functions list" -ForegroundColor Gray
