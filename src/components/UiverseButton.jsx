import React from 'react';
import { playTick } from '../utils/audio';

export const UiverseButton = ({
  text,
  hoverText,
  subText,
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const handleClick = () => {
    playTick();
    if (onClick) onClick();
  };

  return (
    <div className={`uiverse-btn-wrapper ${className}`}>
      <button 
        type={type} 
        onClick={handleClick} 
        disabled={disabled}
        className="uiverse-btn"
      >
        <div className="uiverse-txt-box">
          <span className="uiverse-txt">{text}</span>
          <span className="uiverse-txt">{hoverText || text}</span>
        </div>
        
        <div className="uiverse-frame">
          <div className="uiverse-point top left" />
          <div className="uiverse-point top right" />
          <div className="uiverse-point bottom left" />
          <div className="uiverse-point bottom right" />
        </div>
      </button>

      {subText && (
        <span className="uiverse-txt-secondary">{subText}</span>
      )}
    </div>
  );
};

export default UiverseButton;
