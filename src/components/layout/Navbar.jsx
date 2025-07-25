import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from "../../App";


const PremiumNavbar = () => {
  const { state, dispatch } = useContext(UserContext);

  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  console.log(state)

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
        { label: 'AI Marketing Tools', href: '/ai-marketing', icon: '🤖' },
        { label: 'Content Generation', href: '/content-ai', icon: '✍️' },
        { label: 'Analytics & Insights', href: '/ai-analytics', icon: '📊' },
        { label: 'Automation Suite', href: '/automation', icon: '⚡' }
      ]
    },
    {
      label: 'Services',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Digital Marketing', href: '/digital-marketing', icon: '🎯' },
        { label: 'Brand Strategy', href: '/brand-strategy', icon: '🎨' },
        { label: 'SEO Optimization', href: '/seo', icon: '🔍' },
        { label: 'Social Media', href: '/social-media', icon: '📱' }
      ]
    },
    {
      label: 'About',
      href: '/about',
      hasDropdown: false
    },
    {
      label: 'Contact',
      href: '/contact',
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
    ...(state ? [{
      label: 'Logout',
      href: '/api/logout',
      hasDropdown: false
    }] : []),

    {

    }

  ];

  // console.log("state is :", state)

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
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
                      {item.dropdownItems.map((dropItem, dropIndex) => (
                        <a key={dropIndex} href={dropItem.href} className="pmnav-dropdown-item">
                          <span className="pmnav-dropdown-icon">{dropItem.icon}</span>
                          <div className="pmnav-dropdown-text">
                            <span className="pmnav-dropdown-label">{dropItem.label}</span>
                          </div>
                          <svg className="pmnav-dropdown-item-arrow" width="16" height="16" viewBox="0 0 16 16">
                            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
                          </svg>
                        </a>
                      ))}
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
                  {item.dropdownItems.map((dropItem, dropIndex) => (
                    <a
                      key={dropIndex}
                      href={dropItem.href}
                      className="pmnav-mobile-dropdown-item"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="pmnav-mobile-dropdown-icon">{dropItem.icon}</span>
                      {dropItem.label}
                    </a>
                  ))}
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