# 🔥 Sadhana - Your Daily Ritual

<div align="center">

![Sadhana Banner](https://via.placeholder.com/1200x400/0a0a0a/c41e3a?text=Sadhana+%7C+Discipline+Over+Motivation)

**A ritual-based practice system for those done with motivation.**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

[Demo](https://sadhanaweb.vercel.app) · [Documentation](./docs) · [Report Bug](https://github.com/yourusername/sadhana/issues) · [Request Feature](https://github.com/yourusername/sadhana/issues)

</div>
---

## 📖 Table of Contents

- [About](#about)
- [Philosophy](#philosophy)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## 🎯 About

**Sadhana** is a modern web application designed to help you build a consistent daily practice through discipline, not motivation. Whether it's meditation, yoga, exercise, or any personal ritual, Sadhana removes choices and distractions—you simply show up, practice, and track your progress.

The name "Sadhana" (साधना) comes from Sanskrit, meaning "a means of accomplishing something" or "spiritual practice." It embodies the philosophy of consistent, intentional action over fleeting motivation.

### Why Sadhana?

- 🎯 **No Choices**: Pre-defined practice times eliminate decision fatigue
- 🔄 **Ritual-Based**: Build habits through consistent daily practice
- 📊 **Track Progress**: Visualize your journey with streaks and heatmaps
- 🌙 **Beautiful UI**: Premium dark/light themes with smooth animations
- 📱 **Mobile-First**: Optimized for practice on any device
- 🔒 **Privacy-Focused**: Your data belongs to you

---

## 💭 Philosophy

> **"Discipline over motivation. Show up. Practice. Leave. Repeat."**

Sadhana is built on the principle that **consistency beats intensity**. We don't gamify your practice or bombard you with notifications. Instead, we provide a calm, focused environment where you:

1. **Set your ritual** - Choose your daily practice time
2. **Show up** - No excuses, no bargaining
3. **Practice** - Focus on the process, not the result
4. **Track** - Celebrate consistency, not perfection
5. **Repeat** - Day after day, week after week

No streaks to chase. No points to earn. Just you and your commitment.

---

## ✨ Features

### 🔐 **Authentication & Onboarding**
- Email & Google OAuth integration
- Anonymous guest mode for exploration
- Smooth onboarding flow with personalization
- Profile management (avatar, bio, preferences)

### 📅 **Practice Tracking**
- Daily practice sessions with timer
- Automatic streak calculation
- Practice history heatmap (last 12 weeks)
- Session duration and count analytics

### 📊 **Dashboard & Stats**
- Real-time statistics (total sessions, minutes, streaks)
- Weekly and all-time progress
- Minimalist, distraction-free UI
- Practice calendar visualization

### 🎨 **Premium Design**
- **Dark Mode** - Deep charcoal aesthetic inspired by meditation spaces
- **Light Mode** - Warm "rice paper" theme for daytime practice
- Smooth theme transitions with system preference support
- Glassmorphism and subtle animations
- Mobile-responsive (100svh support for perfect mobile viewport)

### 🔔 **Smart Features**
- Practice time reminders
- Timezone-aware scheduling
- Offline-ready progressive web app (PWA)
- Fast page loads with code splitting

### 💳 **Payments & Subscriptions**
- Integrated Razorpay Payment Gateway
- Flexible Plans: Monthly, Yearly (33% off), Lifetime (50% off)
- Secure checkout with "Instant Access" model
- 30-Day Money-Back Guarantee
- Automatic invoice generation via Razorpay

### 🚀 **SEO & Performance**
- Fully optimized with `react-helmet-async`
- Dynamic meta tags (Title, Description, Canonical URLs) for every page
- `robots.txt` and `sitemap.xml` configured for indexing
- Lazy loading and code splitting for optimal performance
- 100/100 Lighthouse Performance score target

### 🔒 **Security & Privacy**
- Cloudflare Turnstile CAPTCHA for bot protection
- Row-level security (RLS) on all database tables
- Secure file uploads for avatars
- No tracking or analytics without consent
- GDPR-compliant data handling

---

## 🛠️ Tech Stack

### Frontend
- **[React 18](https://react.dev/)** - UI library with hooks
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[Lucide Icons](https://lucide.dev/)** - Clean, consistent icons

### Backend & Database
- **[Supabase](https://supabase.com/)** - PostgreSQL database + Auth + Storage
  - Authentication (Email, Google OAuth)
  - Real-time subscriptions
  - Row-level security (RLS)
  - File storage for avatars

### UI Components
- **[Shadcn/ui](https://ui.shadcn.com/)** - Accessible component library
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI primitives
- Custom components with Tailwind

### Developer Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Vite DevTools** - Fast HMR

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Supabase Account** (free tier works)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sadhana-ritual-practice.git
   cd sadhana-ritual-practice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
   ```

4. **Set up Supabase database**
   
   Follow the detailed guide in [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)
   
   Quick steps:
   - Create a Supabase project
   - Run migrations in `supabase/migrations/` (in order)
   - Enable Google OAuth (optional)

5. **Start the development server**
   ```bash
   npm run dev
   ```

### First-Time Setup Checklist

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Authentication providers enabled
- [ ] Test signup & profile creation
- [ ] Test practice session creation

---

## 📁 Project Structure

```
sadhana-ritual-practice/
├── public/                 # Static assets
│   ├── hero-bg-*.jpg      # Hero section backgrounds
│   └── icons/             # PWA icons
├── src/
│   ├── components/        # React components
│   │   ├── landing/       # Landing page sections
│   │   ├── dashboard/     # Dashboard widgets
│   │   ├── onboarding/    # Onboarding steps
│   │   ├── auth/          # Auth components
│   │   └── ui/            # Reusable UI components
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Landing page
│   │   ├── Auth.tsx       # Login/Signup
│   │   ├── Dashboard.tsx  # Main dashboard
│   │   ├── Onboarding.tsx # User onboarding
│   │   └── Profile.tsx    # User profile
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.tsx    # Authentication hook
│   │   ├── useProfile.tsx # Profile management
│   │   └── useSessions.tsx # Session tracking
│   ├── integrations/      # External services
│   │   └── supabase/      # Supabase client & types
│   ├── lib/               # Utility functions
│   ├── contexts/          # React contexts
│   │   └── ThemeContext.tsx # Dark/Light mode
│   ├── index.css          # Global styles + Tailwind
│   ├── App.tsx            # Root component
│   └── main.tsx           # Entry point
├── supabase/              # Database & migrations
│   ├── migrations/        # SQL migration files
│   └── README.md          # Database schema docs
├── scripts/               # Helper scripts
│   └── setup-supabase.js  # Interactive setup
├── SUPABASE_SETUP.md      # Supabase setup guide
├── SUPABASE_QUICK_REF.md  # Quick reference
└── README.md              # This file
```

---

## 💻 Development

### Available Scripts

```bash
# Start development server (http://localhost:8081)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

### Development Workflow

1. **Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow existing code patterns
   - Use TypeScript types
   - Add comments for complex logic
   - Test on both light and dark themes

3. **Test Locally**
   ```bash
   npm run dev
   # Test on mobile viewport
   # Test authentication flow
   # Test database operations
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push & Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

- **TypeScript**: Always use explicit types
- **Components**: Functional components with hooks
- **Naming**: camelCase for variables, PascalCase for components
- **CSS**: Use Tailwind utilities, avoid inline styles
- **Imports**: Absolute imports with `@/` alias
- **Comments**: JSDoc for functions, inline for complex logic

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Same as anon key | Yes |
| `VITE_RAZORPAY_KEY_ID` | Razorpay Key ID (Live/Test) | Yes |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile Site Key | Yes |

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add all `VITE_*` variables

4. **Set up custom domain** (optional)
   - Add domain in Vercel Dashboard
   - Update DNS records

### Deploy to Netlify

1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. **Environment variables**: Add all `VITE_*` variables

### Self-Hosting

```bash
# Build the app
npm run build

# Serve the dist/ folder with any static file server
# Example with Node.js:
npx serve dist -p 3000
```

### Post-Deployment Checklist

- [ ] Environment variables set
- [ ] Supabase auth redirect URLs updated
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Error tracking configured (Sentry, etc.)
- [ ] Analytics configured (if desired)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

- 🐛 **Report bugs** - Open an issue with reproduction steps
- 💡 **Suggest features** - Share your ideas for improvements
- 📝 **Improve docs** - Fix typos, add examples, clarify instructions
- 🎨 **Design** - Submit UI/UX improvements
- 💻 **Code** - Fix bugs, add features, improve performance

### Contribution Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Write clean, documented code
   - Follow existing patterns
   - Test thoroughly
4. **Commit with clear message**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**
   - Describe what you changed and why
   - Reference any related issues
   - Add screenshots for UI changes

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding tests
- `chore:` - Build process, dependencies, etc.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

### Documentation

- 📘 [Supabase Setup Guide](./SUPABASE_SETUP.md)
- 📊 [Database Schema Docs](./supabase/README.md)
- 🔗 [Quick Reference](./SUPABASE_QUICK_REF.md)

### Get Help

- 💬 [GitHub Discussions](https://github.com/yourusername/sadhana/discussions) - Ask questions, share ideas
- 🐛 [Issue Tracker](https://github.com/yourusername/sadhana/issues) - Report bugs
- 📧 Email: support@sadhanaweb.vercel.app
- 🐦 Twitter: [@sadhanaapp](https://twitter.com/sadhanaapp)

### Community

- [Discord Server](https://discord.gg/sadhana) - Join our community
- [Reddit](https://reddit.com/r/sadhana) - Discuss practices and tips

---

## 🙏 Acknowledgments

Built with inspiration from:
- **Stoic philosophy** - Discipline and consistency
- **Eastern spiritual practices** - Sadhana tradition
- **Minimalist design** - Less is more
- **Open source community** - Standing on the shoulders of giants

Special thanks to:
- [Supabase](https://supabase.com) for the amazing backend platform
- [Shadcn](https://ui.shadcn.com) for the beautiful component library
- [Tailwind Labs](https://tailwindcss.com) for Tailwind CSS
- All contributors and early adopters

---

## 📊 Project Status

- ✅ **Core Features**: Complete
- ✅ **Authentication**: Email & Google OAuth
- ✅ **Practice Tracking**: Full functionality
- ✅ **Dark/Light Themes**: Implemented
- ✅ **Payments (Razorpay)**: Complete (Live Mode Ready)
- ✅ **SEO & Meta Tags**: Implemented
- 🚧 **Mobile App (React Native)**: Planned
- 🚧 **Notifications**: Planned

---

<div align="center">

**Show up. Practice. Leave. Repeat.**

Made with 🔥 and discipline

</div>