import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const SocialMediaMarketing = () => {

    const navigate = useNavigate();
    const { isDarkMode } = useContext(ThemeContext);
    const [activeTab, setActiveTab] = useState('strategy-0');
    const [isVisible, setIsVisible] = useState({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.social-media-animate-on-scroll');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const socialPlatforms = [
        {
            name: 'Facebook',
            users: '2.9B+',
            engagement: '0.09%',
            bestFor: 'Brand Awareness, Community Building',
            icon: '📘'
        },
        {
            name: 'Instagram',
            users: '2B+',
            engagement: '1.22%',
            bestFor: 'Visual Content, Influencer Marketing',
            icon: '📷'
        },
        {
            name: 'Twitter/X',
            users: '450M+',
            engagement: '0.045%',
            bestFor: 'Real-time Updates, Customer Service',
            icon: '🐦'
        },
        {
            name: 'LinkedIn',
            users: '900M+',
            engagement: '0.26%',
            bestFor: 'B2B Marketing, Professional Networking',
            icon: '💼'
        },
        {
            name: 'TikTok',
            users: '1B+',
            engagement: '5.3%',
            bestFor: 'Gen Z Engagement, Viral Content',
            icon: '🎵'
        },
        {
            name: 'YouTube',
            users: '2.7B+',
            engagement: '1.63%',
            bestFor: 'Long-form Content, Education',
            icon: '📺'
        }
    ];

    const contentTypes = [
        {
            type: 'Video Content',
            engagement: '+1200%',
            description: 'Video content generates 1200% more shares than text and images combined. Short-form videos perform exceptionally well across all platforms.',
            examples: ['Product demos', 'Behind-the-scenes', 'Tutorials', 'User testimonials']
        },
        {
            type: 'Interactive Content',
            engagement: '+300%',
            description: 'Polls, quizzes, and interactive stories boost engagement by 300%. They encourage active participation from your audience.',
            examples: ['Instagram polls', 'LinkedIn surveys', 'Facebook quizzes', 'Twitter spaces']
        },
        {
            type: 'User-Generated Content',
            engagement: '+500%',
            description: 'Content created by your customers builds trust and authenticity. UGC campaigns see 500% higher click-through rates.',
            examples: ['Customer reviews', 'Photo contests', 'Hashtag campaigns', 'Brand mentions']
        },
        {
            type: 'Live Streaming',
            engagement: '+600%',
            description: 'Live content creates urgency and exclusivity. Viewers watch live videos 3x longer than pre-recorded content.',
            examples: ['Product launches', 'Q&A sessions', 'Webinars', 'Behind-the-scenes']
        }
    ];

    const strategies = [
        {
            title: 'Content Strategy & Planning',
            description: 'Develop a comprehensive content calendar that aligns with your brand voice, audience preferences, and business objectives. Strategic planning ensures consistent messaging across all platforms.',
            features: ['Content calendar management', 'Brand voice development', 'Audience persona mapping', 'Competitive analysis'],
            roi: '320%'
        },
        {
            title: 'Community Management',
            description: 'Build and nurture online communities around your brand. Active community management increases customer loyalty by 67% and drives word-of-mouth marketing.',
            features: ['Real-time engagement', 'Crisis management', 'Influencer partnerships', 'Customer support integration'],
            roi: '450%'
        },
        {
            title: 'Paid Social Advertising',
            description: 'Leverage advanced targeting options and AI-driven optimization to maximize your advertising ROI. Paid social delivers an average ROI of $5.20 for every $1 spent.',
            features: ['Advanced audience targeting', 'A/B testing campaigns', 'Conversion tracking', 'Budget optimization'],
            roi: '520%'
        },
        {
            title: 'Analytics & Optimization',
            description: 'Use data-driven insights to continuously improve your social media performance. Regular optimization can increase engagement rates by up to 89%.',
            features: ['Performance tracking', 'Sentiment analysis', 'ROI measurement', 'Competitor benchmarking'],
            roi: '280%'
        }
    ];

    const futureTrends = [
        {
            trend: 'AI-Powered Personalization',
            impact: 'Revolutionary',
            timeline: '2024-2025',
            description: 'AI will enable hyper-personalized content delivery, with algorithms creating unique experiences for each user based on their behavior, preferences, and engagement history.'
        },
        {
            trend: 'Social Commerce Integration',
            impact: 'High',
            timeline: '2024-2026',
            description: 'Shopping directly within social platforms will become seamless, with AR try-ons, instant checkout, and AI-powered product recommendations driving $2.9 trillion in sales by 2026.'
        },
        {
            trend: 'Augmented Reality Experiences',
            impact: 'Transformative',
            timeline: '2025-2027',
            description: 'AR filters and experiences will evolve beyond entertainment to practical applications, enabling virtual product trials, immersive brand storytelling, and interactive advertisements.'
        },
        {
            trend: 'Voice-Activated Social Media',
            impact: 'Moderate',
            timeline: '2025-2028',
            description: 'Voice commands will revolutionize how users interact with social platforms, from posting updates to searching content, making social media more accessible and hands-free.'
        }
    ];

    return (
        <div className={`social-media-marketing-container ${isDarkMode ? 'dark' : 'light'}`}>
            {/* Hero Section */}
            <section className="social-media-hero-section">
                <div className="social-media-hero-background">
                    <div className="social-media-floating-element social-media-float-1"></div>
                    <div className="social-media-floating-element social-media-float-2"></div>
                    <div className="social-media-floating-element social-media-float-3"></div>
                </div>
                <div className="social-media-hero-content">
                    <h1 className="social-media-hero-title">
                        Social Media Marketing
                        <span className="social-media-gradient-text">Revolution</span>
                    </h1>
                    <p className="social-media-hero-subtitle">
                        Transform your brand's digital presence with cutting-edge social media strategies.
                        Reach 4.8 billion social media users worldwide and drive unprecedented engagement
                        through AI-powered campaigns and data-driven insights.
                    </p>
                    <div className="social-media-hero-stats">
                        <div className="social-media-stat-item">
                            <span className="social-media-stat-number">4.8B+</span>
                            <span className="social-media-stat-label">Active Users</span>
                        </div>
                        <div className="social-media-stat-item">
                            <span className="social-media-stat-number">147min</span>
                            <span className="social-media-stat-label">Daily Usage</span>
                        </div>
                        <div className="social-media-stat-item">
                            <span className="social-media-stat-number">520%</span>
                            <span className="social-media-stat-label">Average ROI</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform Overview */}
            <section className="social-media-platforms-section social-media-animate-on-scroll" id="platforms-section">
                <div className="social-media-section-header">
                    <h2 className="social-media-section-title">Platform Ecosystem</h2>
                    <p className="social-media-section-description">
                        Navigate the diverse landscape of social media platforms, each offering unique opportunities
                        for brand engagement and customer connection. Understanding platform-specific dynamics is
                        crucial for maximizing your marketing investment.
                    </p>
                </div>
                <div className="social-media-platforms-grid">
                    {socialPlatforms.map((platform, index) => (
                        <div key={index} className="social-media-platform-card" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="social-media-platform-icon">{platform.icon}</div>
                            <h3 className="social-media-platform-name">{platform.name}</h3>
                            <div className="social-media-platform-stats">
                                <div className="social-media-platform-stat">
                                    <span className="social-media-stat-value">{platform.users}</span>
                                    <span className="social-media-stat-title">Active Users</span>
                                </div>
                                <div className="social-media-platform-stat">
                                    <span className="social-media-stat-value">{platform.engagement}</span>
                                    <span className="social-media-stat-title">Avg. Engagement</span>
                                </div>
                            </div>
                            <p className="social-media-platform-description">
                                <strong>Best for:</strong> {platform.bestFor}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Content Strategy Tabs */}
            <section className="social-media-content-section social-media-animate-on-scroll" id="content-section">
                <div className="social-media-section-header">
                    <h2 className="social-media-section-title">Strategic Approaches</h2>
                    <p className="social-media-section-description">
                        Explore comprehensive strategies that drive measurable results across all social media channels.
                    </p>
                </div>
                <div className="social-media-tabs-container">
                    <div className="social-media-tabs-nav">
                        {strategies.map((strategy, index) => (
                            <button
                                key={index}
                                className={`social-media-tab-button ${activeTab === `strategy-${index}` ? 'active' : ''}`}
                                onClick={() => setActiveTab(`strategy-${index}`)}
                            >
                                {strategy.title}
                            </button>
                        ))}
                    </div>
                    <div className="social-media-tabs-content">
                        {strategies.map((strategy, index) => (
                            <div
                                key={index}
                                className={`social-media-tab-panel ${activeTab === `strategy-${index}` ? 'active' : ''}`}
                            >
                                <div className="social-media-strategy-content">
                                    <div className="social-media-strategy-info">
                                        <h3 className="social-media-strategy-title">{strategy.title}</h3>
                                        <p className="social-media-strategy-description">{strategy.description}</p>
                                        <ul className="social-media-strategy-features">
                                            {strategy.features.map((feature, idx) => (
                                                <li key={idx} className="social-media-strategy-feature">{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="social-media-strategy-roi">
                                        <span className="social-media-roi-label">Average ROI</span>
                                        <span className="social-media-roi-value">{strategy.roi}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Types */}
            <section className="social-media-content-types-section social-media-animate-on-scroll" id="content-types-section">
                <div className="social-media-section-header">
                    <h2 className="social-media-section-title">High-Performance Content Types</h2>
                    <p className="social-media-section-description">
                        Discover content formats that consistently drive the highest engagement rates and conversion outcomes.
                    </p>
                </div>
                <div className="social-media-content-types-grid">
                    {contentTypes.map((content, index) => (
                        <div key={index} className="social-media-content-type-card">
                            <div className="social-media-content-type-header">
                                <h3 className="social-media-content-type-title">{content.type}</h3>
                                <span className="social-media-engagement-badge">{content.engagement}</span>
                            </div>
                            <p className="social-media-content-type-description">{content.description}</p>
                            <div className="social-media-content-examples">
                                <h4 className="social-media-examples-title">Examples:</h4>
                                <div className="social-media-examples-list">
                                    {content.examples.map((example, idx) => (
                                        <span key={idx} className="social-media-example-tag">{example}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Future Trends */}
            <section className="social-media-trends-section social-media-animate-on-scroll" id="trends-section">
                <div className="social-media-section-header">
                    <h2 className="social-media-section-title">Future of Social Media Marketing</h2>
                    <p className="social-media-section-description">
                        Stay ahead of emerging trends and technologies that will reshape social media marketing in the coming years.
                    </p>
                </div>
                <div className="social-media-trends-timeline">
                    {futureTrends.map((trend, index) => (
                        <div key={index} className="social-media-trend-item">
                            <div className="social-media-trend-timeline-marker"></div>
                            <div className="social-media-trend-content">
                                <div className="social-media-trend-header">
                                    <h3 className="social-media-trend-title">{trend.trend}</h3>
                                    <div className="social-media-trend-meta">
                                        <span className={`social-media-trend-impact ${trend.impact.toLowerCase()}`}>
                                            {trend.impact} Impact
                                        </span>
                                        <span className="social-media-trend-timeline">{trend.timeline}</span>
                                    </div>
                                </div>
                                <p className="social-media-trend-description">{trend.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="social-media-cta-section">
                <div className="social-media-cta-content">
                    <h2 className="social-media-cta-title">Ready to Transform Your Social Presence?</h2>
                    <p className="social-media-cta-description">
                        Join thousands of businesses leveraging AI-powered social media marketing to achieve unprecedented growth.
                    </p>
                    <div className="social-media-cta-buttons">
                        <button className="social-media-cta-primary">Start Your Campaign</button>
                        <button className="social-media-cta-secondary" onClick={() => navigate("/ScheduleDemo")}>Schedule Demo</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SocialMediaMarketing;