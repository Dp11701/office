import React from 'react';

const Tooltip = () => {
  return (
    <div className="absolute top-3 right-3 group">
      <div className="cursor-pointer">
        <img src="/assets/note-icon.svg" alt="Note" className="w-6 h-6 md:w-7 md:h-7" />
      </div>
      <div className="invisible group-hover:visible absolute top-full right-full transform translate-x-2 -translate-y-1/2 z-10 w-64 bg-white rounded-2xl shadow-lg p-5 border">
        <div className="text-xs md:text-sm font-medium text-gray-700 leading-relaxed">
          Guest account doesn't bound to Use Data, you can delete your cache
          and uninstall the app to delete your account.
        </div>
        <div className="absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-1">
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip; 