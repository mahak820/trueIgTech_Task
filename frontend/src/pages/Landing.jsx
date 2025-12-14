import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Zap, Trophy, Users, ArrowRight, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import PlanCard from '../components/PlanCard';
import TrainerCard from '../components/TrainerCard';
import { getPlans, getTrainers, initializeStorage } from '../utils/storage';
import { isAuthenticated } from '../utils/auth';

const Landing = () => {
  const [plans, setPlans] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const authenticated = isAuthenticated();

  useEffect(() => {
    initializeStorage();
    setPlans(getPlans());
    setTrainers(getTrainers());
  }, []);

  const features = [
    {
      icon: Dumbbell,
      title: 'Expert Programs',
      description: 'Access professionally designed workout plans from certified trainers.',
    },
    {
      icon: Zap,
      title: 'Track Progress',
      description: 'Monitor your fitness journey with detailed progress tracking.',
    },
    {
      icon: Trophy,
      title: 'Achieve Goals',
      description: 'Reach your fitness milestones with structured training programs.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a community of fitness enthusiasts and stay motivated.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Premium Fitness Training Platform</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6 animate-slide-up">
              TRANSFORM YOUR
              <span className="gradient-text block">FITNESS JOURNEY</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Access world-class training programs from elite fitness professionals. 
              Subscribe, follow, and achieve your goals with personalized workout plans.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {!authenticated ? (
                <>
                  <Link to="/register" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                    Start Free Trial
                    <ArrowRight size={20} />
                  </Link>
                  <Link to="/login" className="btn-outline text-lg px-8 py-4">
                    Sign In
                  </Link>
                </>
              ) : (
                <Link to="/feed" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                  Explore Plans
                  <ArrowRight size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass-card p-6 text-center group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              FEATURED <span className="gradient-text">PROGRAMS</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular training programs designed by expert trainers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.slice(0, 6).map((plan, index) => (
              <div key={plan.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <PlanCard plan={plan} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              ELITE <span className="gradient-text">TRAINERS</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn from certified fitness professionals with years of experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((trainer, index) => (
              <div key={trainer.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <TrainerCard trainer={trainer} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl mb-4">
                READY TO <span className="gradient-text">START?</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Join thousands of fitness enthusiasts who have transformed their lives with our expert training programs.
              </p>
              {!authenticated ? (
                <Link to="/register" className="btn-accent text-lg px-8 py-4 inline-flex items-center gap-2">
                  Get Started Now
                  <ArrowRight size={20} />
                </Link>
              ) : (
                <Link to="/feed" className="btn-accent text-lg px-8 py-4 inline-flex items-center gap-2">
                  View Your Feed
                  <ArrowRight size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-primary" />
              <span className="font-display text-xl">FitPlan<span className="text-primary">Hub</span></span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 FitPlanHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
