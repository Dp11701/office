import React, { useEffect, useRef } from 'react';

const LoginForm = ({ onLogin, loginChecked, setLoginChecked }) => {
  const googleButtonRef = useRef(null);

  useEffect(() => {
    // Initialize Google Sign-In
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "957412999195-e8l3b9qnmam98rmjh84hk6m60vakn86i.apps.googleusercontent.com",
        ux_mode: "popup",
        callback: onLogin,
      });

      // Create fake Google wrapper for custom button
      const createFakeGoogleWrapper = () => {
        const googleLoginWrapper = document.createElement("div");
        googleLoginWrapper.style.display = "none";
        googleLoginWrapper.classList.add("custom-google-button");
        document.body.appendChild(googleLoginWrapper);

        window.google.accounts.id.renderButton(googleLoginWrapper, {
          type: "icon",
          width: "200",
        });

        const googleLoginWrapperButton = googleLoginWrapper.querySelector("div[role=button]");
        
        return {
          click: () => {
            googleLoginWrapperButton.click();
          },
        };
      };

      const googleButtonWrapper = createFakeGoogleWrapper();
      googleButtonRef.current = googleButtonWrapper;
    }
  }, [onLogin]);

  const handleGoogleLogin = () => {
    if (googleButtonRef.current) {
      googleButtonRef.current.click();
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="mb-6">
        <button
          className={`w-full h-12 md:h-14 rounded-2xl border-2 border-gray-800 bg-white flex items-center justify-center gap-3 md:gap-4 text-base md:text-lg font-semibold transition-opacity ${
            !loginChecked ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-80'
          }`}
          onClick={handleGoogleLogin}
          disabled={!loginChecked}
        >
          <img src="/assets/Google.svg" alt="Google" className="w-6 h-6 md:w-7 md:h-7" />
          <span className="text-sm md:text-base">Sign in with Google</span>
        </button>
      </div>
      
      <div className="flex items-start gap-3 text-xs md:text-sm">
        <input
          type="checkbox"
          id="agree-login-policy"
          className="w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0"
          checked={loginChecked}
          onChange={(e) => setLoginChecked(e.target.checked)}
        />
        <label htmlFor="agree-login-policy" className="text-gray-text leading-relaxed">
          By continuing, I agree to the{' '}
          <a href="#" className="text-[#2489FF] hover:underline">Service Agreement</a> and{' '}
          <a href="#" className="text-[#2489FF] hover:underline">Privacy Policy</a>.
        </label>
      </div>
    </div>
  );
};

export default LoginForm; 