import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Search, TrendingUp, Target, BarChart3, Globe, Zap, Eye, Users, ArrowRight, CheckCircle, Star, PlayCircle } from 'lucide-react';

const SearchMarketing = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('seo');
  const [counters, setCounters] = useState({ searches: 0, businesses: 0, revenue: 0 });
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const animateCounters = () => {
      const targetValues = { searches: 8500000000, businesses: 5600000, revenue: 284 };
      const duration = 2000;
      const steps = 60;
      let current = { searches: 0, businesses: 0, revenue: 0 };

      const increment = {
        searches: targetValues.searches / steps,
        businesses: targetValues.businesses / steps,
        revenue: targetValues.revenue / steps
      };

      const timer = setInterval(() => {
        current.searches = Math.min(current.searches + increment.searches, targetValues.searches);
        current.businesses = Math.min(current.businesses + increment.businesses, targetValues.businesses);
        current.revenue = Math.min(current.revenue + increment.revenue, targetValues.revenue);

        setCounters({
          searches: Math.floor(current.searches),
          businesses: Math.floor(current.businesses),
          revenue: Math.floor(current.revenue)
        });

        if (current.searches >= targetValues.searches && 
            current.businesses >= targetValues.businesses && 
            current.revenue >= targetValues.revenue) {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const seoStrategies = [
    {
      title: "Technical SEO Optimization",
      description: "Advanced website architecture optimization including Core Web Vitals, mobile-first indexing, structured data markup, and crawlability improvements for maximum search engine visibility.",
      icon: <Target className="search-marketing-strategy-icon" />,
      metrics: "Up to 150% improvement in organic visibility"
    },
    {
      title: "Content Strategy & Creation",
      description: "Data-driven content strategies focusing on search intent, semantic SEO, topic clusters, and E-A-T optimization to establish topical authority and drive qualified organic traffic.",
      icon: <Eye className="search-marketing-strategy-icon" />,
      metrics: "Average 300% increase in organic traffic"
    },
    {
      title: "Link Building & Authority",
      description: "Strategic link acquisition through digital PR, resource page outreach, broken link building, and authoritative content partnerships to build domain authority and rankings.",
      icon: <TrendingUp className="search-marketing-strategy-icon" />,
      metrics: "Domain Authority increase of 15-25 points"
    }
  ];

  const semStrategies = [
    {
      title: "PPC Campaign Optimization",
      description: "Advanced Google Ads and Bing Ads management with AI-powered bid strategies, audience targeting, ad extensions optimization, and conversion tracking for maximum ROI.",
      icon: <Zap className="search-marketing-strategy-icon" />,
      metrics: "Average 200% ROI improvement"
    },
    {
      title: "Shopping Ads Management",
      description: "E-commerce focused Google Shopping campaigns with product feed optimization, competitive bidding strategies, and advanced segmentation for retail success.",
      icon: <BarChart3 className="search-marketing-strategy-icon" />,
      metrics: "Up to 400% increase in product sales"
    },
    {
      title: "Local Search Advertising",
      description: "Location-based PPC campaigns with geo-targeting, local ad extensions, call tracking, and store visit optimization for brick-and-mortar businesses.",
      icon: <Globe className="search-marketing-strategy-icon" />,
      metrics: "300% increase in local conversions"
    }
  ];

  const predictions2024 = [
    {
      trend: "AI-Powered Search Experience",
      impact: "High",
      description: "Google's SGE (Search Generative Experience) and ChatGPT integration will revolutionize how users discover information, requiring new optimization strategies for AI-generated results.",
      timeline: "Q2 2024 - Q1 2025"
    },
    {
      trend: "Voice & Visual Search Dominance",
      impact: "Medium",
      description: "Voice search queries will account for 55% of all searches, while visual search through Google Lens will grow by 400%, changing keyword strategy fundamentals.",
      timeline: "Throughout 2024"
    },
    {
      trend: "Core Web Vitals Evolution",
      impact: "High",
      description: "New performance metrics focusing on interaction to next paint (INP) and first input delay improvements will become crucial ranking factors.",
      timeline: "Q3 2024"
    },
    {
      trend: "Privacy-First Attribution",
      impact: "High",
      description: "Third-party cookie deprecation will require advanced first-party data strategies and server-side tracking implementations for accurate measurement.",
      timeline: "Q4 2024"
    }
  ];

  const toolsData = [
    { name: "Google Search Console", category: "SEO", rating: 5, price: "Free" },
    { name: "SEMrush", category: "SEO & SEM", rating: 5, price: "$119/month" },
    { name: "Ahrefs", category: "SEO", rating: 5, price: "$99/month" },
    { name: "Google Ads", category: "SEM", rating: 5, price: "Variable" },
    { name: "Screaming Frog", category: "Technical SEO", rating: 4, price: "$259/year" },
    { name: "BrightEdge", category: "Enterprise SEO", rating: 4, price: "Custom" }
  ];

  return (
    <div className={`search-marketing-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Hero Section */}
      <section className="search-marketing-hero-section">
        <div className="search-marketing-hero-background">
          <div className="search-marketing-floating-element search-marketing-float-1"></div>
          <div className="search-marketing-floating-element search-marketing-float-2"></div>
          <div className="search-marketing-floating-element search-marketing-float-3"></div>
        </div>
        
        <div className="search-marketing-hero-content">
          <div className="search-marketing-hero-text">
            <h1 className="search-marketing-hero-title">
              Master Search Marketing
              <span className="search-marketing-gradient-text"> with AI Intelligence</span>
            </h1>
            <p className="search-marketing-hero-subtitle">
              Dominate search results with cutting-edge SEO and SEM strategies powered by artificial intelligence. 
              Drive qualified traffic, increase conversions, and maximize your digital presence across all search platforms.
            </p>
            <div className="search-marketing-hero-buttons">
              <button className="search-marketing-primary-btn">
                <PlayCircle size={20} />
                Start Free Analysis
              </button>
              <button className="search-marketing-secondary-btn">
                View Case Studies
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          
          <div className="search-marketing-hero-visual">
            <div className="search-marketing-3d-card">
              <div className="search-marketing-card-content">
                <Search className="search-marketing-hero-icon" />
                <div className="search-marketing-metrics">
                  <div className="search-marketing-metric">
                    <span className="search-marketing-metric-value">{formatNumber(counters.searches)}</span>
                    <span className="search-marketing-metric-label">Daily Searches</span>
                  </div>
                  <div className="search-marketing-metric">
                    <span className="search-marketing-metric-value">{formatNumber(counters.businesses)}</span>
                    <span className="search-marketing-metric-label">Businesses Online</span>
                  </div>
                  <div className="search-marketing-metric">
                    <span className="search-marketing-metric-value">${counters.revenue}B</span>
                    <span className="search-marketing-metric-label">Search Revenue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs Section */}
      <section className="search-marketing-services-section">
        <div className="search-marketing-section-header">
          <h2 className="search-marketing-section-title">
            Comprehensive Search Marketing Solutions
          </h2>
          <p className="search-marketing-section-subtitle">
            Choose between organic growth through SEO or immediate results with SEM. 
            Our AI-powered approach delivers measurable results across all search channels.
          </p>
        </div>

        <div className="search-marketing-tabs-container">
          <div className="search-marketing-tabs-nav">
            <button 
              className={`search-marketing-tab-btn ${activeTab === 'seo' ? 'active' : ''}`}
              onClick={() => setActiveTab('seo')}
            >
              <TrendingUp size={20} />
              SEO Services
            </button>
            <button 
              className={`search-marketing-tab-btn ${activeTab === 'sem' ? 'active' : ''}`}
              onClick={() => setActiveTab('sem')}
            >
              <Zap size={20} />
              SEM Services
            </button>
          </div>

          <div className="search-marketing-tabs-content">
            {activeTab === 'seo' && (
              <div className="search-marketing-strategies-grid">
                {seoStrategies.map((strategy, index) => (
                  <div key={index} className="search-marketing-strategy-card">
                    <div className="search-marketing-strategy-header">
                      {strategy.icon}
                      <h3>{strategy.title}</h3>
                    </div>
                    <p className="search-marketing-strategy-description">
                      {strategy.description}
                    </p>
                    <div className="search-marketing-strategy-metrics">
                      <span>{strategy.metrics}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'sem' && (
              <div className="search-marketing-strategies-grid">
                {semStrategies.map((strategy, index) => (
                  <div key={index} className="search-marketing-strategy-card">
                    <div className="search-marketing-strategy-header">
                      {strategy.icon}
                      <h3>{strategy.title}</h3>
                    </div>
                    <p className="search-marketing-strategy-description">
                      {strategy.description}
                    </p>
                    <div className="search-marketing-strategy-metrics">
                      <span>{strategy.metrics}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Predictions Section */}
      <section className="search-marketing-predictions-section">
        <div className="search-marketing-section-header">
          <h2 className="search-marketing-section-title">
            2024-2025 Search Marketing Predictions
          </h2>
          <p className="search-marketing-section-subtitle">
            Stay ahead of the curve with our AI-powered insights into the future of search marketing. 
            These predictions are based on current trends, algorithm updates, and industry developments.
          </p>
        </div>

        <div className="search-marketing-predictions-grid">
          {predictions2024.map((prediction, index) => (
            <div key={index} className="search-marketing-prediction-card">
              <div className="search-marketing-prediction-header">
                <h3>{prediction.trend}</h3>
                <span className={`search-marketing-impact-badge ${prediction.impact.toLowerCase()}`} style={{marginLeft:"-1rem"}}>
                  {prediction.impact} Impact
                </span>
              </div>
              <p className="search-marketing-prediction-description">
                {prediction.description}
              </p>
              <div className="search-marketing-prediction-timeline">
                <span>Timeline: {prediction.timeline}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="search-marketing-tools-section">
        <div className="search-marketing-section-header">
          <h2 className="search-marketing-section-title">
            Professional Tools & Resources
          </h2>
          <p className="search-marketing-section-subtitle">
            Industry-leading tools and platforms we use to deliver exceptional search marketing results. 
            Each tool is carefully selected for its capability to drive measurable performance improvements.
          </p>
        </div>

        <div className="search-marketing-tools-grid">
          {toolsData.map((tool, index) => (
            <div key={index} className="search-marketing-tool-card">
              <div className="search-marketing-tool-header">
                <h4>{tool.name}</h4>
                <div className="search-marketing-tool-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`search-marketing-star ${i < tool.rating ? 'filled' : ''}`} 
                    />
                  ))}
                </div>
              </div>
              <div className="search-marketing-tool-info">
                <span className="search-marketing-tool-category">{tool.category}</span>
                <span className="search-marketing-tool-price">{tool.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="search-marketing-process-section">
        <div className="search-marketing-section-header">
          <h2 className="search-marketing-section-title">
            Our Proven Search Marketing Process
          </h2>
          <p className="search-marketing-section-subtitle">
            A systematic approach to search marketing success, combining data-driven insights 
            with creative strategies to deliver consistent, measurable results.
          </p>
        </div>

        <div className="search-marketing-process-timeline">
          <div className="search-marketing-process-step">
            <div className="search-marketing-step-number">01</div>
            <div className="search-marketing-step-content">
              <h3>Comprehensive Audit & Analysis</h3>
              <p>Deep-dive analysis of your current search presence, competitive landscape, technical infrastructure, and market opportunities using advanced SEO and SEM auditing tools.</p>
            </div>
          </div>
          
          <div className="search-marketing-process-step">
            <div className="search-marketing-step-number">02</div>
            <div className="search-marketing-step-content">
              <h3>Strategic Planning & Roadmap</h3>
              <p>Development of customized search marketing strategy with clear objectives, KPIs, timeline, and resource allocation based on your business goals and market analysis.</p>
            </div>
          </div>
          
          <div className="search-marketing-process-step">
            <div className="search-marketing-step-number">03</div>
            <div className="search-marketing-step-content">
              <h3>Implementation & Optimization</h3>
              <p>Execute the strategy across all search channels with continuous optimization based on real-time data, A/B testing, and performance monitoring for maximum ROI.</p>
            </div>
          </div>
          
          <div className="search-marketing-process-step">
            <div className="search-marketing-step-number">04</div>
            <div className="search-marketing-step-content">
              <h3>Monitoring & Reporting</h3>
              <p>Comprehensive performance tracking with detailed reporting, insights, and recommendations for continued growth and adaptation to algorithm changes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="search-marketing-cta-section">
        <div className="search-marketing-cta-content">
          <h2 className="search-marketing-cta-title">
            Ready to Dominate Search Results?
          </h2>
          <p className="search-marketing-cta-subtitle">
            Join thousands of businesses that trust our AI-powered search marketing solutions. 
            Get your free consultation and discover your search potential today.
          </p>
          <div className="search-marketing-cta-buttons">
            <button className="search-marketing-cta-primary">
              Get Free Consultation
            </button>
            <button className="search-marketing-cta-secondary">
              View Pricing Plans
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchMarketing;