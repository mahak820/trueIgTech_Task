// Authentication utility functions
// Designed for easy Redux integration later

import { 
  findUser, 
  findTrainerByEmail, 
  addUser,
  addTrainer,
  setAuthToken, 
  setCurrentUser, 
  getAuthToken, 
  getCurrentUser,
  logout as storageLogout 
} from './storage';

// Generate a simple token (in real app, this would come from server)
const generateToken = (userId, role) => {
  return btoa(JSON.stringify({ userId, role, exp: Date.now() + 24 * 60 * 60 * 1000 }));
};

// Login function
export const login = (email, password) => {
  // Check trainers first
  const trainer = findTrainerByEmail(email);
  if (trainer && trainer.password === password) {
    const token = generateToken(trainer.id, 'trainer');
    setAuthToken(token);
    setCurrentUser({ ...trainer, role: 'trainer' });
    return { success: true, user: { ...trainer, role: 'trainer' } };
  }
  
  // Check regular users
  const user = findUser(email);
  if (user && user.password === password) {
    const token = generateToken(user.id, 'user');
    setAuthToken(token);
    setCurrentUser({ ...user, role: 'user' });
    return { success: true, user: { ...user, role: 'user' } };
  }
  
  return { success: false, error: 'Invalid email or password' };
};

// Register function for both users and trainers
export const register = (name, email, password, role = 'user') => {
  // Check if email already exists
  if (findUser(email) || findTrainerByEmail(email)) {
    return { success: false, error: 'Email already registered' };
  }
  
  if (role === 'trainer') {
    const newTrainer = {
      id: 't' + Date.now(),
      name,
      email,
      password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00d9a5&color=0a0f1c`,
      specialty: 'Fitness Training',
      bio: 'New trainer on FitPlanHub',
      followers: 0,
    };
    
    addTrainer(newTrainer);
    
    const token = generateToken(newTrainer.id, 'trainer');
    setAuthToken(token);
    setCurrentUser({ ...newTrainer, role: 'trainer' });
    
    return { success: true, user: { ...newTrainer, role: 'trainer' } };
  }
  
  const newUser = {
    id: 'u' + Date.now(),
    name,
    email,
    password,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00d9a5&color=0a0f1c`,
  };
  
  addUser(newUser);
  
  const token = generateToken(newUser.id, 'user');
  setAuthToken(token);
  setCurrentUser({ ...newUser, role: 'user' });
  
  return { success: true, user: { ...newUser, role: 'user' } };
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;
  
  try {
    const decoded = JSON.parse(atob(token));
    return decoded.exp > Date.now();
  } catch {
    return false;
  }
};

// Get current user with role
export const getAuthUser = () => {
  if (!isAuthenticated()) return null;
  return getCurrentUser();
};

// Logout
export const logout = () => {
  storageLogout();
};

// Check if user is a trainer
export const isTrainer = () => {
  const user = getAuthUser();
  return user?.role === 'trainer';
};

// Check if user is a regular user
export const isUser = () => {
  const user = getAuthUser();
  return user?.role === 'user';
};
