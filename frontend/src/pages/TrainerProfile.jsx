import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Dumbbell, UserPlus, UserCheck, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import PlanCard from '../components/PlanCard';
import { 
  findTrainer, 
  getPlansByTrainer, 
  isFollowing, 
  followTrainer, 
  unfollowTrainer,
  getFollowedTrainers 
} from '../utils/storage';
import { getAuthUser, isAuthenticated } from '../utils/auth';

const TrainerProfile = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [plans, setPlans] = useState([]);
  const [following, setFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  
  const user = getAuthUser();
  const authenticated = isAuthenticated();
  const isUserRole = user?.role === 'user';

  useEffect(() => {
    loadData();
  }, [id, user]);

  const loadData = () => {
    const trainerData = findTrainer(id);
    if (trainerData) {
      setTrainer(trainerData);
      setPlans(getPlansByTrainer(id));
      
      // Count followers
      const allFollows = getFollowedTrainers();
      const trainerFollowers = allFollows.filter(f => f.trainerId === id);
      setFollowerCount(trainerFollowers.length);
      
      if (user) {
        setFollowing(isFollowing(user.id, id));
      }
    }
  };

  const handleFollowClick = () => {
    if (!authenticated || !isUserRole) return;
    
    if (following) {
      unfollowTrainer(user.id, id);
      setFollowing(false);
      setFollowerCount(prev => prev - 1);
    } else {
      followTrainer(user.id, id);
      setFollowing(true);
      setFollowerCount(prev => prev + 1);
    }
  };

  if (!trainer) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <p className="text-muted-foreground">Trainer not found</p>
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
            Back to Home
          </Link>

          {/* Trainer Header */}
          <div className="glass-card p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <img 
                  src={trainer.avatar} 
                  alt={trainer.name}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-primary/30"
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Dumbbell size={20} className="text-primary-foreground" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="font-display text-4xl text-foreground mb-2">{trainer.name}</h1>
                <p className="text-lg text-primary mb-3">{trainer.specialty}</p>
                <p className="text-muted-foreground max-w-2xl mb-6">{trainer.bio}</p>

                {/* Stats */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{plans.length}</p>
                    <p className="text-sm text-muted-foreground">Programs</p>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{followerCount}</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                </div>

                {/* Follow Button */}
                {authenticated && isUserRole && (
                  <button
                    onClick={handleFollowClick}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      following 
                        ? 'bg-primary/20 text-primary hover:bg-destructive/20 hover:text-destructive border border-primary/30' 
                        : 'btn-primary'
                    }`}
                  >
                    {following ? (
                      <>
                        <UserCheck size={18} />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus size={18} />
                        Follow Trainer
                      </>
                    )}
                  </button>
                )}

                {!authenticated && (
                  <Link to="/login" className="btn-primary inline-flex items-center gap-2">
                    <UserPlus size={18} />
                    Sign in to Follow
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Trainer's Plans */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Dumbbell className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl text-foreground">
                {trainer.name.split(' ')[0]}'s PROGRAMS
              </h2>
              <span className="badge-muted">{plans.length}</span>
            </div>

            {plans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} showTrainer={false} />
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <Dumbbell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-2xl text-foreground mb-2">No Programs Yet</h3>
                <p className="text-muted-foreground">
                  This trainer hasn't published any programs yet
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default TrainerProfile;
