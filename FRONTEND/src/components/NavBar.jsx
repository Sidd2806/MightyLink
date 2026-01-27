import { useNavigate, Link } from "@tanstack/react-router"

const NavBar = () => {
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 left-0 right-0 bg-sky-200
 border-b z-100
            shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
      <div className="w-full ">
        <div className="flex items-center justify-between h-16 ">
          <div className="flex items-center gap-3 mx-6">
            <div className="text-2xl">🔗</div>
            <div className="text-black font-semibold text-lg">MightyLink</div>
          </div>
          <div className="flex items-center gap-4 ">
            {/* {isLoggedIn && (
              <span className="text-sm text-gray-600 hidden sm:block">
                Welcome, <span className="font-medium text-gray-800">{user?.name}</span>
              </span>
            )}

            {!isLoggedIn ? (
              <button
                onClick={() => navigate('/auth/login')}
                className="text-sm px-4 mr-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Login
              </button>
            ) : (
              <>
                <Link to="/" className="text-sm px-3 py-2 rounded-md text-gray-700 hover:text-gray-900">
                  Home
                </Link>

                <button
                  onClick={onLogout}
                  className="text-sm px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                >
                  Logout
                </button>
              </>
            )} */}
          </div>
        </div>
      </div>
    </nav>
  )
}
export  default NavBar
