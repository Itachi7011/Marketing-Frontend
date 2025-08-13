import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import {
    Brain,
    Zap,
    Target,
    TrendingUp,
    Users,
    MessageCircle,
    Video,
    Image,
    FileText,
    Lightbulb,
    BarChart3,
    Clock,
    CheckCircle,
    ArrowRight,
    PlayCircle,
    Sparkles,
    Rocket,
    Globe
} from 'lucide-react';

const ContentCreation = () => {

    const navigate = useNavigate();
    const { isDarkMode } = useContext(ThemeContext);
    const [activeTab, setActiveTab] = useState('overview');
    const [isVisible, setIsVisible] = useState(false);
    const [animationTrigger, setAnimationTrigger] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => setAnimationTrigger(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const contentTypes = [
        {
            icon: <FileText className="content-creation-type-icon" />,
            title: "Blog Posts & Articles",
            description: "AI-powered long-form content that drives organic traffic and establishes thought leadership.",
            features: ["SEO Optimization", "Topic Research", "Keyword Integration", "Content Structuring"]
        },
        {
            icon: <Image className="content-creation-type-icon" />,
            title: "Visual Content",
            description: "Eye-catching graphics, infographics, and visual assets optimized for social media engagement.",
            features: ["Brand Consistency", "Multi-format Output", "A/B Testing", "Performance Analytics"]
        },
        {
            icon: <Video className="content-creation-type-icon" />,
            title: "Video Content",
            description: "Engaging video scripts, storyboards, and promotional content for maximum audience retention.",
            features: ["Script Writing", "Storyboarding", "Thumbnail Design", "Caption Generation"]
        },
        {
            icon: <MessageCircle className="content-creation-type-icon" />,
            title: "Social Media Posts",
            description: "Platform-specific content tailored for optimal engagement across all social channels.",
            features: ["Platform Optimization", "Hashtag Strategy", "Trending Topics", "Audience Targeting"]
        }
    ];

    const aiCapabilities = [
        {
            icon: <Brain className="content-creation-capability-icon" />,
            title: "Intelligent Content Strategy",
            description: "Our AI analyzes market trends, competitor content, and audience behavior to create data-driven content strategies that resonate with your target demographic.",
            stats: "95% accuracy in trend prediction"
        },
        {
            icon: <Target className="content-creation-capability-icon" />,
            title: "Audience Personalization",
            description: "Advanced machine learning algorithms segment your audience and create personalized content variations that speak directly to each user group's preferences and pain points.",
            stats: "3x higher engagement rates"
        },
        {
            icon: <Zap className="content-creation-capability-icon" />,
            title: "Real-time Optimization",
            description: "Continuous learning from performance metrics allows our AI to optimize content in real-time, adjusting tone, style, and messaging for maximum impact.",
            stats: "40% faster content production"
        }
    ];

    const processSteps = [
        {
            step: "01",
            title: "Content Analysis",
            description: "AI analyzes your brand voice, target audience, and industry trends to understand your unique positioning."
        },
        {
            step: "02",
            title: "Strategy Development",
            description: "Creates comprehensive content calendars with topic suggestions, posting schedules, and performance predictions."
        },
        {
            step: "03",
            title: "Content Generation",
            description: "Produces high-quality content across multiple formats while maintaining brand consistency and SEO optimization."
        },
        {
            step: "04",
            title: "Performance Tracking",
            description: "Monitors content performance and provides actionable insights for continuous improvement and optimization."
        }
    ];

    const benefits = [
        {
            icon: <Clock className="content-creation-benefit-icon" />,
            title: "Time Efficiency",
            stat: "70%",
            description: "Reduce content creation time while maintaining quality and consistency across all channels."
        },
        {
            icon: <TrendingUp className="content-creation-benefit-icon" />,
            title: "Engagement Boost",
            stat: "250%",
            description: "Increase audience engagement with AI-optimized content tailored to platform algorithms."
        },
        {
            icon: <BarChart3 className="content-creation-benefit-icon" />,
            title: "ROI Improvement",
            stat: "180%",
            description: "Higher return on investment through data-driven content strategies and performance optimization."
        }
    ];

    return (
        <div className={`content-creation-container ${isDarkMode ? 'dark' : 'light'} ${isVisible ? 'content-creation-visible' : ''}`}>
            {/* Hero Section */}
            <section className="content-creation-hero-section">
                <div className="content-creation-hero-background">
                    <div className="content-creation-floating-element content-creation-element-1"></div>
                    <div className="content-creation-floating-element content-creation-element-2"></div>
                    <div className="content-creation-floating-element content-creation-element-3"></div>
                </div>

                <div className="content-creation-hero-content">
                    <div className="content-creation-hero-badge">
                        <Sparkles className="content-creation-badge-icon" />
                        <span>AI-Powered Content Creation</span>
                    </div>

                    <h1 className="content-creation-hero-title">
                        Transform Your Ideas Into
                        <span className="content-creation-hero-highlight"> Compelling Content</span>
                    </h1>

                    <p className="content-creation-hero-description">
                        Leverage advanced artificial intelligence to create engaging, personalized content that drives results.
                        From blog posts to social media campaigns, our AI understands your brand voice and creates content
                        that resonates with your audience while optimizing for search engines and social algorithms.
                    </p>

                    <div className="content-creation-hero-buttons">
                        <button className="content-creation-hero-primary-btn">
                            <Rocket className="content-creation-btn-icon" />
                            Start Creating Content
                            <ArrowRight className="content-creation-btn-arrow" />
                        </button>
                        <button className="content-creation-hero-secondary-btn">
                            <PlayCircle className="content-creation-btn-icon" />
                            Watch Demo
                        </button>
                    </div>

                    <div className="content-creation-hero-stats">
                        <div className="content-creation-hero-stat">
                            <span className="content-creation-stat-number">10M+</span>
                            <span className="content-creation-stat-label">Content Pieces Generated</span>
                        </div>
                        <div className="content-creation-hero-stat">
                            <span className="content-creation-stat-number">95%</span>
                            <span className="content-creation-stat-label">Client Satisfaction</span>
                        </div>
                        <div className="content-creation-hero-stat">
                            <span className="content-creation-stat-number">3x</span>
                            <span className="content-creation-stat-label">Faster Production</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation Tabs */}
            <section className="content-creation-navigation-section">
                <div className="content-creation-nav-container">
                    <div className="content-creation-nav-tabs">
                        {[
                            { id: 'overview', label: 'Overview', icon: <Globe /> },
                            { id: 'capabilities', label: 'AI Capabilities', icon: <Brain /> },
                            { id: 'process', label: 'Process', icon: <Target /> },
                            { id: 'benefits', label: 'Benefits', icon: <TrendingUp /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                className={`content-creation-nav-tab ${activeTab === tab.id ? 'content-creation-nav-tab-active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dynamic Content Based on Active Tab */}
            {activeTab === 'overview' && (
                <section className="content-creation-overview-section">
                    <div className="content-creation-section-header">
                        <h2 className="content-creation-section-title">Content Types We Master</h2>
                        <p className="content-creation-section-subtitle">
                            Our AI creates diverse content formats optimized for different platforms and audiences
                        </p>
                    </div>

                    <div className="content-creation-types-grid">
                        {contentTypes.map((type, index) => (
                            <div key={index} className={`content-creation-type-card ${animationTrigger ? 'content-creation-card-animated' : ''}`}>
                                <div className="content-creation-type-header">
                                    {type.icon}
                                    <h3 className="content-creation-type-title">{type.title}</h3>
                                </div>
                                <p className="content-creation-type-description">{type.description}</p>
                                <ul className="content-creation-type-features">
                                    {type.features.map((feature, idx) => (
                                        <li key={idx} className="content-creation-type-feature">
                                            <CheckCircle className="content-creation-feature-icon" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {activeTab === 'capabilities' && (
                <section className="content-creation-capabilities-section">
                    <div className="content-creation-section-header">
                        <h2 className="content-creation-section-title">Advanced AI Capabilities</h2>
                        <p className="content-creation-section-subtitle">
                            Cutting-edge technology that understands context, brand voice, and audience preferences
                        </p>
                    </div>

                    <div className="content-creation-capabilities-container">
                        {aiCapabilities.map((capability, index) => (
                            <div key={index} className="content-creation-capability-item">
                                <div className="content-creation-capability-content">
                                    <div className="content-creation-capability-header">
                                        {capability.icon}
                                        <h3 className="content-creation-capability-title">{capability.title}</h3>
                                    </div>
                                    <p className="content-creation-capability-description">{capability.description}</p>
                                    <div className="content-creation-capability-stat">
                                        <span className="content-creation-stat-highlight">{capability.stats}</span>
                                    </div>
                                </div>
                                <div className="content-creation-capability-visual">
                                    <div className="content-creation-capability-pattern"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {activeTab === 'process' && (
                <section className="content-creation-process-section">
                    <div className="content-creation-section-header">
                        <h2 className="content-creation-section-title">Our Content Creation Process</h2>
                        <p className="content-creation-section-subtitle">
                            A systematic approach that ensures consistent, high-quality content every time
                        </p>
                    </div>

                    <div className="content-creation-process-timeline">
                        {processSteps.map((step, index) => (
                            <div key={index} className="content-creation-process-step">
                                <div className="content-creation-step-number">{step.step}</div>
                                <div className="content-creation-step-content">
                                    <h3 className="content-creation-step-title">{step.title}</h3>
                                    <p className="content-creation-step-description">{step.description}</p>
                                </div>
                                {index < processSteps.length - 1 && (
                                    <div className="content-creation-step-connector"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {activeTab === 'benefits' && (
                <section className="content-creation-benefits-section">
                    <div className="content-creation-section-header">
                        <h2 className="content-creation-section-title">Measurable Results</h2>
                        <p className="content-creation-section-subtitle">
                            See the impact of AI-powered content creation on your business metrics
                        </p>
                    </div>

                    <div className="content-creation-benefits-grid">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="content-creation-benefit-card">
                                <div className="content-creation-benefit-icon-container">
                                    {benefit.icon}
                                </div>
                                <div className="content-creation-benefit-stat-container">
                                    <span className="content-creation-benefit-stat">{benefit.stat}</span>
                                    <span className="content-creation-benefit-stat-symbol">%</span>
                                </div>
                                <h3 className="content-creation-benefit-title">{benefit.title}</h3>
                                <p className="content-creation-benefit-description">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Call to Action Section */}
            <section className="content-creation-cta-section">
                <div className="content-creation-cta-background">
                    <div className="content-creation-cta-pattern"></div>
                </div>
                <div className="content-creation-cta-content">
                    <h2 className="content-creation-cta-title">Ready to Transform Your Content Strategy?</h2>
                    <p className="content-creation-cta-description">
                        Join thousands of businesses that have revolutionized their content creation process with AI.
                        Start creating compelling, data-driven content that drives real results.
                    </p>
                    <div className="content-creation-cta-buttons">
                        <button className="content-creation-cta-primary-btn">
                            <Lightbulb className="content-creation-cta-btn-icon" />
                            Start Free Trial
                        </button>
                        <button className="content-creation-cta-secondary-btn" onClick={() => navigate("/ScheduleDemo")}>
                            <Users className="content-creation-cta-btn-icon" />
                            Schedule Demo
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContentCreation;