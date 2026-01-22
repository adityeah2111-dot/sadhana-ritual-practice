# Supabase Configuration Guide for Sadhana

## 📋 Prerequisites
- Node.js and npm installed
- Supabase account (https://supabase.com)
- Supabase CLI installed: `npm install -g supabase`

## 🚀 Step 1: Create a New Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in the details:
   - **Name**: Sadhana
   - **Database Password**: (Save this securely!)
   - **Region**: Choose closest to your users (e.g., Mumbai for India)
   - **Pricing Plan**: Free tier is fine to start

4. Wait for the project to be created (takes ~2 minutes)

## 🔑 Step 2: Get Your API Credentials

Once your project is ready:

1. Go to **Project Settings** → **API**
2. Copy these values (you'll need them):
   - **Project URL**: `https://[your-project-ref].supabase.co`
   - **Anon/Public Key**: `eyJhbGciOi...` (long string)

## 📝 Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://ywlnqbbuczhpsbnudnml.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
```

**Important**: 
- Replace `ywlnqbbuczhpsbnudnml` with your actual project reference
- Replace `your_anon_key_here` with your actual anon key
- Add `.env.local` to `.gitignore` (never commit API keys!)

## 🗄️ Step 4:Initialize Local Supabase (Optional but Recommended)

```bash
# Link to your remote project
supabase link --project-ref ywlnqbbuczhpsbnudnml

# Pull the current schema
supabase db pull

# Start local development (optional)
supabase start
```

## 🔐 Step 5: Configure Authentication

Go to **Authentication** → **Providers** in Supabase Dashboard:

### Enable Email Authentication
1. Enable **Email** provider
2. Configure email templates:
   - Go to **Email Templates**
   - Customize the confirmation email if needed

### Enable Google Authentication (Recommended)
1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Authorized redirect URIs:
   ```
   https://ywlnqbbuczhpsbnudnml.supabase.co/auth/v1/callback
   http://localhost:8081/auth/callback
   ```
7. Copy **Client ID** and **Client Secret**
8. In Supabase Dashboard:
   - Go to **Authentication** → **Providers** → **Google**
   - Enable Google
   - Paste Client ID and Client Secret
   - Save

### Configure Email Settings (Optional but recommended for production)
1. Go to **Project Settings** → **Auth**
2. Configure **SMTP Settings** for custom email delivery
3. Or use Supabase's default (has rate limits)

## 🛠️ Step 6: Apply Database Migrations

Your migrations are already in `supabase/migrations/`. To apply them:

### Option A: Via Supabase Dashboard (Easiest)
1. Go to **SQL Editor** in Supabase Dashboard
2. Copy the content from each migration file
3. Run them in order:
   - First: `20260116193616_210c0a96-2396-45ba-992b-e522bd16aaff.sql`
   - Then: `20260120203211_fb554c33-2a1b-4bcf-9086-3cbe50e2c12b.sql`
   - Finally: The new migration we'll create

### Option B: Via Supabase CLI
```bash
supabase db push
```

## 📊 Step 7: Verify Your Database

1. Go to **Table Editor** in Supabase Dashboard
2. You should see two tables:
   - `profiles` - User profile data
   - `sessions` - Practice session tracking

3. Check **Database** → **Roles** → Row Level Security is enabled

## 🧪 Step 8: Test the Connection

Run your app:
```bash
npm run dev
```

Try these actions:
1. Sign up with email
2. Check if a profile is auto-created in the `profiles` table
3. Complete onboarding
4. Start a practice session
5. Check if session is saved in `sessions` table

##🔒 Security Checklist

- [ ] Row Level Security (RLS) enabled on all tables
- [ ] API keys are in `.env.local` (not committed)
- [ ] Auth redirect URLs configured correctly
- [ ] Email confirmation enabled (for production)
- [ ] SMTP configured (for production)

## 🐛 Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` has the correct anon key
- Restart the dev server after changing `.env.local`

### "Row Level Security policy violation"
- Check RLS policies in the SQL Editor
- Verify `auth.uid()` matches `user_id` in your policies

### Google Auth not working
- Verify redirect URIs match exactly
- Check Client ID and Secret are correct
- Clear browser cache and cookies

### Profile not created on signup
- Check the `on_auth_user_created` trigger exists
- Look at Database → Logs for errors

## 📚 Next Steps

1. Add profile fields (avatar_url, full_name, etc.) - see the new migration
2. Set up Storage buckets for user avatars
3. Configure email templates
4. Add Stripe integration for payments
5. Set up database backups

## 🆘 Support

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Your current project: https://supabase.com/dashboard/project/ywlnqbbuczhpsbnudnml
