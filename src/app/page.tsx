import Image from "next/image";
import { createClient } from '@/lib/supabase/server'
import UserMenu from '@/components/user-menu'
import Link from 'next/link'

export default async function Home() {
  let user = null
  let error = null

  try {
    const supabase = await createClient()
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      console.error('Auth error:', authError)
      error = authError.message
    } else {
      user = authUser
    }
  } catch (err) {
    console.error('Supabase connection error:', err)
    error = 'Failed to connect to Supabase'
  }

  // If user is authenticated, show dashboard content
  if (user && !error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-8">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Jobby</h1>
                <nav className="hidden md:flex space-x-6">
                  <Link
                    href="/jobs"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Browse Jobs
                  </Link>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/jobs"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Browse Jobs
                </Link>
                <Link
                  href="/dashboard/job-posts"
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  My Job Posts
                </Link>
                <UserMenu user={user} />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {user.email?.split('@')[0] || 'User'}!
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Manage your job postings and discover new opportunities
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    🎉 Authentication successful!
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* User Info Card */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                    Your Account
                  </h2>
                  <div className="space-y-2 text-sm">
                    <p className="text-blue-800 dark:text-blue-200">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p className="text-blue-800 dark:text-blue-200">
                      <strong>Member since:</strong> {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Job Posts Quick Actions */}
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
                    Job Posting
                  </h2>
                  <div className="space-y-3">
                    <p className="text-purple-800 dark:text-purple-200 text-sm">
                      Manage your job postings and find great talent.
                    </p>
                    <div className="flex flex-col space-y-2">
                      <Link
                        href="/dashboard/job-posts"
                        className="inline-flex items-center px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors text-sm font-medium"
                      >
                        View My Job Posts
                      </Link>
                      <Link
                        href="/dashboard/job-posts/create"
                        className="inline-flex items-center px-3 py-2 border border-purple-600 text-purple-600 dark:text-purple-400 rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors text-sm font-medium"
                      >
                        Create New Job Post
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Browse Jobs Card */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">
                    Explore Opportunities
                  </h2>
                  <div className="space-y-3">
                    <p className="text-indigo-800 dark:text-indigo-200 text-sm">
                      Discover job opportunities from other employers.
                    </p>
                    <Link
                      href="/jobs"
                      className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm font-medium"
                    >
                      Browse All Jobs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // If user is not authenticated or there's an error, show landing page
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Header with authentication */}
      <header className="row-start-1 w-full flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold">Jobby</h1>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/jobs"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Browse Jobs
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/jobs"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Browse Jobs
          </Link>
          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
            <p className="text-red-800 dark:text-red-200 text-sm">
              ⚠️ Supabase Error: {error}
            </p>
            <p className="text-red-600 dark:text-red-400 text-xs mt-2">
              Please check your environment variables in .env.local
            </p>
          </div>
        )}
        
        {user && !error && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
            <p className="text-green-800 dark:text-green-200 text-sm">
              🎉 Successfully authenticated with Supabase! Welcome, {user.email}
            </p>
          </div>
        )}
        
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
          <li className="tracking-[-.01em] mt-2">
            {user ? (
              <span className="text-green-600 dark:text-green-400">✓ Supabase authentication is working!</span>
            ) : (
              <span className="text-blue-600 dark:text-blue-400">→ Sign in to test Supabase authentication</span>
            )}
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
