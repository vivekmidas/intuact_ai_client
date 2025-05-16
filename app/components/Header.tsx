import React from 'react';

interface HeaderProps {
  onHistoryClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHistoryClick, onLogout }) => {
  return (
    <header className="top-panel">
      <div className="user-profile">
        <div className="dropdown">
          <button className="dropdown-button">
            <img src="/profile-icon.png" alt="Profile" width={36} height={36} />
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