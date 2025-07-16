import React from 'react';

const Header = () => {
  return (
    <div className="flex items-center mb-6">
      <div className="flex-shrink-0">
        <img src="/assets/logo-app.svg" alt="iDrama Logo" className="w-10 h-10 md:w-12 md:h-12" />
      </div>
      <div className="ml-3">
        <div className="text-base md:text-xl font-semibold text-secondary">
        Office App - DOCX, PDF, XLSX
        </div>
        <div className="text-xs md:text-sm font-medium text-primary">
          BEGAMOB GLOBAL
        </div>
      </div>
    </div>
  );
};

export default Header; 