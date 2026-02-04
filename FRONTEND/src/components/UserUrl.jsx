import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds to update click counts
    staleTime: 0, // Consider data stale immediately so it refetches when invalidated
  })
  const [copiedId, setCopiedId] = useState(null)
  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        Error loading your URLs: {error.message}
      </div>
    )
  }

  // support both shapes: API may return an array or an object { message, urls }
  const list = Array.isArray(urls) ? urls : (urls && urls.urls) ? urls.urls : []

  if (list.length === 0) {
    return (
      <div className="text-center  text-gray-500 my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        <p className="text-lg font-medium">No URLs found</p>
        <p className="mt-1">You haven't created any shortened URLs yet.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg mt-5 w-full">
      <div className="p-2 sm:p-4 rounded-lg bg-white/5 border border-white/10 shadow-sm text-white">

        {/* Mobile: cards */}
        <div className="space-y-3 sm:hidden">
          {list.slice().reverse().map((url) => (
            <div key={url._id} className="bg-black/30 p-3 rounded-lg border border-white/5">
              <div className="text-sm truncate text-white mb-2">{url.full_url}</div>
              <a href={`${import.meta.env.API_URL}/${url.short_url}`} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-100 underline mb-2 block truncate">{`import.meta.env.VITE_API_URL/${url.short_url}`}</a>
              <div className="flex items-center justify-between gap-3">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100/10 text-blue-200">{url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}</span>
                <button
                  onClick={() => handleCopy(`${import.meta.env.API_URL}/${url.short_url}`, url._id)}
                  className={`w-36 sm:w-auto px-3 py-2 rounded-md text-sm font-medium transition-colors ${copiedId === url._id ? 'bg-green-600 text-white' : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500'}`}
                >
                  {copiedId === url._id ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop/tablet: table with horizontal scroll if needed */}
        <div className="hidden sm:block overflow-x-auto max-h-[60vh]">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-white/80 uppercase">Original URL</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white/80 uppercase">Short URL</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white/80 uppercase">Clicks</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white/80 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.slice().reverse().map((url) => (
                <tr key={url._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-sm truncate max-w-xs">{url.full_url}</div>
                  </td>
                  <td className="px-4 py-3">
                    <a href={`${import.meta.env.API_URL}/${url.short_url}`} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-100 underline">
                      {`import.meta.env.VITE_API_URL/${url.short_url}`}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100/10 text-blue-200">{url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}</span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    <button
                      onClick={() => handleCopy(`${import.meta.env.API_URL}/${url.short_url}`, url._id)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 ${copiedId === url._id ? 'bg-green-600 text-white' : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500'}`}
                    >
                      {copiedId === url._id ? 'Copied!' : 'Copy URL'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserUrl