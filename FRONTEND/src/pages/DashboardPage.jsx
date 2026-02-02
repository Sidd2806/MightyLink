import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
  <div className="grid place-items-center px-4">
    <div className="w-full max-w-4xl p-4 sm:p-6 mt-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl space-y-6 mx-auto">
        <UrlForm />
        <UserUrl />
      </div>
    </div>
  )
}

export default DashboardPage