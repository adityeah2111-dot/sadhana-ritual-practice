import { useCallback, useRef } from 'react';

/**
 * Custom hook for playing audio notifications
 * Uses Web Audio API to generate sounds programmatically
 */
export const useSound = () => {
    const audioContextRef = useRef<AudioContext | null>(null);

    // Initialize AudioContext lazily (browsers require user interaction first)
    const getAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return audioContextRef.current;
    }, []);

    /**
     * Play a pleasant bell/chime sound for session completion
     * Creates a harmonious tone using multiple frequencies
     */
    const playCompletionBell = useCallback(() => {
        try {
            const audioContext = getAudioContext();
            const now = audioContext.currentTime;

            // Create a harmonious chord (frequencies in Hz)
            const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 (C major chord)

            frequencies.forEach((freq, index) => {
                // Create oscillator for each note
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, now);

                // Envelope: gentle attack, sustain, then fade out
                const attackTime = 0.01;
                const sustainTime = 0.3;
                const releaseTime = 1.2;
                const startTime = now + index * 0.05; // Slight stagger for richness

                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.15, startTime + attackTime);
                gainNode.gain.setValueAtTime(0.15, startTime + sustainTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + sustainTime + releaseTime);

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.start(startTime);
                oscillator.stop(startTime + sustainTime + releaseTime + 0.1);
            });

            // Add a second, higher chord for a "ding-dong" effect
            setTimeout(() => {
                const higherFreqs = [659.25, 783.99, 987.77]; // E5, G5, B5

                higherFreqs.forEach((freq, index) => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    const now2 = audioContext.currentTime;

                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(freq, now2);

                    const startTime = now2 + index * 0.03;
                    gainNode.gain.setValueAtTime(0, startTime);
                    gainNode.gain.linearRampToValueAtTime(0.12, startTime + 0.01);
                    gainNode.gain.setValueAtTime(0.12, startTime + 0.4);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5);

                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);

                    oscillator.start(startTime);
                    oscillator.stop(startTime + 1.6);
                });
            }, 400);

        } catch (error) {
            console.warn('Could not play completion sound:', error);
        }
    }, [getAudioContext]);

    /**
     * Play a subtle click sound for button feedback
     */
    const playClick = useCallback(() => {
        try {
            const audioContext = getAudioContext();
            const now = audioContext.currentTime;

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, now);
            oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.05);

            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start(now);
            oscillator.stop(now + 0.1);
        } catch (error) {
            console.warn('Could not play click sound:', error);
        }
    }, [getAudioContext]);

    /**
     * Play a gentle start sound
     */
    const playStart = useCallback(() => {
        try {
            const audioContext = getAudioContext();
            const now = audioContext.currentTime;

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(400, now);
            oscillator.frequency.linearRampToValueAtTime(600, now + 0.15);

            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start(now);
            oscillator.stop(now + 0.35);
        } catch (error) {
            console.warn('Could not play start sound:', error);
        }
    }, [getAudioContext]);

    return {
        playCompletionBell,
        playClick,
        playStart,
    };
};

export default useSound;
