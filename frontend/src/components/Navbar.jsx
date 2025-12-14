import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dumbbell, Menu, X, User, LogOut, LayoutDashboard, Heart, Home } from 'lucide-react';
import { isAuthenticated, getAuthUser, logout, isTrainer } from '../utils/auth';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // const user = getAuthUser();
  const user = useSelector(state => state.auth)
  const authenticated = isAuthenticated();
  const trainer = isTrainer();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children, icon: Icon }) => (
    <Link
      to={to}
      onClick={() => setIsMenuOpen(false)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive(to) 
          ? 'bg-primary/20 text-primary' 
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
      }`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
              <Dumbbell className="w-6 h-6 text-primary" />
            </div>
            <span className="font-display text-2xl tracking-wide text-foreground">
              FitPlan<span className="text-primary">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" icon={Home}>Home</NavLink>
            
            {authenticated && !trainer && (
              <NavLink to="/feed" icon={Heart}>My Feed</NavLink>
            )}
            
            {authenticated && trainer && (
              <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {authenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
                  <img 
                    src={user?.avatar} 
                    alt={user?.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-foreground">{user?.name}</span>
                  <span className="badge-primary text-[10px] uppercase">{user?.role}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-outline text-sm py-2">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              <NavLink to="/" icon={Home}>Home</NavLink>
              
              {authenticated && !trainer && (
                <NavLink to="/feed" icon={Heart}>My Feed</NavLink>
              )}
              
              {authenticated && trainer && (
                <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
              )}

              <div className="h-px bg-border my-2" />

              {authenticated ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2">
                    <img 
                      src={user?.avatar} 
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 px-4">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-outline text-center"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary text-center"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
