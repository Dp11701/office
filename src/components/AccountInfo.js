import React from 'react';

const AccountInfo = ({ deleteChecked, setDeleteChecked, onDeleteAccount }) => {
  const handleCancel = () => {
    sessionStorage.removeItem('user-info');
    window.location.reload();
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="mb-6">
        <div className="bg-gray-bg rounded-xl p-4 md:p-5 max-h-64 overflow-y-auto">
          <ul className="space-y-3 text-xs md:text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-primary text-base mt-0.5">•</span>
              <span>You will not be able to log in to the app with the account.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary text-base mt-0.5">•</span>
              <span>Your personal and historical information (including ID, username, browsing records and third-party account binding) will all be cleared.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary text-base mt-0.5">•</span>
              <span>Your account assets like Coins/Diamonds will be cleared. Your VIP privileges will be cancelled and cannot be renewed.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary text-base mt-0.5">•</span>
              <span>
                After deletion, as automatic subscriptions will continue to be valid, you can cancel them or apply for a refund in Google Play Store (Profile/Payment&Subscription) /Apple Store.{' '}
                <a href="https://apps.apple.com/account/subscriptions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  (https://apps.apple.com/account/subscriptions)
                </a>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary text-base mt-0.5">•</span>
              <span>The deleted account cannot be restored.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary text-base mt-0.5">•</span>
              <span>You can also delete your account in the APP/Profile/Settings.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 text-xs md:text-sm">
          <input
            type="checkbox"
            id="agree-delete-policy"
            className="w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0"
            checked={deleteChecked}
            onChange={(e) => setDeleteChecked(e.target.checked)}
          />
          <label htmlFor="agree-delete-policy" className="text-gray-text leading-relaxed">
            I have read and agree to the above content.
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            className="flex-1 h-12 md:h-14 rounded-xl bg-white text-[#BBBBBB] font-semibold text-sm md:text-base hover:opacity-80 transition-opacity border-2 border-[#BBBBBB]"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={`flex-1 h-12 md:h-14 bg-[#2489FF] rounded-xl text-[36px] text-white font-semibold text-sm md:text-base transition-opacity ${
              !deleteChecked ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-80'
            }`}
    
            onClick={onDeleteAccount}
            disabled={!deleteChecked}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo; 