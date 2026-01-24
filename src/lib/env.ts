// Environment configuration with type safety and defaults
// All environment variables should be accessed through this file

interface EnvConfig {
    // Supabase
    supabaseUrl: string;
    supabaseAnonKey: string;

    // App
    appUrl: string;
    appName: string;

    // Feature flags
    maintenanceMode: boolean;
    debug: boolean;

    // Environment
    isDev: boolean;
    isProd: boolean;
}

const getEnvVar = (key: string, defaultValue: string = ''): string => {
    const value = import.meta.env[key];
    return value ?? defaultValue;
};

const getBooleanEnv = (key: string, defaultValue: boolean = false): boolean => {
    const value = import.meta.env[key];
    if (value === undefined) return defaultValue;
    return value === 'true' || value === '1';
};

export const env: EnvConfig = {
    // Supabase configuration
    supabaseUrl: getEnvVar('VITE_SUPABASE_URL'),
    supabaseAnonKey: getEnvVar('VITE_SUPABASE_ANON_KEY'),

    // App configuration
    appUrl: getEnvVar('VITE_APP_URL', 'https://sadhanaweb.vercel.app'),
    appName: getEnvVar('VITE_APP_NAME', 'Sadhana'),

    // Feature flags
    maintenanceMode: getBooleanEnv('VITE_MAINTENANCE_MODE', false),
    debug: getBooleanEnv('VITE_DEBUG', false),

    // Environment detection
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
};

// Validate required environment variables in production
if (env.isProd) {
    const requiredVars = ['supabaseUrl', 'supabaseAnonKey'] as const;
    const missing = requiredVars.filter(key => !env[key]);

    if (missing.length > 0) {
        console.error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

// Debug logging
if (env.debug) {
    console.log('Environment config loaded:', {
        ...env,
        supabaseAnonKey: env.supabaseAnonKey ? '[REDACTED]' : '[MISSING]',
    });
}

export default env;
