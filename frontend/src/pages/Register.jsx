import { useEffect, useState } from 'react';
import { Dumbbell, Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  console.log(user)
  const navigate = useNavigate()
  // useEffect(() =>{
  //   if (user && user?.role === 'TRAINER') {
  //         navigate('/dashboard');
  //       } else {
  //         navigate('/feed');
  //       }
  // },[user])
    useEffect(() => {
    if(user && user.role ==='TRAINER'){
      navigate('/dashboard')
    }
    else{
      navigate('/feed')
    }
  } , [])
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
    setError('');
    setLoading(true);

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    // // Simulate registration
    // setTimeout(() => {
    //   console.log('Registration data:', formData);
    //   alert(`Account created successfully!\nName: ${formData.name}\nEmail: ${formData.email}\nRole: ${formData.role}`);
    //   setLoading(false);
    // }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-primary/20" />
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=1600&fit=crop"
          alt="Fitness"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="font-display text-5xl mb-4 text-foreground">
              JOIN THE
              <span className="gradient-text block">MOVEMENT</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              Create your account and start your transformation journey today
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-slide-up">
          {/* Logo */}
          <a href="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
              <Dumbbell className="w-6 h-6 text-primary" />
            </div>
            <span className="font-display text-2xl tracking-wide text-foreground">
              FitPlan<span className="text-primary">Hub</span>
            </span>
          </a>

          {/* Header */}
          <h1 className="font-display text-4xl mb-2 text-foreground">CREATE ACCOUNT</h1>
          <p className="text-muted-foreground mb-8">Start your fitness journey today</p>

          {/* Error Alert */}
          {error && (
            <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive animate-fade-in">
              <AlertCircle size={18} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <div onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">I want to join as</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'USER' })}
                  className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                    formData.role === 'USER' 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <User className="w-6 h-6" />
                  <span className="font-medium">User</span>
                  <span className="text-xs opacity-70">Browse & subscribe to plans</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'TRAINER' })}
                  className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                    formData.role === 'TRAINER' 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <Users className="w-6 h-6" />
                  <span className="font-medium">Trainer</span>
                  <span className="text-xs opacity-70">Create & sell fitness plans</span>
                </button>
              </div>
            </div>

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
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-8 text-center text-muted-foreground">
            Already have an account?{' '}
            <a href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;