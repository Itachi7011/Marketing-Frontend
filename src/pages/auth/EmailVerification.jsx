import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Swal from 'sweetalert2';

const EmailVerification = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [emailVerificationFormData, setEmailVerificationFormData] = useState({
    email: '',
    phoneNo: '',
    otp: ''
  });
  const [emailVerificationLoading, setEmailVerificationLoading] = useState(false);
  const [emailVerificationTimer, setEmailVerificationTimer] = useState(0);
  const [emailVerificationCanResend, setEmailVerificationCanResend] = useState(true);

  useEffect(() => {
    let emailVerificationInterval;
    if (emailVerificationTimer > 0) {
      emailVerificationInterval = setInterval(() => {
        setEmailVerificationTimer(prev => prev - 1);
      }, 1000);
    } else if (emailVerificationTimer === 0) {
      setEmailVerificationCanResend(true);
    }
    return () => clearInterval(emailVerificationInterval);
  }, [emailVerificationTimer]);

  const handleEmailVerificationInputChange = (emailVerificationEvent) => {
    const { name, value } = emailVerificationEvent.target;
    setEmailVerificationFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailVerificationSubmit = async (emailVerificationEvent) => {
    emailVerificationEvent.preventDefault();
    
    if (!emailVerificationFormData.email || !emailVerificationFormData.phoneNo || !emailVerificationFormData.otp) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all required fields',
        background: isDarkMode ? '#1a1a2e' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#333333'
      });
      return;
    }

    setEmailVerificationLoading(true);

    try {
      const emailVerificationResponse = await fetch('/api/auth/userEmailVerification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailVerificationFormData)
      });

      const emailVerificationResult = await emailVerificationResponse.json();

      if (emailVerificationResult.success) {
        Swal.fire({
          icon: 'success',
          title: 'Email Verified!',
          text: emailVerificationResult.message,
          background: isDarkMode ? '#1a1a2e' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#333333'
        }).then(() => {
          // Redirect to login or dashboard
          window.location.href = '/login';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Verification Failed',
          text: emailVerificationResult.message || 'Invalid verification code',
          background: isDarkMode ? '#1a1a2e' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#333333'
        });
      }
    } catch (error) {
      console.error('Email verification error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Unable to verify email. Please try again.',
        background: isDarkMode ? '#1a1a2e' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#333333'
      });
    } finally {
      setEmailVerificationLoading(false);
    }
  };

  const handleEmailVerificationResendOTP = async () => {
    if (!emailVerificationCanResend) return;

    try {
      setEmailVerificationCanResend(false);
      setEmailVerificationTimer(60);

      // Call your resend OTP endpoint here
      const emailVerificationResendResponse = await fetch('/api/auth/resendOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailVerificationFormData.email,
          phoneNo: emailVerificationFormData.phoneNo
        })
      });

      if (emailVerificationResendResponse.ok) {
        Swal.fire({
          icon: 'success',
          title: 'OTP Sent',
          text: 'A new verification code has been sent to your email',
          background: isDarkMode ? '#1a1a2e' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#333333'
        });
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      setEmailVerificationCanResend(true);
      setEmailVerificationTimer(0);
    }
  };

  return (
    <div className={`email-verification-main-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="email-verification-floating-elements">
        <div className="email-verification-floating-circle email-verification-circle-1"></div>
        <div className="email-verification-floating-circle email-verification-circle-2"></div>
        <div className="email-verification-floating-circle email-verification-circle-3"></div>
        <div className="email-verification-floating-square email-verification-square-1"></div>
        <div className="email-verification-floating-square email-verification-square-2"></div>
      </div>

      <div className="email-verification-content-wrapper">
        <div className="email-verification-form-container">
          <div className="email-verification-header-section">
            <div className="email-verification-icon-wrapper">
              <div className="email-verification-mail-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h1 className="email-verification-main-title">Verify Your Email</h1>
            <p className="email-verification-subtitle">
              We've sent a verification code to your email address. Please enter the code below to complete your registration.
            </p>
          </div>

          <form className="email-verification-form" onSubmit={handleEmailVerificationSubmit}>
            <div className="email-verification-input-group">
              <label htmlFor="emailVerificationEmailInput" className="email-verification-input-label">
                Email Address
              </label>
              <div className="email-verification-input-wrapper">
                <input
                  type="email"
                  id="emailVerificationEmailInput"
                  name="email"
                  className="email-verification-input-field"
                  placeholder="Enter your email address"
                  value={emailVerificationFormData.email}
                  onChange={handleEmailVerificationInputChange}
                  required
                />
                <div className="email-verification-input-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="email-verification-input-group">
              <label htmlFor="emailVerificationPhoneInput" className="email-verification-input-label">
                Phone Number
              </label>
              <div className="email-verification-input-wrapper">
                <input
                  type="tel"
                  id="emailVerificationPhoneInput"
                  name="phoneNo"
                  className="email-verification-input-field"
                  placeholder="Enter your phone number"
                  value={emailVerificationFormData.phoneNo}
                  onChange={handleEmailVerificationInputChange}
                  required
                />
                <div className="email-verification-input-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C9.41 21 0 11.59 0 0.08C0 -0.52 0.48 -1 1.08 -1H4.08C4.68 -1 5.16 -0.52 5.16 0.08V3.08C5.16 3.68 4.68 4.16 4.08 4.16H2.08C2.62 8.86 6.14 12.38 10.84 12.92V10.92C10.84 10.32 11.32 9.84 11.92 9.84H14.92C15.52 9.84 16 10.32 16 10.92V13.92C16 14.52 15.52 15 14.92 15H13.08C13.08 18.86 16.14 22 20 22H20.92C21.52 22 22 21.52 22 20.92V16.92Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="email-verification-input-group">
              <label htmlFor="emailVerificationOtpInput" className="email-verification-input-label">
                Verification Code
              </label>
              <div className="email-verification-otp-wrapper">
                <input
                  type="text"
                  id="emailVerificationPhoneInput"
                  name="otp"
                  className="email-verification-input-field"
                  placeholder="Enter 6-digit code"
                  value={emailVerificationFormData.otp}
                  onChange={handleEmailVerificationInputChange}
                  maxLength="6"
                  required
                />
               
              </div>
               <button
                  type="button"
                  className={`email-verification-resend-btn ${!emailVerificationCanResend ? 'email-verification-resend-disabled' : ''}`}
                  onClick={handleEmailVerificationResendOTP}
                  disabled={!emailVerificationCanResend}
                >
                  {emailVerificationTimer > 0 ? `Resend in ${emailVerificationTimer}s` : 'Resend Code'}
                </button>
            </div>

            <button
              type="submit"
              className={`email-verification-submit-btn ${emailVerificationLoading ? 'email-verification-loading' : ''}`}
              disabled={emailVerificationLoading}
            >
              {emailVerificationLoading ? (
                <div className="email-verification-loading-spinner"></div>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>

          <div className="email-verification-footer-links">
            <p className="email-verification-help-text">
              Didn't receive the code? Check your spam folder or 
              <button className="email-verification-link-btn" onClick={handleEmailVerificationResendOTP}>
                request a new one
              </button>
            </p>
            <p className="email-verification-back-text">
              <a href="/login" className="email-verification-back-link">
                ← Back to Login
              </a>
            </p>
          </div>
        </div>

        <div className="email-verification-illustration-section">
          <div className="email-verification-3d-container">
            <div className="email-verification-3d-envelope">
              <div className="email-verification-envelope-front"></div>
              <div className="email-verification-envelope-back"></div>
              <div className="email-verification-envelope-flap"></div>
            </div>
            <div className="email-verification-floating-icons">
              <div className="email-verification-check-icon">✓</div>
              <div className="email-verification-mail-icon-small">✉</div>
              <div className="email-verification-shield-icon">🛡</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;