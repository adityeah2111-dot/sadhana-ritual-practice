import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, Phone, User, ArrowLeft, ArrowRight, Chrome, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Turnstile } from '@marsidev/react-turnstile';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');
const phoneSchema = z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Please enter a valid phone number with country code');

type AuthMethod = 'email' | 'phone' | 'google' | 'anonymous';
type PhoneStep = 'input' | 'verify';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onToggleMode: () => void;
}

const AuthForm = ({ mode, onToggleMode }: AuthFormProps) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  const [phoneStep, setPhoneStep] = useState<PhoneStep>('input');

  // Email auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Phone auth state
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  // Captcha state
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; phone?: string }>({});

  const { signIn, signUp, signInWithGoogle, signInWithPhone, verifyPhoneOtp, signInAnonymously } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmailForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePhone = () => {
    const phoneResult = phoneSchema.safeParse(phone);
    if (!phoneResult.success) {
      setErrors({ phone: phoneResult.error.errors[0].message });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmailForm()) return;
    setLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            variant: 'destructive',
            title: 'Sign in failed',
            description: error.message === 'Invalid login credentials'
              ? 'Incorrect email or password. Please try again.'
              : error.message,
          });
        } else {
          navigate('/dashboard');
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          let errorMessage = error.message;
          if (error.message.includes('already registered')) {
            errorMessage = 'This email is already registered. Please sign in instead.';
          }
          toast({
            variant: 'destructive',
            title: 'Sign up failed',
            description: errorMessage,
          });
        } else {
          toast({
            title: 'Welcome to Sadhana',
            description: 'Your account has been created. Redirecting to your practice...',
          });
          navigate('/dashboard');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSendOtp = async () => {
    if (!validatePhone()) return;
    setLoading(true);
    try {
      const { error } = await signInWithPhone(phone);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to send OTP',
          description: error.message,
        });
      } else {
        setPhoneStep('verify');
        toast({
          title: 'OTP Sent',
          description: 'Check your phone for the verification code.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        variant: 'destructive',
        title: 'Invalid OTP',
        description: 'Please enter the 6-digit code.',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await verifyPhoneOtp(phone, otp);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Verification failed',
          description: error.message,
        });
      } else {
        toast({
          title: 'Welcome to Sadhana',
          description: 'Phone verified successfully.',
        });
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    // If captcha is not shown yet and we need it (checking environment is tricky client-side, 
    // but assuming we want to enforce it always for anonymous if configured)
    if (!captchaToken) {
      setShowCaptcha(true);
      return;
    }

    setLoading(true);
    try {
      const { error } = await signInAnonymously(captchaToken);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Guest access denied',
          description: error.message,
        });
        // Reset captcha on failure
        setCaptchaToken(null);
        setShowCaptcha(false);
      } else {
        toast({
          title: 'Welcome, Guest',
          description: 'You can create an account later to save your progress.',
        });
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Google sign in failed',
        description: error.message,
      });
      setLoading(false);
    }
  };

  const resetPhoneFlow = () => {
    setPhoneStep('input');
    setOtp('');
  };

  // Google Logo Component
  const GoogleLogo = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-xl shadow-primary/5">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {mode === 'signin' ? 'Welcome Back' : 'Begin Your Practice'}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {mode === 'signin'
              ? 'Continue your ritual of daily discipline'
              : 'Join the path of transformative practice'
            }
          </p>
        </div>

        <div className="space-y-4">
          {/* Most Prominent: Google Sign In */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 text-base font-medium bg-background hover:bg-muted/50 transition-all border-border hover:border-primary/50 group"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <div className="flex items-center justify-center gap-3">
                <GoogleLogo />
                <span>Continue with Google</span>
              </div>
            )}
          </Button>

          {/* New clearly visible options */}
          <div className="flex gap-2 sm:gap-4 mt-6">
            <button
              onClick={() => {
                setAuthMethod('email');
                setErrors({});
              }}
              className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${authMethod === 'email'
                ? 'border-primary bg-primary/5 text-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
            >
              <Mail className={`w-5 h-5 ${authMethod === 'email' ? 'text-primary' : ''}`} />
              <span className="text-xs font-semibold uppercase tracking-wider">Email</span>
            </button>
            <button
              onClick={() => {
                setAuthMethod('phone');
                setErrors({});
                resetPhoneFlow();
              }}
              className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${authMethod === 'phone'
                ? 'border-primary bg-primary/5 text-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
            >
              <Phone className={`w-5 h-5 ${authMethod === 'phone' ? 'text-primary' : ''}`} />
              <span className="text-xs font-semibold uppercase tracking-wider">Phone</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {/* Email Form */}
            {authMethod === 'email' && (
              <motion.form
                key="email-form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleEmailSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className="pl-10 h-11 bg-muted/20 border-border focus:border-primary/50 transition-colors"
                      disabled={loading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: undefined });
                      }}
                      className="pl-10 pr-10 h-11 bg-muted/20 border-border focus:border-primary/50 transition-colors"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-destructive">{errors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="crimson"
                  className="w-full h-11 font-semibold text-base shadow-lg shadow-primary/20"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <LogIn className="w-4 h-4" />
                      <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                    </div>
                  )}
                </Button>
              </motion.form>
            )}

            {/* Phone Form */}
            {authMethod === 'phone' && (
              <motion.div
                key="phone-form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <AnimatePresence mode="wait">
                  {phoneStep === 'input' ? (
                    <motion.div
                      key="phone-input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (errors.phone) setErrors({});
                            }}
                            className="pl-10 h-11 bg-muted/20 border-border"
                            disabled={loading}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-destructive">{errors.phone}</p>
                        )}
                        <p className="text-[11px] text-muted-foreground text-center">
                          Include country code (e.g., +91 for India)
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="crimson"
                        className="w-full h-11 font-semibold"
                        onClick={handlePhoneSendOtp}
                        disabled={loading || !phone}
                      >
                        {loading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <span>Send Verification Code</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="phone-verify"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">
                          Enter the 6-digit code sent to
                        </p>
                        <p className="text-foreground font-bold tracking-tight">{phone}</p>
                      </div>

                      <div className="flex justify-center py-2">
                        <InputOTP
                          maxLength={6}
                          value={otp}
                          onChange={(value) => setOtp(value)}
                        >
                          <InputOTPGroup className="gap-2">
                            <InputOTPSlot index={0} className="rounded-md border-border h-12 w-10 sm:w-12" />
                            <InputOTPSlot index={1} className="rounded-md border-border h-12 w-10 sm:w-12" />
                            <InputOTPSlot index={2} className="rounded-md border-border h-12 w-10 sm:w-12" />
                            <InputOTPSlot index={3} className="rounded-md border-border h-12 w-10 sm:w-12" />
                            <InputOTPSlot index={4} className="rounded-md border-border h-12 w-10 sm:w-12" />
                            <InputOTPSlot index={5} className="rounded-md border-border h-12 w-10 sm:w-12" />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 h-11 border-border"
                          onClick={resetPhoneFlow}
                          disabled={loading}
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </Button>
                        <Button
                          type="button"
                          variant="crimson"
                          className="flex-1 h-11 font-semibold"
                          onClick={handlePhoneVerifyOtp}
                          disabled={loading || otp.length !== 6}
                        >
                          {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            'Verify'
                          )}
                        </Button>
                      </div>

                      <button
                        type="button"
                        onClick={handlePhoneSendOtp}
                        disabled={loading}
                        className="w-full text-xs text-primary hover:underline disabled:opacity-50 mt-2"
                      >
                        Didn't receive code? Resend
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Guest Access - More integrated but secondary */}
        <div className="mt-8 pt-8 border-t border-border/50">
          {showCaptcha && (
            <div className="mb-4 flex justify-center">
              <Turnstile
                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                onSuccess={(token) => {
                  setCaptchaToken(token);
                  // Auto-submit once captcha is solved, optional but smooth
                }}
              />
            </div>
          )}

          <Button
            type="button"
            variant="ghost"
            className="w-full h-11 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all rounded-xl"
            onClick={handleAnonymousSignIn}
            disabled={loading || (showCaptcha && !captchaToken)}
          >
            <User className="w-4 h-4 mr-2" />
            {showCaptcha ? (captchaToken ? "Confirm Guest Access" : "Complete Verification") : "Continue as a Guest Practitioner"}
          </Button>
          <div className="flex items-center justify-center gap-2 mt-3 px-8">
            <div className="h-px bg-border flex-1" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest whitespace-nowrap">recommended for first look</span>
            <div className="h-px bg-border flex-1" />
          </div>
        </div>

        {/* Toggle mode */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {mode === 'signin' ? "Not on the path yet? " : 'Already a practitioner? '}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-primary hover:underline font-bold transition-all"
            >
              {mode === 'signin' ? 'Join Sadhana' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-[10px] text-muted-foreground/60 mt-8 px-8 leading-relaxed"
      >
        By proceeding, you agree to follow the path with discipline and respect our community guidelines.
      </motion.p>
    </motion.div>
  );
};

export default AuthForm;
