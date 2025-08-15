import React, { useState, useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import {
    Search,
    Bell,
    MessageCircle,
    User,
    Settings,
    LogOut,
    Brain,
    Menu,
    Sun,
    Moon,
    ChevronDown,
    Zap,
    Shield,
    HelpCircle
} from 'lucide-react';

// Mock theme context - replace with your actual ThemeContext

const MarketingAINavbar = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const [userProfile, setUserProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [marketingAiSearchFocused, setMarketingAiSearchFocused] = useState(false);
    const [marketingAiSearchValue, setMarketingAiSearchValue] = useState('');
    const [marketingAiNotificationsOpen, setMarketingAiNotificationsOpen] = useState(false);
    const [marketingAiMessagesOpen, setMarketingAiMessagesOpen] = useState(false);
    const [marketingAiProfileOpen, setMarketingAiProfileOpen] = useState(false);
    const [marketingAiMobileMenuOpen, setMarketingAiMobileMenuOpen] = useState(false);

    const marketingAiNotificationRef = useRef(null);
    const marketingAiMessagesRef = useRef(null);
    const marketingAiProfileRef = useRef(null);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            // const token = localStorage.getItem('token');

            // if (!token) {
            //     throw new Error('No authentication token found');
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

    // Mock data - replace with your actual data
    const marketingAiNotifications = [
        { id: 1, title: 'Campaign Performance Alert', message: 'Your AI campaign "Summer Sale" is performing 23% above average', time: '2m ago', type: 'success', read: false },
        { id: 2, title: 'New Lead Generated', message: '5 new high-quality leads from your automation workflow', time: '15m ago', type: 'info', read: false },
        { id: 3, title: 'Budget Alert', message: 'Campaign "Holiday Promo" has reached 85% of budget', time: '1h ago', type: 'warning', read: true },
        { id: 4, title: 'AI Model Update', message: 'New recommendation engine deployed successfully', time: '2h ago', type: 'info', read: true }
    ];

    const marketingAiMessages = [
        { id: 1, sender: 'Sarah Johnson', message: 'The new campaign analytics look great! Can we schedule a review?', time: '5m ago', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face', online: true, read: false },
        { id: 2, sender: 'Mike Chen', message: 'AI model training completed. Ready for deployment.', time: '22m ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', online: true, read: false },
        { id: 3, sender: 'Emily Davis', message: 'Customer segmentation report is ready for review', time: '1h ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', online: false, read: true },
        { id: 4, sender: 'Alex Rodriguez', message: 'Budget approval needed for Q4 campaigns', time: '3h ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', online: true, read: true }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (marketingAiNotificationRef.current && !marketingAiNotificationRef.current.contains(event.target)) {
                setMarketingAiNotificationsOpen(false);
            }
            if (marketingAiMessagesRef.current && !marketingAiMessagesRef.current.contains(event.target)) {
                setMarketingAiMessagesOpen(false);
            }
            if (marketingAiProfileRef.current && !marketingAiProfileRef.current.contains(event.target)) {
                setMarketingAiProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const marketingAiHandleSearch = (query) => {
        console.log('Searching for:', query);
        // Implement your search logic here
    };

    const marketingAiHandleNotificationClick = (notificationId) => {
        console.log('Notification clicked:', notificationId);
        // Implement notification handling
    };

    const marketingAiHandleMessageClick = (messageId) => {
        console.log('Message clicked:', messageId);
        // Implement message handling
    };

    const marketingAiUnreadNotifications = marketingAiNotifications.filter(n => !n.read).length;
    const marketingAiUnreadMessages = marketingAiMessages.filter(m => !m.read).length;

    if (!userProfile || userProfile?.personalInfo?.userType !== "admin") {
        return (<></>);
    }

    return (
        <nav className={`marketing-ai-navbar-container ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="marketing-ai-navbar-content">

                {/* Left Section - Logo & Mobile Menu */}
                <div className="marketing-ai-navbar-left">
                    <button
                        className="marketing-ai-mobile-menu-toggle"
                        onClick={() => setMarketingAiMobileMenuOpen(!marketingAiMobileMenuOpen)}
                    >
                        <Menu className="marketing-ai-mobile-menu-icon" />
                    </button>

                    <div className="marketing-ai-brand-section">
                        <div className="marketing-ai-logo-container">
                            <Brain className="marketing-ai-logo-icon" />
                            <div className="marketing-ai-logo-pulse"></div>
                        </div>
                        <div className="marketing-ai-brand-text">
                            <h1 className="marketing-ai-brand-title">Marketing AI</h1>
                            <span className="marketing-ai-brand-subtitle">Admin Dashboard</span>
                        </div>
                    </div>
                </div>

                {/* Center Section - Search */}
                <div className="marketing-ai-navbar-center">
                    <div className={`marketing-ai-search-container ${marketingAiSearchFocused ? 'focused' : ''}`}>
                        <Search className="marketing-ai-search-icon" />
                        <input
                            type="text"
                            className="marketing-ai-search-input"
                            placeholder="Search campaigns, customers, analytics..."
                            value={marketingAiSearchValue}
                            onChange={(e) => setMarketingAiSearchValue(e.target.value)}
                            onFocus={() => setMarketingAiSearchFocused(true)}
                            onBlur={() => setMarketingAiSearchFocused(false)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    marketingAiHandleSearch(marketingAiSearchValue);
                                }
                            }}
                        />
                        {marketingAiSearchValue && (
                            <button
                                className="marketing-ai-search-clear"
                                onClick={() => setMarketingAiSearchValue('')}
                            >
                                ×
                            </button>
                        )}
                        <div className="marketing-ai-search-shortcut">
                            <kbd className="marketing-ai-kbd">⌘</kbd>
                            <kbd className="marketing-ai-kbd">K</kbd>
                        </div>
                    </div>
                </div>

                {/* Right Section - Actions */}
                <div className="marketing-ai-navbar-right">

                    {/* Theme Toggle */}
                    <button
                        className="marketing-ai-theme-toggle"
                        onClick={toggleTheme}
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDarkMode ? (
                            <Sun className="marketing-ai-theme-icon" />
                        ) : (
                            <Moon className="marketing-ai-theme-icon" />
                        )}
                    </button>

                    {/* Notifications */}
                    <div className="marketing-ai-dropdown-wrapper" ref={marketingAiNotificationRef}>
                        <button
                            className={`marketing-ai-notification-button ${marketingAiNotificationsOpen ? 'active' : ''}`}
                            onClick={() => setMarketingAiNotificationsOpen(!marketingAiNotificationsOpen)}
                        >
                            <Bell className="marketing-ai-notification-icon" />
                            {marketingAiUnreadNotifications > 0 && (
                                <span className="marketing-ai-badge">
                                    {marketingAiUnreadNotifications > 9 ? '9+' : marketingAiUnreadNotifications}
                                </span>
                            )}
                        </button>

                        {marketingAiNotificationsOpen && (
                            <div className="marketing-ai-dropdown-panel marketing-ai-notifications-panel">
                                <div className="marketing-ai-dropdown-header">
                                    <h3 className="marketing-ai-dropdown-title">Notifications</h3>
                                    <span className="marketing-ai-unread-count">{marketingAiUnreadNotifications} unread</span>
                                </div>
                                <div className="marketing-ai-dropdown-content">
                                    {marketingAiNotifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`marketing-ai-notification-item ${!notification.read ? 'unread' : ''}`}
                                            onClick={() => marketingAiHandleNotificationClick(notification.id)}
                                        >
                                            <div className={`marketing-ai-notification-indicator ${notification.type}`}></div>
                                            <div className="marketing-ai-notification-content">
                                                <h4 className="marketing-ai-notification-title">{notification.title}</h4>
                                                <p className="marketing-ai-notification-message">{notification.message}</p>
                                                <span className="marketing-ai-notification-time">{notification.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="marketing-ai-dropdown-footer">
                                    <button className="marketing-ai-view-all-button">View All Notifications</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Messages */}
                    <div className="marketing-ai-dropdown-wrapper" ref={marketingAiMessagesRef}>
                        <button
                            className={`marketing-ai-message-button ${marketingAiMessagesOpen ? 'active' : ''}`}
                            onClick={() => setMarketingAiMessagesOpen(!marketingAiMessagesOpen)}
                        >
                            <MessageCircle className="marketing-ai-message-icon" />
                            {marketingAiUnreadMessages > 0 && (
                                <span className="marketing-ai-badge">
                                    {marketingAiUnreadMessages > 9 ? '9+' : marketingAiUnreadMessages}
                                </span>
                            )}
                        </button>

                        {marketingAiMessagesOpen && (
                            <div className="marketing-ai-dropdown-panel marketing-ai-messages-panel">
                                <div className="marketing-ai-dropdown-header">
                                    <h3 className="marketing-ai-dropdown-title">Messages</h3>
                                    <span className="marketing-ai-unread-count">{marketingAiUnreadMessages} unread</span>
                                </div>
                                <div className="marketing-ai-dropdown-content">
                                    {marketingAiMessages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`marketing-ai-message-item ${!message.read ? 'unread' : ''}`}
                                            onClick={() => marketingAiHandleMessageClick(message.id)}
                                        >
                                            <div className="marketing-ai-message-avatar">
                                                <img src={message.avatar} alt={message.sender} className="marketing-ai-avatar-image" />
                                                {message.online && <div className="marketing-ai-online-indicator"></div>}
                                            </div>
                                            <div className="marketing-ai-message-content">
                                                <h4 className="marketing-ai-message-sender">{message.sender}</h4>
                                                <p className="marketing-ai-message-text">{message.message}</p>
                                                <span className="marketing-ai-message-time">{message.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="marketing-ai-dropdown-footer">
                                    <button className="marketing-ai-view-all-button">Open Messenger</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile Dropdown */}
                    <div className="marketing-ai-dropdown-wrapper" ref={marketingAiProfileRef}>
                        <button
                            className={`marketing-ai-profile-button ${marketingAiProfileOpen ? 'active' : ''}`}
                            onClick={() => setMarketingAiProfileOpen(!marketingAiProfileOpen)}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                                alt="Profile"
                                className="marketing-ai-profile-avatar"
                            />
                            <ChevronDown className="marketing-ai-profile-chevron" />
                        </button>

                        {marketingAiProfileOpen && (
                            <div className="marketing-ai-dropdown-panel marketing-ai-profile-panel">
                                <div className="marketing-ai-profile-header">
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                                        alt="Profile"
                                        className="marketing-ai-profile-header-avatar"
                                    />
                                    <div className="marketing-ai-profile-info">
                                        <h3 className="marketing-ai-profile-name">John Anderson</h3>
                                        <p className="marketing-ai-profile-email">john@marketingai.com</p>
                                    </div>
                                </div>
                                <div className="marketing-ai-profile-menu">
                                    <button className="marketing-ai-profile-menu-item">
                                        <User className="marketing-ai-profile-menu-icon" />
                                        <span>Profile Settings</span>
                                    </button>
                                    <button className="marketing-ai-profile-menu-item">
                                        <Settings className="marketing-ai-profile-menu-icon" />
                                        <span>Account Settings</span>
                                    </button>
                                    <button className="marketing-ai-profile-menu-item">
                                        <Shield className="marketing-ai-profile-menu-icon" />
                                        <span>Privacy & Security</span>
                                    </button>
                                    <button className="marketing-ai-profile-menu-item">
                                        <HelpCircle className="marketing-ai-profile-menu-icon" />
                                        <span>Help & Support</span>
                                    </button>
                                    <div className="marketing-ai-profile-divider"></div>
                                    <button className="marketing-ai-profile-menu-item logout">
                                        <LogOut className="marketing-ai-profile-menu-icon" />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {marketingAiMobileMenuOpen && (
                <div className="marketing-ai-mobile-overlay">
                    <div className="marketing-ai-mobile-menu">
                        <div className="marketing-ai-mobile-search">
                            <Search className="marketing-ai-mobile-search-icon" />
                            <input
                                type="text"
                                className="marketing-ai-mobile-search-input"
                                placeholder="Search..."
                                value={marketingAiSearchValue}
                                onChange={(e) => setMarketingAiSearchValue(e.target.value)}
                            />
                        </div>
                        <div className="marketing-ai-mobile-actions">
                            <button className="marketing-ai-mobile-action">
                                <Bell className="marketing-ai-mobile-action-icon" />
                                <span>Notifications</span>
                                {marketingAiUnreadNotifications > 0 && (
                                    <span className="marketing-ai-mobile-badge">{marketingAiUnreadNotifications}</span>
                                )}
                            </button>
                            <button className="marketing-ai-mobile-action">
                                <MessageCircle className="marketing-ai-mobile-action-icon" />
                                <span>Messages</span>
                                {marketingAiUnreadMessages > 0 && (
                                    <span className="marketing-ai-mobile-badge">{marketingAiUnreadMessages}</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default MarketingAINavbar;