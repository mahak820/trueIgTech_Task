import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Dumbbell } from 'lucide-react';
import Navbar from '../components/Navbar';
import PlanCard from '../components/PlanCard';
import { getPlansByTrainer, addPlan, updatePlan, deletePlan } from '../utils/storage';
import { getAuthUser } from '../utils/auth';

const TrainerDashboard = () => {
  const user = getAuthUser();
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: 'Strength',
    image: '',
  });

  const categories = ['Strength', 'Cardio', 'HIIT', 'Yoga', 'Flexibility', 'CrossFit'];

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = () => {
    if (user) {
      setPlans(getPlansByTrainer(user.id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      category: 'Strength',
      image: '',
    });
    setEditingPlan(null);
  };

  const openModal = (plan = null) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        title: plan.title,
        description: plan.description,
        price: plan.price.toString(),
        duration: plan.duration,
        category: plan.category,
        image: plan.image,
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const planData = {
      ...formData,
      price: parseFloat(formData.price),
      trainerId: user.id,
    };

    if (editingPlan) {
      updatePlan({ ...planData, id: editingPlan.id });
    } else {
      addPlan({ ...planData, id: 'p' + Date.now() });
    }

    closeModal();
    loadPlans();
  };

  const handleDelete = (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      deletePlan(planId);
      loadPlans();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-4xl text-foreground mb-2">
                TRAINER <span className="gradient-text">DASHBOARD</span>
              </h1>
              <p className="text-muted-foreground">
                Manage your fitness plans and track performance
              </p>
            </div>

            <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
              <Plus size={18} />
              Create New Plan
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{plans.length}</p>
                  <p className="text-sm text-muted-foreground">Total Plans</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-accent">$</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    ${plans.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">⭐</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{user?.specialty || 'N/A'}</p>
                  <p className="text-sm text-muted-foreground">Specialty</p>
                </div>
              </div>
            </div>
          </div>

          {/* Plans Grid */}
          {plans.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Dumbbell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-2xl text-foreground mb-2">No Plans Yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first fitness plan to start attracting subscribers
              </p>
              <button onClick={() => openModal()} className="btn-primary">
                Create Your First Plan
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div key={plan.id} className="relative group">
                  <PlanCard plan={plan} showTrainer={false} />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        openModal(plan);
                      }}
                      className="p-2 rounded-lg bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(plan.id);
                      }}
                      className="p-2 rounded-lg bg-background/90 text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-2xl text-foreground">
                {editingPlan ? 'EDIT PLAN' : 'CREATE NEW PLAN'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="12-Week Strength Builder"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your fitness plan..."
                  rows={4}
                  className="input-field resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="49.99"
                    step="0.01"
                    min="0"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="12 weeks"
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="input-field"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className="btn-outline flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <Save size={18} />
                  {editingPlan ? 'Update Plan' : 'Create Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;
