import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SpacesPage from './pages/SpacesPage';
import ReservationsPage from './pages/ReservationsPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import WorkspaceHeader from './components/WorkspaceHeader';

const App: React.FC = () => {
  return (

    <Router>
       <WorkspaceHeader />
       <Navbar />
      <div className="container">
      <Routes>
        <Route path="/" element={<Navigate to="/spaces" />} />
        <Route path="/spaces" element={<SpacesPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
         <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
