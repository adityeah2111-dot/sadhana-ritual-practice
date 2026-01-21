import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
    Chrome,
    Shield,
    UserCircle
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
        } else if (user?.email) {
            setDisplayName(user.email.split('@')[0]);
        }
    }, [profile, user]);

    const handleSave = async () => {
        // If anonymous user, show Google login prompt
        if (isAnonymous) {
            setShowSavePrompt(true);
            return;
        }

        setIsSaving(true);
        const result = await updateProfile({
            display_name: displayName || null,
            full_name: fullName || null,
            date_of_birth: dateOfBirth || null,
            gender: gender || null,
        });
        setIsSaving(false);

        if (result) {
            setIsEditing(false);
            toast({
                title: 'Profile updated',
                description: 'Your changes have been saved.',
            });
        } else {
            toast({
                title: 'Error',
                description: 'Failed to update profile. Please try again.',
                variant: 'destructive',
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
                // TODO: Upload to storage and update profile
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
                <div className="max-w-2xl mx-auto space-y-6">
                    {/* Page Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Your Profile</h1>
                        <p className="text-muted-foreground mt-1">View and manage your account details</p>
                    </motion.div>

                    {/* Anonymous User Banner */}
                    {isAnonymous && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.05 }}
                            className="bg-primary/5 border border-primary/20 rounded-xl p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-foreground">You're using a guest account</p>
                                    <p className="text-xs text-muted-foreground">Connect with Google to save your profile permanently</p>
                                </div>
                                <Button
                                    variant="crimson"
                                    size="sm"
                                    className="gap-2"
                                    onClick={() => signInWithGoogle()}
                                >
                                    <Chrome className="w-4 h-4" />
                                    Connect
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="bg-card border border-border rounded-2xl overflow-hidden"
                    >
                        {/* Profile Header */}
                        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                                {/* Avatar with upload */}
                                <div className="relative group">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-primary to-rose-500 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg overflow-hidden">
                                        {avatarPreview ? (
                                            <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            displayName?.charAt(0)?.toUpperCase() || 'U'
                                        )}
                                    </div>
                                    <button
                                        onClick={handleAvatarClick}
                                        className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-background hover:bg-primary/90 transition-colors"
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

                                <div className="flex-1 text-center sm:text-left">
                                    {isEditing ? (
                                        <div className="space-y-3">
                                            <Input
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                                placeholder="Display name"
                                                className="max-w-[250px]"
                                            />
                                            <div className="flex gap-2 justify-center sm:justify-start">
                                                <Button
                                                    size="sm"
                                                    variant="crimson"
                                                    onClick={handleSave}
                                                    disabled={isSaving}
                                                >
                                                    <Save className="w-4 h-4 mr-1" />
                                                    Save
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setIsEditing(false)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-2 justify-center sm:justify-start">
                                                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                                                    {displayName || fullName || 'Practitioner'}
                                                </h2>
                                                <button
                                                    onClick={() => setIsEditing(true)}
                                                    className="p-1.5 rounded-lg hover:bg-background/50 transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                                                </button>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5 justify-center sm:justify-start">
                                                <Mail className="w-3.5 h-3.5" />
                                                {user?.email || user?.phone || (isAnonymous ? 'Guest Account' : 'No email')}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="p-6 sm:p-8 space-y-6">
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                                    <UserCircle className="w-4 h-4" />
                                    Personal Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                                        <span className="text-foreground">Full Name</span>
                                        <span className="text-muted-foreground">{fullName || 'Not set'}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                                        <span className="text-foreground">Date of Birth</span>
                                        <span className="text-muted-foreground">{formatDOB(dateOfBirth)}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <span className="text-foreground">Gender</span>
                                        <span className="text-muted-foreground">{formatGender(gender)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Practice Stats */}
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                                    <Flame className="w-4 h-4" />
                                    Practice Stats
                                </h3>
                                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                    <div className="bg-background rounded-xl p-3 sm:p-4 text-center">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                                            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                        </div>
                                        <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.currentStreak}</p>
                                        <p className="text-[10px] sm:text-xs text-muted-foreground">Day Streak</p>
                                    </div>
                                    <div className="bg-background rounded-xl p-3 sm:p-4 text-center">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                                            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                        </div>
                                        <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.totalSessions}</p>
                                        <p className="text-[10px] sm:text-xs text-muted-foreground">Sessions</p>
                                    </div>
                                    <div className="bg-background rounded-xl p-3 sm:p-4 text-center">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                                            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                        </div>
                                        <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.totalMinutes}</p>
                                        <p className="text-[10px] sm:text-xs text-muted-foreground">Minutes</p>
                                    </div>
                                </div>
                            </div>

                            {/* Practice Settings */}
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Practice Settings
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-primary" />
                                            <span className="text-foreground">Daily Practice Time</span>
                                        </div>
                                        <span className="text-muted-foreground">{formatTime(profile?.practice_time || null)}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                                        <div className="flex items-center gap-3">
                                            <Globe className="w-5 h-5 text-primary" />
                                            <span className="text-foreground">Timezone</span>
                                        </div>
                                        <span className="text-muted-foreground">{profile?.timezone || 'Not set'}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-primary" />
                                            <span className="text-foreground">Member Since</span>
                                        </div>
                                        <span className="text-muted-foreground">{getMemberSince()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 space-y-3">
                                <Button
                                    variant="subtle"
                                    className="w-full"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                                <Link to="/settings" className="block">
                                    <Button variant="outline" className="w-full">
                                        Edit Practice Settings
                                    </Button>
                                </Link>
                            </div>
                        </div>
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
