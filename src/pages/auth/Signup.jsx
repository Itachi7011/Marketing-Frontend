
import React, { useState, useContext, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Building, Globe, Users, Briefcase, Target, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import Swal from 'sweetalert2';

const SignupPage = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        // Personal Info
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        phone: '',
        password: '',
        confirmPassword: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

        // Business Info
        companyName: '',
        website: '',
        industry: '',
        businessType: '',
        companySize: '',

        // Marketing Profile
        role: '',
        experienceLevel: '',
        monthlyAdBudget: '',
        marketingGoals: [],
        challenges: []
    });

    const [errors, setErrors] = useState({});

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'others', label: 'Others' },  // Fixed typo here
    ];

    const industries = [
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'saas', label: 'SaaS' },
        { value: 'agency', label: 'Agency' },
        { value: 'education', label: 'Education' },
        { value: 'finance', label: 'Finance' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'real-estate', label: 'Real Estate' },
        { value: 'manufacturing', label: 'Manufacturing' },
        { value: 'retail', label: 'Retail' },
        { value: 'other', label: 'Other' }
    ];

    const businessTypes = [
        { value: 'b2b', label: 'B2B (Business to Business)' },
        { value: 'b2c', label: 'B2C (Business to Consumer)' },
        { value: 'both', label: 'Both B2B & B2C' }
    ];

    const companySizes = [
        { value: 'solopreneur', label: 'Solo Entrepreneur' },
        { value: '2-10', label: '2-10 employees' },
        { value: '11-50', label: '11-50 employees' },
        { value: '51-200', label: '51-200 employees' },
        { value: '201-500', label: '201-500 employees' },
        { value: '501-1000', label: '501-1000 employees' },
        { value: '1000+', label: '1000+ employees' }
    ];

    const roles = [
        { value: 'owner', label: 'Business Owner' },
        { value: 'cmio', label: 'CMO/Marketing Director' },
        { value: 'marketing-director', label: 'Marketing Manager' },
        { value: 'social-media-manager', label: 'Social Media Manager' },
        { value: 'content-creator', label: 'Content Creator' },
        { value: 'seo-specialist', label: 'SEO Specialist' },
        { value: 'ppc-expert', label: 'PPC Expert' },
        { value: 'growth-hacker', label: 'Growth Hacker' },
        { value: 'freelancer', label: 'Freelancer' },
        { value: 'student', label: 'Student' },
        { value: 'other', label: 'Other' }
    ];

    const experienceLevels = [
        { value: 'beginner', label: 'Beginner (0-1 years)' },
        { value: 'intermediate', label: 'Intermediate (2-5 years)' },
        { value: 'advanced', label: 'Advanced (5-10 years)' },
        { value: 'expert', label: 'Expert (10+ years)' }
    ];

    const budgetRanges = [
        { value: 'none', label: 'No current budget' },
        { value: '<1k', label: 'Less than $1,000/month' },
        { value: '1k-5k', label: '$1,000 - $5,000/month' },
        { value: '5k-20k', label: '$5,000 - $20,000/month' },
        { value: '20k-100k', label: '$20,000 - $100,000/month' },
        { value: '100k+', label: '$100,000+/month' }
    ];

    const marketingGoalsOptions = [
        { value: 'brand-awareness', label: 'Brand Awareness' },
        { value: 'lead-generation', label: 'Lead Generation' },
        { value: 'sales-conversion', label: 'Sales Conversion' },
        { value: 'customer-retention', label: 'Customer Retention' },
        { value: 'community-building', label: 'Community Building' },
        { value: 'traffic-growth', label: 'Traffic Growth' },
        { value: 'product-launch', label: 'Product Launch' },
        { value: 'reputation-management', label: 'Reputation Management' }
    ];

    const challengesOptions = [
        { value: 'budget-constraints', label: 'Budget Constraints' },
        { value: 'measuring-roi', label: 'Measuring ROI' },
        { value: 'team-bandwidth', label: 'Team Bandwidth' },
        { value: 'platform-changes', label: 'Platform Changes' },
        { value: 'audience-targeting', label: 'Audience Targeting' },
        { value: 'content-creation', label: 'Content Creation' },
        { value: 'ad-fatigue', label: 'Ad Fatigue' },
        { value: 'competition', label: 'Competition' },
        { value: 'tech-integration', label: 'Tech Integration' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleMultiSelect = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }));
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email';
            }
            if (!formData.password) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        if (step === 2) {
            if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
            if (!formData.industry) newErrors.industry = 'Please select an industry';
            if (!formData.businessType) newErrors.businessType = 'Please select business type';
        }

        if (step === 3) {
            if (!formData.role) newErrors.role = 'Please select your role';
            if (!formData.experienceLevel) newErrors.experienceLevel = 'Please select experience level';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(3)) return;

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setCurrentStep(4); // Success step
                Swal.fire({
                    title: 'Welcome to Marketing AI!',
                    text: 'Your account has been created successfully. Please check your email for verification.',
                    icon: 'success',
                    confirmButtonText: 'Continue to Login',
                    confirmButtonColor: '#6366f1'
                }).then(() => {
                    window.location.href = '/login';
                });
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            Swal.fire({
                title: 'Registration Failed',
                text: error.message || 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#ef4444'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const navigateToLogin = () => {
        window.location.href = '/login';
    };



    const renderStep1 = () => (
        <div className="signup-step-content">
            <div className="signup-step-header">
                <h2 className="signup-step-title">Personal Information</h2>
                <p className="signup-step-subtitle">Let's start with your basic details</p>
            </div>

            <div className="signup-form-grid">
                <div className="signup-input-group">
                    <label className="signup-input-label" htmlFor="firstName">
                        <User size={16} />
                        First Name *
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className={`signup-input-field ${errors.firstName ? 'error' : ''}`}
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                    />
                    {errors.firstName && <span className="signup-error-text">{errors.firstName}</span>}
                </div>

                <div className="signup-input-group">
                    <label className="signup-input-label" htmlFor="lastName">
                        <User size={16} />
                        Last Name *
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className={`signup-input-field ${errors.lastName ? 'error' : ''}`}
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                    />
                    {errors.lastName && <span className="signup-error-text">{errors.lastName}</span>}
                </div>
            </div>


            <div className="signup-input-group">
                <label className="signup-input-label" htmlFor="gender">
                    Gender
                </label>
                <select
                    id="gender"
                    name="gender"  // Changed from genderOptions to gender
                    className={`signup-select-field ${errors.gender ? 'error' : ''}`}
                    value={formData.gender}  // Changed from genderOptions to gender
                    onChange={handleInputChange}
                >
                    <option value="">Select your Gender</option>
                    {genderOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {errors.gender && <span className="signup-error-text">{errors.gender}</span>}
            </div>

            <div className="signup-input-group">
                <label className="signup-input-label" htmlFor="email">
                    <Mail size={16} />
                    Email Address *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={`signup-input-field ${errors.email ? 'error' : ''}`}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                />
                {errors.email && <span className="signup-error-text">{errors.email}</span>}
            </div>

            <div className="signup-input-group">
                <label className="signup-input-label" htmlFor="phone">
                    <Phone size={16} />
                    Phone Number (Optional)
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="signup-input-field"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                />
            </div>


            <div className="signup-form-grid">
                <div className="signup-input-group">
                    <label className="signup-input-label" htmlFor="password">
                        Password *
                    </label>
                    <div className="signup-password-input">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            className={`signup-input-field ${errors.password ? 'error' : ''}`}
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="password"
                        />
                        <button
                            type="button"
                            className="signup-password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.password && <span className="signup-error-text">{errors.password}</span>}
                </div>

                <div className="signup-input-group">
                    <label className="signup-input-label" htmlFor="confirmPassword">
                        Confirm Password *
                    </label>
                    <div className="signup-password-input">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            className={`signup-input-field ${errors.confirmPassword ? 'error' : ''}`}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm password"
                        />
                        <button
                            type="button"
                            className="signup-password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.confirmPassword && <span className="signup-error-text">{errors.confirmPassword}</span>}
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="signup-step-content">
            <div className="signup-step-header">
                <h2 className="signup-step-title">Business Information</h2>
                <p className="signup-step-subtitle">Tell us about your business</p>
            </div>

            <div className="signup-input-group">
                <label className="signup-input-label" htmlFor="companyName">
                    <Building size={16} />
                    Company Name *
                </label>
                <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className={`signup-input-field ${errors.companyName ? 'error' : ''}`}
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                />
                {errors.companyName && <span className="signup-error-text">{errors.companyName}</span>}
            </div>

            <div className="signup-input-group">
                <label className="signup-input-label" htmlFor="website">
                    <Globe size={16} />
                    Website (Optional)
                </label>
                <input
                    type="url"
                    id="website"
                    name="website"
                    className="signup-input-field"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourcompany.com"
                />
            </div>

            <div className="signup-form-grid">
                <div className="signup-input-group">
                    <label className="signup-input-label" htmlFor="industry">
                        Industry *
                    </label>
                    <select
                        id="industry"
                        name="industry"
                        className={`signup-select-field ${errors.industry ? 'error' : ''}`}
                        value={formData.industry}
                        onChange={handleInputChange}
                    >
                        <option value="">Select your industry</option>
                        {industries.map(industry => (
                            <option key={industry.value} value={industry.value}>
                                {industry.label}
                            </option>
                        ))}
                    </select>
                    {errors.industry && <span className="signup-error-text">{errors.industry}</span>}
                </div>

                <div className="signup-input-group">
                    <label className="signup-input-label" htmlFor="businessType">
                        Business Type *
                    </label>
                    <select
                        id="businessType"
                        name="businessType"
                        className={`signup-select-field ${errors.businessType ? 'error' : ''}`}
                        value={formData.businessType}
                        onChange={handleInputChange}
                    >
                        <option value="">Select business type</option>
                        {businessTypes.map(type => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                    {errors.businessType && <span className="signup-error-text">{errors.businessType}</span>}
                </div>
            </div>

            <div className="signup-input-group">
                <label className="signup-input-label" htmlFor="companySize">
                    <Users size={16} />
                    Company Size
                </label>
                <select
                    id="companySize"
                    name="companySize"
                    className="signup-select-field"
                    value={formData.companySize}
                    onChange={handleInputChange}
                >
                    <option value="">Select company size</option>
                    {companySizes.map(size => (
                        <option key={size.value} value={size.value}>
                            {size.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="signup-step-content">
            <div className="signup-step-header">
                <h2 className="signup-step-title">Marketing Profile</h2>
                <p className="signup-step-subtitle">Help us personalize your experience</p>
            </div>

            <div className="signup-form-grid">
                <div className="signup-input-group">
                    <label className="signup-input-label" htmlFor="role">
                        <Briefcase size={16} />
                        Your Role *
                    </label>
                    <select
                        id="role"
                        name="role"
                        className={`signup-select-field ${errors.role ? 'error' : ''}`}
                        value={formData.role}
                        onChange={handleInputChange}
                    >
                        <option value="">Select your role</option>
                        {roles.map(role => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                        ))}
                    </select>
                    {errors.role && <span className="signup-error-text">{errors.role}</span>}
                </div>

                <div className="signup-input-group">
                    <label className="signup-input-label" htmlFor="experienceLevel">
                        Experience Level *
                    </label>
                    <select
                        id="experienceLevel"
                        name="experienceLevel"
                        className={`signup-select-field ${errors.experienceLevel ? 'error' : ''}`}
                        value={formData.experienceLevel}
                        onChange={handleInputChange}
                    >
                        <option value="">Select experience level</option>
                        {experienceLevels.map(level => (
                            <option key={level.value} value={level.value}>
                                {level.label}
                            </option>
                        ))}
                    </select>
                    {errors.experienceLevel && <span className="signup-error-text">{errors.experienceLevel}</span>}
                </div>
            </div>

            <div className="signup-input-group">
                <label className="signup-input-label" htmlFor="monthlyAdBudget">
                    <Target size={16} />
                    Monthly Marketing Budget
                </label>
                <select
                    id="monthlyAdBudget"
                    name="monthlyAdBudget"
                    className="signup-select-field"
                    value={formData.monthlyAdBudget}
                    onChange={handleInputChange}
                >
                    <option value="">Select budget range</option>
                    {budgetRanges.map(budget => (
                        <option key={budget.value} value={budget.value}>
                            {budget.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="signup-input-group">
                <label className="signup-input-label">
                    Marketing Goals (Select all that apply)
                </label>
                <div className="signup-checkbox-grid">
                    {marketingGoalsOptions.map(goal => (
                        <label key={goal.value} className="signup-checkbox-item">
                            <input
                                type="checkbox"
                                checked={formData.marketingGoals.includes(goal.value)}
                                onChange={() => handleMultiSelect('marketingGoals', goal.value)}
                            />
                            <span className="signup-checkbox-text">{goal.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="signup-input-group">
                <label className="signup-input-label">
                    Current Challenges (Select all that apply)
                </label>
                <div className="signup-checkbox-grid">
                    {challengesOptions.map(challenge => (
                        <label key={challenge.value} className="signup-checkbox-item">
                            <input
                                type="checkbox"
                                checked={formData.challenges.includes(challenge.value)}
                                onChange={() => handleMultiSelect('challenges', challenge.value)}
                            />
                            <span className="signup-checkbox-text">{challenge.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="signup-step-content">
            <div className="signup-success-content">
                <div className="signup-success-icon">
                    <CheckCircle size={64} />
                </div>
                <h2 className="signup-success-title">Welcome to Marketing AI!</h2>
                <p className="signup-success-subtitle">
                    Your account has been created successfully. We've sent a verification email to {formData.email}
                </p>
                <div className="signup-success-actions">
                    <button className="signup-primary-button" onClick={navigateToLogin}>
                        Continue to Login
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );

    const renderStepIndicator = () => (
        <div className="signup-step-indicator">
            {[1, 2, 3, 4].map((step) => (
                <div
                    key={step}
                    className={`signup-step-dot ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                >
                    {currentStep > step ? <CheckCircle size={16} /> : step}
                </div>
            ))}
        </div>
    );

    return (
        <div className={`signup-page-container ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="signup-background-animation">
                <div className="signup-floating-shapes">
                    <div className="signup-shape signup-shape-1"></div>
                    <div className="signup-shape signup-shape-2"></div>
                    <div className="signup-shape signup-shape-3"></div>
                </div>
            </div>

            <div className="signup-content-wrapper">
                <div className="signup-header">
                    <h1 className="signup-main-title">Join Marketing AI</h1>
                    <p className="signup-main-subtitle">
                        Create your account and start building amazing marketing campaigns with AI
                    </p>
                </div>

                {renderStepIndicator()}

                <div className="signup-form-container">
                    <div className="signup-form">
                        {currentStep === 1 && renderStep1()}
                        {currentStep === 2 && renderStep2()}
                        {currentStep === 3 && renderStep3()}
                        {currentStep === 4 && renderStep4()}

                        {currentStep < 4 && (
                            <div className="signup-form-actions">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        className="signup-secondary-button"
                                        onClick={prevStep}
                                    >
                                        <ArrowLeft size={16} />
                                        Previous
                                    </button>
                                )}

                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        className="signup-primary-button"
                                        onClick={nextStep}
                                    >
                                        Next Step
                                        <ArrowRight size={16} />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="signup-primary-button"
                                        disabled={isLoading}
                                        onClick={handleSubmit}
                                    >
                                        {isLoading ? 'Creating Account...' : 'Create Account'}
                                        {!isLoading && <ArrowRight size={16} />}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="signup-footer">
                    <p className="signup-footer-text">
                        Already have an account?{' '}
                        <button className="signup-link-button" onClick={navigateToLogin}>
                            Sign in here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;