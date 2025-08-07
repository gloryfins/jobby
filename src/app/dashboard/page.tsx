import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Example: Fetch user's profile (you'll need to create the profiles table)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <strong>User ID:</strong> {user.id}
                </p>
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}
                </p>
                {profile && (
                  <p className="text-blue-800 dark:text-blue-200">
                    <strong>Full Name:</strong> {profile.full_name || 'Not set'}
                  </p>
                )}
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
                  <a
                    href="/dashboard/job-posts"
                    className="inline-flex items-center px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors text-sm font-medium"
                  >
                    View My Job Posts
                  </a>
                  <a
                    href="/dashboard/job-posts/create"
                    className="inline-flex items-center px-3 py-2 border border-purple-600 text-purple-600 dark:text-purple-400 rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors text-sm font-medium"
                  >
                    Create New Job Post
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Browse Jobs Card */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">
                Explore Opportunities
              </h2>
              <div className="space-y-3">
                <p className="text-indigo-800 dark:text-indigo-200 text-sm">
                  Discover job opportunities from other employers.
                </p>
                <a
                  href="/jobs"
                  className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm font-medium"
                >
                  Browse All Jobs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
