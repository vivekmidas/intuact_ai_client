import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
interface HeaderProps {
  onHistoryClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHistoryClick, onLogout }) => {
  return (
    <header className="top-panel">
      <div className="header-left">
        {/* Add your logo here */}
        <img
          src="/logo.png"
          alt="Logo"
          className="app-logo"
          style={{ height: 120, margin: 16 }}
        />
      </div>
      <div className="user-profile">
        <div className="dropdown">
          <button className="dropdown-button">
            <FontAwesomeIcon icon={faUser} className="fa-2x" />
          </button>
          <div className="dropdown-content">
            <a href="#" onClick={onHistoryClick}>Check History</a>
            <a href="#" onClick={onLogout}>Logout</a>
          </div>
        </div>
      </div>
    </header>
  );
};