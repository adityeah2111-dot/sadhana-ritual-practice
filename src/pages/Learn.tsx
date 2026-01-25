import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Flame,
    ArrowLeft,
    BookOpen,
    Target,
    Brain,
    Sparkles,
    Clock,
    ChevronRight,
    Flower2,
    Search,
    Languages
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';

declare global {
    interface Window {
        googleTranslateElementInit: () => void;
        google: any;
    }
}

// Full blog post content
const blogPosts = [
    {
        id: 'discipline-over-motivation',
        category: 'Discipline',
        title: 'Why Discipline Beats Motivation Every Time',
        excerpt: 'Motivation is fleeting. Discipline is lasting. Learn why building systems of discipline will transform your practice more than waiting for inspiration ever could.',
        content: `
      <p>We've all been there—that rush of motivation after watching an inspiring video or starting a new year. But within weeks, sometimes days, that fire dims. Why? Because motivation is an emotion, and emotions are fleeting.</p>
      
      <h3>The Motivation Trap</h3>
      <p>Motivation feels powerful because it's tied to excitement and novelty. But here's the truth: you can't rely on a feeling to show up every day. Motivation is weather; discipline is climate.</p>
      
      <h3>Building Discipline Instead</h3>
      <p>Discipline isn't about willpower or forcing yourself. It's about systems:</p>
      <ul>
        <li><strong>Environment Design:</strong> Make the good behavior easy and the bad behavior hard.</li>
        <li><strong>Identity Shift:</strong> Don't just do the practice—become the practitioner.</li>
        <li><strong>Minimum Viable Action:</strong> On your worst days, just show up for 2 minutes.</li>
      </ul>
      
      <h3>The Sadhana Approach</h3>
      <p>In Sanskrit, Sadhana means "a means of accomplishing something." It's not about how you feel—it's about what you do. Every day, same time, no negotiation. That's discipline.</p>
      
      <blockquote>"We are what we repeatedly do. Excellence, then, is not an act, but a habit." — Aristotle</blockquote>
    `,
        readTime: '5 min read',
        icon: Target,
        gradient: 'from-red-500 to-orange-500',
        author: 'Sadhana Team',
        date: 'January 15, 2026',
    },
    {
        id: 'habit-formation-science',
        category: 'Habit Formation',
        title: 'The Science of Building Unbreakable Habits',
        excerpt: 'Understanding the habit loop and how to use cue, routine, and reward to build practices that stick for a lifetime.',
        content: `
      <p>Every habit follows the same neurological loop: Cue → Routine → Reward. Understanding this loop is the key to building habits that last.</p>
      
      <h3>The Habit Loop Explained</h3>
      <p><strong>Cue:</strong> The trigger that initiates the behavior. It could be a time, location, emotion, or preceding action.</p>
      <p><strong>Routine:</strong> The actual behavior you perform.</p>
      <p><strong>Reward:</strong> The benefit you gain, which reinforces the loop.</p>
      
      <h3>Making Habits Stick</h3>
      <ol>
        <li><strong>Make it Obvious:</strong> Design clear cues. Put your yoga mat next to your bed.</li>
        <li><strong>Make it Attractive:</strong> Pair the habit with something you enjoy.</li>
        <li><strong>Make it Easy:</strong> Reduce friction. Prepare everything the night before.</li>
        <li><strong>Make it Satisfying:</strong> Track your progress. Celebrate small wins.</li>
      </ol>
      
      <h3>The 21-Day Myth</h3>
      <p>Forget the 21-day rule. Research shows habits take anywhere from 18 to 254 days to form, with an average of 66 days. Be patient with yourself.</p>
      
      <blockquote>"You do not rise to the level of your goals. You fall to the level of your systems." — James Clear</blockquote>
    `,
        readTime: '7 min read',
        icon: Brain,
        gradient: 'from-purple-500 to-pink-500',
        author: 'Sadhana Team',
        date: 'January 12, 2026',
    },
    {
        id: 'morning-ritual-design',
        category: 'Habit Formation',
        title: 'Designing Your Perfect Morning Ritual',
        excerpt: 'The first hours of your day set the tone for everything that follows. Learn how to craft a morning ritual that energizes and focuses you.',
        content: `
      <p>How you start your morning determines how you move through your day. A intentional morning ritual creates momentum that carries you forward.</p>
      
      <h3>The Power of Morning</h3>
      <p>In the morning, your willpower is at its peak. Decisions haven't depleted you yet. This is your golden hour—use it wisely.</p>
      
      <h3>Elements of a Strong Morning Ritual</h3>
      <ul>
        <li><strong>Wake at a consistent time:</strong> Your body craves rhythm. Honor it.</li>
        <li><strong>Avoid screens for the first hour:</strong> Don't let others set your agenda.</li>
        <li><strong>Move your body:</strong> Even 10 minutes of movement wakes up your system.</li>
        <li><strong>Practice stillness:</strong> Meditation, journaling, or simply sitting in silence.</li>
        <li><strong>Set your intention:</strong> What's the one thing that matters most today?</li>
      </ul>
      
      <h3>Sample Morning Flow</h3>
      <p>5:30 AM - Wake, no snooze<br/>
      5:35 AM - Glass of water, light stretching<br/>
      5:45 AM - Sadhana practice (15-30 min)<br/>
      6:15 AM - Journaling or reading<br/>
      6:30 AM - Begin your day with clarity</p>
      
      <blockquote>"The way you do one thing is the way you do everything." — Zen proverb</blockquote>
    `,
        readTime: '6 min read',
        icon: Sparkles,
        gradient: 'from-amber-500 to-yellow-500',
        author: 'Sadhana Team',
        date: 'January 10, 2026',
    },
    {
        id: 'eight-limbs-yoga',
        category: 'Yoga Philosophy',
        title: 'The Eight Limbs of Yoga: A Practical Guide',
        excerpt: 'Beyond asanas lies a complete system for living. Explore Patanjali\'s eight limbs and how they apply to modern practice.',
        content: `
      <p>When most people think of yoga, they think of physical postures. But asana is just one of eight limbs described by the sage Patanjali over 2,000 years ago.</p>
      
      <h3>The Eight Limbs (Ashtanga)</h3>
      <ol>
        <li><strong>Yama:</strong> Ethical disciplines (non-violence, truthfulness, non-stealing, moderation, non-possessiveness)</li>
        <li><strong>Niyama:</strong> Personal practices (cleanliness, contentment, discipline, self-study, surrender)</li>
        <li><strong>Asana:</strong> Physical postures</li>
        <li><strong>Pranayama:</strong> Breath control</li>
        <li><strong>Pratyahara:</strong> Withdrawal of senses</li>
        <li><strong>Dharana:</strong> Concentration</li>
        <li><strong>Dhyana:</strong> Meditation</li>
        <li><strong>Samadhi:</strong> Union, absorption</li>
      </ol>
      
      <h3>Practical Application</h3>
      <p>You don't need to master all eight before benefiting from them. Start with simple practices:</p>
      <ul>
        <li>Practice non-violence in your self-talk</li>
        <li>Cultivate contentment with your current abilities</li>
        <li>Add 5 minutes of breath work to your routine</li>
        <li>Practice single-pointed focus during practice</li>
      </ul>
      
      <blockquote>"Yoga is the stilling of the fluctuations of the mind." — Patanjali, Yoga Sutras</blockquote>
    `,
        readTime: '10 min read',
        icon: Flower2,
        gradient: 'from-teal-500 to-emerald-500',
        author: 'Sadhana Team',
        date: 'January 8, 2026',
    },
    {
        id: 'consistency-over-intensity',
        category: 'Discipline',
        title: 'Consistency Over Intensity: The Long Game',
        excerpt: '15 minutes every day beats 2 hours once a week. Discover why consistency is the secret weapon of transformation.',
        content: `
      <p>We glorify intensity. The all-nighter, the extreme workout, the complete overhaul. But lasting transformation comes from something far less glamorous: showing up consistently.</p>
      
      <h3>The Math of Consistency</h3>
      <p>15 minutes daily = 91 hours per year<br/>
      2 hours weekly = 104 hours per year</p>
      <p>The numbers seem similar, but there's a crucial difference: daily practice builds neural pathways that weekly practice cannot.</p>
      
      <h3>Why Daily Wins</h3>
      <ul>
        <li><strong>Compound effects:</strong> Small gains accumulate exponentially</li>
        <li><strong>Identity formation:</strong> Daily action shapes who you become</li>
        <li><strong>Reduced friction:</strong> It becomes automatic, not a decision</li>
        <li><strong>No "make-up" sessions:</strong> Miss one day, move on. Miss a week, spiral.</li>
      </ul>
      
      <h3>The Minimum Effective Dose</h3>
      <p>What's the smallest amount you can do that still counts? Find that number. On your worst days, do just that. On your best days, do more. But never zero.</p>
      
      <blockquote>"A river cuts through rock not because of its power, but because of its persistence." — Jim Watkins</blockquote>
    `,
        readTime: '4 min read',
        icon: Clock,
        gradient: 'from-blue-500 to-cyan-500',
        author: 'Sadhana Team',
        date: 'January 5, 2026',
    },
    {
        id: 'what-is-sadhana',
        category: 'Yoga Philosophy',
        title: 'What is Sadhana? Understanding Daily Spiritual Practice',
        excerpt: 'Sadhana means "a means of accomplishing something." Learn the deep meaning behind daily practice and its transformative power.',
        content: `
      <p>In Sanskrit, "Sadhana" (साधना) comes from the root "sadh," meaning to accomplish, to attain, or to master. It refers to any spiritual practice performed regularly to achieve a goal, traditionally spiritual liberation.</p>
      
      <h3>The Essence of Sadhana</h3>
      <p>Sadhana is not about occasional inspiration or weekend retreats. It's about daily, committed practice. The same time, the same place, the same intention—regardless of how you feel.</p>
      
      <h3>Components of a Sadhana</h3>
      <ul>
        <li><strong>Regularity:</strong> Same time each day (traditionally Brahma Muhurta, before sunrise)</li>
        <li><strong>Consistency:</strong> Non-negotiable commitment</li>
        <li><strong>Progression:</strong> Deepening the practice over time</li>
        <li><strong>Surrender:</strong> Letting go of attachment to results</li>
      </ul>
      
      <h3>Modern Sadhana</h3>
      <p>You don't need to be a monk to practice Sadhana. A 15-minute morning routine, done with full presence and commitment, is a Sadhana. A daily journaling practice is a Sadhana. Any practice done with discipline and devotion qualifies.</p>
      
      <h3>The Transformation</h3>
      <p>Sadhana doesn't just change what you do—it changes who you are. Through daily practice, you become the practitioner. The discipline becomes your identity, not just your activity.</p>
      
      <blockquote>"Sadhana is the effort to be one with the eternal dance of existence." — Traditional</blockquote>
    `,
        readTime: '8 min read',
        icon: BookOpen,
        gradient: 'from-rose-500 to-red-500',
        author: 'Sadhana Team',
        date: 'January 1, 2026',
    },
    {
        id: 'pranayama-breath-mastery',
        category: 'Yoga Philosophy',
        title: 'Pranayama: The Ancient Science of Breath Control',
        excerpt: 'The Vedas teach that breath is the bridge between body and mind. Master your breath, master your life through these time-tested techniques.',
        content: `
      <p>In the Vedic tradition, prana is not merely breath—it is the vital life force that animates all living beings. Pranayama, the fourth limb of yoga, is the science of controlling this life force through regulated breathing practices.</p>
      
      <h3>The Vedic Understanding of Prana</h3>
      <p>The Upanishads describe five types of prana (pancha prana) governing different functions: Prana (inhalation), Apana (elimination), Samana (digestion), Udana (speech/growth), and Vyana (circulation). When these are balanced, health and clarity naturally arise.</p>
      
      <h3>Three Essential Pranayama Techniques</h3>
      <p><strong>Nadi Shodhana (Alternate Nostril Breathing):</strong> This practice balances the left and right energy channels (ida and pingala), calming the mind and preparing it for meditation. Practice for 5-10 minutes daily.</p>
      <p><strong>Kapalabhati (Skull-Shining Breath):</strong> A cleansing breath that energizes the body and clears mental fog. Start with 30 rapid exhalations, then rest and observe.</p>
      <p><strong>Bhramari (Humming Bee Breath):</strong> The vibration of humming calms the nervous system and is especially effective before sleep or meditation.</p>
      
      <h3>The Science Behind Ancient Wisdom</h3>
      <p>Modern research confirms what the Vedas taught millennia ago: controlled breathing activates the parasympathetic nervous system, reduces cortisol, and increases heart rate variability—a marker of resilience and longevity.</p>
      
      <blockquote>"When the breath wanders the mind also is unsteady. But when the breath is calmed the mind too will be still." — Hatha Yoga Pradipika</blockquote>
    `,
        readTime: '10 min read',
        icon: Sparkles,
        gradient: 'from-cyan-500 to-blue-500',
        author: 'Sadhana Team',
        date: 'December 28, 2025',
    },
    {
        id: 'gita-action-philosophy',
        category: 'Discipline',
        title: 'The Gita\'s Philosophy of Action: Nishkama Karma',
        excerpt: 'The Bhagavad Gita teaches us to act without attachment to results. Discover how this ancient wisdom transforms both practice and daily life.',
        content: `
      <p>The Bhagavad Gita, spoken on the battlefield of Kurukshetra, contains perhaps the most practical philosophy of action ever articulated. At its heart is the concept of Nishkama Karma—action without attachment to fruits.</p>
      
      <h3>Understanding Nishkama Karma</h3>
      <p>Lord Krishna teaches Arjuna: "You have the right to work, but never to the fruit of work." This doesn't mean we shouldn't have goals—it means we shouldn't be enslaved by them. We act because it is right to act, not because of what we might receive.</p>
      
      <h3>Why Attachment Destroys Practice</h3>
      <p>When we practice only for results—weight loss, flexibility, peace of mind—we set ourselves up for disappointment. Results are never fully in our control. The weather of life interferes. But the act of showing up? That's always within our power.</p>
      
      <h3>Applying the Gita to Your Sadhana</h3>
      <ul>
        <li><strong>Focus on the process:</strong> Each breath, each moment of presence is complete in itself.</li>
        <li><strong>Release comparison:</strong> Your practice is yours alone. Another's progress is irrelevant.</li>
        <li><strong>Find joy in discipline:</strong> The act of showing up becomes its own reward.</li>
        <li><strong>Accept all outcomes:</strong> A "bad" practice day is still a practice day.</li>
      </ul>
      
      <h3>The Paradox of Detachment</h3>
      <p>Ironically, when we release attachment to outcomes, we often achieve more. Freed from anxiety about results, our practice deepens. Our actions become more skillful. The Gita's wisdom is paradoxical but profoundly practical.</p>
      
      <blockquote>"Perform your obligatory duty, because action is indeed better than inaction." — Bhagavad Gita 3.8</blockquote>
    `,
        readTime: '12 min read',
        icon: Target,
        gradient: 'from-orange-500 to-amber-500',
        author: 'Sadhana Team',
        date: 'December 22, 2025',
    },
    {
        id: 'tapas-transformative-heat',
        category: 'Yoga Philosophy',
        title: 'Tapas: The Transformative Fire of Discipline',
        excerpt: 'In yoga philosophy, Tapas is the internal heat generated through disciplined practice. Learn how voluntary discomfort leads to profound transformation.',
        content: `
      <p>Tapas, from the Sanskrit root "tap" meaning "to burn," is one of the Niyamas (personal observances) in Patanjali's Yoga Sutras. It refers to the disciplined use of energy—the willingness to undergo voluntary hardship for growth.</p>
      
      <h3>The Alchemy of Discomfort</h3>
      <p>Just as gold is purified by fire, the practitioner is purified by Tapas. This doesn't mean extreme asceticism—it means choosing the harder right over the easier wrong, consistently.</p>
      
      <h3>Modern Applications of Tapas</h3>
      <ul>
        <li><strong>Waking early:</strong> Rising before dawn when the body craves sleep</li>
        <li><strong>Holding difficult poses:</strong> Staying present when discomfort arises</li>
        <li><strong>Fasting:</strong> Occasional restraint from food to clarify the mind</li>
        <li><strong>Cold exposure:</strong> Brief cold showers to build mental resilience</li>
        <li><strong>Silence:</strong> Periods of verbal restraint to conserve energy</li>
      </ul>
      
      <h3>Tapas vs. Self-Punishment</h3>
      <p>True Tapas is not self-torture. It is chosen, conscious, and purposeful. The intent is transformation, not punishment. If a practice creates only suffering without growth, it is not Tapas—it is violence against the self.</p>
      
      <h3>Building Your Tapas Practice</h3>
      <p>Start small. Choose one area where you will exercise deliberate restraint or discipline. Practice it daily for 40 days—the traditional period for establishing a Samskara (mental impression). Observe how the initial difficulty transforms into ease, then into strength.</p>
      
      <blockquote>"Through Tapas, impurities are destroyed and there comes perfection of the body and the senses." — Yoga Sutras 2.43</blockquote>
    `,
        readTime: '9 min read',
        icon: Flame,
        gradient: 'from-red-600 to-orange-500',
        author: 'Sadhana Team',
        date: 'December 15, 2025',
    },
    {
        id: 'karma-yoga-daily-life',
        category: 'Discipline',
        title: 'Karma Yoga: Finding Practice in Every Action',
        excerpt: 'Every action can become yoga when performed with awareness and dedication. Transform mundane tasks into spiritual practice.',
        content: `
      <p>Karma Yoga, the yoga of action, teaches that liberation is possible not by renouncing the world, but by transforming our relationship to action. Every task, no matter how mundane, can become a spiritual practice.</p>
      
      <h3>The Three Principles of Karma Yoga</h3>
      <p><strong>Skill in Action:</strong> Whatever you do, do it excellently. Half-hearted effort creates neither worldly success nor spiritual progress.</p>
      <p><strong>Detachment from Results:</strong> Act fully, then release. The outcome is not yours to control.</p>
      <p><strong>Dedication to Something Higher:</strong> Offer your actions to the Divine, to humanity, or to your highest ideal. This transforms ego-driven action into service.</p>
      
      <h3>Finding Yoga in the Everyday</h3>
      <ul>
        <li><strong>Cooking:</strong> Prepare food with full attention, as an offering</li>
        <li><strong>Cleaning:</strong> See each stroke as purifying your external and internal environment</li>
        <li><strong>Work:</strong> Perform duties excellently, without obsession over recognition</li>
        <li><strong>Relationships:</strong> Serve others without keeping score</li>
      </ul>
      
      <h3>The Integration of Practice and Life</h3>
      <p>Many practitioners make the mistake of separating "practice time" from "regular life." But the mat is just training ground. The real test is how we show up when the timer stops—in traffic, in conflict, in boredom.</p>
      
      <blockquote>"Yoga is skill in action." — Bhagavad Gita 2.50</blockquote>
    `,
        readTime: '8 min read',
        icon: Brain,
        gradient: 'from-violet-500 to-purple-500',
        author: 'Sadhana Team',
        date: 'December 10, 2025',
    },
    {
        id: 'meditation-neuroscience',
        category: 'Habit Formation',
        title: 'The Neuroscience of Meditation: What the Vedas Knew',
        excerpt: 'Modern science is finally catching up to ancient wisdom. Discover how meditation physically rewires your brain for clarity and calm.',
        content: `
      <p>For thousands of years, the Vedic tradition has taught that meditation transforms consciousness. Now, neuroscience provides the evidence: meditation literally rewires the brain.</p>
      
      <h3>Structural Brain Changes</h3>
      <p><strong>Increased Gray Matter:</strong> Studies show meditation increases gray matter density in areas responsible for learning, memory, and emotional regulation.</p>
      <p><strong>Reduced Amygdala Activity:</strong> The brain's fear center becomes less reactive, leading to decreased anxiety and stress responses.</p>
      <p><strong>Thicker Prefrontal Cortex:</strong> Enhanced activity in areas governing decision-making and attention.</p>
      
      <h3>The Default Mode Network</h3>
      <p>Scientists have identified the Default Mode Network (DMN)—brain regions active during mind-wandering and self-referential thinking. Meditation reduces DMN activity, quieting the "monkey mind" the Vedas described millennia ago.</p>
      
      <h3>How Long Until Results?</h3>
      <p>Research suggests changes begin within 8 weeks of consistent practice—approximately the same 40-day period recommended by traditional teachers. Even 10 minutes daily produces measurable effects.</p>
      
      <h3>Vedic Categories, Scientific Validation</h3>
      <p>The ancient texts categorized mental states (vrittis) and prescribed specific practices for each. Modern research validates these categories: focused attention meditation, open monitoring meditation, and loving-kindness meditation each produce distinct but complementary effects.</p>
      
      <blockquote>"The mind is everything. What you think, you become." — Buddha (influenced by Vedic tradition)</blockquote>
    `,
        readTime: '11 min read',
        icon: Brain,
        gradient: 'from-emerald-500 to-teal-500',
        author: 'Sadhana Team',
        date: 'December 5, 2025',
    },
    {
        id: 'breaking-bad-habits',
        category: 'Habit Formation',
        title: 'Breaking Bad Habits: The Samskara Approach',
        excerpt: 'The Vedic concept of Samskaras explains why habits are so persistent—and how to finally break free from patterns that no longer serve you.',
        content: `
      <p>In Vedic psychology, Samskaras are mental impressions left by past actions. Like grooves worn into a path, they make certain behaviors automatic. Understanding Samskaras is key to breaking unwanted habits.</p>
      
      <h3>Why Bad Habits Persist</h3>
      <p>Each time we repeat an action, the Samskara deepens. The behavior becomes more automatic, more compelling. This is why willpower alone rarely succeeds—we're fighting against deeply worn neural pathways.</p>
      
      <h3>The Vedic Strategy for Change</h3>
      <p><strong>Awareness (Viveka):</strong> First, observe the habit without judgment. Notice the trigger, the craving, the action, the temporary relief, the eventual dissatisfaction.</p>
      <p><strong>New Samskaras:</strong> Replace the old pattern with a new one. Don't just stop—redirect. When the trigger arises, perform a new, positive action.</p>
      <p><strong>Repetition:</strong> Repeat the new pattern until it becomes as automatic as the old one was.</p>
      
      <h3>The 40-Day Protocol</h3>
      <p>Traditional teachings suggest 40 consecutive days of practice to establish a new Samskara. Miss a day? Start over. This may seem strict, but it ensures the new pattern is deeply grooved before testing it in difficult conditions.</p>
      
      <h3>Practical Steps</h3>
      <ol>
        <li>Choose ONE habit to change</li>
        <li>Identify the trigger precisely</li>
        <li>Design a replacement behavior</li>
        <li>Practice for 40 days without exception</li>
        <li>After 40 days, the new habit will feel natural</li>
      </ol>
      
      <p>The journey is not linear, but the destination is freedom.</p>
      
      <blockquote>"Watch your thoughts, they become your words; watch your words, they become your actions; watch your actions, they become your habits; watch your habits, they become your character." — Upanishadic Wisdom</blockquote>
    `,
        readTime: '10 min read',
        icon: Clock,
        gradient: 'from-pink-500 to-rose-500',
        author: 'Sadhana Team',
        date: 'November 28, 2025',
    },
    {
        id: 'deep-work-ritual',
        category: 'Discipline',
        title: 'Deep Work: Rituals for Focus in a Distracted World',
        excerpt: 'In an age of constant notification, the ability to focus is a superpower. Learn how to build rituals that protect your deep work.',
        content: `
      <p>We live in an attention economy. Apps, emails, and notifications compete for every second of your focus. "Deep Work," a term coined by Cal Newport, is the ability to focus without distraction on a cognitively demanding task.</p>
      
      <h3>The Cost of Distraction</h3>
      <p>Every time you switch tasks—glancing at a notification while writing, for instance—you experience "attention residue." Your focus doesn't instantly snap back; it drags behind, reducing your cognitive capacity by up to 20%.</p>
      
      <h3>Rituals for Deep Work</h3>
      <p>Willpower isn't enough to fight distraction. You need rituals:</p>
      <ul>
        <li><strong>Location:</strong> Designate a specific spot for deep work. When you sit there, you work. No phone, no browsing.</li>
        <li><strong>Time-Blocking:</strong> Schedule your deep work blocks. Treat them as sacred appointments.</li>
        <li><strong>Shutdown Ritual:</strong> End your work day with a clear signal. Close tabs, review tomorrow's plan, say "done." This allows your brain to disconnect and recharge.</li>
      </ul>
      
      <h3>Embracing Boredom</h3>
      <p>To deepen focus, you must retrain your brain to be comfortable with boredom. Don't reach for your phone the moment you're in line or waiting. Let your mind wander. This rest strengthens your attention muscle.</p>
      
      <blockquote>"The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy." — Cal Newport</blockquote>
    `,
        readTime: '8 min read',
        icon: Brain,
        gradient: 'from-indigo-500 to-blue-600',
        author: 'Sadhana Team',
        date: 'November 20, 2025',
    },
    {
        id: 'sleep-foundation',
        category: 'Habit Formation',
        title: 'Sleep: The Non-Negotiable Foundation of Discipline',
        excerpt: 'You can\'t out-discipline a tired brain. Discover why sleep hygiene is the single most important factor for sustaining your practice.',
        content: `
      <p>We often treat sleep as a luxury—the first thing to sacrifice when life gets busy. But scientifically, sleep is the foundation of discipline. When you are sleep-deprived, your prefrontal cortex (the part of the brain responsible for willpower) is impaired.</p>
      
      <h3>Willpower and Rest</h3>
      <p>Willpower is a finite resource. It relies on glucose and efficient brain function. Sleep deprivation acts like a "metabolic drunk," reducing your ability to resist impulses. Skipping sleep to "hustle" is biologically counterproductive.</p>
      
      <h3>Vedic Wisdom on Sleep</h3>
      <p>Ayurveda emphasizes rising with the sun and sleeping shortly after sunset. It teaches that the hours before midnight provide the deepest, most restorative rest for the nervous system.</p>
      
      <h3>Optimizing Your Sleep Ritual</h3>
      <ul>
        <li><strong>Coolness:</strong> Keep your room cool (approx. 65°F/18°C).</li>
        <li><strong>Darkness:</strong> Even small LEDs can disrupt melatonin. Use blackout curtains or a mask.</li>
        <li><strong>Wind Down:</strong> No screens 1 hour before bed. Read fiction, stretch, or meditate.</li>
        <li><strong>Consistency:</strong> Wake up at the same time every day, even weekends. This anchors your circadian rhythm.</li>
      </ul>
      
      <p>Prioritizing sleep isn't laziness; it's the ultimate discipline. It's the respect you pay to the machine that allows you to do your work.</p>
      
      <blockquote>"Sleep is the best meditation." — Dalai Lama</blockquote>
    `,
        readTime: '7 min read',
        icon: Clock,
        gradient: 'from-slate-700 to-slate-900',
        author: 'Sadhana Team',
        date: 'November 15, 2025',
    },
];

const categories = [
    { name: 'All', count: blogPosts.length },
    { name: 'Discipline', count: blogPosts.filter(p => p.category === 'Discipline').length },
    { name: 'Habit Formation', count: blogPosts.filter(p => p.category === 'Habit Formation').length },
    { name: 'Yoga Philosophy', count: blogPosts.filter(p => p.category === 'Yoga Philosophy').length },
];

const Learn = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArticle, setSelectedArticle] = useState<typeof blogPosts[0] | null>(null);

    // Initialise Google Translate
    useEffect(() => {
        const initTranslate = () => {
            const targetElement = document.getElementById('google_translate_element');
            if (!targetElement) return;

            if (window.google && window.google.translate) {
                // Clear any existing instances to avoid duplicates if possible, though mostly internal
                // Initialize the widget
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                        autoDisplay: false,
                    },
                    'google_translate_element'
                );
            }
        };

        // Assign to window for the callback
        window.googleTranslateElementInit = initTranslate;

        // Load the script if not present
        const id = 'google-translate-script';
        if (!document.getElementById(id)) {
            const script = document.createElement('script');
            script.id = id;
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        } else {
            // If script is already loaded, manually initialize
            initTranslate();
        }
    }, [selectedArticle]);


    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Article detail view
    if (selectedArticle) {
        return (
            <div className="min-h-screen bg-background">
                <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="container mx-auto px-4 lg:px-6">
                        <div className="flex items-center justify-between h-16">
                            <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground hover:text-foreground/90 transition-colors">
                                <Flame className="w-5 h-5 text-primary" />
                                <span className="hidden xs:inline">Sadhana</span>
                            </Link>

                            <div className="flex items-center gap-2 sm:gap-4">
                                {/* Google Translate Container */}
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-secondary/30 border border-border sm:px-3 sm:py-1.5 sm:gap-2">
                                    <Languages className="w-3.5 h-3.5 text-muted-foreground sm:w-4 sm:h-4" />
                                    <div id="google_translate_element" className="min-w-[0px]" />
                                </div>

                                <Button variant="ghost" size="sm" className="gap-2 px-2 sm:px-4" onClick={() => setSelectedArticle(null)}>
                                    <ArrowLeft className="w-4 h-4" />
                                    <span className="hidden sm:inline">Back</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 lg:px-6 py-12">
                    <article className="max-w-3xl mx-auto">
                        {/* Category & Date */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-medium text-primary uppercase tracking-wider">
                                {selectedArticle.category}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{selectedArticle.date}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{selectedArticle.readTime}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                            {selectedArticle.title}
                        </h1>

                        {/* Author */}
                        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-rose-500 flex items-center justify-center text-white font-medium">
                                S
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">{selectedArticle.author}</p>
                                <p className="text-xs text-muted-foreground">Sadhana Editorial Team</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div
                            className="prose prose-invert prose-lg max-w-none
                prose-headings:text-foreground prose-headings:font-semibold
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-li:text-muted-foreground prose-li:my-1
                prose-strong:text-foreground prose-strong:font-semibold
                prose-blockquote:border-l-primary prose-blockquote:bg-card prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-foreground
                prose-ul:my-4 prose-ol:my-4
              "
                            dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                        />

                        {/* Back button */}
                        <div className="mt-12 pt-8 border-t border-border">
                            <Button variant="subtle" onClick={() => setSelectedArticle(null)} className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Back to All Articles
                            </Button>
                        </div>
                    </article>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground hover:text-foreground/90 transition-colors">
                            <Flame className="w-5 h-5 text-primary" />
                            Sadhana
                        </Link>

                        <Link to="/">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Back to Home</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 lg:px-6 py-12">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary bg-primary/10 rounded-full border border-primary/20 mb-6">
                        <BookOpen className="w-3.5 h-3.5" />
                        Learn
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Knowledge for the <span className="text-gradient-crimson">Disciplined Mind</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Explore the philosophy, science, and art of building an unshakeable daily practice.
                    </p>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="max-w-2xl mx-auto mb-10"
                >
                    {/* Search */}
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedCategory === category.name
                                    ? 'border-primary bg-primary/10 text-foreground'
                                    : 'border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {category.name}
                                <span className="ml-2 text-xs opacity-60">({category.count})</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Featured Article */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-12"
                >
                    <div
                        className="relative bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 rounded-2xl overflow-hidden cursor-pointer hover:border-primary/40 transition-colors"
                        onClick={() => setSelectedArticle(blogPosts[5])} // What is Sadhana article
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="relative p-8 md:p-12">
                            <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
                                <Sparkles className="w-4 h-4" />
                                Featured Article
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                What is Sadhana? The Ancient Art of Daily Spiritual Practice
                            </h2>
                            <p className="text-muted-foreground mb-6 max-w-2xl">
                                In Sanskrit, Sadhana means "a means of accomplishing something." It's not just exercise or meditation—it's a complete system for self-transformation through daily practice. Discover how ancient wisdom applies to modern life.
                            </p>
                            <div className="flex items-center gap-4">
                                <Button variant="crimson" className="gap-2">
                                    Read Article
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                                <span className="text-sm text-muted-foreground">8 min read</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
                            className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
                            onClick={() => setSelectedArticle(post)}
                        >
                            {/* Category icon header */}
                            <div className={`h-2 bg-gradient-to-r ${post.gradient}`} />

                            <div className="p-6">
                                {/* Category */}
                                <div className="flex items-center gap-2 mb-3">
                                    <post.icon className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                                        {post.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                                    <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Read
                                        <ChevronRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* No Results */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No articles found. Try a different search or category.</p>
                    </div>
                )}

                {/* Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
                        <Flame className="w-10 h-10 text-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                            Stay Disciplined
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Get weekly insights on building unbreakable habits and deepening your practice.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1"
                            />
                            <Button variant="crimson" size="lg">
                                Subscribe
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                            No spam. Unsubscribe anytime.
                        </p>
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border mt-16 py-8">
                <div className="container mx-auto px-4 lg:px-6 text-center">
                    <Link to="/" className="inline-flex items-center gap-2 text-lg font-semibold text-foreground mb-2">
                        <Flame className="w-4 h-4 text-primary" />
                        Sadhana
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        Your daily practice. Nothing more.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Learn;
