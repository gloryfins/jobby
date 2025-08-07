'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { type JobPost } from '@/lib/database'
import JobPostCard from '@/components/job-post-card'

interface JobPostsListProps {
  initialJobPosts: JobPost[]
}

export default function JobPostsList({ initialJobPosts }: JobPostsListProps) {
  const [jobPosts, setJobPosts] = useState<JobPost[]>(initialJobPosts)
  const [error, setError] = useState('')
  const supabase = createClient()

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job post?')) {
      return
    }

    try {
      const { error: deleteError } = await supabase
        .from('job_posts')
        .delete()
        .eq('id', id)
      
      if (deleteError) throw deleteError
      
      setJobPosts(prev => prev.filter(post => post.id !== id))
    } catch (err) {
      setError('Failed to delete job post')
      console.error(err)
    }
  }

  const handleEdit = (jobPost: JobPost) => {
    // For now, we'll redirect to create page. Later we can create an edit page
    window.location.href = `/dashboard/job-posts/create?edit=${jobPost.id}`
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {jobPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No job posts yet</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Get started by creating your first job post.
            </p>
            <a
              href="/dashboard/job-posts/create"
              className="inline-flex items-center px-4 py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Create Your First Job Post
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {jobPosts.map(jobPost => (
            <JobPostCard
              key={jobPost.id}
              jobPost={jobPost}
              showActions={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  )
}
