# Jobby - Next.js with Tailwind CSS

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and configured with Tailwind CSS for styling.

## Features

- **Next.js 15+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **Supabase** for authentication and database
- **ESLint** for code linting
- **src/** directory structure for better organization
- User authentication with email/password and OAuth
- Protected routes with middleware
- Row Level Security (RLS) for data protection
- **Job Posting System**: Create, manage, and browse job posts
- Responsive design ready
- Dark mode support

## Setup Instructions

### 1. Install Dependencies

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall them:

```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set up Database Schema

Run the SQL commands in `database/schema.sql` in your Supabase SQL Editor to create the necessary tables and policies.

### 4. Configure Authentication (Optional)

In your Supabase dashboard:
- Go to Authentication > Providers
- Enable your preferred auth providers (Google, GitHub, etc.)
- Configure redirect URLs for OAuth providers

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── callback/          # OAuth callback handler
│   │   └── auth-code-error/   # Auth error page
│   ├── dashboard/             # Protected dashboard page
│   │   └── job-posts/         # Job post management
│   │       ├── create/        # Create job post page
│   │       └── page.tsx       # List user's job posts
│   ├── jobs/                  # Public job listings
│   ├── login/                 # Login page
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── auth-form.tsx          # Authentication form
│   ├── job-post-form.tsx      # Job post creation form
│   ├── job-post-card.tsx      # Job post display component
│   ├── job-posts-list.tsx     # Job posts list with actions
│   └── user-menu.tsx          # User menu component
└── lib/
    ├── database.ts            # Database utility functions
    └── supabase/
        ├── client.ts          # Browser Supabase client
        ├── server.ts          # Server Supabase client
        └── middleware.ts      # Auth middleware
```

## Job Posting Features

### For Employers/Recruiters
- **Create Job Posts**: Add detailed job listings with title, company, description, location, and job type
- **Manage Posts**: View, edit, and delete your job postings
- **Job Types**: Support for full-time, part-time, and contract positions
- **Rich Details**: Add salary range, requirements, and benefits
- **Analytics Dashboard**: Track active posts and recent activity

### For Job Seekers
- **Browse Jobs**: View all active job postings from multiple employers
- **Filter Options**: Filter by job type (full-time, part-time, contract)
- **Detailed View**: See comprehensive job information including requirements and benefits
- **Company Insights**: View jobs grouped by companies

## Authentication Features

- **Email/Password Authentication**: Sign up and sign in with email
- **OAuth Providers**: Google authentication (configurable)
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Session Management**: Persistent sessions across browser refreshes
- **Middleware Protection**: Route-level authentication checks

## Database Features

- **Row Level Security**: Users can only access their own data
- **Automatic Profile Creation**: Profiles created automatically on signup
- **Type-Safe Database Operations**: TypeScript integration with Supabase

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses Tailwind CSS for styling. You can customize styles by:
- Using Tailwind utility classes directly in your components
- Modifying the `src/app/globals.css` file for global styles
- Customizing the Tailwind configuration if needed

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
