import React, { useState, useEffect } from 'react';
import Header from './Header';
import Tooltip from './Tooltip';
import LoginForm from './LoginForm';
import AccountInfo from './AccountInfo';
import Toast from './Toast';

const AccountDeletion = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loginChecked, setLoginChecked] = useState(false);
  const [deleteChecked, setDeleteChecked] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

  useEffect(() => {
    handleAuthentication();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  const handleAuthentication = () => {
    const userInfoJson = sessionStorage.getItem('user-info');
    if (userInfoJson) {
      try {
        const parsedUserInfo = JSON.parse(userInfoJson);
        setUserInfo(parsedUserInfo);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing user info:', error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLoginGoogle = async (response) => {
    try {
      if (response.credential) {
        const tokenPayload = JSON.parse(atob(response.credential.split('.')[1]));
        
        const mockUserInfo = {
          statusCode: 200,
          data: {
            uid: tokenPayload.email || tokenPayload.sub,
            email: tokenPayload.email,
            name: tokenPayload.name,
            picture: tokenPayload.picture,
            accessToken: response.credential
          }
        };

        sessionStorage.setItem('user-info', JSON.stringify(mockUserInfo));
        setUserInfo(mockUserInfo);
        setIsLoggedIn(true);
        showToast('Login successful!', 'success');
      }
    } catch (err) {
      console.error('Login error:', err);
      showToast('Login failed. Please try again', 'error');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      sessionStorage.removeItem('user-info');
      setIsLoggedIn(false);
      setUserInfo(null);
      setDeleteChecked(false);
      
      showToast('Account deleted successfully!', 'success');
    } catch (err) {
      console.error('Delete error:', err);
      showToast('Delete failed. Please try again', 'error');
    }
  };

  return (
    <div className="relative flex flex-col bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 md:p-8 min-h-[440px] justify-between gap-5">
      <Header />
      <Tooltip />
      
      <div className="mb-6">
        {!isLoggedIn ? (
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-gray-800 mb-2">
              Delete my Account
            </div>
            <div className="text-sm md:text-base text-gray-text px-4">
              Please Login to verify your account before deleting it.
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-7 h-7 rounded-full overflow-hidden">
                <img src="/assets/logo.svg" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="text-lg md:text-2xl font-bold text-gray-800">
                {userInfo?.data?.uid || userInfo?.data?.email || 'Unknown'}
              </div>
            </div>
            <div className="text-sm md:text-base text-gray-text">
              Your account will be permanently deleted and:
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-5">
        {!isLoggedIn ? (
          <LoginForm 
            onLogin={handleLoginGoogle} 
            loginChecked={loginChecked}
            setLoginChecked={setLoginChecked}
          />
        ) : (
          <AccountInfo 
            deleteChecked={deleteChecked}
            setDeleteChecked={setDeleteChecked}
            onDeleteAccount={handleDeleteAccount}
          />
        )}
      </div>

      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={3000}
      />
    </div>
  );
};

export default AccountDeletion; 