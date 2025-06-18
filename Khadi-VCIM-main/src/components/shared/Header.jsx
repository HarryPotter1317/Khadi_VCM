import React from 'react';
import '../../styles/header.css';

export default function Header() {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1 className="header-title">Khadi Virtual Conference</h1>
        <div className="logo">
          <img src="/src/assets/khadilogo.png" alt="Khadi Logo" className="logo-image" />
        </div>
        <div className="user-info">
          <span>Welcome, Admin</span>
        </div>
      </div>
    </header>
  );
}
