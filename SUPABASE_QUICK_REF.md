# 🚀 Supabase Quick Reference

## Essential Commands

```bash
# Install Supabase CLI globally
npm install -g supabase

# Link to your remote project
supabase link --project-ref ywlnqbbuczhpsbnudnml

# Pull remote schema
supabase db pull

# Push local migrations to remote
supabase db push

# Reset local database
supabase db reset

# Generate TypeScript types
supabase gen types typescript --project-id ywlnqbbuczhpsbnudnml > src/integrations/supabase/types.ts

# Start local Supabase (optional)
supabase start

# Stop local Supabase
supabase stop
```

## Dashboard Links

- **Project**: https://supabase.com/dashboard/project/ywlnqbbuczhpsbnudnml
- **SQL Editor**: https://supabase.com/dashboard/project/ywlnqbbuczhpsbnudnml/sql
- **Table Editor**: https://supabase.com/dashboard/project/ywlnqbbuczhpsbnudnml/editor
- **Authentication**: https://supabase.com/dashboard/project/ywlnqbbuczhpsbnudnml/auth/users
- **Storage**: https://supabase.com/dashboard/project/ywlnqbbuczhpsbnudnml/storage/buckets
- **Logs**: https://supabase.com/dashboard/project/ywlnqbbuczhpsbnudnml/logs/explorer

## Environment Variables

Create `.env.local`:
```env
VITE_SUPABASE_URL=https://ywlnqbbuczhpsbnudnml.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

Get your keys from: **Project Settings** → **API**

## Migration Checklist

- [ ] Create `.env.local` with your keys
- [ ] Apply migration 1: `20260116193616_...sql` (profiles + auth)
- [ ] Apply migration 2: `20260120203211_...sql` (sessions)
- [ ] Apply migration 3: `20260122000000_...sql` (enhanced profiles)
- [ ] Apply migration 4: `20260122000001_...sql` (avatar storage)
- [ ] Verify RLS is enabled on all tables
- [ ] Test signup → profile auto-creation
- [ ] Test session creation → stats auto-update
- [ ] Configure Google OAuth (optional)
- [ ] Set up custom SMTP (production)

## Testing Queries

```sql
-- Check if your profile exists
SELECT * FROM profiles WHERE user_id = auth.uid();

-- Get dashboard stats
SELECT * FROM user_dashboard_stats WHERE user_id = auth.uid();

-- List all sessions
SELECT * FROM sessions WHERE user_id = auth.uid() ORDER BY started_at DESC;

-- Calculate current streak
SELECT calculate_streak(auth.uid());
```

## Common SQL Operations

### Create a test session
```sql
INSERT INTO sessions (user_id, completed_at, duration_seconds)
VALUES (auth.uid(), NOW(), 1200);
```

### Update profile
```sql
UPDATE profiles 
SET full_name = 'John Doe', bio = 'Yoga enthusiast'
WHERE user_id = auth.uid();
```

### Get sessions for heatmap
```sql
SELECT 
  DATE(completed_at) as date,
  COUNT(*) as count,
  SUM(duration_seconds)/60 as minutes
FROM sessions
WHERE user_id = auth.uid()
  AND completed_at IS NOT NULL
  AND completed_at > NOW() - INTERVAL '90 days'
GROUP BY DATE(completed_at)
ORDER BY date;
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid API key" | Check `.env.local`, restart dev server |
| "Row Level Security" error | Verify RLS policies, check `auth.uid()` |
| Profile not auto-created | Check `on_auth_user_created` trigger exists |
| Stats not updating | Verify `update_stats_on_session_complete` trigger |
| Can't upload avatar | Check storage bucket `avatars` exists |

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Apply all migrations
3. ⬜ Configure email templates
4. ⬜ Set up Google OAuth
5. ⬜ Configure custom domain (production)
6. ⬜ Set up database backups
7. ⬜ Add Stripe integration
8. ⬜ Configure SMTP for emails

## Resources

- 📘 [Main Setup Guide](./SUPABASE_SETUP.md)
- 📊 [Database Schema](./supabase/README.md)
- 🔗 [Supabase Docs](https://supabase.com/docs)
- 💬 [Discord Community](https://discord.supabase.com)
