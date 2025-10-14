import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { zIndex } from '../../styles/designTokens';

export function Header() {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="sticky top-4 px-4" style={{ zIndex: zIndex.sticky }}>
      <nav
        className="container mx-auto shadow-lg rounded-2xl px-6 py-4 border border-gray-200/50 dark:border-gray-700/30 bg-white/35 dark:bg-gray-900/35"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)'
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 hover:text-secondary transition-colors duration-300">
              PijBlog
            </h1>
          </Link>

          {/* Center Navigation Links - Always Visible */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2 md:space-x-4">
            <Link
              to="/"
              className="px-4 py-2 text-gray-700 dark:text-gray-100 hover:text-secondary transition-all duration-300 font-medium rounded-lg hover:bg-secondary/10"
            >
              Home
            </Link>
            <Link
              to={isAuthenticated ? "/create" : "/login"}
              className="px-4 py-2 text-gray-700 dark:text-gray-100 hover:text-secondary transition-all duration-300 font-medium rounded-lg hover:bg-secondary/10 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden md:inline">Write</span>
            </Link>
          </div>

          {/* Right Side - User Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-100 hover:text-secondary transition-all duration-300 font-medium rounded-lg hover:bg-secondary/10"
              >
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden lg:inline text-sm font-medium">
                  {user?.username}
                </span>
              </Link>
            ) : (
              <>

                <Link
                  to="/login"
                  className="px-4 py-2 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-lg transition-all duration-300 font-medium hover:shadow-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-accent hover:bg-accent-dark rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
