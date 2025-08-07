export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Sorry, we couldn&apos;t log you in. There was an error with the authentication process.
          </p>
          <a
            href="/login"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Try Again
          </a>
        </div>
      </div>
    </div>
  )
}
