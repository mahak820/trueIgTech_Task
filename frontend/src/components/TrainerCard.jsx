import { Link } from 'react-router-dom';
import { Users, Dumbbell, UserPlus, UserCheck } from 'lucide-react';
import { getPlansByTrainer, getUserFollows, isFollowing, followTrainer, unfollowTrainer } from '../utils/storage';
import { getAuthUser, isAuthenticated } from '../utils/auth';

const TrainerCard = ({ trainer, onFollowChange }) => {
  const user = getAuthUser();
  const authenticated = isAuthenticated();
  const isUserRole = user?.role === 'user';
  const plans = getPlansByTrainer(trainer.id);
  const following = user ? isFollowing(user.id, trainer.id) : false;

  const handleFollowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!authenticated || !isUserRole) return;
    
    if (following) {
      unfollowTrainer(user.id, trainer.id);
    } else {
      followTrainer(user.id, trainer.id);
    }
    
    if (onFollowChange) onFollowChange();
  };

  return (
    <Link 
      to={`/trainer/${trainer.id}`}
      className="glass-card card-hover p-6 block group"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <img 
            src={trainer.avatar} 
            alt={trainer.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/30 group-hover:ring-primary transition-all"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <Dumbbell size={10} className="text-primary-foreground" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
            {trainer.name}
          </h3>
          <p className="text-sm text-primary mb-1">{trainer.specialty}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">{trainer.bio}</p>
        </div>
      </div>

      {/* Stats & Follow */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Dumbbell size={14} className="text-primary" />
          <span>{plans.length} Plans</span>
        </div>

        {authenticated && isUserRole && (
          <button
            onClick={handleFollowClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              following 
                ? 'bg-primary/20 text-primary hover:bg-destructive/20 hover:text-destructive' 
                : 'bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            {following ? (
              <>
                <UserCheck size={14} />
                Following
              </>
            ) : (
              <>
                <UserPlus size={14} />
                Follow
              </>
            )}
          </button>
        )}
      </div>
    </Link>
  );
};

export default TrainerCard;
