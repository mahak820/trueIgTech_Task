import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Dumbbell, UserPlus } from 'lucide-react';
import Navbar from '../components/Navbar';
import PlanCard from '../components/PlanCard';
import TrainerCard from '../components/TrainerCard';
import { 
  getPlans, 
  getTrainers, 
  getUserFollows, 
  getUserSubscriptions,
  initializeStorage 
} from '../utils/storage';
import { getAuthUser } from '../utils/auth';

const UserFeed = () => {
  const user = getAuthUser();
  const [followedPlans, setFollowedPlans] = useState([]);
  const [purchasedPlans, setPurchasedPlans] = useState([]);
  const [suggestedTrainers, setSuggestedTrainers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    initializeStorage();
    loadData();
  }, [refreshKey]);

  const loadData = () => {
    if (!user) return;

    const allPlans = getPlans();
    const allTrainers = getTrainers();
    const follows = getUserFollows(user.id);
    const subscriptions = getUserSubscriptions(user.id);

    // Plans from followed trainers
    const followedTrainerIds = follows.map(f => f.trainerId);
    const plansFromFollowed = allPlans.filter(p => followedTrainerIds.includes(p.trainerId));
    setFollowedPlans(plansFromFollowed);

    // Purchased plans
    const subscribedPlanIds = subscriptions.map(s => s.planId);
    const purchased = allPlans.filter(p => subscribedPlanIds.includes(p.id));
    setPurchasedPlans(purchased);

    // Trainers not yet followed
    const notFollowed = allTrainers.filter(t => !followedTrainerIds.includes(t.id));
    setSuggestedTrainers(notFollowed);
  };

  const handleFollowChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-4xl text-foreground mb-2">
              YOUR <span className="gradient-text">FEED</span>
            </h1>
            <p className="text-muted-foreground">
              Plans from trainers you follow and your purchases
            </p>
          </div>

          {/* Purchased Plans */}
          {purchasedPlans.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Dumbbell className="w-5 h-5 text-accent" />
                <h2 className="font-display text-2xl text-foreground">MY PROGRAMS</h2>
                <span className="badge-accent">{purchasedPlans.length}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedPlans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} isPurchased={true} />
                ))}
              </div>
            </section>
          )}

          {/* Plans from Followed Trainers */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl text-foreground">FROM TRAINERS YOU FOLLOW</h2>
            </div>

            {followedPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {followedPlans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-2xl text-foreground mb-2">No Trainers Followed Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Follow trainers to see their latest plans in your feed
                </p>
                <Link to="/" className="btn-primary">
                  Explore Trainers
                </Link>
              </div>
            )}
          </section>

          {/* Suggested Trainers */}
          {suggestedTrainers.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-6">
                <UserPlus className="w-5 h-5 text-primary" />
                <h2 className="font-display text-2xl text-foreground">SUGGESTED TRAINERS</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestedTrainers.map((trainer) => (
                  <TrainerCard 
                    key={trainer.id} 
                    trainer={trainer} 
                    onFollowChange={handleFollowChange}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserFeed;
