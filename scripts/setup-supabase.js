#!/usr/bin/env node

/**
 * Supabase Setup Script
 * 
 * This script helps you quickly set up your Supabase database
 * Run: node scripts/setup-supabase.js
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function setupSupabase() {
    console.log('\n🔥 Sadhana Supabase Setup\n');
    console.log('This script will help you configure your Supabase database.\n');

    // Get credentials
    const url = await question('Enter your Supabase Project URL: ');
    const anonKey = await question('Enter your Supabase Anon Key: ');
    const serviceKey = await question('Enter your Supabase Service Role Key (for admin operations): ');

    console.log('\n📡 Connecting to Supabase...');

    const supabase = createClient(url, serviceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });

    // Test connection
    try {
        const { data, error } = await supabase.from('profiles').select('count').limit(1);
        if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist yet
            throw error;
        }
        console.log('✅ Connected successfully!\n');
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        rl.close();
        process.exit(1);
    }

    // Ask what to do
    console.log('What would you like to do?\n');
    console.log('1. Apply all migrations');
    console.log('2. Check database status');
    console.log('3. Create test user');
    console.log('4. View migration files');
    console.log('5. Exit\n');

    const choice = await question('Enter your choice (1-5): ');

    switch (choice.trim()) {
        case '1':
            await applyMigrations(supabase);
            break;
        case '2':
            await checkStatus(supabase);
            break;
        case '3':
            await createTestUser(supabase);
            break;
        case '4':
            listMigrations();
            break;
        case '5':
            console.log('\n👋 Goodbye!\n');
            break;
        default:
            console.log('\n❌ Invalid choice\n');
    }

    rl.close();
}

async function applyMigrations(supabase) {
    console.log('\n📦 Applying migrations...');
    console.log('⚠️  Please apply these manually via the Supabase SQL Editor:\n');

    const migrations = [
        '20260116193616_210c0a96-2396-45ba-992b-e522bd16aaff.sql',
        '20260120203211_fb554c33-2a1b-4bcf-9086-3cbe50e2c12b.sql',
        '20260122000000_add_profile_fields.sql',
        '20260122000001_storage_avatars.sql'
    ];

    migrations.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
    });

    console.log('\n📍 Migration files are located in: supabase/migrations/');
    console.log('\n💡 To apply:');
    console.log('   1. Go to your Supabase Dashboard');
    console.log('   2. Navigate to SQL Editor');
    console.log('   3. Copy and paste each file content');
    console.log('   4. Run them in order\n');
}

async function checkStatus(supabase) {
    console.log('\n🔍 Checking database status...\n');

    try {
        // Check profiles table
        const { count: profileCount, error: profileError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });

        if (profileError) {
            console.log('❌ profiles table: Not found or error');
        } else {
            console.log(`✅ profiles table: ${profileCount} records`);
        }

        // Check sessions table
        const { count: sessionCount, error: sessionError } = await supabase
            .from('sessions')
            .select('*', { count: 'exact', head: true });

        if (sessionError) {
            console.log('❌ sessions table: Not found or error');
        } else {
            console.log(`✅ sessions table: ${sessionCount} records`);
        }

        console.log('\n');
    } catch (error) {
        console.error('❌ Error checking status:', error.message);
    }
}

async function createTestUser(supabase) {
    console.log('\n👤 Creating test user...');
    console.log('⚠️  Test user creation requires admin access.');
    console.log('   Please create users via your app signup flow instead.\n');
}

function listMigrations() {
    console.log('\n📄 Available migrations:\n');
    console.log('1. 20260116193616_... - Initial profiles & auth setup');
    console.log('2. 20260120203211_... - Sessions tracking');
    console.log('3. 20260122000000_... - Enhanced profile fields');
    console.log('4. 20260122000001_... - Avatar storage setup\n');
}

// Run the script
setupSupabase().catch(console.error);
