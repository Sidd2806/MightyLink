import { useNavigate, Link } from "@tanstack/react-router"
import  {logout} from "../store/slice/authSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate({ to: "/" })
  }

  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔗</div>
            <div className="text-white font-semibold text-lg">MightyLink</div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-white/90 hover:bg-white/5"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/" className="text-sm px-3 py-2 rounded-md text-white/90 hover:text-white">Home</Link>
                <Link to="/dashboard" className="text-sm px-3 py-2 rounded-md text-white/90 hover:text-white">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer text-sm px-3 py-2 rounded-md bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500">Login</Link>
            )}
          </div>
        </div>

        {/* Mobile menu panel */}
        <div className={`sm:hidden mt-2 ${open ? 'block' : 'hidden'}`}>
          <div className="bg-black/80 border border-white/10 rounded-md p-3 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/" className="w-full text-left px-3 py-2 rounded-md text-white/90 hover:bg-white/5">Home</Link>
                <Link to="/dashboard" className="w-full text-left px-3 py-2 rounded-md text-white/90 hover:bg-white/5">Dashboard</Link>
                <button
                  onClick={() => { setOpen(false); handleLogout() }}
                  className="w-full text-left px-3 py-2 rounded-md bg-linear-to-r from-blue-600 to-indigo-600 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link onClick={() => setOpen(false)} to="/auth" className="w-full text-left px-3 py-2 rounded-md bg-blue-600 text-white">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
export default NavBar
