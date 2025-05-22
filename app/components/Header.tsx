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


        <div className="dropdown-content">
          <FontAwesomeIcon icon={faUser} className="fa-2x" />
          <a href="#" className='history-btn' onClick={onHistoryClick}>Check History</a>
          <a href="#" className='logout-btn' onClick={onLogout}>Logout</a>
        </div>
      </div>

    </header>
  );
};