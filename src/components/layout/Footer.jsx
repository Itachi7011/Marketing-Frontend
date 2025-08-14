import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';


const Footer = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredSection, setHoveredSection] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const footerSections = {
        ai_solutions: {
            title: "AI Solutions",
            links: [
                { name: "Machine Learning", href: "/ml-services" },
                { name: "Natural Language Processing", href: "/nlp" },
                { name: "Computer Vision", href: "/computer-vision" },
                { name: "AI Consulting", href: "/ai-consulting" },
                { name: "Custom AI Development", href: "/custom-ai" }
            ]
        },
        marketing_tools: {
            title: "Marketing Tools",
            links: [
                { name: "AI Content Generator", href: "/content-ai" },
                { name: "Predictive Analytics", href: "/analytics" },
                { name: "Customer Segmentation", href: "/segmentation" },
                { name: "Campaign Optimization", href: "/optimization" },
                { name: "Social Media AI", href: "/social-ai" }
            ]
        },
        company: {
            title: "Company",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Our Team", href: "/team" },
                { name: "Careers", href: "/careers" },
                { name: "News & Updates", href: "/news" },
                { name: "Contact", href: "/contact" }
            ]
        },
        resources: {
            title: "Resources",
            links: [
                { name: "Documentation", href: "/docs" },
                { name: "API Reference", href: "/api" },
                { name: "Case Studies", href: "/case-studies" },
                { name: "Blog", href: "/blog" },
                { name: "Support Center", href: "/support" }
            ]
        }
    };

    const socialLinks = [
        { name: "LinkedIn", href: "https://linkedin.com", icon: "🔗" },
        { name: "Twitter", href: "https://twitter.com", icon: "🐦" },
        { name: "GitHub", href: "https://github.com", icon: "⚡" },
        { name: "Discord", href: "https://discord.com", icon: "💬" }
    ];

    return (
        <footer className={`ai-marketing-footer ${isDarkMode ? 'dark' : 'light'} ${scrolled ? 'ai-marketing-footer-scrolled' : ''}`}>
            {/* Animated Background */}
            <div className="ai-marketing-footer-bg-animation">
                <div className="ai-marketing-footer-particle ai-marketing-footer-particle-1"></div>
                <div className="ai-marketing-footer-particle ai-marketing-footer-particle-2"></div>
                <div className="ai-marketing-footer-particle ai-marketing-footer-particle-3"></div>
                <div className="ai-marketing-footer-neural-network">
                    <div className="ai-marketing-footer-node ai-marketing-footer-node-1"></div>
                    <div className="ai-marketing-footer-node ai-marketing-footer-node-2"></div>
                    <div className="ai-marketing-footer-node ai-marketing-footer-node-3"></div>
                    <div className="ai-marketing-footer-connection ai-marketing-footer-connection-1"></div>
                    <div className="ai-marketing-footer-connection ai-marketing-footer-connection-2"></div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="ai-marketing-footer-container">
                {/* Header Section */}
                <div className="ai-marketing-footer-header">
                    <div className="ai-marketing-footer-brand">
                        <div className="ai-marketing-footer-logo">
                            <div className="ai-marketing-footer-logo-cube">
                                <div className="ai-marketing-footer-cube-face ai-marketing-footer-cube-front"></div>
                                <div className="ai-marketing-footer-cube-face ai-marketing-footer-cube-back"></div>
                                <div className="ai-marketing-footer-cube-face ai-marketing-footer-cube-right"></div>
                                <div className="ai-marketing-footer-cube-face ai-marketing-footer-cube-left"></div>
                                <div className="ai-marketing-footer-cube-face ai-marketing-footer-cube-top"></div>
                                <div className="ai-marketing-footer-cube-face ai-marketing-footer-cube-bottom"></div>
                            </div>
                            <span className="ai-marketing-footer-brand-text">AI Marketing Pro</span>
                        </div>
                        <p className="ai-marketing-footer-tagline">
                            Revolutionizing marketing with cutting-edge AI technology. 
                            Transform your campaigns, amplify your reach, and accelerate growth.
                        </p>
                    </div>
                    
                    <div className="ai-marketing-footer-newsletter">
                        <h3 className="ai-marketing-footer-newsletter-title">Stay Ahead with AI Insights</h3>
                        <div className="ai-marketing-footer-newsletter-form">
                            <input 
                                type="email" 
                                placeholder="Enter your email for AI updates"
                                className="ai-marketing-footer-email-input"
                            />
                            <button className="ai-marketing-footer-subscribe-btn">
                                <span>Subscribe</span>
                                <div className="ai-marketing-footer-btn-glow"></div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className="ai-marketing-footer-links-grid">
                    {Object.entries(footerSections).map(([key, section]) => (
                        <div 
                            key={key}
                            className={`ai-marketing-footer-section ai-marketing-footer-section-${key}`}
                            onMouseEnter={() => setHoveredSection(key)}
                            onMouseLeave={() => setHoveredSection(null)}
                        >
                            <h4 className="ai-marketing-footer-section-title">
                                {section.title}
                                <div className="ai-marketing-footer-title-underline"></div>
                            </h4>
                            <ul className="ai-marketing-footer-links-list">
                                {section.links.map((link, index) => (
                                    <li key={index} className="ai-marketing-footer-link-item">
                                        <a 
                                            href={link.href}
                                            className="ai-marketing-footer-link"
                                        >
                                            <span className="ai-marketing-footer-link-text">{link.name}</span>
                                            <div className="ai-marketing-footer-link-hover-effect"></div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Social & Contact Section */}
                <div className="ai-marketing-footer-social-contact">
                    <div className="ai-marketing-footer-social">
                        <h4 className="ai-marketing-footer-social-title">Connect With Us</h4>
                        <div className="ai-marketing-footer-social-links">
                            {socialLinks.map((social, index) => (
                                <a 
                                    key={index}
                                    href={social.href}
                                    className="ai-marketing-footer-social-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="ai-marketing-footer-social-icon">{social.icon}</span>
                                    <span className="ai-marketing-footer-social-name">{social.name}</span>
                                    <div className="ai-marketing-footer-social-glow"></div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="ai-marketing-footer-contact">
                        <h4 className="ai-marketing-footer-contact-title">Get In Touch</h4>
                        <div className="ai-marketing-footer-contact-info">
                            <div className="ai-marketing-footer-contact-item">
                                <span className="ai-marketing-footer-contact-icon">📧</span>
                                <a href="mailto:hello@aimarketingpro.com" className="ai-marketing-footer-contact-link">
                                    hello@aimarketingpro.com
                                </a>
                            </div>
                            <div className="ai-marketing-footer-contact-item">
                                <span className="ai-marketing-footer-contact-icon">📞</span>
                                <a href="tel:+1234567890" className="ai-marketing-footer-contact-link">
                                    +1 (234) 567-8900
                                </a>
                            </div>
                            <div className="ai-marketing-footer-contact-item">
                                <span className="ai-marketing-footer-contact-icon">📍</span>
                                <span className="ai-marketing-footer-contact-text">
                                    Silicon Valley, CA, USA
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="ai-marketing-footer-bottom">
                    <div className="ai-marketing-footer-bottom-content">
                        <div className="ai-marketing-footer-legal">
                            <span className="ai-marketing-footer-copyright">
                                © 2025 AI Marketing Pro. All rights reserved.
                            </span>
                            <div className="ai-marketing-footer-legal-links">
                                <a href="/privacy" className="ai-marketing-footer-legal-link">Privacy Policy</a>
                                <a href="/terms" className="ai-marketing-footer-legal-link">Terms of Service</a>
                                <a href="/cookies" className="ai-marketing-footer-legal-link">Cookie Policy</a>
                                <a href="/security" className="ai-marketing-footer-legal-link">Security</a>
                            </div>
                        </div>
                        
                        <div className="ai-marketing-footer-badges">
                            <div className="ai-marketing-footer-badge">
                                <span className="ai-marketing-footer-badge-text">🔒 SOC 2 Certified</span>
                            </div>
                            <div className="ai-marketing-footer-badge">
                                <span className="ai-marketing-footer-badge-text">🌍 GDPR Compliant</span>
                            </div>
                            <div className="ai-marketing-footer-badge">
                                <span className="ai-marketing-footer-badge-text">⚡ 99.9% Uptime</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          
        </footer>
    );
};

export default Footer;