import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      default:
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      default:
        return '✅';
    }
  };

  return (
    <div className={`fixed top-5 right-5 z-50 min-w-[300px] max-w-[500px] rounded-xl shadow-2xl animate-slide-in ${getTypeClasses()}`}>
      <div className="flex items-center p-4 gap-3">
        <div className="text-xl flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 text-sm md:text-base font-medium leading-relaxed">
          {message}
        </div>
        <button 
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
          onClick={onClose}
        >
          <span className="text-lg">×</span>
        </button>
      </div>
    </div>
  );
};

export default Toast; 