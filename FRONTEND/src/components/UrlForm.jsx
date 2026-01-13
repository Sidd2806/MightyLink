import React, { useState } from 'react'
import axios from 'axios'
import { QueryClient } from "@tanstack/react-query"
import { createShortUrl } from '../api/shortUrl.api'
const UrlForm = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async () => {
    try {
      const shortUrl = await createShortUrl(url)
      console.log(shortUrl);
      setShortUrl(shortUrl) 
      setCopied(false)
    } catch (error) {
      console.error('Error creating short URL:', error)
    }
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-md shadow-md space-y-4">
      <h2 className="text-lg font-bold">URL Shortener</h2>

      <input
        type="url"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Enter your URL"
        className="w-full px-3 py-2 border rounded-md"
      />

      <button
        onClick={handleSubmit}
        disabled={!url}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        Shorten URL
      </button>

      {shortUrl && (
        <div className="flex justify-between space-x-2">
          <input
            type="text"
            readOnly
            value={shortUrl}
            className="flex  px-3 py-2 border rounded-md bg-gray-100 w-62.5"
          />
          <button
            onClick={handleCopy}
            className={`px-4 rounded-md transition-colors
              ${copied ? 'bg-green-600 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  )
}
export default UrlForm
