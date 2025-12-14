import { Link } from 'react-router-dom';
import { Clock, DollarSign, User, Check } from 'lucide-react';
import { findTrainer } from '../utils/storage';
import { getAuthUser } from '../utils/auth';
import { isSubscribed } from '../utils/storage';

const PlanCard = ({ plan, showTrainer = true, isPurchased = false }) => {
  const trainer = findTrainer(plan.trainerId);
  const user = getAuthUser();
  const subscribed = user ? isSubscribed(user.id, plan.id) : false;

  return (
    <Link 
      to={`/plan/${plan.id}`}
      className="glass-card card-hover overflow-hidden group block"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={plan.image} 
          alt={plan.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="badge-muted">{plan.category}</span>
        </div>

        {/* Subscribed Badge */}
        {(subscribed || isPurchased) && (
          <div className="absolute top-3 right-3">
            <span className="badge-primary flex items-center gap-1">
              <Check size={12} />
              Subscribed
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
          {plan.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {plan.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock size={14} className="text-primary" />
            {plan.duration}
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            <DollarSign size={14} />
            {plan.price}
          </div>
        </div>

        {/* Trainer Info */}
        {showTrainer && trainer && (
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <img 
              src={trainer.avatar} 
              alt={trainer.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/30"
            />
            <div>
              <p className="text-sm font-medium text-foreground">{trainer.name}</p>
              <p className="text-xs text-muted-foreground">{trainer.specialty}</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PlanCard;
