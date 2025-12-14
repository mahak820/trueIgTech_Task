import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { login } from '../utils/auth';
import { initializeStorage } from '../utils/storage';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };
  const {user} = useSelector(state => state.auth)
  // console.log(user)

  // useEffect(()=>{
  //   if (user && user?.role === 'TRAINER') {
  //         navigate('/dashboard');
  //       } else {
  //         navigate('/feed');
  //       }
  // },[user])

  // useEffect(() => {
  //   if(user && user.role ==='TRAINER'){
  //     navigate('/dashboard')
  //   }
  //   else{
  //     navigate('/feed')
  //   }
  // } , [user , dispatch])

  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
    setError('');
    setLoading(true);

    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Initialize storage if needed
    initializeStorage();

    // Attempt login
    // setTimeout(() => {
    //   const result = login(formData.email, formData.password);
      
    //   if (result.success) {
    //     // Redirect based on role
    //     if (user?.role === 'trainer') {
    //       navigate('/dashboard');
    //     } else {
    //       navigate('/feed');
    //     }
    //   } else {
    //     setError(result.error);
    //   }
    //   setLoading(false);
    // }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-slide-up">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
              <Dumbbell className="w-6 h-6 text-primary" />
            </div>
            <span className="font-display text-2xl tracking-wide text-foreground">
              FitPlan<span className="text-primary">Hub</span>
            </span>
          </Link>

          {/* Header */}
          <h1 className="font-display text-4xl mb-2 text-foreground">WELCOME BACK</h1>
          <p className="text-muted-foreground mb-8">Sign in to continue your fitness journey</p>

          {/* Error Alert */}
          {error && (
            <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive animate-fade-in">
              <AlertCircle size={18} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 p-4 rounded-lg bg-secondary/50 border border-border">
            <p className="text-xs text-muted-foreground mb-3">Demo accounts:</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Trainer:</span>
                <code className="text-primary">alex@trainer.com / trainer123</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">User:</span>
                <code className="text-primary">Register a new account</code>
              </div>
            </div>
          </div>

          {/* Register Link */}
          <p className="mt-8 text-center text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=1600&fit=crop"
          alt="Fitness"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="font-display text-5xl mb-4 text-foreground">
              YOUR FITNESS
              <span className="gradient-text block">STARTS HERE</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              Access premium workout plans from elite trainers and transform your body
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
