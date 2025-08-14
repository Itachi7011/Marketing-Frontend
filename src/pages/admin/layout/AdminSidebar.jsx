import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';
import Swal from 'sweetalert2';

import {
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    BarChart3,
    Users,
    Mail,
    Settings,
    Target,
    TrendingUp,
    PieChart,
    MessageSquare,
    Calendar,
    FileText,
    User,
    LogOut,
    Brain,
    Zap,
    Database,
    Globe,
    Shield,
    CreditCard,
    Bell
} from 'lucide-react';

// Mock theme context - replace with your actual ThemeContext

const MarketingAISidebar = () => {
    const navigate = useNavigate();


    const { isDarkMode } = useContext(ThemeContext);
    const [userProfile, setUserProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [marketingAiSidebarExpanded, setMarketingAiSidebarExpanded] = useState(false);
    const [marketingAiDropdownStates, setMarketingAiDropdownStates] = useState({
        analytics: false,
        campaigns: false,
        customers: false,
        content: false,
        automation: false,
        settings: false
    });




    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch('/api/auth/userProfile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
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

    const marketingAiToggleDropdown = (key) => {
        setMarketingAiDropdownStates(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const marketingAiMenuItems = [
        {
            id: 'dashboard',
            title: 'Dashboard',
            icon: <BarChart3 className="marketing-ai-menu-icon" />,
            href: '/admin/dashboard'
        },

        {
            id: 'users',
            title: 'Users',
            icon: <TrendingUp className="marketing-ai-menu-icon" />,
            dropdown: [
                { title: 'Users List', icon: <PieChart className="marketing-ai-submenu-icon" />, href: '/admin/UsersList' },
                { title: 'Scheduled Demos List', icon: <BarChart3 className="marketing-ai-submenu-icon" />, href: '/admin/ScheduledDemosList' },
                { title: 'Conversion Tracking', icon: <Target className="marketing-ai-submenu-icon" />, href: '/admin/analytics/conversions' },
                { title: 'ROI Calculator', icon: <TrendingUp className="marketing-ai-submenu-icon" />, href: '/admin/analytics/roi' }
            ]
        },
        {
            id: 'analytics',
            title: 'Analytics',
            icon: <TrendingUp className="marketing-ai-menu-icon" />,
            dropdown: [
                { title: 'Performance Reports', icon: <PieChart className="marketing-ai-submenu-icon" />, href: '/admin/analytics/performance' },
                { title: 'Traffic Analysis', icon: <BarChart3 className="marketing-ai-submenu-icon" />, href: '/admin/analytics/traffic' },
                { title: 'Conversion Tracking', icon: <Target className="marketing-ai-submenu-icon" />, href: '/admin/analytics/conversions' },
                { title: 'ROI Calculator', icon: <TrendingUp className="marketing-ai-submenu-icon" />, href: '/admin/analytics/roi' }
            ]
        },
        {
            id: 'campaigns',
            title: 'AI Campaigns',
            icon: <Brain className="marketing-ai-menu-icon" />,
            dropdown: [
                { title: 'Active Campaigns', icon: <Zap className="marketing-ai-submenu-icon" />, href: '/admin/campaigns/active' },
                { title: 'Campaign Builder', icon: <Target className="marketing-ai-submenu-icon" />, href: '/admin/campaigns/builder' },
                { title: 'A/B Testing', icon: <BarChart3 className="marketing-ai-submenu-icon" />, href: '/admin/campaigns/testing' },
                { title: 'Campaign Analytics', icon: <PieChart className="marketing-ai-submenu-icon" />, href: '/admin/campaigns/analytics' }
            ]
        },
        {
            id: 'customers',
            title: 'Customer Hub',
            icon: <Users className="marketing-ai-menu-icon" />,
            dropdown: [
                { title: 'Customer Database', icon: <Database className="marketing-ai-submenu-icon" />, href: '/admin/customers/database' },
                { title: 'Segmentation', icon: <Target className="marketing-ai-submenu-icon" />, href: '/admin/customers/segments' },
                { title: 'Behavior Analysis', icon: <TrendingUp className="marketing-ai-submenu-icon" />, href: '/admin/customers/behavior' },
                { title: 'Customer Journey', icon: <Calendar className="marketing-ai-submenu-icon" />, href: '/admin/customers/journey' }
            ]
        },
        {
            id: 'content',
            title: 'Content Studio',
            icon: <FileText className="marketing-ai-menu-icon" />,
            dropdown: [
                { title: 'AI Content Generator', icon: <Brain className="marketing-ai-submenu-icon" />, href: '/admin/content/generator' },
                { title: 'Content Calendar', icon: <Calendar className="marketing-ai-submenu-icon" />, href: '/admin/content/calendar' },
                { title: 'Social Media', icon: <Globe className="marketing-ai-submenu-icon" />, href: '/admin/content/social' },
                { title: 'Email Templates', icon: <Mail className="marketing-ai-submenu-icon" />, href: '/admin/content/email' }
            ]
        },
        {
            id: 'automation',
            title: 'Automation',
            icon: <Zap className="marketing-ai-menu-icon" />,
            dropdown: [
                { title: 'Workflow Builder', icon: <Target className="marketing-ai-submenu-icon" />, href: '/admin/automation/workflows' },
                { title: 'Email Sequences', icon: <Mail className="marketing-ai-submenu-icon" />, href: '/admin/automation/email' },
                { title: 'Lead Scoring', icon: <TrendingUp className="marketing-ai-submenu-icon" />, href: '/admin/automation/scoring' },
                { title: 'Chatbot Manager', icon: <MessageSquare className="marketing-ai-submenu-icon" />, href: '/admin/automation/chatbot' }
            ]
        },
        {
            id: 'notifications',
            title: 'Notifications',
            icon: <Bell className="marketing-ai-menu-icon" />,
            href: '/admin/notifications'
        },
        {
            id: 'billing',
            title: 'Billing & Plans',
            icon: <CreditCard className="marketing-ai-menu-icon" />,
            href: '/admin/billing'
        },
        {
            id: 'settings',
            title: 'Settings',
            icon: <Settings className="marketing-ai-menu-icon" />,
            dropdown: [
                { title: 'General Settings', icon: <Settings className="marketing-ai-submenu-icon" />, href: '/admin/settings/general' },
                { title: 'User Management', icon: <Users className="marketing-ai-submenu-icon" />, href: '/admin/settings/users' },
                { title: 'Security', icon: <Shield className="marketing-ai-submenu-icon" />, href: '/admin/settings/security' },
                { title: 'API Keys', icon: <Database className="marketing-ai-submenu-icon" />, href: '/admin/settings/api' }
            ]
        },
        {
            id: 'profile',
            title: 'Profile',
            icon: <User className="marketing-ai-menu-icon" />,
            href: '/admin/profile'
        },
        {
            id: 'logout',
            title: 'Logout',
            icon: <LogOut className="marketing-ai-menu-icon" />,
            href: '/api/logout'
        }
    ];

    const marketingAiHandleNavigation = (href) => {
        navigate(href);
    };

    if (!userProfile || userProfile?.personalInfo?.userType !== "admin") {
        return (<></>);
    }

    return (
        <aside className={`marketing-ai-sidebar-container ${isDarkMode ? 'dark' : 'light'} ${marketingAiSidebarExpanded ? 'expanded' : 'collapsed'}`}>
            {/* Header Section */}
            <header className="marketing-ai-sidebar-header">
                <div className="marketing-ai-admin-profile-section">
                    <div className="marketing-ai-profile-image-container">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                            alt="Admin Profile"
                            className="marketing-ai-profile-image"
                        />
                        <div className="marketing-ai-profile-status-indicator"></div>
                    </div>
                    {marketingAiSidebarExpanded && (
                        <div className="marketing-ai-admin-info">
                            <h3 className="marketing-ai-admin-name">John Anderson</h3>
                            <p className="marketing-ai-admin-role">Marketing Director</p>
                        </div>
                    )}
                </div>

                <button
                    className="marketing-ai-toggle-button"
                    onClick={() => setMarketingAiSidebarExpanded(!marketingAiSidebarExpanded)}
                >
                    {marketingAiSidebarExpanded ?
                        <X className="marketing-ai-toggle-icon" /> :
                        <Menu className="marketing-ai-toggle-icon" />
                    }
                </button>
            </header>

            {/* Navigation Menu */}
            <nav className="marketing-ai-navigation-menu">
                <ul className="marketing-ai-menu-list">
                    {marketingAiMenuItems.map((item) => (
                        <li key={item.id} className="marketing-ai-menu-item">
                            {item.dropdown ? (
                                <div className="marketing-ai-dropdown-container">
                                    <button
                                        className={`marketing-ai-menu-button ${marketingAiDropdownStates[item.id] ? 'active' : ''}`}
                                        onClick={() => marketingAiToggleDropdown(item.id)}
                                    >
                                        <div className="marketing-ai-menu-content">
                                            <div className="marketing-ai-icon-wrapper">
                                                {item.icon}
                                            </div>
                                            {marketingAiSidebarExpanded && (
                                                <span className="marketing-ai-menu-text">{item.title}</span>
                                            )}
                                        </div>
                                        {marketingAiSidebarExpanded && (
                                            <div className="marketing-ai-dropdown-arrow">
                                                {marketingAiDropdownStates[item.id] ?
                                                    <ChevronDown className="marketing-ai-arrow-icon" /> :
                                                    <ChevronRight className="marketing-ai-arrow-icon" />
                                                }
                                            </div>
                                        )}
                                    </button>

                                    {marketingAiDropdownStates[item.id] && marketingAiSidebarExpanded && (
                                        <ul className="marketing-ai-dropdown-menu">
                                            {item.dropdown.map((subItem, index) => (
                                                <li key={index} className="marketing-ai-dropdown-item">
                                                    <button
                                                        className="marketing-ai-dropdown-button"
                                                        onClick={() => marketingAiHandleNavigation(subItem.href)}
                                                    >
                                                        <div className="marketing-ai-submenu-icon-wrapper">
                                                            {subItem.icon}
                                                        </div>
                                                        <span className="marketing-ai-dropdown-text">{subItem.title}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                <button
                                    className="marketing-ai-menu-button"
                                    onClick={() => marketingAiHandleNavigation(item.href)}
                                >
                                    <div className="marketing-ai-menu-content">
                                        <div className="marketing-ai-icon-wrapper">
                                            {item.icon}
                                        </div>
                                        {marketingAiSidebarExpanded && (
                                            <span className="marketing-ai-menu-text">{item.title}</span>
                                        )}
                                    </div>
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Brand Footer */}
            {marketingAiSidebarExpanded && (
                <footer className="marketing-ai-sidebar-footer">
                    <div className="marketing-ai-brand-section">
                        <div className="marketing-ai-brand-logo">
                            <Brain className="marketing-ai-brand-icon" />
                        </div>
                        <div className="marketing-ai-brand-info">
                            <h4 className="marketing-ai-brand-name">Marketing AI</h4>
                            <p className="marketing-ai-brand-version">v2.1.0</p>
                        </div>
                    </div>
                </footer>
            )}
        </aside>
    );
};

export default MarketingAISidebar;