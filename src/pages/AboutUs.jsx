import React, { useState, useEffect, useContext } from 'react';
import { Plus, Edit3, Trash2, Users, Target, Award, Zap, Brain, TrendingUp, Globe, Shield, Star } from 'lucide-react';
import Swal from 'sweetalert2';
import { ThemeContext } from '../context/ThemeContext';

const AboutUs = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [aboutData, setAboutData] = useState({
    hero: {
      title: "Revolutionizing Marketing Through AI Innovation",
      subtitle: "Empowering businesses with cutting-edge artificial intelligence solutions that transform marketing strategies and drive unprecedented growth",
      backgroundVideo: "/assets/ai-background.mp4"
    },
    mission: {
      title: "Our Mission",
      description: "To democratize AI-powered marketing solutions, making advanced technology accessible to businesses of all sizes while maintaining human creativity at the core of every strategy."
    },
    vision: {
      title: "Our Vision",
      description: "A world where AI and human creativity seamlessly collaborate to create marketing experiences that are not just effective, but truly meaningful and impactful."
    },
    stats: [
      { id: 1, number: "10,000+", label: "Campaigns Optimized", icon: <Target /> },
      { id: 2, number: "500+", label: "Happy Clients", icon: <Users /> },
      { id: 3, number: "95%", label: "Success Rate", icon: <Award /> },
      { id: 4, number: "24/7", label: "AI Processing", icon: <Zap /> }
    ],
    features: [
      {
        id: 1,
        title: "Predictive Analytics",
        description: "Harness the power of machine learning to predict customer behavior, market trends, and campaign performance with unprecedented accuracy.",
        icon: <Brain />,
        benefits: ["Advanced forecasting models", "Real-time trend analysis", "Customer behavior prediction", "ROI optimization"]
      },
      {
        id: 2,
        title: "Intelligent Automation",
        description: "Automate repetitive marketing tasks while maintaining personalization and brand consistency across all channels and touchpoints.",
        icon: <Zap />,
        benefits: ["Smart content generation", "Automated A/B testing", "Dynamic personalization", "Cross-platform synchronization"]
      },
      {
        id: 3,
        title: "Performance Optimization",
        description: "Continuously optimize campaigns in real-time using AI algorithms that learn from every interaction and adapt strategies accordingly.",
        icon: <TrendingUp />,
        benefits: ["Real-time optimization", "Multi-channel analytics", "Conversion rate improvement", "Cost reduction strategies"]
      },
      {
        id: 4,
        title: "Global Reach",
        description: "Scale your marketing efforts globally with AI-powered localization, cultural adaptation, and international market insights.",
        icon: <Globe />,
        benefits: ["Multi-language support", "Cultural adaptation", "Global market analysis", "International compliance"]
      }
    ],
    team: [
      {
        id: 1,
        name: "Sarah Chen",
        position: "Chief AI Officer",
        bio: "PhD in Machine Learning from MIT with 15+ years in AI research and development. Pioneer in marketing automation technologies.",
        image: "/assets/team/sarah-chen.jpg",
        specialties: ["Machine Learning", "Natural Language Processing", "Predictive Analytics"]
      },
      {
        id: 2,
        name: "Michael Rodriguez",
        position: "Head of Marketing Strategy",
        bio: "Former VP at Fortune 500 companies with expertise in digital transformation and AI-driven marketing solutions.",
        image: "/assets/team/michael-rodriguez.jpg",
        specialties: ["Digital Strategy", "Brand Development", "Market Research"]
      },
      {
        id: 3,
        name: "Emily Watson",
        position: "Lead Data Scientist",
        bio: "Expert in big data analytics and consumer behavior modeling with a track record of successful AI implementations.",
        image: "/assets/team/emily-watson.jpg",
        specialties: ["Data Analytics", "Consumer Psychology", "Algorithm Development"]
      }
    ],
    testimonials: [
      {
        id: 1,
        name: "David Thompson",
        company: "TechStart Inc.",
        position: "CMO",
        content: "Marketing AI transformed our approach completely. We saw a 300% increase in lead quality and 150% improvement in conversion rates within the first quarter.",
        rating: 5,
        image: "/assets/testimonials/david-thompson.jpg"
      },
      {
        id: 2,
        name: "Lisa Park",
        company: "E-commerce Solutions",
        position: "Marketing Director",
        content: "The predictive analytics capabilities are game-changing. We can now anticipate market trends months in advance and adjust our strategies accordingly.",
        rating: 5,
        image: "/assets/testimonials/lisa-park.jpg"
      }
    ],
    timeline: [
      {
        id: 1,
        year: "2019",
        title: "Foundation",
        description: "Founded with the vision to democratize AI in marketing, starting with a team of 5 passionate AI researchers and marketing experts."
      },
      {
        id: 2,
        year: "2020",
        title: "First AI Model Launch",
        description: "Released our first predictive analytics model, helping 100+ businesses optimize their marketing campaigns during the pandemic."
      },
      {
        id: 3,
        year: "2021",
        title: "Series A Funding",
        description: "Secured $10M Series A funding to expand our AI capabilities and build a world-class engineering team."
      },
      {
        id: 4,
        year: "2022",
        title: "Global Expansion",
        description: "Expanded internationally, serving clients across 25 countries with localized AI marketing solutions."
      },
      {
        id: 5,
        year: "2023",
        title: "AI Innovation Award",
        description: "Received the 'Most Innovative AI Solution' award at the Global Marketing Technology Summit."
      },
      {
        id: 6,
        year: "2024",
        title: "Platform Evolution",
        description: "Launched our next-generation AI platform with advanced neural networks and real-time optimization capabilities."
      }
    ],
    values: [
      {
        id: 1,
        title: "Innovation First",
        description: "We constantly push the boundaries of what's possible with AI technology, staying ahead of industry trends and emerging technologies.",
        icon: <Zap />
      },
      {
        id: 2,
        title: "Data Privacy",
        description: "We prioritize data security and privacy, ensuring all customer information is protected with enterprise-grade security measures.",
        icon: <Shield />
      },
      {
        id: 3,
        title: "Customer Success",
        description: "Our success is measured by our clients' success. We're committed to delivering measurable results and exceptional support.",
        icon: <Star />
      },
      {
        id: 4,
        title: "Ethical AI",
        description: "We develop AI solutions that are fair, transparent, and beneficial to society, avoiding bias and promoting inclusive practices.",
        icon: <Brain />
      }
    ]
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading from API
    setTimeout(() => {
      setIsLoading(false);
      initializeAnimations();
    }, 1000);
  }, []);

  const initializeAnimations = () => {
    // Initialize anime.js animations
    if (typeof anime !== 'undefined') {
      // Hero section animation
      anime({
        targets: '.marketing-ai-hero-content-wrapper',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuart'
      });

      // Stats animation
      anime({
        targets: '.marketing-ai-stat-item',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutElastic(1, .8)'
      });

      // Features stagger animation
      anime({
        targets: '.marketing-ai-feature-card',
        translateX: [-30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(150),
        easing: 'easeOutQuart'
      });

      // Timeline animation
      anime({
        targets: '.marketing-ai-timeline-item',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 500,
        delay: anime.stagger(100),
        easing: 'easeOutQuart'
      });
    }
  };









  if (isLoading) {
    return (
      <div className={`marketing-ai-loading-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="marketing-ai-loading-spinner"></div>
        <p className="marketing-ai-loading-text">Loading amazing content...</p>
      </div>
    );
  }

  return (
    <div className={`marketing-ai-about-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Hero Section */}
      <section className="marketing-ai-hero-section">
        <div className="marketing-ai-hero-background">
          <div className="marketing-ai-hero-overlay"></div>
        </div>
        <div className="marketing-ai-hero-content-wrapper">
          <div className="marketing-ai-admin-controls">
           
          </div>
          <h1 className="marketing-ai-hero-title">{aboutData.hero.title}</h1>
          <p className="marketing-ai-hero-subtitle">{aboutData.hero.subtitle}</p>
          <div className="marketing-ai-hero-cta-buttons">
            <button className="marketing-ai-primary-btn">Get Started</button>
            <button className="marketing-ai-secondary-btn">Learn More</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="marketing-ai-stats-section">
        <div className="marketing-ai-container">
          <div className="marketing-ai-stats-grid">
            {aboutData.stats.map((stat) => (
              <div key={stat.id} className="marketing-ai-stat-item">
                <div className="marketing-ai-stat-icon">{stat.icon}</div>
                <div className="marketing-ai-stat-number">{stat.number}</div>
                <div className="marketing-ai-stat-label">{stat.label}</div>
                <div className="marketing-ai-admin-controls">
                 
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Mission & Vision */}
      <section className="marketing-ai-mission-vision-section">
        <div className="marketing-ai-container">
          <div className="marketing-ai-mission-vision-grid">
            <div className="marketing-ai-mission-card">
             
              <h2 className="marketing-ai-card-title">{aboutData.mission.title}</h2>
              <p className="marketing-ai-card-description">{aboutData.mission.description}</p>
            </div>
            <div className="marketing-ai-vision-card">
              
              <h2 className="marketing-ai-card-title">{aboutData.vision.title}</h2>
              <p className="marketing-ai-card-description">{aboutData.vision.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="marketing-ai-features-section">
        <div className="marketing-ai-container">
          <h2 className="marketing-ai-section-title">Our AI-Powered Solutions</h2>
          <p className="marketing-ai-section-subtitle">
            Discover how our cutting-edge artificial intelligence transforms traditional marketing approaches
          </p>
          <div className="marketing-ai-features-grid">
            {aboutData.features.map((feature) => (
              <div key={feature.id} className="marketing-ai-feature-card">
                
                <div className="marketing-ai-feature-icon">{feature.icon}</div>
                <h3 className="marketing-ai-feature-title">{feature.title}</h3>
                <p className="marketing-ai-feature-description">{feature.description}</p>
                <ul className="marketing-ai-feature-benefits">
                  {feature.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* Timeline Section */}
      <section className="marketing-ai-timeline-section">
        <div className="marketing-ai-container">
          <h2 className="marketing-ai-section-title">Our Journey</h2>
          <div className="marketing-ai-timeline-wrapper">
            {aboutData.timeline.map((item, index) => (
              <div key={item.id} className="marketing-ai-timeline-item">
               
                <div className="marketing-ai-timeline-marker"></div>
                <div className="marketing-ai-timeline-content">
                  <div className="marketing-ai-timeline-year">{item.year}</div>
                  <h3 className="marketing-ai-timeline-title">{item.title}</h3>
                  <p className="marketing-ai-timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
         
        </div>
      </section>

      {/* Team Section */}
      <section className="marketing-ai-team-section">
        <div className="marketing-ai-container">
          <h2 className="marketing-ai-section-title">Meet Our Experts</h2>
          <p className="marketing-ai-section-subtitle">
            The brilliant minds behind our AI innovations
          </p>
          <div className="marketing-ai-team-grid">
            {aboutData.team.map((member) => (
              <div key={member.id} className="marketing-ai-team-card">
               
                <div className="marketing-ai-team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3 className="marketing-ai-team-name">{member.name}</h3>
                <p className="marketing-ai-team-position">{member.position}</p>
                <p className="marketing-ai-team-bio">{member.bio}</p>
                <div className="marketing-ai-team-specialties">
                  {member.specialties.map((specialty, index) => (
                    <span key={index} className="marketing-ai-specialty-tag">{specialty}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Values Section */}
      <section className="marketing-ai-values-section">
        <div className="marketing-ai-container">
          <h2 className="marketing-ai-section-title">Our Core Values</h2>
          <div className="marketing-ai-values-grid">
            {aboutData.values.map((value) => (
              <div key={value.id} className="marketing-ai-value-card">
                
                <div className="marketing-ai-value-icon">{value.icon}</div>
                <h3 className="marketing-ai-value-title">{value.title}</h3>
                <p className="marketing-ai-value-description">{value.description}</p>
              </div>
            ))}
          </div>
         
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="marketing-ai-testimonials-section">
        <div className="marketing-ai-container">
          <h2 className="marketing-ai-section-title">What Our Clients Say</h2>
          <div className="marketing-ai-testimonials-grid">
            {aboutData.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="marketing-ai-testimonial-card">
               
                <div className="marketing-ai-testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="marketing-ai-testimonial-content">"{testimonial.content}"</p>
                <div className="marketing-ai-testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div className="marketing-ai-author-info">
                    <h4 className="marketing-ai-author-name">{testimonial.name}</h4>
                    <p className="marketing-ai-author-company">{testimonial.position} at {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* CTA Section */}
      <section className="marketing-ai-cta-section">
        <div className="marketing-ai-container">
          <div className="marketing-ai-cta-content">
            <h2 className="marketing-ai-cta-title">Ready to Transform Your Marketing?</h2>
            <p className="marketing-ai-cta-subtitle">
              Join thousands of businesses already leveraging AI to drive unprecedented growth
            </p>
            <div className="marketing-ai-cta-buttons">
              <button className="marketing-ai-primary-btn">Start Free Trial</button>
              <button className="marketing-ai-secondary-btn">Schedule Demo</button>
            </div>
          </div>
        </div>
      </section>

      {/* Load anime.js */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    </div>
  );
};

export default AboutUs;