import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from "../../App";
import Swal from 'sweetalert2';

const PremiumNavbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);



  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      // const token = localStorage.getItem('token');

      // if (!token) {
      //   throw new Error('No authentication token found');
      // }

      const response = await fetch('/api/auth/userProfile', {
        method: 'GET',
        headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);


      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to load profile data'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      label: 'Home',
      href: '/',
      hasDropdown: false
    },
    {
      label: 'AI Solutions',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        {
          label: 'AI Marketing Tools',
          href: '/ai-marketing',
          icon: '🤖',
          hasSubDropdown: true,
          subItems: [
            { label: 'Chatbots & Virtual Assistants', href: '/ai-chatbots', icon: '💬' },
            { label: 'Predictive Analytics', href: '/ai-predictive', icon: '📈' },
            { label: 'Customer Segmentation', href: '/ai-segmentation', icon: '👥' },
            { label: 'Recommendation Engines', href: '/ai-recommendations', icon: '🎯' }
          ]
        },
        {
          label: 'Content Generation',
          href: '/content-ai',
          icon: '✍️',
          hasSubDropdown: true,
          subItems: [
            { label: 'AI Copywriting', href: '/ai-copywriting', icon: '📝' },
            { label: 'Image Generation', href: '/ai-images', icon: '🎨' },
            { label: 'Video Creation', href: '/ai-videos', icon: '🎬' },
            { label: 'Voice Generation', href: '/ai-voice', icon: '🎙️' }
          ]
        },
        {
          label: 'Analytics & Insights',
          href: '/ai-analytics',
          icon: '📊',
          hasSubDropdown: true,
          subItems: [
            { label: 'Performance Tracking', href: '/ai-performance', icon: '📈' },
            { label: 'Sentiment Analysis', href: '/ai-sentiment', icon: '😊' },
            { label: 'Competitor Analysis', href: '/ai-competitor', icon: '🔍' },
            { label: 'ROI Optimization', href: '/ai-roi', icon: '💰' }
          ]
        },
        {
          label: 'Automation Suite',
          href: '/automation',
          icon: '⚡',
          hasSubDropdown: true,
          subItems: [
            { label: 'Email Automation', href: '/auto-email', icon: '📧' },
            { label: 'Social Media Scheduling', href: '/auto-social', icon: '📅' },
            { label: 'Lead Nurturing', href: '/auto-leads', icon: '🌱' },
            { label: 'Campaign Management', href: '/auto-campaigns', icon: '🎯' }
          ]
        }
      ]
    },
    {
      label: 'Services',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        {
          label: 'Digital Marketing',
          href: '/digital-marketing',
          icon: '🎯',
          hasSubDropdown: true,
          subItems: [
            {
              label: 'Social Media',
              href: '/SocialMediaMarketing',
              icon: '📱',
              hasSubDropdown: true,
              subItems: [
                { label: 'Social Media Marketing', href: '/social-media-marketing', icon: '📱' },
                { label: 'Facebook/Instagram Ads', href: '/facebook-ads', icon: '👥' },
                { label: 'TikTok Campaigns', href: '/tiktok-marketing', icon: '🎵' },
                { label: 'Influencer Marketing', href: '/influencer-marketing', icon: '🌟' }
              ]
            },
            {
              label: 'Search Marketing',
              href: '/SearchMarketing',
              icon: '🔍',
              hasSubDropdown: true,
              subItems: [
                { label: 'SEO Services', href: '/seo', icon: '🔍' },
                { label: 'Google Ads', href: '/google-ads', icon: '🌐' },
                { label: 'Local SEO', href: '/local-seo', icon: '📍' }
              ]
            },
            {
              label: 'Content Creation',
              href: '/ContentCreation',
              icon: '✍️',
              hasSubDropdown: true,
              subItems: [
                { label: 'Blog Writing', href: '/blog-writing', icon: '📝' },
                { label: 'Video Production', href: '/video-production', icon: '🎬' },
                { label: 'Infographics', href: '/infographics', icon: '📊' }
              ]
            }
          ]
        },
        {
          label: 'Advertising',
          href: '/advertising',
          icon: '💰',
          hasSubDropdown: true,
          subItems: [
            { label: 'PPC Campaigns', href: '/ppc-ads', icon: '💰' },
            { label: 'Display Ads', href: '/display-ads', icon: '🖼️' },
            { label: 'Retargeting', href: '/retargeting', icon: '🔄' }
          ]
        },
        {
          label: 'Branding',
          href: '/branding',
          icon: '🎨',
          hasSubDropdown: true,
          subItems: [
            { label: 'Brand Strategy', href: '/brand-strategy', icon: '🎯' },
            { label: 'Logo & Visual Identity', href: '/logo-design', icon: '✨' },
            { label: 'Rebranding', href: '/rebranding', icon: '🔄' }
          ]
        },
        {
          label: 'Email & SMS',
          href: '/messaging',
          icon: '✉️',
          hasSubDropdown: true,
          subItems: [
            { label: 'Email Marketing', href: '/email-marketing', icon: '✉️' },
            { label: 'SMS Campaigns', href: '/sms-marketing', icon: '💬' },
            { label: 'Automation', href: '/automation', icon: '⚡' }
          ]
        },
        {
          label: 'Analytics & Optimization',
          href: '/analytics',
          icon: '📊',
          hasSubDropdown: true,
          subItems: [
            { label: 'Web Analytics', href: '/web-analytics', icon: '📊' },
            { label: 'Conversion Optimization', href: '/conversion-optimization', icon: '📈' },
            { label: 'SEO Audits', href: '/seo-audit', icon: '🔍' }
          ]
        },
        {
          label: 'Partnerships',
          href: '/partnerships',
          icon: '🤝',
          hasSubDropdown: true,
          subItems: [
            { label: 'Affiliate Marketing', href: '/affiliate-marketing', icon: '🤝' },
            { label: 'Strategic Alliances', href: '/strategic-alliances', icon: '⭐' }
          ]
        }
      ]
    },
    {
      label: 'About',
      href: '/AboutUs',
      hasDropdown: false
    },
    {
      label: 'Contact',
      href: '/ContactUs',
      hasDropdown: false
    },
    ...(!state ? [{
      label: 'Users',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Signup', href: '/Signup', icon: '📝' },
        { label: 'Login', href: '/Login', icon: '🔑' }
      ]
    }] : []),
    ...(state ? [

      {
        label: 'My Profile',
        href: '/UserProfile',
        hasDropdown: false
      }, {
        label: 'Logout',
        href: '/api/logout',
        hasDropdown: false
      },

    ] : [])
  ];

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setActiveSubDropdown(null);
  };

  // Create unique identifier for sub-dropdowns
  const createSubDropdownId = (parentIndex, subIndex) => {
    return `${parentIndex}-${subIndex}`;
  };

  const handleSubDropdownToggle = (parentIndex, subIndex) => {
    const subId = createSubDropdownId(parentIndex, subIndex);
    setActiveSubDropdown(activeSubDropdown === subId ? null : subId);
  };

  const isSubDropdownActive = (parentIndex, subIndex) => {
    const subId = createSubDropdownId(parentIndex, subIndex);
    return activeSubDropdown === subId;
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  const renderDropdownItems = (items, isMobile = false, parentIndex = null) => {
    return items.map((dropItem, dropIndex) => (
      <div
        key={dropIndex}
        className={isMobile ? 'pmnav-mobile-dropdown-wrapper' : 'pmnav-dropdown-wrapper'}
        onMouseEnter={!isMobile && dropItem.hasSubDropdown ? () => setActiveSubDropdown(createSubDropdownId(parentIndex, dropIndex)) : undefined}
        onMouseLeave={!isMobile && dropItem.hasSubDropdown ? () => setActiveSubDropdown(null) : undefined}
      >
        <a
          href={dropItem.hasSubDropdown ? '#' : dropItem.href}
          className={isMobile ? 'pmnav-mobile-dropdown-item' : 'pmnav-dropdown-item'}
          onClick={dropItem.hasSubDropdown ? (e) => {
            e.preventDefault();
            if (isMobile) handleSubDropdownToggle(parentIndex, dropIndex);
          } : (isMobile ? () => setIsMobileMenuOpen(false) : undefined)}
        >
          <span className={isMobile ? 'pmnav-mobile-dropdown-icon' : 'pmnav-dropdown-icon'}>
            {dropItem.icon}
          </span>
          <div className={isMobile ? 'pmnav-mobile-dropdown-text' : 'pmnav-dropdown-text'}>
            <span className={isMobile ? 'pmnav-mobile-dropdown-label' : 'pmnav-dropdown-label'}>
              {dropItem.label}
            </span>
          </div>
          {dropItem.hasSubDropdown && (
            <svg
              className={`${isMobile ? 'pmnav-mobile-' : ''}pmnav-dropdown-item-arrow ${isSubDropdownActive(parentIndex, dropIndex) ? 'pmnav-arrow-active' : ''}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          )}
          {!dropItem.hasSubDropdown && !isMobile && (
            <svg className="pmnav-dropdown-item-arrow" width="16" height="16" viewBox="0 0 16 16">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          )}
        </a>

        {dropItem.hasSubDropdown && (
          <div
            className={`${isMobile ? 'pmnav-mobile-submenu' : 'pmnav-submenu'} ${isSubDropdownActive(parentIndex, dropIndex) ? (isMobile ? 'pmnav-mobile-submenu-active' : 'pmnav-submenu-active') : ''}`}
          >
            {dropItem.subItems.map((subItem, subIndex) => (
              <a
                key={subIndex}
                href={subItem.href}
                className={`${isMobile ? 'pmnav-mobile-submenu-item' : 'pmnav-submenu-item'}`}
                onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
              >
                <span className={isMobile ? 'pmnav-mobile-dropdown-icon' : 'pmnav-dropdown-icon'}>
                  {subItem.icon}
                </span>
                <div className={isMobile ? 'pmnav-mobile-dropdown-text' : 'pmnav-dropdown-text'}>
                  <span className={isMobile ? 'pmnav-mobile-dropdown-label' : 'pmnav-dropdown-label'}>
                    {subItem.label}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    ));
  };


  if (userProfile?.personalInfo?.userType === "admin") {
    return (<></>)
  }

  return (
    <nav className={`pmnav-container ${isDarkMode ? 'dark' : 'light'} ${isScrolled ? 'pmnav-scrolled' : ''}`}>
      <div className="pmnav-wrapper">
        {/* Logo Section */}
        <div className="pmnav-logo-section">
          <a href="/" className="pmnav-logo-link">
            <div className="pmnav-logo-icon">
              <div className="pmnav-logo-ai-symbol">AI</div>
            </div>
            <div className="pmnav-logo-text">
              <span className="pmnav-brand-name">MarketAI</span>
              <span className="pmnav-brand-tagline">Intelligent Marketing</span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="pmnav-desktop-menu">
          <ul className="pmnav-nav-list">
            {navigationItems.map((item, index) => (
              <li
                key={index}
                className={`pmnav-nav-item ${item.hasDropdown ? 'pmnav-has-dropdown' : ''}`}
                onMouseEnter={() => {
                  if (item.hasDropdown) {
                    setActiveDropdown(index);
                    setActiveSubDropdown(null);
                  }
                }}
                onMouseLeave={() => {
                  if (item.hasDropdown) {
                    setActiveDropdown(null);
                    setActiveSubDropdown(null);
                  }
                }}
              >
                <a
                  href={item.href}
                  className="pmnav-nav-link"
                  onClick={item.hasDropdown ? (e) => { e.preventDefault(); handleDropdownToggle(index); } : undefined}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg className={`pmnav-dropdown-arrow ${activeDropdown === index ? 'pmnav-arrow-active' : ''}`} width="12" height="12" viewBox="0 0 12 12">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  )}
                </a>

                {item.hasDropdown && (
                  <div className={`pmnav-dropdown-menu ${activeDropdown === index ? 'pmnav-dropdown-active' : ''}`}>
                    <div className="pmnav-dropdown-content">
                      {renderDropdownItems(item.dropdownItems, false, index)}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pmnav-actions">
          <button
            onClick={toggleTheme}
            className="pmnav-theme-toggle"
            aria-label="Toggle theme"
          >
            <div className="pmnav-theme-icon">
              {isDarkMode ? '☀️' : '🌙'}
            </div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="pmnav-mobile-toggle"
          onClick={handleMobileMenuToggle}
          aria-label="Toggle mobile menu"
        >
          <div className={`pmnav-hamburger ${isMobileMenuOpen ? 'pmnav-hamburger-active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`pmnav-mobile-menu ${isMobileMenuOpen ? 'pmnav-mobile-menu-active' : ''}`}>
        <div className="pmnav-mobile-content">
          {navigationItems.map((item, index) => (
            <div key={index} className="pmnav-mobile-item">
              <a
                href={item.href}
                className="pmnav-mobile-link"
                onClick={item.hasDropdown ? (e) => { e.preventDefault(); handleDropdownToggle(index); } : () => setIsMobileMenuOpen(false)}
              >
                {item.label}
                {item.hasDropdown && (
                  <svg className={`pmnav-mobile-arrow ${activeDropdown === index ? 'pmnav-mobile-arrow-active' : ''}`} width="12" height="12" viewBox="0 0 12 12">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                )}
              </a>

              {item.hasDropdown && (
                <div className={`pmnav-mobile-dropdown ${activeDropdown === index ? 'pmnav-mobile-dropdown-active' : ''}`}>
                  {renderDropdownItems(item.dropdownItems, true, index)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );


};

export default PremiumNavbar;