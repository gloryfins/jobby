import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import JobPostForm from '@/components/job-post-form'
import Link from 'next/link'

export default async function CreateJobPostPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Job Post</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Post a new job opportunity for candidates to discover
              </p>
            </div>
            <Link
              href="/dashboard/job-posts"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              ← Back to Job Posts
            </Link>
          </div>
        </div>

        {/* Form */}
        <JobPostForm />
      </div>
    </div>
  )
}
