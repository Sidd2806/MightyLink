import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
   <div className="  grid place-items-center ">
      <div className="w-full  max-w-4xl p-6 mt-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
        <UrlForm />
        <UserUrl />
      </div>
    </div>
  )
}

export default DashboardPage