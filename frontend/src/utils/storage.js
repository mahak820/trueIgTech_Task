// Storage utility functions for localStorage operations
// Designed for easy Redux integration later

const KEYS = {
  USERS: 'fitplanhub_users',
  TRAINERS: 'fitplanhub_trainers',
  PLANS: 'fitplanhub_plans',
  SUBSCRIPTIONS: 'fitplanhub_subscriptions',
  FOLLOWED_TRAINERS: 'fitplanhub_followed',
  AUTH_TOKEN: 'fitplanhub_auth_token',
  CURRENT_USER: 'fitplanhub_current_user',
};

// Initialize default data if not exists
export const initializeStorage = () => {
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.TRAINERS)) {
    localStorage.setItem(KEYS.TRAINERS, JSON.stringify([
      { id: 't1', name: 'Alex Strong', email: 'alex@trainer.com', password: 'trainer123', bio: 'Certified strength coach with 10+ years experience', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&h=150&fit=crop', specialty: 'Strength Training' },
      { id: 't2', name: 'Sarah Flex', email: 'sarah@trainer.com', password: 'trainer123', bio: 'Yoga and flexibility expert, helping you find balance', avatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=150&h=150&fit=crop', specialty: 'Yoga & Flexibility' },
      { id: 't3', name: 'Mike Power', email: 'mike@trainer.com', password: 'trainer123', bio: 'HIIT specialist focused on explosive performance', avatar: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=150&h=150&fit=crop', specialty: 'HIIT & Cardio' },
    ]));
  }
  if (!localStorage.getItem(KEYS.PLANS)) {
    localStorage.setItem(KEYS.PLANS, JSON.stringify([
      { id: 'p1', trainerId: 't1', title: '12-Week Strength Builder', description: 'Transform your body with this comprehensive strength program. Includes progressive overload techniques, compound movements, and recovery protocols.', price: 49.99, duration: '12 weeks', category: 'Strength', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop' },
      { id: 'p2', trainerId: 't1', title: 'Power Lifting Basics', description: 'Master the big three lifts: squat, bench, deadlift. Perfect for beginners wanting to build a solid foundation.', price: 29.99, duration: '8 weeks', category: 'Strength', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop' },
      { id: 'p3', trainerId: 't2', title: 'Morning Flow Yoga', description: 'Start your day energized with this gentle yet effective morning yoga routine. Suitable for all levels.', price: 19.99, duration: '4 weeks', category: 'Yoga', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop' },
      { id: 'p4', trainerId: 't2', title: 'Advanced Flexibility', description: 'Push your limits with advanced stretching and mobility work. Achieve splits, backbends, and more.', price: 39.99, duration: '10 weeks', category: 'Flexibility', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop' },
      { id: 'p5', trainerId: 't3', title: 'HIIT Shred Program', description: 'Burn fat and build endurance with high-intensity intervals. 30-minute workouts, maximum results.', price: 34.99, duration: '6 weeks', category: 'HIIT', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop' },
      { id: 'p6', trainerId: 't3', title: 'Cardio Kickboxing', description: 'Learn kickboxing fundamentals while torching calories. Fun, engaging, and effective.', price: 24.99, duration: '8 weeks', category: 'Cardio', image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=600&h=400&fit=crop' },
    ]));
  }
  if (!localStorage.getItem(KEYS.SUBSCRIPTIONS)) {
    localStorage.setItem(KEYS.SUBSCRIPTIONS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.FOLLOWED_TRAINERS)) {
    localStorage.setItem(KEYS.FOLLOWED_TRAINERS, JSON.stringify([]));
  }
};

// User operations
export const getUsers = () => JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
};
export const findUser = (email) => getUsers().find(u => u.email === email);

// Trainer operations
export const getTrainers = () => JSON.parse(localStorage.getItem(KEYS.TRAINERS) || '[]');
export const findTrainer = (id) => getTrainers().find(t => t.id === id);
export const findTrainerByEmail = (email) => getTrainers().find(t => t.email === email);
export const addTrainer = (trainer) => {
  const trainers = getTrainers();
  trainers.push(trainer);
  localStorage.setItem(KEYS.TRAINERS, JSON.stringify(trainers));
};

// Plan operations
export const getPlans = () => JSON.parse(localStorage.getItem(KEYS.PLANS) || '[]');
export const getPlanById = (id) => getPlans().find(p => p.id === id);
export const getPlansByTrainer = (trainerId) => getPlans().filter(p => p.trainerId === trainerId);
export const addPlan = (plan) => {
  const plans = getPlans();
  plans.push(plan);
  localStorage.setItem(KEYS.PLANS, JSON.stringify(plans));
};
export const updatePlan = (updatedPlan) => {
  const plans = getPlans().map(p => p.id === updatedPlan.id ? updatedPlan : p);
  localStorage.setItem(KEYS.PLANS, JSON.stringify(plans));
};
export const deletePlan = (planId) => {
  const plans = getPlans().filter(p => p.id !== planId);
  localStorage.setItem(KEYS.PLANS, JSON.stringify(plans));
};

// Subscription operations
export const getSubscriptions = () => JSON.parse(localStorage.getItem(KEYS.SUBSCRIPTIONS) || '[]');
export const getUserSubscriptions = (userId) => getSubscriptions().filter(s => s.userId === userId);
export const isSubscribed = (userId, planId) => getSubscriptions().some(s => s.userId === userId && s.planId === planId);
export const subscribeToPlan = (userId, planId) => {
  const subs = getSubscriptions();
  if (!isSubscribed(userId, planId)) {
    subs.push({ userId, planId, subscribedAt: new Date().toISOString() });
    localStorage.setItem(KEYS.SUBSCRIPTIONS, JSON.stringify(subs));
  }
};

// Follow operations
export const getFollowedTrainers = () => JSON.parse(localStorage.getItem(KEYS.FOLLOWED_TRAINERS) || '[]');
export const getUserFollows = (userId) => getFollowedTrainers().filter(f => f.userId === userId);
export const isFollowing = (userId, trainerId) => getFollowedTrainers().some(f => f.userId === userId && f.trainerId === trainerId);
export const followTrainer = (userId, trainerId) => {
  const follows = getFollowedTrainers();
  if (!isFollowing(userId, trainerId)) {
    follows.push({ userId, trainerId });
    localStorage.setItem(KEYS.FOLLOWED_TRAINERS, JSON.stringify(follows));
  }
};
export const unfollowTrainer = (userId, trainerId) => {
  const follows = getFollowedTrainers().filter(f => !(f.userId === userId && f.trainerId === trainerId));
  localStorage.setItem(KEYS.FOLLOWED_TRAINERS, JSON.stringify(follows));
};

// Auth operations
export const setAuthToken = (token) => localStorage.setItem(KEYS.AUTH_TOKEN, token);
export const getAuthToken = () => localStorage.getItem(KEYS.AUTH_TOKEN);
export const removeAuthToken = () => localStorage.removeItem(KEYS.AUTH_TOKEN);

export const setCurrentUser = (user) => localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
export const getCurrentUser = () => {
  const user = localStorage.getItem(KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};
export const removeCurrentUser = () => localStorage.removeItem(KEYS.CURRENT_USER);

export const logout = () => {
  removeAuthToken();
  removeCurrentUser();
};
