import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    User,
    Mail,
    Clock,
    Globe,
    Flame,
    Save,
    ArrowLeft,
    Calendar,
    Trophy,
    Target,
    Edit2,
    Camera,
    Shield,
    UserCircle,
    Check,
    X,
    Sparkles,
    TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useSessions } from '@/hooks/useSessions';
import { useToast } from '@/hooks/use-toast';
import GoogleLoginPrompt from '@/components/auth/GoogleLoginPrompt';

const Profile = () => {
    const navigate = useNavigate();
    const { user, isAnonymous, signInWithGoogle } = useAuth();
    const { profile, updateProfile, loading: profileLoading } = useProfile();
    const { stats } = useSessions();
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState<'male' | 'female' | 'other' | 'prefer_not_to_say' | ''>('');
    const [isSaving, setIsSaving] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [showSavePrompt, setShowSavePrompt] = useState(false);

    useEffect(() => {
        if (profile) {
            setDisplayName(profile.display_name || '');
            setFullName(profile.full_name || '');
            setDateOfBirth(profile.date_of_birth || '');
            setGender(profile.gender || '');
            if (profile.avatar_url) {
                setAvatarPreview(profile.avatar_url);
            }
        } else {
            // Fallback: Try to load from localStorage (for local dev)
            try {
                const localProfile = JSON.parse(localStorage.getItem('sadhana_profile') || '{}');
                if (localProfile.display_name) setDisplayName(localProfile.display_name);
                if (localProfile.full_name) setFullName(localProfile.full_name);
                if (localProfile.date_of_birth) setDateOfBirth(localProfile.date_of_birth);
                if (localProfile.gender) setGender(localProfile.gender);
            } catch {
                // Ignore localStorage errors
            }

            // Default display name from email if nothing else is set
            if (!displayName && user?.email) {
                setDisplayName(user.email.split('@')[0]);
            }
        }
    }, [profile, user]);

    // Calculate profile completion percentage
    const getProfileCompletion = () => {
        let completed = 0;
        const total = 5;
        if (displayName) completed++;
        if (fullName) completed++;
        if (dateOfBirth) completed++;
        if (gender) completed++;
        if (avatarPreview) completed++;
        return Math.round((completed / total) * 100);
    };

    const profileCompletion = getProfileCompletion();

    const handleSave = async () => {
        setIsSaving(true);

        // Only display_name exists in the database - other fields are stored locally
        const dbUpdates = {
            display_name: displayName || null,
        };

        // Additional profile data stored in localStorage
        const localUpdates = {
            display_name: displayName || null,
            full_name: fullName || null,
            date_of_birth: dateOfBirth || null,
            gender: gender || null,
        };

        // Try to save display_name to database
        const result = await updateProfile(dbUpdates);

        // Always save all data to localStorage as backup/extended storage
        try {
            const localProfile = JSON.parse(localStorage.getItem('sadhana_profile') || '{}');
            const updatedProfile = { ...localProfile, ...localUpdates };
            localStorage.setItem('sadhana_profile', JSON.stringify(updatedProfile));
        } catch {
            // Ignore localStorage errors
        }

        setIsSaving(false);
        setIsEditing(false);

        if (result) {
            toast({
                title: 'Profile updated',
                description: isAnonymous
                    ? 'Changes saved for this session. Link Google to keep permanently.'
                    : 'Your changes have been saved.',
            });
        } else {
            // DB save failed but localStorage worked
            toast({
                title: 'Profile saved locally',
                description: 'Changes saved to this browser.',
            });
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
                toast({
                    title: 'Avatar selected',
                    description: 'Avatar upload will be available soon.',
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const formatTime = (time: string | null) => {
        if (!time) return 'Not set';
        const hour = parseInt(time.split(':')[0]);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        return `${displayHour}:00 ${ampm}`;
    };

    const getMemberSince = () => {
        if (!profile?.created_at) return 'Recently';
        return new Date(profile.created_at).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        });
    };

    const formatGender = (g: string | null) => {
        if (!g) return 'Not set';
        const map: Record<string, string> = {
            'male': 'Male',
            'female': 'Female',
            'other': 'Other',
            'prefer_not_to_say': 'Prefer not to say'
        };
        return map[g] || g;
    };

    const formatDOB = (dob: string | null) => {
        if (!dob) return 'Not set';
        return new Date(dob).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    if (profileLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <p className="text-sm text-muted-foreground">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/dashboard" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground hover:text-foreground/90 transition-colors">
                            <Flame className="w-5 h-5 text-primary" />
                            Sadhana
                        </Link>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/dashboard')}
                            className="gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Back to Dashboard</span>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 lg:px-6 py-8 sm:py-12">
                <div className="max-w-3xl mx-auto space-y-6">

                    {/* Hero Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-background to-rose-500/10 border border-border"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl" />
                        </div>

                        <div className="relative p-6 sm:p-8">
                            {/* Guest Banner - Integrated at top */}
                            {isAnonymous && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 flex items-center gap-3 p-3 bg-primary/10 backdrop-blur-sm rounded-xl border border-primary/20"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground">Guest Account</p>
                                        <p className="text-xs text-muted-foreground truncate">Your progress isn't saved permanently</p>
                                    </div>
                                    <Button
                                        variant="crimson"
                                        size="sm"
                                        className="gap-2 flex-shrink-0"
                                        onClick={() => signInWithGoogle()}
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        <span className="hidden sm:inline">Link Google</span>
                                    </Button>
                                </motion.div>
                            )}

                            {/* Avatar Section */}
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="relative">
                                    {/* Animated Ring */}
                                    <motion.div
                                        className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-primary via-rose-500 to-primary"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        style={{ opacity: 0.6 }}
                                    />

                                    {/* Avatar */}
                                    <div
                                        className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary to-rose-500 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold shadow-2xl overflow-hidden cursor-pointer group"
                                        onClick={handleAvatarClick}
                                    >
                                        {avatarPreview ? (
                                            <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            displayName?.charAt(0)?.toUpperCase() || 'U'
                                        )}

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera className="w-8 h-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Camera Button */}
                                    <button
                                        onClick={handleAvatarClick}
                                        className="absolute -bottom-1 -right-1 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg border-4 border-background hover:bg-primary/90 transition-colors"
                                    >
                                        <Camera className="w-4 h-4 text-white" />
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </div>

                                {/* Profile Info */}
                                <div className="flex-1 text-center sm:text-left">
                                    <AnimatePresence mode="wait">
                                        {isEditing ? (
                                            <motion.div
                                                key="editing"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="space-y-3"
                                            >
                                                <Input
                                                    value={displayName}
                                                    onChange={(e) => setDisplayName(e.target.value)}
                                                    placeholder="Display name"
                                                    className="max-w-[280px] h-12 text-lg bg-background/50"
                                                />
                                                <div className="flex gap-2 justify-center sm:justify-start">
                                                    <Button
                                                        size="sm"
                                                        variant="crimson"
                                                        onClick={handleSave}
                                                        disabled={isSaving}
                                                        className="gap-1.5"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                        Save
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => setIsEditing(false)}
                                                        className="gap-1.5"
                                                    >
                                                        <X className="w-4 h-4" />
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="display"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                                                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                                                        {displayName || fullName || 'Practitioner'}
                                                    </h1>
                                                    <button
                                                        onClick={() => setIsEditing(true)}
                                                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                                                    </button>
                                                </div>
                                                <p className="text-muted-foreground flex items-center gap-1.5 justify-center sm:justify-start">
                                                    <Mail className="w-4 h-4" />
                                                    {user?.email || (isAnonymous ? 'Guest Account' : 'No email')}
                                                </p>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Member since {getMemberSince()}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Profile Completion Bar */}
                            {profileCompletion < 100 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-6 p-4 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium text-foreground">Profile Completion</span>
                                        </div>
                                        <span className="text-sm font-bold text-primary">{profileCompletion}%</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-primary to-rose-500 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${profileCompletion}%` }}
                                            transition={{ duration: 0.8, delay: 0.3 }}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Complete your profile for a personalized experience
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="grid grid-cols-3 gap-3 sm:gap-4"
                    >
                        {[
                            { icon: Flame, label: 'Day Streak', value: stats.currentStreak, color: 'from-orange-500 to-red-500' },
                            { icon: Trophy, label: 'Sessions', value: stats.totalSessions, color: 'from-amber-500 to-orange-500' },
                            { icon: Target, label: 'Minutes', value: stats.totalMinutes, color: 'from-rose-500 to-pink-500' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="relative overflow-hidden bg-card border border-border rounded-2xl p-4 sm:p-6 text-center group hover:border-primary/50 transition-colors"
                            >
                                {/* Background Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Details Cards */}
                    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                        {/* Personal Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-card border border-border rounded-2xl overflow-hidden"
                        >
                            <div className="p-4 sm:p-5 border-b border-border bg-muted/30">
                                <h3 className="font-semibold text-foreground flex items-center gap-2">
                                    <UserCircle className="w-5 h-5 text-primary" />
                                    Personal Information
                                </h3>
                            </div>
                            <div className="p-4 sm:p-5 space-y-4">
                                {/* Full Name */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Full Name</span>
                                    {isEditing ? (
                                        <Input
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Enter name"
                                            className="max-w-[180px] h-9 text-sm"
                                        />
                                    ) : (
                                        <span className={`text-sm ${fullName ? 'text-foreground font-medium' : 'text-muted-foreground italic'}`}>
                                            {fullName || 'Not set'}
                                        </span>
                                    )}
                                </div>

                                {/* Date of Birth */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Date of Birth</span>
                                    {isEditing ? (
                                        <Input
                                            type="date"
                                            value={dateOfBirth}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                            className="max-w-[180px] h-9 text-sm"
                                        />
                                    ) : (
                                        <span className={`text-sm ${dateOfBirth ? 'text-foreground font-medium' : 'text-muted-foreground italic'}`}>
                                            {formatDOB(dateOfBirth)}
                                        </span>
                                    )}
                                </div>

                                {/* Gender */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Gender</span>
                                    {isEditing ? (
                                        <select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value as typeof gender)}
                                            className="max-w-[180px] h-9 px-3 text-sm rounded-md border border-input bg-background text-foreground"
                                        >
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="prefer_not_to_say">Prefer not to say</option>
                                        </select>
                                    ) : (
                                        <span className={`text-sm ${gender ? 'text-foreground font-medium' : 'text-muted-foreground italic'}`}>
                                            {formatGender(gender)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Practice Settings */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-card border border-border rounded-2xl overflow-hidden"
                        >
                            <div className="p-4 sm:p-5 border-b border-border bg-muted/30">
                                <h3 className="font-semibold text-foreground flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    Practice Settings
                                </h3>
                            </div>
                            <div className="p-4 sm:p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-primary" />
                                        <span className="text-sm text-muted-foreground">Daily Time</span>
                                    </div>
                                    <span className="text-sm text-foreground font-medium">
                                        {formatTime(profile?.practice_time || null)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-primary" />
                                        <span className="text-sm text-muted-foreground">Timezone</span>
                                    </div>
                                    <span className="text-sm text-foreground font-medium">
                                        {profile?.timezone || 'Not set'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        <span className="text-sm text-muted-foreground">Member Since</span>
                                    </div>
                                    <span className="text-sm text-foreground font-medium">
                                        {getMemberSince()}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        {!isEditing ? (
                            <Button
                                variant="crimson"
                                className="flex-1 h-12 gap-2"
                                onClick={() => setIsEditing(true)}
                            >
                                <Edit2 className="w-4 h-4" />
                                Edit Profile
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant="crimson"
                                    className="flex-1 h-12 gap-2"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                >
                                    <Save className="w-4 h-4" />
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 h-12 gap-2"
                                    onClick={() => setIsEditing(false)}
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </Button>
                            </>
                        )}
                        <Link to="/settings" className="flex-1">
                            <Button variant="outline" className="w-full h-12 gap-2">
                                <TrendingUp className="w-4 h-4" />
                                Practice Settings
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </main>

            {/* Google Login Prompt Modal */}
            {showSavePrompt && (
                <GoogleLoginPrompt
                    variant="popup"
                    message="Connect your Google account to save your profile changes"
                    onClose={() => setShowSavePrompt(false)}
                />
            )}
        </div>
    );
};

export default Profile;
