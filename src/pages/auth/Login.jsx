import React, { useState, useContext, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';
import { ThemeContext } from '../../context/ThemeContext';
import axios from "axios";
import { UserContext } from "../../App";


const PremiumLoginPage = () => {
      const { state, dispatch } = useContext(UserContext);

    const { isDarkMode } = useContext(ThemeContext);
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    // Floating particles animation
    const [particles, setParticles] = useState([]);
    useEffect(()=>{
          dispatch({ type: "USER", payload: false });
    },[])

    useEffect(() => {
        const particleArray = [];
        for (let i = 0; i < 20; i++) {
            particleArray.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5
            });
        }
        setParticles(particleArray);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!loginFormData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(loginFormData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!loginFormData.password) {
            errors.password = 'Password is required';
        } else if (loginFormData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };



    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        var bodyFormData = new FormData();
        bodyFormData.append("userEmail", loginFormData.email);
        bodyFormData.append("userPassword", loginFormData.password);
        bodyFormData.append("rememberMe", loginFormData.rememberMe);

        try {
            // Simulate API call
            //   await new Promise(resolve => setTimeout(resolve, 2000));
            const response = await axios.post(
                "/api/auth/login",

                bodyFormData,

                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                 localStorage.setItem('userToken', data.token);
                      dispatch({ type: "USER", payload: true });

                await Swal.fire({
                    title: 'Success!',
                    text: 'Login successful! Welcome back.',
                    icon: 'success',
                    background: isDarkMode ? '#1f2937' : '#ffffff',
                    color: isDarkMode ? '#ffffff' : '#000000',
                    confirmButtonColor: '#6366f1'
                });

                // Redirect logic would go here
window.location.href = "/UserProfile";
            }

            // Mock successful login


        } catch (error) {
            await Swal.fire({
                title: 'Error!',
                text: 'Login failed. Please check your credentials.',
                icon: 'error',
                background: isDarkMode ? '#1f2937' : '#ffffff',
                color: isDarkMode ? '#ffffff' : '#000000',
                confirmButtonColor: '#ef4444'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`premium-login-container ${isDarkMode ? 'dark' : 'light'}`}>
            {/* Animated Background */}
            <div className="premium-login-background">
                <div className="premium-login-gradient-orb premium-login-orb-1"></div>
                <div className="premium-login-gradient-orb premium-login-orb-2"></div>
                <div className="premium-login-gradient-orb premium-login-orb-3"></div>

                {/* Floating Particles */}
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="premium-login-particle"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animationDelay: `${particle.id * 0.1}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Main Content */}
            <div className="premium-login-content">
                {/* Logo Section */}
                <div className="premium-login-logo-section">
                    <div className="premium-login-logo-container">
                        <Sparkles className="premium-login-logo-icon" />
                        <h1 className="premium-login-brand-name">AI Marketing</h1>
                    </div>
                    <p className="premium-login-welcome-text">Welcome back to the future of marketing</p>
                </div>

                {/* Login Card */}
                <div className="premium-login-card">
                    <div className="premium-login-card-header">
                        <h2 className="premium-login-title">Sign In</h2>
                        <p className="premium-login-subtitle">Access your dashboard</p>
                    </div>

                    <form className="premium-login-form" onSubmit={handleLoginSubmit}>
                        {/* Email Field */}
                        <div className="premium-login-field-group">
                            <label htmlFor="premium-login-email" className="premium-login-field-label">
                                Email Address
                            </label>
                            <div className="premium-login-input-wrapper">
                                <Mail className="premium-login-input-icon" />
                                <input
                                    id="premium-login-email"
                                    name="email"
                                    type="email"
                                    className={`premium-login-input ${formErrors.email ? 'premium-login-input-error' : ''}`}
                                    placeholder="Enter your email"
                                    value={loginFormData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            {formErrors.email && (
                                <span className="premium-login-error-message">{formErrors.email}</span>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="premium-login-field-group">
                            <label htmlFor="premium-login-password" className="premium-login-field-label">
                                Password
                            </label>
                            <div className="premium-login-input-wrapper">
                                <Lock className="premium-login-input-icon" />
                                <input
                                    id="premium-login-password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={`premium-login-input ${formErrors.password ? 'premium-login-input-error' : ''}`}
                                    placeholder="Enter your password"
                                    value={loginFormData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="premium-login-password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {formErrors.password && (
                                <span className="premium-login-error-message">{formErrors.password}</span>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="premium-login-options-row">
                            <label className="premium-login-checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    className="premium-login-checkbox"
                                    checked={loginFormData.rememberMe}
                                    onChange={handleInputChange}
                                />
                                <span className="premium-login-checkbox-label">Remember me</span>
                            </label>
                            <a href="#" className="premium-login-forgot-link">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="premium-login-submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="premium-login-spinner"></div>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="premium-login-btn-icon" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Social Login */}
                    <div className="premium-login-divider">
                        <span className="premium-login-divider-text">Or continue with</span>
                    </div>

                    <div className="premium-login-social-buttons">
                        <button className="premium-login-social-btn premium-login-google-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="premium-login-signup-section">
                        <p className="premium-login-signup-text">
                            Don't have an account?
                            <a href="#" className="premium-login-signup-link">Create account</a>
                        </p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default PremiumLoginPage;