import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { 
  Calendar,
  Clock,
  User,
  Building,
  Mail,
  Phone,
  Globe,
  Users,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Briefcase,
  MapPin,
  MessageSquare,
  Star
} from 'lucide-react';

const ScheduleDemo = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    jobTitle: '',
    timezone: '',
    email: '',
    phone: '',
    communicationPreference: 'email',
    
    // Company Info
    companyName: '',
    website: '',
    industry: '',
    companySize: '',
    marketingTeamSize: '',
    
    // Demo Details
    preferredDate: '',
    preferredTime: '',
    duration: '30-min',
    demoType: 'platform-overview',
    customTopics: '',
    specialRequirements: '',
    
    // Marketing Context
    currentChallenges: [],
    currentTools: '',
    monthlyAdBudget: '',
    desiredFeatures: []
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'currentChallenges' || name === 'desiredFeatures') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/schedule-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Handle success
        alert('Demo scheduled successfully!');
      }
    } catch (error) {
      console.error('Error scheduling demo:', error);
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: <User /> },
    { number: 2, title: 'Company Details', icon: <Building /> },
    { number: 3, title: 'Demo Preferences', icon: <Calendar /> },
    { number: 4, title: 'Marketing Context', icon: <Target /> }
  ];

  return (
    <div className={`schedule-demo-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Hero Section */}
      <section className="schedule-demo-hero-section">
        <div className="schedule-demo-hero-content">
          
          
          <h1 className="schedule-demo-hero-title">
            See Marketing AI in Action
          </h1>
          
          <p className="schedule-demo-hero-description">
            Book a personalized demo tailored to your business needs. Our experts will show you 
            how AI can transform your marketing strategy and drive measurable results.
          </p>
          
          <div className="schedule-demo-hero-features">
            <div className="schedule-demo-hero-feature">
              <CheckCircle className="schedule-demo-feature-icon" />
              <span>30-minute personalized walkthrough</span>
            </div>
            <div className="schedule-demo-hero-feature">
              <CheckCircle className="schedule-demo-feature-icon" />
              <span>Tailored to your industry & use cases</span>
            </div>
            <div className="schedule-demo-hero-feature">
              <CheckCircle className="schedule-demo-feature-icon" />
              <span>Q&A with our AI marketing experts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="schedule-demo-progress-section">
        <div className="schedule-demo-progress-container">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`schedule-demo-progress-step ${
                currentStep >= step.number ? 'schedule-demo-step-active' : ''
              }`}
            >
              <div className="schedule-demo-step-icon">
                {step.icon}
              </div>
              <span className="schedule-demo-step-title">{step.title}</span>
              {index < steps.length - 1 && (
                <div className="schedule-demo-step-line"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="schedule-demo-form-section">
        <div className="schedule-demo-form-container">
          <div className="schedule-demo-form">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="schedule-demo-form-step">
                <h2 className="schedule-demo-step-heading">
                  <User className="schedule-demo-step-icon" />
                  Personal Information
                </h2>
                
                <div className="schedule-demo-form-grid">
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <User className="schedule-demo-label-icon" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="schedule-demo-form-input"
                      required
                    />
                  </div>
                  
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <User className="schedule-demo-label-icon" />
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="schedule-demo-form-input"
                      required
                    />
                  </div>
                  
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <Briefcase className="schedule-demo-label-icon" />
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="schedule-demo-form-input"
                    />
                  </div>
                  
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <MapPin className="schedule-demo-label-icon" />
                      Timezone
                    </label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="schedule-demo-form-select"
                    >
                      <option value="">Select Timezone</option>
                      <option value="IST">IST</option>
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="CST">Central Time</option>
                      <option value="MST">Mountain Time</option>
                      <option value="PST">Pacific Time</option>
                    </select>
                  </div>
                  
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <Mail className="schedule-demo-label-icon" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="schedule-demo-form-input"
                      required
                    />
                  </div>
                  
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <Phone className="schedule-demo-label-icon" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="schedule-demo-form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Company Information */}
            {currentStep === 2 && (
              <div className="schedule-demo-form-step">
                <h2 className="schedule-demo-step-heading">
                  <Building className="schedule-demo-step-icon" />
                  Company Information
                </h2>
                
                <div className="schedule-demo-form-grid">
                  <div className="schedule-demo-form-group schedule-demo-form-group-full">
                    <label className="schedule-demo-form-label">
                      <Building className="schedule-demo-label-icon" />
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="schedule-demo-form-input"
                      required
                    />
                  </div>
                  
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <Globe className="schedule-demo-label-icon" />
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="schedule-demo-form-input"
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <Target className="schedule-demo-label-icon" />
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="schedule-demo-form-select"
                    >
                      <option value="">Select Industry</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="saas">SaaS</option>
                      <option value="agency">Agency</option>
                      <option value="education">Education</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="retail">Retail</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <Users className="schedule-demo-label-icon" />
                      Company Size
                    </label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="schedule-demo-form-select"
                    >
                      <option value="">Select Company Size</option>
                      <option value="solopreneur">Solopreneur</option>
                      <option value="2-10">2-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                  
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <Users className="schedule-demo-label-icon" />
                      Marketing Team Size
                    </label>
                    <select
                      name="marketingTeamSize"
                      value={formData.marketingTeamSize}
                      onChange={handleInputChange}
                      className="schedule-demo-form-select"
                    >
                      <option value="">Select Team Size</option>
                      <option value="none">No marketing team</option>
                      <option value="1-3">1-3 people</option>
                      <option value="4-7">4-7 people</option>
                      <option value="8-15">8-15 people</option>
                      <option value="16+">16+ people</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Demo Preferences */}
            {currentStep === 3 && (
              <div className="schedule-demo-form-step">
                <h2 className="schedule-demo-step-heading">
                  <Calendar className="schedule-demo-step-icon" />
                  Demo Preferences
                </h2>
                
                <div className="schedule-demo-form-grid">
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <Calendar className="schedule-demo-label-icon" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="schedule-demo-form-input"
                      required
                    />
                  </div>
                  
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <Clock className="schedule-demo-label-icon" />
                      Preferred Time *
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="schedule-demo-form-select"
                      required
                    >
                      <option value="">Select Time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                  </div>
                  
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <Clock className="schedule-demo-label-icon" />
                      Duration
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="schedule-demo-form-select"
                    >
                      <option value="30-min">30 minutes</option>
                      <option value="45-min">45 minutes</option>
                      <option value="60-min">60 minutes</option>
                    </select>
                  </div>
                  
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <PlayCircle className="schedule-demo-label-icon" />
                      Demo Type *
                    </label>
                    <select
                      name="demoType"
                      value={formData.demoType}
                      onChange={handleInputChange}
                      className="schedule-demo-form-select"
                      required
                    >
                      <option value="platform-overview">Platform Overview</option>
                      <option value="ai-content-creation">AI Content Creation</option>
                      <option value="campaign-automation">Campaign Automation</option>
                      <option value="analytics-dashboard">Analytics Dashboard</option>
                      <option value="integrations">Integrations</option>
                      <option value="custom">Custom Demo</option>
                    </select>
                  </div>
                  
                  <div className="schedule-demo-form-group schedule-demo-form-group-full">
                    <label className="schedule-demo-form-label">
                      <MessageSquare className="schedule-demo-label-icon" />
                      Custom Topics (if selected custom demo)
                    </label>
                    <textarea
                      name="customTopics"
                      value={formData.customTopics}
                      onChange={handleInputChange}
                      className="schedule-demo-form-textarea"
                      placeholder="Please specify what you'd like to see in the demo..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Marketing Context */}
            {currentStep === 4 && (
              <div className="schedule-demo-form-step">
                <h2 className="schedule-demo-step-heading">
                  <Target className="schedule-demo-step-icon" />
                  Marketing Context
                </h2>
                
                <div className="schedule-demo-form-grid">
                  <div className="schedule-demo-form-group schedule-demo-form-group-full">
                    <label className="schedule-demo-form-label">
                      <Zap className="schedule-demo-label-icon" />
                      Current Marketing Challenges
                    </label>
                    <div className="schedule-demo-checkbox-group">
                      {[
                        'content-creation', 'team-bandwidth', 'ad-performance',
                        'lead-generation', 'roi-measurement', 'multi-channel',
                        'personalization', 'data-integration'
                      ].map(challenge => (
                        <label key={challenge} className="schedule-demo-checkbox-label">
                          <input
                            type="checkbox"
                            name="currentChallenges"
                            value={challenge}
                            checked={formData.currentChallenges.includes(challenge)}
                            onChange={handleInputChange}
                            className="schedule-demo-checkbox-input"
                          />
                          <span className="schedule-demo-checkbox-text">
                            {challenge.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="schedule-demo-form-group">
                    <label className="schedule-demo-form-label">
                      <Target className="schedule-demo-label-icon" />
                      Monthly Ad Budget
                    </label>
                    <select
                      name="monthlyAdBudget"
                      value={formData.monthlyAdBudget}
                      onChange={handleInputChange}
                      className="schedule-demo-form-select"
                    >
                      <option value="">Select Budget Range</option>
                      <option value="none">No ad spend</option>
                      <option value="<1k">Less than $1K</option>
                      <option value="1k-5k">$1K - $5K</option>
                      <option value="5k-20k">$5K - $20K</option>
                      <option value="20k-100k">$20K - $100K</option>
                      <option value="100k+">$100K+</option>
                    </select>
                  </div>
                  
                  <div className="schedule-demo-form-group schedule-demo-form-group-full">
                    <label className="schedule-demo-form-label">
                      <Star className="schedule-demo-label-icon" />
                      Desired Features
                    </label>
                    <div className="schedule-demo-checkbox-group">
                      {[
                        'ai-copywriting', 'visual-content', 'automation',
                        'predictive-analytics', 'multi-user', 'api-access',
                        'white-label', 'custom-models'
                      ].map(feature => (
                        <label key={feature} className="schedule-demo-checkbox-label">
                          <input
                            type="checkbox"
                            name="desiredFeatures"
                            value={feature}
                            checked={formData.desiredFeatures.includes(feature)}
                            onChange={handleInputChange}
                            className="schedule-demo-checkbox-input"
                          />
                          <span className="schedule-demo-checkbox-text">
                            {feature.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Navigation */}
            <div className="schedule-demo-form-navigation">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="schedule-demo-btn-secondary"
                >
                  Previous
                </button>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="schedule-demo-btn-primary"
                >
                  Next Step
                  <ArrowRight className="schedule-demo-btn-icon" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="schedule-demo-btn-primary schedule-demo-btn-submit"
                >
                  Schedule Demo
                  <Calendar className="schedule-demo-btn-icon" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScheduleDemo;