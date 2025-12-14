import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TrainerDashboard from "./pages/TrainerDashboard";
import PlanDetails from "./pages/PlanDetails";
import UserFeed from "./pages/UserFeed";
import TrainerProfile from "./pages/TrainerProfile";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/plan/:id" element={<PlanDetails />} />
      <Route path="/trainer/:id" element={<TrainerProfile />} />
      <Route 
        path="/dashboard" 
        element={
            <TrainerDashboard />
          
        } 
      />
      <Route 
        path="/feed" 
        element={
            <UserFeed />
        
        } 
      />
    </Routes>
  </BrowserRouter>
);

export default App;
