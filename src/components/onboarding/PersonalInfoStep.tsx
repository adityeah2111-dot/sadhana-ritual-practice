import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PersonalInfoStepProps {
    onContinue: (data: { name: string; dateOfBirth: string; gender: string }) => void;
    onBack: () => void;
}

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

const PersonalInfoStep = ({ onContinue, onBack }: PersonalInfoStepProps) => {
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = () => {
        onContinue({ name, dateOfBirth, gender });
    };

    const isComplete = name.trim().length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-lg mx-auto py-8 px-4"
        >
            {/* Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
            >
                <User className="w-10 h-10 text-primary" />
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
                Tell Us About Yourself
            </h2>
            <p className="text-muted-foreground mb-8">
                Help us personalize your practice experience
            </p>

            {/* Form */}
            <div className="space-y-6 text-left">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Your Name <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Date of Birth <span className="text-muted-foreground text-xs">(optional)</span>
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Gender <span className="text-muted-foreground text-xs">(optional)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {genderOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => setGender(option.value)}
                                className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${gender === option.value
                                        ? 'border-primary bg-primary/10 text-foreground'
                                        : 'border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <Users className="w-4 h-4" />
                                <span className="text-sm font-medium">{option.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Privacy Note */}
            <p className="text-xs text-muted-foreground mt-6 mb-8">
                Your information is stored securely and will never be shared.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="sm:flex-1"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <Button
                    variant="crimson"
                    onClick={handleSubmit}
                    disabled={!isComplete}
                    className="sm:flex-1"
                >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </motion.div>
    );
};

export default PersonalInfoStep;
