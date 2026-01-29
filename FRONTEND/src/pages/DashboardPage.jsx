import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
   <div className="min-h-screen  grid place-items-center p-5 bg-gray-50">
      <div className="w-full -mt-15 max-w-4xl border border-gray-200 rounded-lg p-6 shadow-lg bg-white">
        <h1 className="text-xl font-semibold mb-3">URL Shortener</h1>
        <UrlForm />
        <UserUrl />
      </div>
    </div>
  )
}

export default DashboardPage