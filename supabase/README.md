# Sadhana Database Schema

This directory contains all Supabase migrations and database configuration for the Sadhana app.

## 📁 Directory Structure

```
supabase/
├── config.toml              # Supabase project configuration
├── migrations/              # Database migrations (run in order)
│   ├── 20260116193616_...sql  # Initial: profiles table + auth triggers
│   ├── 20260120203211_...sql  # Sessions table for practice tracking
│   ├── 20260122000000_...sql  # Enhanced: profile fields + stats
│   └── 20260122000001_...sql  # Storage: avatar bucket setup
└── README.md               # This file
```

## 🗄️ Database Schema

### Tables

#### `profiles`
User profile information. Auto-created when a user signs up.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key to `auth.users` |
| `full_name` | TEXT | User's full name |
| `display_name` | TEXT | Public display name |
| `date_of_birth` | DATE | Date of birth |
| `gender` | TEXT | Gender (male/female/other/prefer_not_to_say) |
| `avatar_url` | TEXT | URL to profile picture in storage |
| `bio` | TEXT | User bio/description |
| `practice_time` | TIME | Preferred daily practice time |
| `timezone` | TEXT | User's timezone |
| `onboarding_completed` | BOOLEAN | Has completed onboarding flow |
| `streak_count` | INTEGER | Current consecutive days streak |
| `total_sessions` | INTEGER | Total completed sessions |
| `total_minutes` | INTEGER | Total practice time in minutes |
| `created_at` | TIMESTAMPTZ | Account creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

#### `sessions`
Practice session tracking.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key to user |
| `started_at` | TIMESTAMPTZ | When session started |
| `completed_at` | TIMESTAMPTZ | When session completed (null if ongoing) |
| `duration_seconds` | INTEGER | Session duration |
| `created_at` | TIMESTAMPTZ | Record creation timestamp |

### Views

#### `user_dashboard_stats`
Read-only view for dashboard statistics.

Returns:
- `current_streak` - Consecutive days with practice
- `sessions_this_week` - Sessions in last 7 days
- `minutes_this_week` - Practice time in last 7 days
- `last_practice_date` - Most recent session
- Plus all profile fields

### Functions

#### `calculate_streak(user_id UUID)`
Calculates current consecutive days streak for a user.

#### `update_user_stats()`
Trigger function that auto-updates total_sessions and total_minutes when a session is completed.

#### `handle_new_user()`
Trigger function that auto-creates a profile when a new user signs up.

#### `update_updated_at_column()`
Trigger function that auto-updates the updated_at timestamp.

### Storage Buckets

#### `avatars`
Stores user profile pictures.
- **Public**: Yes (anyone can view)
- **Path structure**: `{user_id}/{filename}`
- **Allowed formats**: jpg, png, webp
- **Max size**: 2MB (configurable)

## 🔒 Security (Row Level Security)

All tables have RLS enabled with policies ensuring:
- Users can only view/edit their own data
- Profiles are auto-created on signup
- Stats are auto-updated on session completion
- Avatars can only be uploaded by the owner

## 🚀 Quick Start

### 1. Apply Migrations

Via Supabase Dashboard (Recommended):
1. Go to [SQL Editor](https://supabase.com/dashboard/project/ywlnqbbuczhpsbnudnml/sql)
2. Copy content from each `.sql` file in order
3. Run each migration

Via Supabase CLI:
```bash
supabase db push
```

### 2. Verify Setup

```bash
# Check tables exist
node scripts/setup-supabase.js
```

Or manually:
1. Go to [Table Editor](https://supabase.com/dashboard/project/ywlnqbbuczhpsbnudnml/editor)
2. Verify `profiles` and `sessions` tables exist
3. Check RLS policies are enabled

### 3. Test Signup Flow

1. Start your app: `npm run dev`
2. Sign up with a test email
3. Check the `profiles` table - a record should auto-create
4. Complete onboarding
5. Start a practice session
6. Check the `sessions` table for the new record

## 📊 Common Queries

### Get user with stats
```sql
SELECT * FROM user_dashboard_stats WHERE user_id = auth.uid();
```

### Get recent sessions
```sql
SELECT * FROM sessions 
WHERE user_id = auth.uid() 
ORDER BY started_at DESC 
LIMIT 10;
```

### Calculate total practice time
```sql
SELECT SUM(duration_seconds) / 3600 as hours
FROM sessions 
WHERE user_id = auth.uid() 
AND completed_at IS NOT NULL;
```

### Get sessions by date
```sql
SELECT 
  DATE(completed_at) as date,
  COUNT(*) as session_count,
  SUM(duration_seconds) / 60 as total_minutes
FROM sessions
WHERE user_id = auth.uid()
AND completed_at IS NOT NULL
GROUP BY DATE(completed_at)
ORDER BY date DESC;
```

## 🔄 Making Changes

### Creating a New Migration

```bash
# Generate a new migration file
supabase migration new your_migration_name

# Edit the file in supabase/migrations/

# Test locally
supabase db reset

# Apply to remote
supabase db push
```

### Updating Schema

Always create a new migration file. Never edit existing migrations that have been applied.

Example:
```sql
-- Add a new column
ALTER TABLE profiles ADD COLUMN favorite_color TEXT;

-- Add a policy
CREATE POLICY "policy_name" ON table_name ...;
```

## 🐛 Troubleshooting

### "relation does not exist"
- Migrations haven't been applied yet
- Run migrations in order via SQL Editor

### "permission denied"
- RLS is blocking the query
- Check RLS policies match your auth logic
- Verify `auth.uid()` is set correctly

### "duplicate key value violates unique constraint"
- Trying to insert duplicate `user_id`
- Check `handle_new_user()` trigger isn't running twice

### Stats not updating
- Check the `update_stats_on_session_complete` trigger exists
- Verify sessions have `completed_at` set (not null)

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)

## 🆘 Need Help?

1. Check the main [SUPABASE_SETUP.md](../SUPABASE_SETUP.md) guide
2. Review Supabase [Dashboard Logs](https://supabase.com/dashboard/project/ywlnqbbuczhpsbnudnml/logs)
3. Join [Supabase Discord](https://discord.supabase.com)
