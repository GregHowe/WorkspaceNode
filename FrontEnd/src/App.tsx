import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SpacesPage from './pages/SpacesPage';
import ReservationsPage from './pages/ReservationsPage';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/spaces" />} />
        <Route path="/spaces" element={<SpacesPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
         <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
