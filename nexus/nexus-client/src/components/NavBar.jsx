import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Activity } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
        <Activity size={24} />
        NEXUS
      </Link>
      
      <div className="flex items-center gap-6 text-sm font-medium">
        {user ? (
          <>
            <span className="text-gray-500">Rep: {user.reputationScore}</span>
            <Link to="/dashboard" className="hover:text-gray-600 transition-colors">Marketplace</Link>
            <button onClick={logout} className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-600">Log In</Link>
            <Link to="/register" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Join Nexus
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;