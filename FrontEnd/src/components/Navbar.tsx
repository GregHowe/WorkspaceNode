import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav style={{
      backgroundColor: '#222',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginBottom: '2rem'
    }}>
      <Link to="/spaces" style={{ color: '#fff', textDecoration: 'none' }}>Spaces</Link>
      <Link to="/reservations" style={{ color: '#fff', textDecoration: 'none' }}>Reservations</Link>
      <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
    </nav>
  );
};

export default Navbar;
