import React, { useState, useEffect, useContext, useRef } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import {
    Sparkles, TrendingUp, Target, Zap, Brain, BarChart3,
    ArrowRight, CheckCircle, Star, Users, Globe, Shield,
    Rocket, Lightbulb, Bot, MessageSquare, PieChart, Award,
    Clock, DollarSign, Eye, MousePointer, ShoppingCart, Share2,
    Mail, ShoppingBag, Database, ThumbsUp, Camera, MessageCircle
} from 'lucide-react';

const MarketingAIHomepage = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const heroRef = useRef(null);

    // Static data arrays
    const heroContent = {
        title: "Transform Your Marketing with Artificial Intelligence",
        subtitle: "AI-Powered Marketing Platform",
        description: "Leverage cutting-edge AI technology to automate campaigns, generate compelling content, analyze customer behavior, and optimize ROI. Experience the future of marketing today with our comprehensive suite of intelligent tools designed for modern businesses."
    };

    const features = [
        {
            title: 'AI Content Generation',
            description: 'Create engaging blog posts, social media content, ad copy, and email campaigns in seconds using advanced natural language processing.',
            icon: 'Brain'
        },
        {
            title: 'Predictive Analytics',
            description: 'Forecast customer behavior, campaign performance, and market trends with machine learning algorithms.',
            icon: 'BarChart3'
        },
        {
            title: 'Smart Automation',
            description: 'Automate repetitive marketing tasks including email sequences, social media posting, and lead nurturing.',
            icon: 'Zap'
        },
        {
            title: 'Customer Segmentation',
            description: 'Automatically segment your audience based on behavior, demographics, and engagement patterns.',
            icon: 'Users'
        },
        {
            title: 'Sentiment Analysis',
            description: 'Monitor brand perception and customer sentiment across all channels using natural language understanding.',
            icon: 'MessageSquare'
        },
        {
            title: 'Performance Optimization',
            description: 'Continuously optimize campaigns using reinforcement learning algorithms that test variations.',
            icon: 'TrendingUp'
        }
    ];

    const statistics = [
        { label: 'Active Users', value: '50K+', icon: 'Users' },
        { label: 'AI Models', value: '100+', icon: 'Brain' },
        { label: 'Success Rate', value: '98%', icon: 'TrendingUp' },
        { label: 'Time Saved', value: '10hrs/week', icon: 'Clock' }
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            position: 'CMO',
            company: 'TechCorp Inc',
            feedback: 'Marketing AI has completely transformed our approach to digital marketing. We\'ve seen a 300% increase in lead quality and reduced our content creation time by 75%.',
            rating: 5
        },
        {
            name: 'Michael Chen',
            position: 'Marketing Director',
            company: 'Growth Solutions',
            feedback: 'The automation capabilities are incredible. We\'re now running 10x more campaigns with the same team size.',
            rating: 5
        },
        {
            name: 'Emily Rodriguez',
            position: 'VP of Marketing',
            company: 'Innovation Labs',
            feedback: 'Best investment we\'ve made in marketing technology. The customer segmentation has helped us achieve a 180% improvement in email open rates.',
            rating: 5
        }
    ];

    const useCases = [
        {
            title: 'E-commerce Marketing',
            description: 'Drive sales with personalized product recommendations and automated cart abandonment campaigns.',
            icon: 'ShoppingCart'
        },
        {
            title: 'B2B Lead Generation',
            description: 'Identify and nurture high-quality leads with AI-powered scoring and automated outreach.',
            icon: 'Target'
        },
        {
            title: 'Social Media Management',
            description: 'Schedule, analyze, and optimize social media campaigns across all platforms from one dashboard.',
            icon: 'Share2'
        },
        {
            title: 'Email Marketing',
            description: 'Create hyper-personalized email campaigns that convert with AI-driven content optimization.',
            icon: 'Mail'
        }
    ];

    const integrations = [
        { name: 'Shopify', icon: 'ShoppingBag' },
        { name: 'Salesforce', icon: 'Database' },
        { name: 'Google Analytics', icon: 'BarChart3' },
        { name: 'Mailchimp', icon: 'Mail' },
        { name: 'Facebook Ads', icon: 'ThumbsUp' },
        { name: 'Instagram', icon: 'Camera' },
        { name: 'Slack', icon: 'MessageCircle' },
        { name: 'HubSpot', icon: 'PieChart' }
    ];

    const benefits = [
        {
            title: 'Increase ROI',
            value: '247%',
            description: 'Average ROI increase for our customers'
        },
        {
            title: 'Time Saved',
            value: '15hrs',
            description: 'Per week on marketing tasks'
        },
        {
            title: 'Cost Reduction',
            value: '45%',
            description: 'In marketing operational costs'
        },
        {
            title: 'Conversion Boost',
            value: '189%',
            description: 'Average increase in conversion rates'
        }
    ];

    const team = [
        {
            name: 'Alex Thompson',
            role: 'CEO & Founder',
            bio: 'Former Google AI research lead with 15+ years in marketing technology.',
            avatar: 'A'
        },
        {
            name: 'Maria Garcia',
            role: 'Head of Product',
            bio: 'Product management expert with deep experience in SaaS and AI platforms.',
            avatar: 'M'
        },
        {
            name: 'David Kim',
            role: 'AI Research Lead',
            bio: 'PhD in Machine Learning from Stanford, specializing in NLP and predictive analytics.',
            avatar: 'D'
        }
    ];

    const faqs = [
        {
            question: 'How does the AI content generation work?',
            answer: 'Our AI analyzes your brand voice, target audience, and industry trends to generate high-quality, SEO-optimized content that resonates with your customers.'
        },
        {
            question: 'Is there a learning curve?',
            answer: 'Our platform is designed for marketers, not data scientists. You can be up and running in under 30 minutes with our intuitive interface.'
        },
        {
            question: 'Can I integrate with my existing tools?',
            answer: 'Yes! We offer 50+ integrations with popular marketing tools, CRMs, and analytics platforms.'
        },
        {
            question: 'How secure is my data?',
            answer: 'We use enterprise-grade security with end-to-end encryption and comply with GDPR, CCPA, and other privacy regulations.'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className={`marketing-ai-homepage-container ${isDarkMode ? 'dark' : 'light'}`}>

            {/* Hero Section */}
            <section className="marketing-ai-homepage-hero" ref={heroRef}>
                <div className="marketing-ai-homepage-hero-bg">
                    <div className="marketing-ai-homepage-hero-gradient"></div>
                    <div className="marketing-ai-homepage-hero-grid"></div>
                </div>

                <div className="marketing-ai-homepage-hero-content">
                    <div className="marketing-ai-homepage-hero-badge">
                        <Sparkles size={16} />
                        <span>{heroContent.subtitle}</span>
                    </div>

                    <h1 className="marketing-ai-homepage-hero-title">
                        {heroContent.title}
                        <span className="marketing-ai-homepage-hero-gradient-text"> Artificial Intelligence</span>
                    </h1>

                    <p className="marketing-ai-homepage-hero-description">
                        {heroContent.description}
                    </p>

                    <div className="marketing-ai-homepage-hero-actions">
                        <button className="marketing-ai-homepage-btn-primary">
                            <span>Start Free Trial</span>
                            <ArrowRight size={20} />
                        </button>
                        <button className="marketing-ai-homepage-btn-secondary">
                            <span>Watch Demo</span>
                        </button>
                    </div>

                    <div className="marketing-ai-homepage-hero-stats">
                        {statistics.map((stat, index) => (
                            <div key={index} className="marketing-ai-homepage-hero-stat">
                                <div className="marketing-ai-homepage-hero-stat-value">{stat.value}</div>
                                <div className="marketing-ai-homepage-hero-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="marketing-ai-homepage-hero-visual">
                    <div className="marketing-ai-homepage-floating-card marketing-ai-homepage-card-1">
                        <Brain size={24} />
                        <span>AI Analytics</span>
                    </div>
                    <div className="marketing-ai-homepage-floating-card marketing-ai-homepage-card-2">
                        <Target size={24} />
                        <span>Smart Targeting</span>
                    </div>
                    <div className="marketing-ai-homepage-floating-card marketing-ai-homepage-card-3">
                        <Zap size={24} />
                        <span>Automation</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-features">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">
                        Powerful AI Features
                    </h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Comprehensive tools designed to revolutionize your marketing strategy and drive exceptional results
                    </p>
                </div>

                <div className="marketing-ai-homepage-features-grid">
                    {features.map((feature, index) => {
                        const IconComponent = {
                            Brain, BarChart3, Zap, Users, MessageSquare, TrendingUp, Target
                        }[feature.icon] || Brain;

                        return (
                            <div
                                key={index}
                                className="marketing-ai-homepage-feature-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="marketing-ai-homepage-feature-icon">
                                    <IconComponent size={28} />
                                </div>
                                <h3 className="marketing-ai-homepage-feature-title">{feature.title}</h3>
                                <p className="marketing-ai-homepage-feature-description">{feature.description}</p>
                                <a href="#" className="marketing-ai-homepage-feature-link">
                                    Learn More <ArrowRight size={16} />
                                </a>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-use-cases">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">Marketing Use Cases</h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Discover how AI can transform different aspects of your marketing strategy
                    </p>
                </div>

                <div className="marketing-ai-homepage-use-cases-grid">
                    {useCases.map((usecase, index) => {
                        const IconComponent = {
                            ShoppingCart, Target, Share2, Mail
                        }[usecase.icon] || Target;

                        return (
                            <div key={index} className="marketing-ai-homepage-use-case-card">
                                <div className="marketing-ai-homepage-use-case-icon">
                                    <IconComponent size={32} />
                                </div>
                                <h3>{usecase.title}</h3>
                                <p>{usecase.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-benefits">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">Proven Results</h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Join thousands of marketers achieving exceptional results with our platform
                    </p>
                </div>

                <div className="marketing-ai-homepage-benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="marketing-ai-homepage-benefit-card">
                            <div className="marketing-ai-homepage-benefit-value">{benefit.value}</div>
                            <h3 className="marketing-ai-homepage-benefit-title">{benefit.title}</h3>
                            <p className="marketing-ai-homepage-benefit-description">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-how-it-works">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">How It Works</h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Get started with AI-powered marketing in three simple steps
                    </p>
                </div>

                <div className="marketing-ai-homepage-steps">
                    <div className="marketing-ai-homepage-step">
                        <div className="marketing-ai-homepage-step-number">1</div>
                        <div className="marketing-ai-homepage-step-content">
                            <h3>Connect Your Data</h3>
                            <p>Integrate your existing marketing tools, CRM, and data sources with our platform.</p>
                        </div>
                        <div className="marketing-ai-homepage-step-icon">
                            <Globe size={40} />
                        </div>
                    </div>

                    <div className="marketing-ai-homepage-step">
                        <div className="marketing-ai-homepage-step-number">2</div>
                        <div className="marketing-ai-homepage-step-content">
                            <h3>Configure AI Models</h3>
                            <p>Set up your marketing goals and let our AI learn your brand voice and customer preferences.</p>
                        </div>
                        <div className="marketing-ai-homepage-step-icon">
                            <Brain size={40} />
                        </div>
                    </div>

                    <div className="marketing-ai-homepage-step">
                        <div className="marketing-ai-homepage-step-number">3</div>
                        <div className="marketing-ai-homepage-step-content">
                            <h3>Launch & Optimize</h3>
                            <p>Deploy campaigns and watch as our AI continuously optimizes performance in real-time.</p>
                        </div>
                        <div className="marketing-ai-homepage-step-icon">
                            <Rocket size={40} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Integrations Section */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-integrations">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">Seamless Integrations</h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Connect with your favorite tools and platforms for a unified marketing ecosystem
                    </p>
                </div>

                <div className="marketing-ai-homepage-integrations-grid">
                    {integrations.map((integration, index) => {
                        const IconComponent = {
                            ShoppingBag, Database, BarChart3, Mail, ThumbsUp, Camera, MessageCircle, PieChart
                        }[integration.icon] || PieChart;

                        return (
                            <div key={index} className="marketing-ai-homepage-integration-item">
                                <IconComponent size={32} />
                                <span>{integration.name}</span>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Team Section */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-team">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">Meet Our Team</h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Experts in AI, marketing, and technology working together to revolutionize digital marketing
                    </p>
                </div>

                <div className="marketing-ai-homepage-team-grid">
                    {team.map((member, index) => (
                        <div key={index} className="marketing-ai-homepage-team-card">
                            <div className="marketing-ai-homepage-team-avatar">
                                {member.avatar}
                            </div>
                            <h3 className="marketing-ai-homepage-team-name">{member.name}</h3>
                            <p className="marketing-ai-homepage-team-role">{member.role}</p>
                            <p className="marketing-ai-homepage-team-bio">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-testimonials">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">
                        Trusted by Marketing Leaders
                    </h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        See what our clients say about transforming their marketing with AI
                    </p>
                </div>

                <div className="marketing-ai-homepage-testimonials-carousel">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`marketing-ai-homepage-testimonial-card ${index === activeTestimonial ? 'marketing-ai-homepage-testimonial-active' : ''
                                }`}
                        >
                            <div className="marketing-ai-homepage-testimonial-rating">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={20} fill="currentColor" />
                                ))}
                            </div>
                            <p className="marketing-ai-homepage-testimonial-text">"{testimonial.feedback}"</p>
                            <div className="marketing-ai-homepage-testimonial-author">
                                <div className="marketing-ai-homepage-testimonial-avatar">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div className="marketing-ai-homepage-testimonial-info">
                                    <div className="marketing-ai-homepage-testimonial-name">{testimonial.name}</div>
                                    <div className="marketing-ai-homepage-testimonial-position">
                                        {testimonial.position} at {testimonial.company}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="marketing-ai-homepage-testimonial-dots">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`marketing-ai-homepage-testimonial-dot ${index === activeTestimonial ? 'marketing-ai-homepage-dot-active' : ''
                                }`}
                            onClick={() => setActiveTestimonial(index)}
                        />
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-faq">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">Frequently Asked Questions</h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Everything you need to know about our AI marketing platform
                    </p>
                </div>

                <div className="marketing-ai-homepage-faq-grid">
                    {faqs.map((faq, index) => (
                        <div key={index} className="marketing-ai-homepage-faq-item">
                            <h3 className="marketing-ai-homepage-faq-question">{faq.question}</h3>
                            <p className="marketing-ai-homepage-faq-answer">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* AI Technology Stack Section - NEW */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-technology">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">Advanced AI Technology Stack</h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Built on cutting-edge AI technologies that power intelligent marketing decisions
                    </p>
                </div>

                <div className="marketing-ai-homepage-technology-grid">
                    {[
                        {
                            title: 'Natural Language Processing',
                            description: 'Advanced NLP models understand and generate human-like content for your marketing needs.',
                            capabilities: ['Content Generation', 'Sentiment Analysis', 'Language Translation'],
                            icon: 'MessageSquare'
                        },
                        {
                            title: 'Machine Learning Algorithms',
                            description: 'Predictive models that learn from your data to optimize campaigns and targeting.',
                            capabilities: ['Predictive Analytics', 'Pattern Recognition', 'Automated Optimization'],
                            icon: 'Brain'
                        },
                        {
                            title: 'Computer Vision',
                            description: 'AI that analyzes visual content to enhance your visual marketing strategies.',
                            capabilities: ['Image Recognition', 'Visual Content Analysis', 'Brand Monitoring'],
                            icon: 'Eye'
                        },
                        {
                            title: 'Deep Learning Networks',
                            description: 'Neural networks that process complex data patterns for superior insights.',
                            capabilities: ['Customer Behavior Analysis', 'Trend Prediction', 'Personalization'],
                            icon: 'TrendingUp'
                        }
                    ].map((tech, index) => {
                        const IconComponent = {
                            MessageSquare, Brain, Eye, TrendingUp
                        }[tech.icon] || Brain;

                        return (
                            <div key={index} className="marketing-ai-homepage-technology-card">
                                <div className="marketing-ai-homepage-technology-icon">
                                    <IconComponent size={32} />
                                </div>
                                <h3>{tech.title}</h3>
                                <p>{tech.description}</p>
                                <div className="marketing-ai-homepage-technology-capabilities">
                                    {tech.capabilities.map((capability, capIndex) => (
                                        <span key={capIndex} className="marketing-ai-homepage-technology-capability">
                                            {capability}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Case Studies Section - NEW */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-case-studies">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">Success Stories & Case Studies</h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Real results from businesses that transformed their marketing with AI
                    </p>
                </div>

                <div className="marketing-ai-homepage-case-studies-grid">
                    {[
                        {
                            company: 'E-Commerce Giant',
                            industry: 'Retail',
                            challenge: 'Low conversion rates and high cart abandonment',
                            solution: 'AI-powered personalized recommendations and automated retargeting',
                            results: [
                                '42% increase in conversion rate',
                                '67% reduction in cart abandonment',
                                '3.5x ROI in first 6 months'
                            ],
                            logo: '🛒'
                        },
                        {
                            company: 'SaaS Platform',
                            industry: 'Technology',
                            challenge: 'Inefficient lead scoring and nurturing',
                            solution: 'AI-driven lead scoring and automated personalized outreach',
                            results: [
                                '215% more qualified leads',
                                '58% faster lead-to-customer conversion',
                                '89% improvement in sales team efficiency'
                            ],
                            logo: '💻'
                        },
                        {
                            company: 'Healthcare Provider',
                            industry: 'Healthcare',
                            challenge: 'Poor patient engagement and communication',
                            solution: 'AI-powered patient communication and personalized health content',
                            results: [
                                '73% improvement in patient engagement',
                                '45% reduction in missed appointments',
                                '4.2x more content engagement'
                            ],
                            logo: '🏥'
                        }
                    ].map((caseStudy, index) => (
                        <div key={index} className="marketing-ai-homepage-case-study-card">
                            <div className="marketing-ai-homepage-case-study-header">
                                <div className="marketing-ai-homepage-case-study-logo">
                                    {caseStudy.logo}
                                </div>
                                <div className="marketing-ai-homepage-case-study-company">
                                    <h3>{caseStudy.company}</h3>
                                    <span>{caseStudy.industry}</span>
                                </div>
                            </div>

                            <div className="marketing-ai-homepage-case-study-content">
                                <div className="marketing-ai-homepage-case-study-challenge">
                                    <h4>Challenge</h4>
                                    <p>{caseStudy.challenge}</p>
                                </div>

                                <div className="marketing-ai-homepage-case-study-solution">
                                    <h4>AI Solution</h4>
                                    <p>{caseStudy.solution}</p>
                                </div>

                                <div className="marketing-ai-homepage-case-study-results">
                                    <h4>Results</h4>
                                    <ul>
                                        {caseStudy.results.map((result, resultIndex) => (
                                            <li key={resultIndex}>{result}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Security & Compliance Section - NEW */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-security">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">Enterprise-Grade Security & Compliance</h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Your data is protected with military-grade security and full regulatory compliance
                    </p>
                </div>

                <div className="marketing-ai-homepage-security-grid">
                    <div className="marketing-ai-homepage-security-features">
                        {[
                            {
                                title: 'End-to-End Encryption',
                                description: 'All data encrypted in transit and at rest with AES-256 encryption',
                                icon: 'Shield'
                            },
                            {
                                title: 'GDPR & CCPA Compliant',
                                description: 'Full compliance with global data protection regulations',
                                icon: 'Globe'
                            },
                            {
                                title: 'SOC 2 Type II Certified',
                                description: 'Enterprise-level security and privacy controls',
                                icon: 'Award'
                            },
                            {
                                title: 'Regular Security Audits',
                                description: 'Continuous monitoring and third-party security assessments',
                                icon: 'CheckCircle'
                            }
                        ].map((feature, index) => {
                            const IconComponent = {
                                Shield, Globe, Award, CheckCircle
                            }[feature.icon] || Shield;

                            return (
                                <div key={index} className="marketing-ai-homepage-security-feature">
                                    <div className="marketing-ai-homepage-security-icon">
                                        <IconComponent size={24} />
                                    </div>
                                    <div className="marketing-ai-homepage-security-content">
                                        <h4>{feature.title}</h4>
                                        <p>{feature.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="marketing-ai-homepage-compliance-badges">
                        <div className="marketing-ai-homepage-compliance-badge">
                            <Shield size={32} />
                            <span>GDPR Compliant</span>
                        </div>
                        <div className="marketing-ai-homepage-compliance-badge">
                            <Award size={32} />
                            <span>SOC 2 Certified</span>
                        </div>
                        <div className="marketing-ai-homepage-compliance-badge">
                            <Globe size={32} />
                            <span>CCPA Ready</span>
                        </div>
                        <div className="marketing-ai-homepage-compliance-badge">
                            <CheckCircle size={32} />
                            <span>HIPAA Compliant</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing & Plans Section - NEW */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-pricing">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">Simple, Transparent Pricing</h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Choose the plan that fits your business needs. All plans include core AI features.
                    </p>
                </div>

                <div className="marketing-ai-homepage-pricing-grid">
                    {[
                        {
                            name: 'Starter',
                            price: '$99',
                            period: 'per month',
                            description: 'Perfect for small businesses and startups',
                            features: [
                                '5,000 AI content generations',
                                'Basic analytics dashboard',
                                'Email support',
                                '3 user seats',
                                'Standard integrations'
                            ],
                            cta: 'Start Free Trial',
                            popular: false
                        },
                        {
                            name: 'Professional',
                            price: '$299',
                            period: 'per month',
                            description: 'Ideal for growing marketing teams',
                            features: [
                                '25,000 AI content generations',
                                'Advanced analytics & reporting',
                                'Priority support',
                                '10 user seats',
                                'All integrations',
                                'Custom AI models',
                                'API access'
                            ],
                            cta: 'Get Started',
                            popular: true
                        },
                        {
                            name: 'Enterprise',
                            price: 'Custom',
                            period: 'tailored pricing',
                            description: 'For large organizations with complex needs',
                            features: [
                                'Unlimited AI content generations',
                                'Custom analytics dashboard',
                                '24/7 dedicated support',
                                'Unlimited user seats',
                                'White-label solutions',
                                'Custom AI training',
                                'SLA guarantee',
                                'On-premise deployment'
                            ],
                            cta: 'Contact Sales',
                            popular: false
                        }
                    ].map((plan, index) => (
                        <div
                            key={index}
                            className={`marketing-ai-homepage-pricing-card ${plan.popular ? 'marketing-ai-homepage-pricing-popular' : ''}`}
                        >
                            {plan.popular && (
                                <div className="marketing-ai-homepage-pricing-badge">
                                    Most Popular
                                </div>
                            )}

                            <div className="marketing-ai-homepage-pricing-header">
                                <h3>{plan.name}</h3>
                                <div className="marketing-ai-homepage-pricing-price">
                                    <span className="marketing-ai-homepage-pricing-amount">{plan.price}</span>
                                    <span className="marketing-ai-homepage-pricing-period">/{plan.period}</span>
                                </div>
                                <p>{plan.description}</p>
                            </div>

                            <div className="marketing-ai-homepage-pricing-features">
                                {plan.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="marketing-ai-homepage-pricing-feature">
                                        <CheckCircle size={16} />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={`marketing-ai-homepage-btn ${plan.popular ? 'marketing-ai-homepage-btn-primary' : 'marketing-ai-homepage-btn-secondary'}`}>
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Implementation Timeline Section - NEW */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-timeline">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">Quick & Easy Implementation</h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Get up and running with AI-powered marketing in days, not months
                    </p>
                </div>

                <div className="marketing-ai-homepage-timeline-steps">
                    {[
                        {
                            step: 'Day 1',
                            title: 'Onboarding & Setup',
                            description: 'Quick account setup and initial platform configuration',
                            duration: '1-2 hours',
                            icon: 'Rocket'
                        },
                        {
                            step: 'Day 2-3',
                            title: 'Data Integration',
                            description: 'Connect your existing tools and import historical data',
                            duration: '2 days',
                            icon: 'Database'
                        },
                        {
                            step: 'Day 4-5',
                            title: 'AI Model Training',
                            description: 'Our AI learns your brand voice and customer patterns',
                            duration: '2 days',
                            icon: 'Brain'
                        },
                        {
                            step: 'Day 6-7',
                            title: 'First Campaign Launch',
                            description: 'Deploy your first AI-optimized marketing campaign',
                            duration: '2 days',
                            icon: 'Zap'
                        },
                        {
                            step: 'Week 2+',
                            title: 'Ongoing Optimization',
                            description: 'Continuous AI learning and performance improvement',
                            duration: 'Ongoing',
                            icon: 'TrendingUp'
                        }
                    ].map((timeline, index) => {
                        const IconComponent = {
                            Rocket, Database, Brain, Zap, TrendingUp
                        }[timeline.icon] || Rocket;

                        return (
                            <div key={index} className="marketing-ai-homepage-timeline-step">
                                <div className="marketing-ai-homepage-timeline-icon">
                                    <IconComponent size={24} />
                                </div>
                                <div className="marketing-ai-homepage-timeline-content">
                                    <div className="marketing-ai-homepage-timeline-marker">
                                        <span className="marketing-ai-homepage-timeline-step-number">{timeline.step}</span>
                                        <span className="marketing-ai-homepage-timeline-duration">{timeline.duration}</span>
                                    </div>
                                    <h3>{timeline.title}</h3>
                                    <p>{timeline.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* SEO Content Section 1 - About MarketAI Pro */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-seo-about">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">
                        MarketAI Pro - Revolutionizing Digital Marketing with Artificial Intelligence
                    </h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Advanced AI marketing platform that transforms how businesses approach digital marketing strategy and execution
                    </p>
                </div>

                <div className="marketing-ai-homepage-seo-content">
                    <div className="marketing-ai-homepage-seo-text-block">
                        <h3>AI-Powered Marketing Automation Platform</h3>
                        <p>
                            MarketAI Pro is a comprehensive artificial intelligence marketing platform designed to automate and optimize
                            every aspect of your digital marketing strategy. Our AI marketing tools leverage machine learning algorithms,
                            natural language processing, and predictive analytics to deliver unprecedented results in content creation,
                            campaign management, customer segmentation, and ROI optimization.
                        </p>

                        <h3>Intelligent Content Generation & Marketing Automation</h3>
                        <p>
                            Generate high-converting marketing content in seconds with our advanced AI content creation tools. From
                            engaging blog posts and social media captions to compelling email campaigns and ad copy, our platform
                            understands your brand voice and target audience to produce content that drives results. Automate your
                            entire marketing workflow with smart scheduling, audience targeting, and performance optimization.
                        </p>

                        <h3>Predictive Analytics & Customer Insights</h3>
                        <p>
                            Leverage the power of predictive analytics to forecast customer behavior, identify emerging trends, and
                            optimize your marketing spend. Our AI algorithms analyze historical data and real-time interactions to
                            provide actionable insights that improve campaign performance, increase conversion rates, and maximize
                            return on investment across all marketing channels.
                        </p>
                    </div>
                </div>
            </section>

            {/* SEO Content Section 2 - Marketing Solutions */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-solutions">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">
                        Comprehensive AI Marketing Solutions
                    </h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        End-to-end AI-powered marketing tools for every business need
                    </p>
                </div>

                <div className="marketing-ai-homepage-solutions-grid">
                    <div className="marketing-ai-homepage-solution-category">
                        <h3>Content Marketing AI</h3>
                        <p>
                            Transform your content strategy with AI-powered content generation, optimization, and distribution.
                            Create SEO-optimized blog posts, social media content, email campaigns, and advertising copy that
                            resonates with your target audience and drives engagement.
                        </p>
                        <div className="marketing-ai-homepage-solution-tags">
                            <span className="marketing-ai-homepage-solution-tag">AI Copywriting</span>
                            <span className="marketing-ai-homepage-solution-tag">Content Optimization</span>
                            <span className="marketing-ai-homepage-solution-tag">SEO Content</span>
                            <span className="marketing-ai-homepage-solution-tag">Social Media Posts</span>
                        </div>
                    </div>

                    <div className="marketing-ai-homepage-solution-category">
                        <h3>Social Media Automation</h3>
                        <p>
                            Automate your social media marketing with intelligent scheduling, content curation, and performance
                            analytics. Our AI analyzes engagement patterns to optimize posting times and content strategy across
                            all major social platforms.
                        </p>
                        <div className="marketing-ai-homepage-solution-tags">
                            <span className="marketing-ai-homepage-solution-tag">Social Scheduling</span>
                            <span className="marketing-ai-homepage-solution-tag">Content Curation</span>
                            <span className="marketing-ai-homepage-solution-tag">Engagement Analytics</span>
                            <span className="marketing-ai-homepage-solution-tag">Multi-platform Management</span>
                        </div>
                    </div>

                    <div className="marketing-ai-homepage-solution-category">
                        <h3>Email Marketing Intelligence</h3>
                        <p>
                            Create hyper-personalized email campaigns with AI-driven content optimization and send-time optimization.
                            Our platform analyzes subscriber behavior to deliver the right message to the right person at the perfect time.
                        </p>
                        <div className="marketing-ai-homepage-solution-tags">
                            <span className="marketing-ai-homepage-solution-tag">Personalized Emails</span>
                            <span className="marketing-ai-homepage-solution-tag">Send-time Optimization</span>
                            <span className="marketing-ai-homepage-solution-tag">A/B Testing</span>
                            <span className="marketing-ai-homepage-solution-tag">Automated Sequences</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Content Section 3 - Industry Applications */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-industries">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">
                        AI Marketing Solutions for Every Industry
                    </h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Tailored AI marketing strategies for different business verticals and marketing challenges
                    </p>
                </div>

                <div className="marketing-ai-homepage-industries-grid">
                    <div className="marketing-ai-homepage-industry-card">
                        <h3>E-commerce & Retail</h3>
                        <p>
                            Drive sales with AI-powered product recommendations, personalized shopping experiences, and automated
                            cart abandonment campaigns. Optimize product descriptions, ad copy, and customer communication to
                            increase conversion rates and customer lifetime value.
                        </p>
                        <div className="marketing-ai-homepage-industry-features">
                            <span>Personalized Recommendations</span>
                            <span>Cart Recovery Automation</span>
                            <span>Dynamic Pricing</span>
                            <span>Customer Segmentation</span>
                        </div>
                    </div>

                    <div className="marketing-ai-homepage-industry-card">
                        <h3>B2B & SaaS Companies</h3>
                        <p>
                            Accelerate lead generation and customer acquisition with AI-driven account-based marketing,
                            intelligent lead scoring, and personalized outreach automation. Optimize your sales funnel
                            and improve marketing-to-sales alignment with predictive analytics.
                        </p>
                        <div className="marketing-ai-homepage-industry-features">
                            <span>Account-Based Marketing</span>
                            <span>Lead Scoring AI</span>
                            <span>Personalized Outreach</span>
                            <span>Sales Funnel Optimization</span>
                        </div>
                    </div>

                    <div className="marketing-ai-homepage-industry-card">
                        <h3>Agency & Marketing Teams</h3>
                        <p>
                            Scale your agency services with AI-powered tools that enhance creativity, improve efficiency,
                            and deliver better results for clients. Manage multiple campaigns, automate reporting, and
                            provide data-driven recommendations with confidence.
                        </p>
                        <div className="marketing-ai-homepage-industry-features">
                            <span>Campaign Management</span>
                            <span>Automated Reporting</span>
                            <span>Client Collaboration</span>
                            <span>Performance Analytics</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="marketing-ai-homepage-cta">
                <div className="marketing-ai-homepage-cta-content">
                    <h2 className="marketing-ai-homepage-cta-title">
                        Ready to Transform Your Marketing?
                    </h2>
                    <p className="marketing-ai-homepage-cta-description">
                        Join thousands of businesses already using AI to drive growth. Start your 14-day free trial today.
                    </p>
                    <div className="marketing-ai-homepage-cta-actions">
                        <button className="marketing-ai-homepage-btn-primary marketing-ai-homepage-btn-large">
                            <span>Get Started Free</span>
                            <ArrowRight size={20} />
                        </button>
                        <button className="marketing-ai-homepage-btn-secondary marketing-ai-homepage-btn-large">
                            <span>Schedule a Demo</span>
                        </button>
                    </div>
                    <div className="marketing-ai-homepage-cta-features">
                        <div className="marketing-ai-homepage-cta-feature">
                            <CheckCircle size={20} />
                            <span>14-day free trial</span>
                        </div>
                        <div className="marketing-ai-homepage-cta-feature">
                            <CheckCircle size={20} />
                            <span>No credit card required</span>
                        </div>
                        <div className="marketing-ai-homepage-cta-feature">
                            <CheckCircle size={20} />
                            <span>Cancel anytime</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security & Authentication Partners Section */}
            <section className="marketing-ai-homepage-section marketing-ai-homepage-security-partners">
                <div className="marketing-ai-homepage-section-header">
                    <h2 className="marketing-ai-homepage-section-title">
                        Enterprise Security & Authentication
                    </h2>
                    <p className="marketing-ai-homepage-section-subtitle">
                        Protecting your marketing data with advanced security solutions and secure authentication protocols
                    </p>
                </div>

                <div className="marketing-ai-homepage-security-content">
                    <div className="marketing-ai-homepage-security-grid">
                        <div className="marketing-ai-homepage-security-feature">
                            <div className="marketing-ai-homepage-security-icon">
                                <Shield size={32} />
                            </div>
                            <div className="marketing-ai-homepage-security-text">
                                <h3>Data Protection & Security</h3>
                                <p>
                                    We implement enterprise-grade security measures to protect your sensitive marketing data,
                                    customer information, and campaign analytics. All data is encrypted in transit and at rest
                                    using industry-standard protocols.
                                </p>
                            </div>
                        </div>

                        <div className="marketing-ai-homepage-security-feature">
                            <div className="marketing-ai-homepage-security-icon">
                                <Brain size={32} />
                            </div>
                            <div className="marketing-ai-homepage-security-text">
                                <h3>Secure AI Integration</h3>
                                <p>
                                    Our AI models are deployed in secure, isolated environments with strict access controls.
                                    We partner with leading authentication providers like{' '}
                                    <a
                                        href="https://authnester.netlify.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="marketing-ai-homepage-security-link"
                                    >
                                        AuthNest
                                    </a>{' '}
                                    to ensure secure API access and user authentication across all integrated platforms.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="marketing-ai-homepage-partner-showcase">
                        <div className="marketing-ai-homepage-partner-card">
                            <div className="marketing-ai-homepage-partner-header">
                                <div className="marketing-ai-homepage-partner-icon">
                                    🔐
                                </div>
                                <div className="marketing-ai-homepage-partner-info">
                                    <h4>Recommended Authentication Partner</h4>
                                    <p>Secure your applications with enterprise authentication</p>
                                </div>
                            </div>
                            <div className="marketing-ai-homepage-partner-content">
                                <p>
                                    For robust authentication and user management solutions, we recommend{' '}
                                    <strong>
                                        <a
                                            href="https://authnester.netlify.app/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="marketing-ai-homepage-partner-link"
                                        >
                                            AuthNest's authentication platform
                                        </a>
                                    </strong>
                                    . Their comprehensive security features including multi-factor authentication,
                                    single sign-on, and advanced threat detection provide the foundation for secure
                                    application development and data protection.
                                </p>
                                <div className="marketing-ai-homepage-partner-features">
                                    <span className="marketing-ai-homepage-partner-feature">
                                        <CheckCircle size={16} />
                                        Multi-Factor Authentication
                                    </span>
                                    <span className="marketing-ai-homepage-partner-feature">
                                        <CheckCircle size={16} />
                                        API Security
                                    </span>
                                    <span className="marketing-ai-homepage-partner-feature">
                                        <CheckCircle size={16} />
                                        User Management
                                    </span>
                                    <span className="marketing-ai-homepage-partner-feature">
                                        <CheckCircle size={16} />
                                        Enterprise Security
                                    </span>
                                </div>
                                <a
                                    href="https://authnester.netlify.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="marketing-ai-homepage-btn marketing-ai-homepage-btn-outline"
                                >
                                    Learn About AuthNest Security
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="marketing-ai-homepage-security-note">
                        <p>
                            <strong>Security First:</strong> All our AI marketing tools integrate with secure authentication
                            providers to ensure your data remains protected. Explore{' '}
                            <a
                                href="https://authnester.netlify.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="marketing-ai-homepage-security-link"
                            >
                                authentication best practices
                            </a>{' '}
                            for your marketing applications.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MarketingAIHomepage;