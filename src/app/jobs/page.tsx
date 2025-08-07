import { getAllActiveJobPosts } from '@/lib/database'
import JobPostCard from '@/components/job-post-card'
import Link from 'next/link'

export default async function JobsPage() {
  const jobPosts = await getAllActiveJobPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your Next Opportunity
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover amazing job opportunities from top companies. Start your career journey today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {jobPosts.length}
            </div>
            <div className="text-blue-900 dark:text-blue-300 font-medium">Active Jobs</div>
          </div>
          
          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {new Set(jobPosts.map(job => job.company_name)).size}
            </div>
            <div className="text-green-900 dark:text-green-300 font-medium">Companies</div>
          </div>
          
          <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {new Set(jobPosts.map(job => job.job_type)).size}
            </div>
            <div className="text-purple-900 dark:text-purple-300 font-medium">Job Types</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter by:</h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                All Jobs ({jobPosts.length})
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Full-time ({jobPosts.filter(job => job.job_type === 'full-time').length})
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Part-time ({jobPosts.filter(job => job.job_type === 'part-time').length})
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Contract ({jobPosts.filter(job => job.job_type === 'contract').length})
              </button>
            </div>
          </div>
        </div>

        {/* Job Posts */}
        {jobPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2m8 0H8m8 0l-1.5 9H9.5L8 6" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No jobs available</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Check back later for new job opportunities.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobPosts.map(jobPost => (
              <JobPostCard
                key={jobPost.id}
                jobPost={jobPost}
                showActions={false}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to post a job?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Join hundreds of companies finding great talent through our platform.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </div>
  )
}
