import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Swal from 'sweetalert2';

const ContactUs = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const [contactFormData, setContactFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: 'general',
    budget: '',
    timeline: ''
  });

  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Fetch contact information from backend
  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contact/info');
      const data = await response.json();
      if (response.ok) {
        setContactInfo(data);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      setSubmitLoading(true);
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactFormData)
      });

      const result = await response.json();

      if (!response.ok) {
        // Show validation errors if they exist
        if (result.errors) {
          const errorMessages = result.errors.map(err => err.msg).join('\n');
          throw new Error(errorMessages);
        }
        throw new Error(result.message || 'Failed to send message');
      }

      // Success handling...

      Swal.fire({
        title: 'Message Sent!',
        text: result.message || 'Thank you for contacting us. We will get back to you soon.',
        icon: 'success',
        confirmButtonColor: '#10b981'
      });

      // Reset form
      setContactFormData({
        fullName: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        serviceType: 'general',
        budget: '',
        timeline: ''
      });


    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`contact-loading-wrapper ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="contact-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className={`contact-us-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* SEO Meta Information */}
      <div className="contact-seo-meta">
        <h1 className="contact-page-title">Contact Marketing AI - Get in Touch with Our AI Marketing Experts</h1>
        <p className="contact-page-description">
          Ready to transform your marketing with AI? Contact our expert team for personalized AI marketing solutions,
          strategy consultations, and innovative digital marketing services.
        </p>
      </div>

      {/* Hero Section */}
      <section className="contact-hero-section">
        <div className="contact-hero-content">

          <h2 className="contact-hero-title">
            Let's Build Your AI-Powered
            <span className="contact-hero-gradient"> Marketing Future</span>
          </h2>
          <p className="contact-hero-subtitle">
            Connect with our AI marketing specialists and discover how artificial intelligence
            can revolutionize your marketing strategy and drive unprecedented growth.
          </p>
        </div>
        <div className="contact-hero-visual">
          <div className="contact-floating-card contact-card-1">
            <div className="contact-card-icon">🤖</div>
            <span>AI Strategy</span>
          </div>
          <div className="contact-floating-card contact-card-2">
            <div className="contact-card-icon">📊</div>
            <span>Analytics</span>
          </div>
          <div className="contact-floating-card contact-card-3">
            <div className="contact-card-icon">🎯</div>
            <span>Targeting</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="contact-main-content">
        <div className="contact-content-grid">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="contact-form-header">
              <h3 className="contact-form-title">Start Your AI Journey</h3>
              <p className="contact-form-subtitle">
                Fill out the form below and our team will reach out within 24 hours
              </p>
            </div>

            <div className="contact-form">
              <div className="contact-form-row">
                <div className="contact-input-group">
                  <label htmlFor="contactFullName" className="contact-input-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="contactFullName"
                    name="fullName"
                    value={contactFormData.fullName}
                    onChange={handleInputChange}
                    className="contact-form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="contact-input-group">
                  <label htmlFor="contactEmail" className="contact-input-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="email"
                    value={contactFormData.email}
                    onChange={handleInputChange}
                    className="contact-form-input"
                    placeholder="your.email@company.com"
                    required
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-input-group">
                  <label htmlFor="contactCompany" className="contact-input-label">
                    Company
                  </label>
                  <input
                    type="text"
                    id="contactCompany"
                    name="company"
                    value={contactFormData.company}
                    onChange={handleInputChange}
                    className="contact-form-input"
                    placeholder="Your company name"
                  />
                </div>
                <div className="contact-input-group">
                  <label htmlFor="contactPhone" className="contact-input-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="phone"
                    value={contactFormData.phone}
                    onChange={handleInputChange}
                    className="contact-form-input"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="contact-input-group">
                <label htmlFor="contactServiceType" className="contact-input-label">
                  Service Interest
                </label>
                <select
                  id="contactServiceType"
                  name="serviceType"
                  value={contactFormData.serviceType}
                  onChange={handleInputChange}
                  className="contact-form-select"
                >
                  <option value="general">General Inquiry</option>
                  <option value="ai-strategy">AI Marketing Strategy</option>
                  <option value="automation">Marketing Automation</option>
                  <option value="analytics">Predictive Analytics</option>
                  <option value="personalization">AI Personalization</option>
                  <option value="chatbots">AI Chatbots</option>
                  <option value="content">AI Content Creation</option>
                </select>
              </div>

              <div className="contact-form-row">
                <div className="contact-input-group">
                  <label htmlFor="contactBudget" className="contact-input-label">
                    Project Budget
                  </label>
                  <select
                    id="contactBudget"
                    name="budget"
                    value={contactFormData.budget}
                    onChange={handleInputChange}
                    className="contact-form-select"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-plus">$100,000+</option>
                  </select>
                </div>
                <div className="contact-input-group">
                  <label htmlFor="contactTimeline" className="contact-input-label">
                    Timeline
                  </label>
                  <select
                    id="contactTimeline"
                    name="timeline"
                    value={contactFormData.timeline}
                    onChange={handleInputChange}
                    className="contact-form-select"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="3-months">Within 3 months</option>
                    <option value="6-months">Within 6 months</option>
                    <option value="planning">Just planning</option>
                  </select>
                </div>
              </div>

              <div className="contact-input-group">
                <label htmlFor="contactSubject" className="contact-input-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="contactSubject"
                  name="subject"
                  value={contactFormData.subject}
                  onChange={handleInputChange}
                  className="contact-form-input"
                  placeholder="Brief subject of your inquiry"
                />
              </div>

              <div className="contact-input-group">
                <label htmlFor="contactMessage" className="contact-input-label">
                  Message *
                </label>
                <textarea
                  id="contactMessage"
                  name="message"
                  value={contactFormData.message}
                  onChange={handleInputChange}
                  className="contact-form-textarea"
                  placeholder="Tell us about your project, goals, and how we can help you leverage AI for marketing success..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitLoading}
                className="contact-submit-button"
              >
                {submitLoading ? (
                  <span className="contact-button-loading">
                    <span className="contact-loading-spinner-small"></span>
                    Sending...
                  </span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="contact-button-arrow">→</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-info-section">
            <div className="contact-info-header">
              <h3 className="contact-info-title">Get in Touch</h3>
              <p className="contact-info-subtitle">
                Multiple ways to connect with our AI marketing experts
              </p>
            </div>

            {contactInfo && (
              <div className="contact-info-cards">
                <div className="contact-info-card">
                  <div className="contact-info-icon">📧</div>
                  <div className="contact-info-content">
                    <h4 className="contact-info-card-title">Email Us</h4>
                    <p className="contact-info-card-text">{contactInfo.email}</p>
                    <span className="contact-info-card-note">Response within 2 hours</span>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon">📞</div>
                  <div className="contact-info-content">
                    <h4 className="contact-info-card-title">Call Us</h4>
                    <p className="contact-info-card-text">{contactInfo.phone}</p>
                    <span className="contact-info-card-note">{contactInfo.businessHours}</span>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon">📍</div>
                  <div className="contact-info-content">
                    <h4 className="contact-info-card-title">Visit Us</h4>
                    <p className="contact-info-card-text">
                      {contactInfo.address}
                    </p>
                    <span className="contact-info-card-note">By appointment only</span>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon">💬</div>
                  <div className="contact-info-content">
                    <h4 className="contact-info-card-title">Live Chat</h4>
                    <p className="contact-info-card-text">Available 24/7</p>
                    <span className="contact-info-card-note">Instant AI support</span>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Section */}
            <div className="contact-faq-section">
              <h4 className="contact-faq-title">Frequently Asked Questions</h4>
              <div className="contact-faq-items">
                <div className="contact-faq-item">
                  <h5 className="contact-faq-question">How quickly can we start implementing AI marketing solutions?</h5>
                  <p className="contact-faq-answer">
                    Most clients can begin seeing results within 2-4 weeks of initial consultation,
                    depending on the complexity of your current marketing infrastructure.
                  </p>
                </div>
                <div className="contact-faq-item">
                  <h5 className="contact-faq-question">Do you work with small businesses or just enterprises?</h5>
                  <p className="contact-faq-answer">
                    We serve businesses of all sizes, from startups to Fortune 500 companies.
                    Our AI solutions are scalable and customizable to fit your budget and needs.
                  </p>
                </div>
                <div className="contact-faq-item">
                  <h5 className="contact-faq-question">What makes your AI marketing approach different?</h5>
                  <p className="contact-faq-answer">
                    We combine cutting-edge AI technology with deep marketing expertise, ensuring
                    that every solution is strategically aligned with your business objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="contact-cta-section">
        <div className="contact-cta-content">
          <h3 className="contact-cta-title">Ready to Transform Your Marketing?</h3>
          <p className="contact-cta-subtitle">
            Join thousands of businesses already leveraging AI for marketing success
          </p>
          <div className="contact-cta-stats">
            <div className="contact-stat-item">
              <span className="contact-stat-number">500+</span>
              <span className="contact-stat-label">Clients Served</span>
            </div>
            <div className="contact-stat-item">
              <span className="contact-stat-number">250%</span>
              <span className="contact-stat-label">Avg ROI Increase</span>
            </div>
            <div className="contact-stat-item">
              <span className="contact-stat-number">24/7</span>
              <span className="contact-stat-label">AI Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;