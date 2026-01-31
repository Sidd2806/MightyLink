import { useNavigate, Link } from "@tanstack/react-router"
import  {logout} from "../store/slice/authSlice.js"
import { useDispatch, useSelector } from "react-redux"

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate({ to: "/auth" })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔗</div>
            <div className="text-white font-semibold text-lg">MightyLink</div>
          </div>

          <div className="flex items-center gap-4">
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
      </div>
    </nav>
  )
}
export default NavBar
