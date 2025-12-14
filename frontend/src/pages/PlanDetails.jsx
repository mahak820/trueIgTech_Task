import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, DollarSign, User, Check, Lock, CreditCard } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getPlanById, findTrainer, isSubscribed, subscribeToPlan } from '../utils/storage';
import { getAuthUser, isAuthenticated } from '../utils/auth';

const PlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [trainer, setTrainer] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  const user = getAuthUser();
  const authenticated = isAuthenticated();
  const isUserRole = user?.role === 'user';

  useEffect(() => {
    const planData = getPlanById(id);
    if (planData) {
      setPlan(planData);
      setTrainer(findTrainer(planData.trainerId));
      if (user) {
        setSubscribed(isSubscribed(user.id, planData.id));
      }
    }
  }, [id, user]);

  const handleSubscribe = () => {
    if (!authenticated) {
      navigate('/login');
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      subscribeToPlan(user.id, plan.id);
      setSubscribed(true);
      setProcessing(false);
    }, 1500);
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <p className="text-muted-foreground">Plan not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            Back to Plans
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Image */}
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src={plan.image} 
                  alt={plan.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="badge-primary">{plan.category}</span>
                </div>

                {/* Subscribed Badge */}
                {subscribed && (
                  <div className="absolute top-4 right-4">
                    <span className="badge-accent flex items-center gap-1">
                      <Check size={12} />
                      Subscribed
                    </span>
                  </div>
                )}
              </div>

              {/* Title & Meta */}
              <div className="glass-card p-6">
                <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                  {plan.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock size={18} className="text-primary" />
                    {plan.duration}
                  </div>
                  <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                    <DollarSign size={18} />
                    {plan.price}
                  </div>
                </div>

                {/* Description */}
                {subscribed ? (
                  <div className="space-y-4">
                    <h3 className="font-display text-xl text-foreground">Full Program Details</h3>
                    <p className="text-muted-foreground leading-relaxed">{plan.description}</p>
                    
                    {/* Sample Content - would be more detailed in a real app */}
                    <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold text-foreground mb-2">What's Included:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <Check size={14} className="text-primary" />
                          Complete workout schedules
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={14} className="text-primary" />
                          Video demonstrations for all exercises
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={14} className="text-primary" />
                          Nutrition guidelines and meal plans
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={14} className="text-primary" />
                          Progress tracking templates
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={14} className="text-primary" />
                          Recovery and stretching routines
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {plan.description}
                    </p>
                    
                    <div className="p-6 rounded-lg bg-secondary/50 border border-border text-center">
                      <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <h4 className="font-semibold text-foreground mb-2">Subscribe to Unlock</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get full access to this program including workouts, videos, and nutrition guides
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trainer Card */}
              {trainer && (
                <Link to={`/trainer/${trainer.id}`} className="glass-card p-6 block group">
                  <h3 className="font-display text-lg text-muted-foreground mb-4">YOUR TRAINER</h3>
                  
                  <div className="flex items-center gap-4">
                    <img 
                      src={trainer.avatar} 
                      alt={trainer.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/30 group-hover:ring-primary transition-all"
                    />
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {trainer.name}
                      </p>
                      <p className="text-sm text-primary">{trainer.specialty}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">{trainer.bio}</p>
                </Link>
              )}

              {/* Subscribe Card */}
              {!subscribed && isUserRole && (
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg text-muted-foreground mb-4">GET ACCESS</h3>
                  
                  <div className="text-center mb-6">
                    <p className="text-4xl font-bold text-foreground">${plan.price}</p>
                    <p className="text-sm text-muted-foreground">One-time payment</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check size={14} className="text-primary" />
                      Full program access
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check size={14} className="text-primary" />
                      All workout videos
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check size={14} className="text-primary" />
                      Nutrition guides
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check size={14} className="text-primary" />
                      Lifetime access
                    </li>
                  </ul>

                  <button 
                    onClick={handleSubscribe}
                    disabled={processing}
                    className="btn-accent w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {processing ? (
                      <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    ) : (
                      <>
                        <CreditCard size={18} />
                        Subscribe Now
                      </>
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Secure payment • Instant access
                  </p>
                </div>
              )}

              {!authenticated && (
                <div className="glass-card p-6 text-center">
                  <User className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign in to subscribe to this plan
                  </p>
                  <Link to="/login" className="btn-primary w-full">
                    Sign In
                  </Link>
                </div>
              )}

              {subscribed && (
                <div className="glass-card p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-2">You're Subscribed!</h3>
                  <p className="text-sm text-muted-foreground">
                    You have full access to this program
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlanDetails;
