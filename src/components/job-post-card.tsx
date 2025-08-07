import { JobPost } from '@/lib/database'

interface JobPostCardProps {
  jobPost: JobPost
  showActions?: boolean
  onEdit?: (jobPost: JobPost) => void
  onDelete?: (id: string) => void
}

export default function JobPostCard({ jobPost, showActions = false, onEdit, onDelete }: JobPostCardProps) {
  const formatJobType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {jobPost.title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{jobPost.company_name}</span>
            <span>•</span>
            <span>{jobPost.location}</span>
            <span>•</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {formatJobType(jobPost.job_type)}
            </span>
          </div>
        </div>
        
        {showActions && (
          <div className="flex gap-2 ml-4">
            {onEdit && (
              <button
                onClick={() => onEdit(jobPost)}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(jobPost.id!)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      {jobPost.salary_range && (
        <div className="mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            {jobPost.salary_range}
          </span>
        </div>
      )}

      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
          {jobPost.description}
        </p>
      </div>

      {jobPost.requirements && jobPost.requirements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Requirements:</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {jobPost.requirements.slice(0, 3).map((req, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{req}</span>
              </li>
            ))}
            {jobPost.requirements.length > 3 && (
              <li className="text-xs text-gray-500 dark:text-gray-400">
                +{jobPost.requirements.length - 3} more requirements
              </li>
            )}
          </ul>
        </div>
      )}

      {jobPost.benefits && jobPost.benefits.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Benefits:</h4>
          <div className="flex flex-wrap gap-2">
            {jobPost.benefits.slice(0, 3).map((benefit, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              >
                {benefit}
              </span>
            ))}
            {jobPost.benefits.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                +{jobPost.benefits.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
        <span>Posted {formatDate(jobPost.created_at!)}</span>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            jobPost.is_active 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}>
            {jobPost.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </div>
  )
}
