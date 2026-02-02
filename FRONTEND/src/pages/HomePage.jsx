import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
    <div className="min-h-screen -mt-20 grid place-items-center p-5">
      <div className="w-120 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
        <h1 className="text-xl  font-semibold mb-3 text-red">URL Shortener</h1>
        <UrlForm />
      </div>
    </div>
  )
}

export default HomePage