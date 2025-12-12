import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Swal from 'sweetalert2';
import {
    User,
    Building2,
    Target,
    Bot,
    Send,
    Languages,
    CreditCard,
    Shield,
    Settings,
    Camera,
    Edit3,
    Plus,
    Save,
    X,
    Globe,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Briefcase,
    TrendingUp,
    Zap,
    Image,
    FileText,
    Video,
    Music,
    CheckCircle,
    AlertCircle,
    Clock,

    Eye,
    Key,

    Users,
    BarChart,
    DollarSign,
    Activity,
    Tag,
    Hash,
    MessageSquare,
    Smartphone,
    Monitor,

    Network,
    Wifi,
    ShieldCheck,
    ShieldAlert,

    Star,
    Heart,

    Award,
    Trophy,
    Gift,
    Rocket,
    Sparkles,
    ZapOff,
    RefreshCw,
    AlertTriangle,
    ExternalLink,
    Link,
    Unlink,
    Folder,
    Trash2,
    Copy,

    Layout,

    XCircle,

    Palette,
    Type,

    Image as ImageIcon,

    Volume2,

    Cpu,

    Bird as BirdIcon,

    Factory,

    Ship as ShipIcon,

    Trophy as TrophyIcon,

    Shield as ShieldIcon,

    Coins,
    Banknote,
    Wallet,
    ShoppingCart,
    ShoppingBag,
    Palette as PaletteIcon,
    Music as MusicIcon,

    Headphones as HeadphonesIcon,
    Radio as RadioIcon,
    Tv as TvIcon,
    Film as FilmIcon,
    Camera as CameraIcon,
    Video as VideoIcon,

    Instagram,
    Facebook,
    Twitter,
    Linkedin,

    MessageCircle,
    Slack,

    Chrome as ChromeIcon,

    Hash as HashIcon,
    AtSign,

    Plus as PlusIcon,
    X as XIcon,
    Divide as DivideIcon,
    Percent as PercentIcon,

    Omega as OmegaIcon,

    Target as TargetIcon,
    Eye as EyeIcon,
    EyeOff as EyeOffIcon,

    ThumbsUp as ThumbsUpIcon,

    Brain,
    Heart as HeartIcon,
    Bone as BoneIcon,

    Thermometer as ThermometerIcon,

    Rocket as RocketIcon,

    Star as StarIcon,
    Moon as MoonIcon,
    Sun as SunIcon,
    Cloud as CloudIcon,
    CloudRain as CloudRainIcon,
    CloudSnow as CloudSnowIcon,
    CloudLightning as CloudLightningIcon,
    Snowflake as SnowflakeIcon,
    Wind as WindIcon,
    Waves as WavesIcon,
    Umbrella as UmbrellaIcon,
    Ship as ShipIcon2,
    Anchor as AnchorIcon,
    Compass as CompassIcon,
    Map as MapIcon,
    Globe as GlobeIcon,
    Mountain as MountainIcon,
    Tent as TentIcon,
    Settings as SettingsIcon,
    Filter as FilterIcon,
    Sliders as SlidersIcon,
    ToggleLeft as ToggleLeftIcon,
    ToggleRight as ToggleRightIcon,
    CheckSquare as CheckSquareIcon,
    Square as SquareIcon,
    Circle as CircleIcon,
    Radio as RadioIcon2,
    Star as StarIcon2,
    Heart as HeartIcon2,
    Bookmark,
    Flag as FlagIcon,
    Bell as BellIcon,
    BellOff as BellOffIcon,
    Calendar as CalendarIcon,
    Clock as ClockIcon,
    Watch,
    Timer,
    Hourglass,
    Sunrise as SunriseIcon,
    Sunset as SunsetIcon,
    Moon as MoonIcon2,
    Sun as SunIcon2,
    Cloud as CloudIcon2,
    CloudRain as CloudRainIcon2,
    CloudSnow as CloudSnowIcon2,
    CloudLightning as CloudLightningIcon2,
    Wind as WindIcon2,
    Thermometer as ThermometerIcon2,
    Droplets as DropletsIcon,
    Umbrella as UmbrellaIcon2
} from 'lucide-react';

const ClientProfile = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const [userProfile, setUserProfile] = useState(null);
    const [activeTab, setActiveTab] = useState('personal');
    const [editingSection, setEditingSection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        personalInfo: {},
        business: {},
        marketingProfile: {},
        integrations: {},
        targetAudience: {},
        aiPreferences: {},
        contentAssets: {},
        billing: {},
        security: {}
    });

    // Fetch user profile data
    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await fetch('/api/auth/userProfile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Fetched profile data:', data);
                setUserProfile(data);

                // Set formData with proper structure
                setFormData({
                    personalInfo: data.personalInfo || {},
                    business: data.business || {},
                    marketingProfile: data.marketingProfile || {},
                    integrations: data.integrations || {},
                    targetAudience: data.targetAudience || {},
                    aiPreferences: data.aiPreferences || {},
                    contentAssets: data.contentAssets || {},
                    billing: data.billing || {},
                    security: data.security || {}
                });
            } else {
                throw new Error('Failed to fetch profile');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to load profile data',
                timer: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (section) => {
        setEditingSection(section);
    };

    const handleSave = async (section) => {
        try {
            setSaving(true);
            const payload = {
                [section]: formData[section]
            };

            console.log("Sending payload:", JSON.stringify(payload, null, 2));

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));

            const response = await fetch('/api/auth/userProfile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            let result;
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                result = await response.json();
            } else {
                throw new Error('Server returned non-JSON response');
            }

            if (response.ok) {
                setUserProfile(prev => ({
                    ...prev,
                    [section]: formData[section]
                }));
                setEditingSection(null);

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: result.message || 'Profile updated successfully!',
                    timer: 2000,
                    showConfirmButton: false,
                    background: isDarkMode ? '#1e293b' : '#ffffff',
                    color: isDarkMode ? '#f8fafc' : '#1e293b'
                });
            } else {
                throw new Error(result.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Update error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to update profile',
                timer: 3000,
                background: isDarkMode ? '#1e293b' : '#ffffff',
                color: isDarkMode ? '#f8fafc' : '#1e293b'
            });
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (userProfile) {
            setFormData({
                personalInfo: userProfile.personalInfo || {},
                business: userProfile.business || {},
                marketingProfile: userProfile.marketingProfile || {},
                integrations: userProfile.integrations || {},
                targetAudience: userProfile.targetAudience || {},
                aiPreferences: userProfile.aiPreferences || {},
                contentAssets: userProfile.contentAssets || {},
                billing: userProfile.billing || {},
                security: userProfile.security || {}
            });
        }
        setEditingSection(null);
    };

    const handleInputChange = (path, value) => {
        const keys = path.split('.');
        const updatedData = { ...formData };
        let current = updatedData;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = value;
        setFormData(updatedData);
    };

    const handleArrayAdd = (path, item) => {
        const keys = path.split('.');
        const updatedData = { ...formData };
        let current = updatedData;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }

        if (!current[keys[keys.length - 1]]) {
            current[keys[keys.length - 1]] = [];
        }

        if (item && item.trim() && !current[keys[keys.length - 1]].includes(item.trim())) {
            current[keys[keys.length - 1]].push(item.trim());
            setFormData(updatedData);
        }
    };

    const handleArrayRemove = (path, index) => {
        const keys = path.split('.');
        const updatedData = { ...formData };
        let current = updatedData;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) return;
            current = current[keys[i]];
        }

        if (current[keys[keys.length - 1]] && Array.isArray(current[keys[keys.length - 1]])) {
            current[keys[keys.length - 1]].splice(index, 1);
            setFormData(updatedData);
        }
    };

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: User },
        { id: 'business', label: 'Business', icon: Building2 },
        { id: 'marketing', label: 'Marketing', icon: TrendingUp },
        { id: 'integrations', label: 'Integrations', icon: Zap },
        { id: 'audience', label: 'Target Audience', icon: Users },
        { id: 'ai', label: 'AI Preferences', icon: Bot },
        { id: 'content', label: 'Content Assets', icon: FileText },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'security', label: 'Security', icon: Shield }
    ];

    if (loading) {
        return (
            <div className={`client-profile-loader ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="loader-spinner"></div>
                <p>Loading your profile...</p>
                <div className="skeleton-text" style={{ width: '200px' }}></div>
            </div>
        );
    }

    if (!userProfile) {
        return (
            <div className={`client-profile-error ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="empty-state">
                    <AlertCircle size={48} />
                    <h4>Profile Unavailable</h4>
                    <p>Unable to load profile data. Please check your connection and try again.</p>
                    <button className="save-btn" onClick={fetchUserProfile} style={{ marginTop: '1rem' }}>
                        <RefreshCw size={16} />
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`client-profile-container ${isDarkMode ? 'dark' : 'light'}`}>
            {saving && (
                <div className="loading-overlay">
                    <div className="loader-spinner"></div>
                </div>
            )}

            <div className="profile-header">
                <div className="profile-banner">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar">
                            {userProfile.personalInfo?.avatar?.url ? (
                                <img src={userProfile.personalInfo.avatar.url} alt="Profile" />
                            ) : (
                                <User size={60} />
                            )}
                            <button className="avatar-edit-btn">
                                <Camera size={16} />
                            </button>
                        </div>
                        <div className="profile-basic-info">
                            <h1>{userProfile.personalInfo?.firstName} {userProfile.personalInfo?.lastName}</h1>
                            <p className="profile-role">
                                <Briefcase size={14} style={{ marginRight: '0.5rem' }} />
                                {userProfile.personalInfo?.userType || 'Client'}
                            </p>
                            <p className="profile-bio">
                                <MessageSquare size={14} style={{ marginRight: '0.5rem' }} />
                                {userProfile.personalInfo?.bio || 'No bio added yet'}
                            </p>
                            <div className="data-row" style={{ marginTop: '1rem', background: 'transparent', border: 'none', padding: '0' }}>
                                <div className="data-row-label Profile-Timezone-data">
                                    <Globe size={14} />
                                    Timezone:
                                </div>
                                <div className="data-row-value Profile-Timezone-data">
                                    {userProfile.personalInfo?.timezone || 'Not set'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-content">
                <div className="profile-tabs">
                    {tabs.map(tab => {
                        const IconComponent = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <IconComponent size={18} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="profile-tab-content">
                    {activeTab === 'personal' && (
                        <PersonalInfoTab
                            data={userProfile.personalInfo}
                            editing={editingSection === 'personalInfo'}
                            onEdit={() => handleEdit('personalInfo')}
                            onSave={() => handleSave('personalInfo')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            formData={formData.personalInfo}
                            isDarkMode={isDarkMode}
                        />
                    )}

                    {activeTab === 'business' && (
                        <BusinessTab
                            data={userProfile.business}
                            editing={editingSection === 'business'}
                            onEdit={() => handleEdit('business')}
                            onSave={() => handleSave('business')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            formData={formData.business}
                            isDarkMode={isDarkMode}
                        />
                    )}

                    {activeTab === 'marketing' && (
                        <MarketingTab
                            data={userProfile.marketingProfile}
                            editing={editingSection === 'marketingProfile'}
                            onEdit={() => handleEdit('marketingProfile')}
                            onSave={() => handleSave('marketingProfile')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            onArrayAdd={handleArrayAdd}
                            onArrayRemove={handleArrayRemove}
                            formData={formData.marketingProfile}
                            isDarkMode={isDarkMode}
                        />
                    )}

                    {activeTab === 'integrations' && (
                        <IntegrationsTab
                            data={userProfile.integrations}
                            editing={editingSection === 'integrations'}
                            onEdit={() => handleEdit('integrations')}
                            onSave={() => handleSave('integrations')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            formData={formData.integrations}
                            isDarkMode={isDarkMode}
                        />
                    )}

                    {activeTab === 'audience' && (
                        <AudienceTab
                            data={userProfile.targetAudience}
                            editing={editingSection === 'targetAudience'}
                            onEdit={() => handleEdit('targetAudience')}
                            onSave={() => handleSave('targetAudience')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            onArrayAdd={handleArrayAdd}
                            onArrayRemove={handleArrayRemove}
                            formData={formData.targetAudience}
                            isDarkMode={isDarkMode}
                        />
                    )}

                    {activeTab === 'ai' && (
                        <AIPreferencesTab
                            data={userProfile.aiPreferences}
                            editing={editingSection === 'aiPreferences'}
                            onEdit={() => handleEdit('aiPreferences')}
                            onSave={() => handleSave('aiPreferences')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            formData={formData.aiPreferences}
                            isDarkMode={isDarkMode}
                        />
                    )}

                    {activeTab === 'content' && (
                        <ContentAssetsTab
                            data={userProfile.contentAssets}
                            editing={editingSection === 'contentAssets'}
                            onEdit={() => handleEdit('contentAssets')}
                            onSave={() => handleSave('contentAssets')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            onArrayAdd={handleArrayAdd}
                            onArrayRemove={handleArrayRemove}
                            formData={formData.contentAssets}
                            isDarkMode={isDarkMode}
                        />
                    )}

                    {activeTab === 'billing' && (
                        <BillingTab
                            data={userProfile.billing}
                            editing={editingSection === 'billing'}
                            onEdit={() => handleEdit('billing')}
                            onSave={() => handleSave('billing')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            formData={formData.billing}
                            isDarkMode={isDarkMode}
                        />
                    )}

                    {activeTab === 'security' && (
                        <SecurityTab
                            data={userProfile.security}
                            editing={editingSection === 'security'}
                            onEdit={() => handleEdit('security')}
                            onSave={() => handleSave('security')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            onArrayAdd={handleArrayAdd}
                            onArrayRemove={handleArrayRemove}
                            formData={formData.security}
                            isDarkMode={isDarkMode}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// Personal Info Tab Component
const PersonalInfoTab = ({ data, editing, onEdit, onSave, onCancel, onChange, formData, isDarkMode }) => (
    <div className="tab-section animate-fade-in">
        <div className="section-header">
            <div className="data-row-label">
                <User size={20} />
                <h2>Personal Information</h2>
            </div>
            {!editing ? (
                <button className="edit-btn" onClick={onEdit}>
                    <Edit3 size={16} />
                    Edit
                </button>
            ) : (
                <div className="action-buttons">
                    <button className="save-btn" onClick={onSave}>
                        {formData?.firstName && formData?.lastName ? <CheckCircle size={16} /> : <Save size={16} />}
                        {formData?.firstName && formData?.lastName ? 'Update' : 'Save'}
                    </button>
                    <button className="cancel-btn" onClick={onCancel}>
                        <X size={16} />
                        Cancel
                    </button>
                </div>
            )}
        </div>

        <div className="form-grid">
            <div className="data-card">
                <div className="data-card-icon">
                    <User size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Full Name</div>
                    <div className="data-card-value">
                        {editing ? (
                            <div className="name-inputs" style={{ display: 'flex', gap: '1rem' }}>
                                <input
                                    type="text"
                                    value={formData?.firstName || ''}
                                    onChange={(e) => onChange('personalInfo.firstName', e.target.value)}
                                    className="profile-input"
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    value={formData?.lastName || ''}
                                    onChange={(e) => onChange('personalInfo.lastName', e.target.value)}
                                    className="profile-input"
                                    placeholder="Last Name"
                                />
                            </div>
                        ) : (
                            `${data?.firstName || 'Not provided'} ${data?.lastName || ''}`
                        )}
                    </div>
                </div>
            </div>

            <div className="data-card">
                <div className="data-card-icon">
                    <AtSign size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Display Name</div>
                    <div className="data-card-value">
                        {editing ? (
                            <input
                                type="text"
                                value={formData?.displayName || ''}
                                onChange={(e) => onChange('personalInfo.displayName', e.target.value)}
                                className="profile-input"
                            />
                        ) : (
                            data?.displayName || 'Not provided'
                        )}
                    </div>
                </div>
            </div>

            <div className="data-card">
                <div className="data-card-icon">
                    <Briefcase size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">User Type</div>
                    <div className="data-card-value">
                        {editing ? (
                            <select
                                value={formData?.userType || 'Client'}
                                onChange={(e) => onChange('personalInfo.userType', e.target.value)}
                                className="profile-select"
                            >
                                <option value="Client">Client</option>
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                            </select>
                        ) : (
                            <div className="status-badge status-badge-info">
                                {data?.userType || 'Client'}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="data-card">
                <div className="data-card-icon">
                    <Globe size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Timezone</div>
                    <div className="data-card-value">
                        {editing ? (
                            <select
                                value={formData?.timezone || ''}
                                onChange={(e) => onChange('personalInfo.timezone', e.target.value)}
                                className="profile-select"
                            >
                                <option value="">Select Timezone</option>
                                <option value="UTC">UTC</option>
                                <option value="America/New_York">Eastern Time</option>
                                <option value="America/Chicago">Central Time</option>
                                <option value="America/Denver">Mountain Time</option>
                                <option value="America/Los_Angeles">Pacific Time</option>
                                <option value="Europe/London">London</option>
                                <option value="Europe/Paris">Paris</option>
                                <option value="Asia/Tokyo">Tokyo</option>
                                <option value="Asia/Shanghai">Shanghai</option>
                                <option value="Asia/Kolkata">India</option>
                            </select>
                        ) : (
                            data?.timezone || 'Not set'
                        )}
                    </div>
                </div>
            </div>

            <div className="data-card">
                <div className="data-card-icon">
                    <MessageSquare size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Bio</div>
                    <div className="data-card-value">
                        {editing ? (
                            <textarea
                                value={formData?.bio || ''}
                                onChange={(e) => onChange('personalInfo.bio', e.target.value)}
                                className="profile-textarea"
                                maxLength={250}
                                rows={3}
                                placeholder="Tell us about yourself..."
                            />
                        ) : (
                            data?.bio || 'No bio added yet'
                        )}
                    </div>
                    {editing && formData?.bio && (
                        <div className="data-card-subtext">
                            {250 - (formData.bio?.length || 0)} characters remaining
                        </div>
                    )}
                </div>
            </div>

            <div className="data-card">
                <div className="data-card-icon">
                    <Languages size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Preferred Language</div>
                    <div className="data-card-value">
                        {editing ? (
                            <select
                                value={formData?.preferredLanguage || 'en'}
                                onChange={(e) => onChange('personalInfo.preferredLanguage', e.target.value)}
                                className="profile-select"
                            >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="it">Italian</option>
                                <option value="pt">Portuguese</option>
                                <option value="zh">Chinese</option>
                                <option value="ja">Japanese</option>
                                <option value="ko">Korean</option>
                                <option value="hi">Hindi</option>
                            </select>
                        ) : (
                            data?.preferredLanguage || 'English'
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Business Tab Component  
const BusinessTab = ({ data, editing, onEdit, onSave, onCancel, onChange, formData, isDarkMode }) => (
    <div className="tab-section animate-fade-in">
        <div className="section-header">
            <div className="data-row-label">
                <Building2 size={20} />
                <h2>Business Information</h2>
            </div>
            {!editing ? (
                <button className="edit-btn" onClick={onEdit}>
                    <Edit3 size={16} />
                    Edit
                </button>
            ) : (
                <div className="action-buttons">
                    <button className="save-btn" onClick={onSave}>
                        <Save size={16} />
                        Save
                    </button>
                    <button className="cancel-btn" onClick={onCancel}>
                        <X size={16} />
                        Cancel
                    </button>
                </div>
            )}
        </div>

        <div className="form-grid">
            <div className="data-card">
                <div className="data-card-icon">
                    <Building2 size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Company Name</div>
                    <div className="data-card-value">
                        {editing ? (
                            <input
                                type="text"
                                value={formData?.companyName || ''}
                                onChange={(e) => onChange('business.companyName', e.target.value)}
                                className="profile-input"
                            />
                        ) : (
                            data?.companyName || 'Not provided'
                        )}
                    </div>
                </div>
            </div>

            <div className="data-card">
                <div className="data-card-icon">
                    <Globe size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Website</div>
                    <div className="data-card-value">
                        {editing ? (
                            <input
                                type="url"
                                value={formData?.website || ''}
                                onChange={(e) => onChange('business.website', e.target.value)}
                                className="profile-input"
                                placeholder="https://example.com"
                            />
                        ) : (
                            data?.website ? (
                                <a href={data.website} target="_blank" rel="noopener noreferrer" className="tooltip">
                                    <ExternalLink size={14} style={{ marginRight: '0.5rem' }} />
                                    {data.website}
                                    <span className="tooltip-text">Visit website</span>
                                </a>
                            ) : (
                                <span style={{ color: '#64748b' }}>
                                    <Globe size={14} style={{ marginRight: '0.5rem' }} />
                                    Not provided
                                </span>
                            )
                        )}
                    </div>
                </div>
            </div>

            <div className="data-card">
                <div className="data-card-icon">
                    <Factory size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Industry</div>
                    <div className="data-card-value">
                        {editing ? (
                            <select
                                value={formData?.industry || ''}
                                onChange={(e) => onChange('business.industry', e.target.value)}
                                className="profile-select"
                            >
                                <option value="">Select Industry</option>
                                <option value="ecommerce">E-commerce</option>
                                <option value="saas">SaaS</option>
                                <option value="agency">Agency</option>
                                <option value="education">Education</option>
                                <option value="finance">Finance</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="real-estate">Real Estate</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="retail">Retail</option>
                                <option value="other">Other</option>
                            </select>
                        ) : (
                            <div className="status-badge status-badge-info">
                                {data?.industry || 'Not selected'}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="data-card">
                <div className="data-card-icon">
                    <BarChart size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Business Type</div>
                    <div className="data-card-value">
                        {editing ? (
                            <select
                                value={formData?.businessType || ''}
                                onChange={(e) => onChange('business.businessType', e.target.value)}
                                className="profile-select"
                            >
                                <option value="">Select Type</option>
                                <option value="b2b">B2B</option>
                                <option value="b2c">B2C</option>
                                <option value="both">Both</option>
                            </select>
                        ) : (
                            data?.businessType || 'Not selected'
                        )}
                    </div>
                </div>
            </div>

            <div className="data-card">
                <div className="data-card-icon">
                    <Users size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Company Size</div>
                    <div className="data-card-value">
                        {editing ? (
                            <select
                                value={formData?.companySize || ''}
                                onChange={(e) => onChange('business.companySize', e.target.value)}
                                className="profile-select"
                            >
                                <option value="">Select Size</option>
                                <option value="solopreneur">Solopreneur</option>
                                <option value="2-10">2-10 employees</option>
                                <option value="11-50">11-50 employees</option>
                                <option value="51-200">51-200 employees</option>
                                <option value="201-500">201-500 employees</option>
                                <option value="501-1000">501-1000 employees</option>
                                <option value="1000+">1000+ employees</option>
                            </select>
                        ) : (
                            data?.companySize || 'Not selected'
                        )}
                    </div>
                </div>
            </div>

            <div className="data-card">
                <div className="data-card-icon">
                    <Hash size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Tax ID</div>
                    <div className="data-card-value">
                        {editing ? (
                            <input
                                type="text"
                                value={formData?.taxID || ''}
                                onChange={(e) => onChange('business.taxID', e.target.value)}
                                className="profile-input"
                            />
                        ) : (
                            data?.taxID || 'Not provided'
                        )}
                    </div>
                </div>
            </div>

            <div className="data-card form-group-full">
                <div className="data-card-icon">
                    <FileText size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Company Description</div>
                    <div className="data-card-value">
                        {editing ? (
                            <textarea
                                value={formData?.companyDescription || ''}
                                onChange={(e) => onChange('business.companyDescription', e.target.value)}
                                className="profile-textarea"
                                rows={4}
                            />
                        ) : (
                            data?.companyDescription || 'No description provided'
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Marketing Tab Component
const MarketingTab = ({ data, editing, onEdit, onSave, onCancel, onChange, onArrayAdd, onArrayRemove, formData, isDarkMode }) => (
    <div className="tab-section animate-fade-in">
        <div className="section-header">
            <div className="data-row-label">
                <TrendingUp size={20} />
                <h2>Marketing Profile</h2>
            </div>
            {!editing ? (
                <button className="edit-btn" onClick={onEdit}>
                    <Edit3 size={16} />
                    Edit
                </button>
            ) : (
                <div className="action-buttons">
                    <button className="save-btn" onClick={onSave}>
                        <Save size={16} />
                        Save
                    </button>
                    <button className="cancel-btn" onClick={onCancel}>
                        <X size={16} />
                        Cancel
                    </button>
                </div>
            )}
        </div>

        <div className="form-grid">
            <div className="data-card">
                <div className="data-card-icon">
                    <Briefcase size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Role</div>
                    <div className="data-card-value">
                        {editing ? (
                            <select
                                value={formData?.role || ''}
                                onChange={(e) => onChange('marketingProfile.role', e.target.value)}
                                className="profile-select"
                            >
                                <option value="">Select Role</option>
                                <option value="owner">Owner</option>
                                <option value="cmo">CMO</option>
                                <option value="marketing-director">Marketing Director</option>
                                <option value="social-media-manager">Social Media Manager</option>
                                <option value="content-creator">Content Creator</option>
                                <option value="seo-specialist">SEO Specialist</option>
                                <option value="ppc-expert">PPC Expert</option>
                                <option value="growth-hacker">Growth Hacker</option>
                                <option value="freelancer">Freelancer</option>
                                <option value="student">Student</option>
                                <option value="other">Other</option>
                            </select>
                        ) : (
                            data?.role ? (
                                <div className="status-badge status-badge-info">
                                    {data.role}
                                </div>
                            ) : (
                                'Not selected'
                            )
                        )}
                    </div>
                </div>
            </div>

            <div className="data-card">
                <div className="data-card-icon">
                    <Award size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Experience Level</div>
                    <div className="data-card-value">
                        {editing ? (
                            <select
                                value={formData?.experienceLevel || ''}
                                onChange={(e) => onChange('marketingProfile.experienceLevel', e.target.value)}
                                className="profile-select"
                            >
                                <option value="">Select Level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="expert">Expert</option>
                            </select>
                        ) : (
                            data?.experienceLevel ? (
                                <div className={`status-badge ${data.experienceLevel === 'expert' ? 'status-badge-success' :
                                    data.experienceLevel === 'advanced' ? 'status-badge-info' :
                                        data.experienceLevel === 'intermediate' ? 'status-badge-warning' :
                                            'status-badge-error'
                                    }`}>
                                    {data.experienceLevel}
                                </div>
                            ) : (
                                'Not selected'
                            )
                        )}
                    </div>
                </div>
            </div>

            <div className="data-card">
                <div className="data-card-icon">
                    <DollarSign size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Monthly Ad Budget</div>
                    <div className="data-card-value">
                        {editing ? (
                            <select
                                value={formData?.monthlyAdBudget || ''}
                                onChange={(e) => onChange('marketingProfile.monthlyAdBudget', e.target.value)}
                                className="profile-select"
                            >
                                <option value="">Select Budget</option>
                                <option value="none">None</option>
                                <option value="<1k">Less than $1,000</option>
                                <option value="1k-5k">$1,000 - $5,000</option>
                                <option value="5k-20k">$5,000 - $20,000</option>
                                <option value="20k-100k">$20,000 - $100,000</option>
                                <option value="100k+">$100,000+</option>
                            </select>
                        ) : (
                            data?.monthlyAdBudget || 'Not selected'
                        )}
                    </div>
                </div>
            </div>

            <div className="data-card form-group-full">
                <div className="data-card-icon">
                    <Target size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Marketing Goals</div>
                    <div className="data-card-value">
                        <div className="tag-list">
                            {(formData?.marketingGoals || data?.marketingGoals || []).length > 0 ? (
                                (formData?.marketingGoals || data?.marketingGoals || []).map((goal, index) => (
                                    <span key={index} className="tag">
                                        <Target size={12} style={{ marginRight: '0.25rem' }} />
                                        {goal.replace('-', ' ')}
                                        {editing && (
                                            <button onClick={() => onArrayRemove('marketingProfile.marketingGoals', index)}>
                                                <X size={12} />
                                            </button>
                                        )}
                                    </span>
                                ))
                            ) : (
                                <span className="empty-state-small">
                                    <Target size={20} />
                                    No goals set
                                </span>
                            )}
                            {editing && (
                                <button
                                    className="add-tag-btn"
                                    onClick={() => {
                                        const newGoal = prompt('Enter marketing goal:');
                                        if (newGoal) onArrayAdd('marketingProfile.marketingGoals', newGoal);
                                    }}
                                >
                                    <Plus size={16} />
                                    Add Goal
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="data-card form-group-full">
                <div className="data-card-icon">
                    <AlertTriangle size={24} />
                </div>
                <div className="data-card-content">
                    <div className="data-card-title">Challenges</div>
                    <div className="data-card-value">
                        <div className="tag-list">
                            {(formData?.challenges || data?.challenges || []).length > 0 ? (
                                (formData?.challenges || data?.challenges || []).map((challenge, index) => (
                                    <span key={index} className="tag">
                                        <AlertTriangle size={12} style={{ marginRight: '0.25rem' }} />
                                        {challenge.replace('-', ' ')}
                                        {editing && (
                                            <button onClick={() => onArrayRemove('marketingProfile.challenges', index)}>
                                                <X size={12} />
                                            </button>
                                        )}
                                    </span>
                                ))
                            ) : (
                                <span className="empty-state-small">
                                    <AlertTriangle size={20} />
                                    No challenges listed
                                </span>
                            )}
                            {editing && (
                                <button
                                    className="add-tag-btn"
                                    onClick={() => {
                                        const newChallenge = prompt('Enter challenge:');
                                        if (newChallenge) onArrayAdd('marketingProfile.challenges', newChallenge);
                                    }}
                                >
                                    <Plus size={16} />
                                    Add Challenge
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Integrations Tab Component
const IntegrationsTab = ({ data, editing, onEdit, onSave, onCancel, onChange, formData, isDarkMode }) => {
    const [newIntegrationModal, setNewIntegrationModal] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState('');

    const integrationPlatforms = {
        facebook: { name: 'Facebook', category: 'Social Media', icon: Facebook, fields: ['pageId', 'pageName', 'accessToken'] },
        instagram: { name: 'Instagram', category: 'Social Media', icon: Instagram, fields: ['username', 'businessId', 'accessToken'] },
        twitter: { name: 'Twitter', category: 'Social Media', icon: Twitter, fields: ['userId', 'username', 'accessToken'] },
        linkedin: { name: 'LinkedIn', category: 'Social Media', icon: Linkedin, fields: ['companyId', 'accessToken'] },
        tiktok: { name: 'TikTok', category: 'Social Media', icon: Music, fields: ['username', 'businessId', 'accessToken'] },
        whatsapp: { name: 'WhatsApp Business', category: 'Messaging', icon: MessageSquare, fields: ['businessId'] },
        telegram: { name: 'Telegram', category: 'Messaging', icon: Send, fields: ['botToken'] },
        discord: { name: 'Discord', category: 'Messaging', icon: MessageCircle, fields: ['serverId'] },
        shopify: { name: 'Shopify', category: 'E-commerce', icon: ShoppingBag, fields: ['storeName', 'accessToken'] },
        woocommerce: { name: 'WooCommerce', category: 'E-commerce', icon: ShoppingCart, fields: ['storeUrl', 'consumerKey', 'consumerSecret'] },
        googleAds: { name: 'Google Ads', category: 'Advertising', icon: Target, fields: ['customerId', 'refreshToken'] },
        metaAds: { name: 'Meta Ads', category: 'Advertising', icon: DollarSign, fields: ['adAccountId', 'accessToken'] },
        googleAnalytics: { name: 'Google Analytics', category: 'Analytics', icon: BarChart, fields: ['propertyId', 'accessToken'] },
        mailchimp: { name: 'Mailchimp', category: 'Email Marketing', icon: Mail, fields: ['accountId', 'apiKey'] },
        hubspot: { name: 'HubSpot', category: 'CRM', icon: Building2, fields: ['portalId', 'accessToken'] },
        zapier: { name: 'Zapier', category: 'Automation', icon: Zap, fields: ['apiKey'] },
        slack: { name: 'Slack', category: 'Communication', icon: Slack, fields: ['teamId', 'accessToken'] }
    };

    const handleAddIntegration = () => {
        if (!selectedPlatform) return;

        const newIntegration = {
            connected: false,
            lastSynced: null
        };

        integrationPlatforms[selectedPlatform].fields.forEach(field => {
            newIntegration[field] = '';
        });

        onChange(`integrations.${selectedPlatform}`, newIntegration);
        setSelectedPlatform('');
        setNewIntegrationModal(false);
    };

    const handleToggleConnection = (platform) => {
        const currentStatus = formData?.[platform]?.connected || false;
        onChange(`integrations.${platform}.connected`, !currentStatus);

        if (!currentStatus) {
            onChange(`integrations.${platform}.lastSynced`, new Date().toISOString());
        }
    };

    const handleRemoveIntegration = (platform) => {
        const currentIntegrations = { ...formData } || { ...data } || {};
        delete currentIntegrations[platform];
        onChange('integrations', currentIntegrations);
    };

    const groupedPlatforms = Object.entries(integrationPlatforms).reduce((acc, [key, platform]) => {
        if (!acc[platform.category]) acc[platform.category] = [];
        acc[platform.category].push({ key, ...platform });
        return acc;
    }, {});

    const availablePlatforms = Object.entries(integrationPlatforms).filter(
        ([key]) => !data?.[key] && !formData?.[key]
    );

    const hasIntegrations = Object.keys(data || {}).length > 0 || Object.keys(formData || {}).length > 0;

    return (
        <div className="tab-section animate-fade-in">
            <div className="section-header">
                <div className="data-row-label">
                    <Zap size={20} />
                    <h2>Platform Integrations</h2>
                </div>
                {!editing ? (
                    <button className="edit-btn" onClick={onEdit}>
                        <Edit3 size={16} />
                        Edit
                    </button>
                ) : (
                    <div className="action-buttons">
                        <button className="save-btn" onClick={onSave}>
                            <Save size={16} />
                            Save
                        </button>
                        <button className="cancel-btn" onClick={onCancel}>
                            <X size={16} />
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {editing && availablePlatforms.length > 0 && (
                <div className="add-integration-section">
                    <button
                        className="add-integration-btn"
                        onClick={() => setNewIntegrationModal(true)}
                    >
                        <Plus size={16} />
                        Add New Integration
                    </button>
                </div>
            )}

            {newIntegrationModal && (
                <div className="modal-overlay" onClick={() => setNewIntegrationModal(false)}>
                    <div className="integration-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>
                                <Plus size={20} style={{ marginRight: '0.5rem' }} />
                                Add New Integration
                            </h3>
                            <button onClick={() => setNewIntegrationModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-content">
                            <label>Select Platform</label>
                            <select
                                value={selectedPlatform}
                                onChange={(e) => setSelectedPlatform(e.target.value)}
                                className="profile-select"
                            >
                                <option value="">Choose a platform</option>
                                {availablePlatforms.map(([key, platform]) => (
                                    <option key={key} value={key}>
                                        <platform.icon size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                        {platform.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="cancel-btn"
                                onClick={() => setNewIntegrationModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="save-btn"
                                onClick={handleAddIntegration}
                                disabled={!selectedPlatform}
                            >
                                <Plus size={16} />
                                Add Integration
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="integrations-content">
                {hasIntegrations ? (
                    Object.entries(groupedPlatforms).map(([category, platforms]) => {
                        const categoryPlatforms = platforms.filter(platform => data?.[platform.key] || formData?.[platform.key]);

                        if (categoryPlatforms.length === 0) return null;

                        return (
                            <div key={category} className="integration-category animate-slide-in">
                                <h3 className="category-title">
                                    <Folder size={18} style={{ marginRight: '0.5rem' }} />
                                    {category}
                                </h3>
                                <div className="integrations-grid">
                                    {categoryPlatforms.map(platform => {
                                        const Icon = platform.icon;
                                        const config = formData?.[platform.key] || data?.[platform.key] || {};
                                        return (
                                            <div key={platform.key} className={`integration-card ${!config.connected ? 'disconnected' : ''}`}>
                                                <div className="integration-header">
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                        <Icon size={24} />
                                                        <h4>{platform.name}</h4>
                                                    </div>
                                                    <div className={`connection-status ${config.connected ? 'connected' : 'disconnected'}`}>
                                                        {config.connected ? (
                                                            <>
                                                                <CheckCircle size={12} style={{ marginRight: '0.25rem' }} />
                                                                Connected
                                                            </>
                                                        ) : (
                                                            <>
                                                                <XCircle size={12} style={{ marginRight: '0.25rem' }} />
                                                                Not Connected
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                {config.connected && config.lastSynced && (
                                                    <p className="last-synced">
                                                        <Clock size={12} style={{ marginRight: '0.25rem' }} />
                                                        Last synced: {new Date(config.lastSynced).toLocaleDateString()}
                                                    </p>
                                                )}

                                                {editing && (
                                                    <div className="integration-fields">
                                                        {platform.fields.map(field => (
                                                            <div key={field} className="field-group">
                                                                <label>
                                                                    <Key size={12} style={{ marginRight: '0.25rem' }} />
                                                                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                                                </label>
                                                                <input
                                                                    type={field.includes('token') || field.includes('key') ? 'password' : 'text'}
                                                                    value={config[field] || ''}
                                                                    onChange={(e) => onChange(`integrations.${platform.key}.${field}`, e.target.value)}
                                                                    className="profile-input"
                                                                    placeholder={`Enter ${field}`}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="integration-actions">
                                                    {editing && (
                                                        <>
                                                            <button
                                                                className={`connect-btn ${config.connected ? 'disconnect' : 'connect'}`}
                                                                onClick={() => handleToggleConnection(platform.key)}
                                                            >
                                                                {config.connected ? (
                                                                    <>
                                                                        <Unlink size={16} />
                                                                        Disconnect
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Link size={16} />
                                                                        Connect
                                                                    </>
                                                                )}
                                                            </button>
                                                            <button
                                                                className="remove-btn"
                                                                onClick={() => handleRemoveIntegration(platform.key)}
                                                                title={`Remove ${platform.name} integration`}
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                    {!editing && (
                                                        <button className="connect-btn">
                                                            {config.connected ? (
                                                                <>
                                                                    <RefreshCw size={16} />
                                                                    Reconnect
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Link size={16} />
                                                                    Connect
                                                                </>
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="empty-state">
                        <ZapOff size={48} />
                        <h4>No Integrations</h4>
                        <p>Connect your platforms to streamline your marketing workflow.</p>
                        {editing && (
                            <button
                                className="add-integration-btn"
                                onClick={() => setNewIntegrationModal(true)}
                                style={{ marginTop: '1rem' }}
                            >
                                <Plus size={16} />
                                Add Your First Integration
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// Billing Tab Component
const BillingTab = ({ data, editing, onEdit, onSave, onCancel, onChange, formData, isDarkMode }) => (
    <div className="tab-section animate-fade-in">
        <div className="section-header">
            <div className="data-row-label">
                <CreditCard size={20} />
                <h2>Billing & Subscription</h2>
            </div>
            {!editing ? (
                <button className="edit-btn" onClick={onEdit}>
                    <Edit3 size={16} />
                    Edit
                </button>
            ) : (
                <div className="action-buttons">
                    <button className="save-btn" onClick={onSave}>
                        <Save size={16} />
                        Save
                    </button>
                    <button className="cancel-btn" onClick={onCancel}>
                        <X size={16} />
                        Cancel
                    </button>
                </div>
            )}
        </div>

        <div className="billing-overview">
            <div className="plan-card">
                <h3>
                    <CreditCard size={18} style={{ marginRight: '0.5rem' }} />
                    Current Plan
                </h3>
                <div className="plan-name">{data?.plan || 'Free'}</div>
                <div className="billing-cycle">
                    <Calendar size={14} style={{ marginRight: '0.5rem' }} />
                    {data?.billingCycle || 'Monthly'}
                </div>
                {data?.nextBillingDate && (
                    <div className="next-billing">
                        <Clock size={14} style={{ marginRight: '0.5rem' }} />
                        Next billing: {new Date(data.nextBillingDate).toLocaleDateString()}
                    </div>
                )}
            </div>

            <div className="credits-card">
                <h3>
                    <Coins size={18} style={{ marginRight: '0.5rem' }} />
                    Credits
                </h3>
                <div className="credits-info">
                    <div className="credit-item">
                        <span>
                            <CheckCircle size={14} style={{ marginRight: '0.5rem' }} />
                            Available:
                        </span>
                        <span>{data?.credits?.available || 0}</span>
                    </div>
                    <div className="credit-item">
                        <span>
                            <Activity size={14} style={{ marginRight: '0.5rem' }} />
                            Used:
                        </span>
                        <span>{data?.credits?.used || 0}</span>
                    </div>
                </div>
            </div>
        </div>

        {data?.billingHistory && data.billingHistory.length > 0 ? (
            <div className="billing-history">
                <h3>
                    <History size={18} style={{ marginRight: '0.5rem' }} />
                    Billing History
                </h3>
                <div className="history-table">
                    {data.billingHistory.map((transaction, index) => (
                        <div key={index} className="history-row animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="transaction-date">
                                <Calendar size={14} style={{ marginRight: '0.5rem' }} />
                                {new Date(transaction.date).toLocaleDateString()}
                            </div>
                            <div className="transaction-amount">
                                <DollarSign size={14} style={{ marginRight: '0.25rem' }} />
                                ${transaction.amount} {transaction.currency}
                            </div>
                            <div className={`transaction-status ${transaction.status}`}>
                                {transaction.status === 'paid' && <CheckCircle size={12} style={{ marginRight: '0.25rem' }} />}
                                {transaction.status === 'pending' && <Clock size={12} style={{ marginRight: '0.25rem' }} />}
                                {transaction.status === 'failed' && <XCircle size={12} style={{ marginRight: '0.25rem' }} />}
                                {transaction.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <div className="empty-state" style={{ marginTop: '2rem' }}>
                <FileText size={48} />
                <h4>No Billing History</h4>
                <p>Your billing history will appear here once you make your first transaction.</p>
            </div>
        )}
    </div>
);

// Security Tab Component
const SecurityTab = ({ data, editing, onEdit, onSave, onCancel, onChange, onArrayAdd, onArrayRemove, formData, isDarkMode }) => (
    <div className="tab-section animate-fade-in">
        <div className="section-header">
            <div className="data-row-label">
                <Shield size={20} />
                <h2>Security & Privacy</h2>
            </div>
            {!editing ? (
                <button className="edit-btn" onClick={onEdit}>
                    <Edit3 size={16} />
                    Edit
                </button>
            ) : (
                <div className="action-buttons">
                    <button className="save-btn" onClick={onSave}>
                        <Save size={16} />
                        Save
                    </button>
                    <button className="cancel-btn" onClick={onCancel}>
                        <X size={16} />
                        Cancel
                    </button>
                </div>
            )}
        </div>

        <div className="security-sections">
            <div className="security-section animate-slide-in">
                <h3>
                    <Smartphone size={18} style={{ marginRight: '0.5rem' }} />
                    Trusted Devices
                </h3>
                <div className="devices-list">
                    {data?.devices && data.devices.length > 0 ? (
                        data.devices.map((device, index) => (
                            <div key={index} className="device-card">
                                <div className="device-info">
                                    <div className="device-name">
                                        {device.type === 'mobile' ? <Smartphone size={16} /> : <Monitor size={16} />}
                                        {device.name}
                                    </div>
                                    <div className="device-details">{device.type} - {device.os}</div>
                                    <div className="device-last-used">
                                        <Clock size={12} style={{ marginRight: '0.25rem' }} />
                                        Last used: {new Date(device.lastUsed).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className={`device-status ${device.trusted ? 'trusted' : 'untrusted'}`}>
                                    {device.trusted ? (
                                        <>
                                            <ShieldCheck size={12} style={{ marginRight: '0.25rem' }} />
                                            Trusted
                                        </>
                                    ) : (
                                        <>
                                            <ShieldAlert size={12} style={{ marginRight: '0.25rem' }} />
                                            Untrusted
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state-small">
                            <Monitor size={24} />
                            No devices registered
                        </div>
                    )}
                </div>
            </div>

            <div className="security-section animate-slide-in" style={{ animationDelay: '0.1s' }}>
                <h3>
                    <FileText size={18} style={{ marginRight: '0.5rem' }} />
                    Data Processing Consent
                </h3>
                <div className="consent-options">
                    <div className="consent-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={formData?.dataProcessingConsent?.gdpr || false}
                                onChange={(e) => onChange('security.dataProcessingConsent.gdpr', e.target.checked)}
                                disabled={!editing}
                            />
                            <Globe size={16} style={{ marginRight: '0.5rem' }} />
                            GDPR Compliance
                        </label>
                    </div>
                    <div className="consent-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={formData?.dataProcessingConsent?.ccpa || false}
                                onChange={(e) => onChange('security.dataProcessingConsent.ccpa', e.target.checked)}
                                disabled={!editing}
                            />
                            <MapPin size={16} style={{ marginRight: '0.5rem' }} />
                            CCPA Compliance
                        </label>
                    </div>
                </div>
            </div>

            <div className="security-section animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <h3>
                    <Network size={18} style={{ marginRight: '0.5rem' }} />
                    IP Whitelist
                </h3>
                <div className="ip-list">
                    {data?.ipWhitelist && data.ipWhitelist.length > 0 ? (
                        data.ipWhitelist.map((ip, index) => (
                            <div key={index} className="ip-item">
                                <Hash size={14} style={{ marginRight: '0.5rem' }} />
                                {ip}
                                {editing && (
                                    <button onClick={() => onArrayRemove('security.ipWhitelist', index)}>
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="empty-state-small">
                            <Wifi size={24} />
                            No IP addresses whitelisted
                        </div>
                    )}
                    {editing && (
                        <button
                            className="add-ip-btn"
                            onClick={() => {
                                const newIP = prompt('Enter IP address:');
                                if (newIP) onArrayAdd('security.ipWhitelist', newIP);
                            }}
                        >
                            <Plus size={16} />
                            Add IP
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// Audience Tab Component
const AudienceTab = ({ data, editing, onEdit, onSave, onCancel, onChange, onArrayAdd, onArrayRemove, formData, isDarkMode }) => (
    <div className="tab-section animate-fade-in">
        <div className="section-header">
            <div className="data-row-label">
                <Users size={20} />
                <h2>Target Audience</h2>
            </div>
            {!editing ? (
                <button className="edit-btn" onClick={onEdit}>
                    <Edit3 size={16} />
                    Edit
                </button>
            ) : (
                <div className="action-buttons">
                    <button className="save-btn" onClick={onSave}>
                        <Save size={16} />
                        Save
                    </button>
                    <button className="cancel-btn" onClick={onCancel}>
                        <X size={16} />
                        Cancel
                    </button>
                </div>
            )}
        </div>

        <div className="audience-sections">
            <div className="audience-section">
                <h3>
                    <Users size={18} style={{ marginRight: '0.5rem' }} />
                    Demographics
                </h3>
                <div className="form-grid">
                    <div className="data-card">
                        <div className="data-card-icon">
                            <Calendar size={24} />
                        </div>
                        <div className="data-card-content">
                            <div className="data-card-title">Age Range</div>
                            <div className="data-card-value">
                                <div className="age-range-inputs">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={formData?.demographics?.ageRange?.min || ''}
                                        onChange={(e) => onChange('targetAudience.demographics.ageRange.min', parseInt(e.target.value))}
                                        disabled={!editing}
                                        className="profile-input age-input"
                                        min="13"
                                        max="100"
                                    />
                                    <span>to</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={formData?.demographics?.ageRange?.max || ''}
                                        onChange={(e) => onChange('targetAudience.demographics.ageRange.max', parseInt(e.target.value))}
                                        disabled={!editing}
                                        className="profile-input age-input"
                                        min="13"
                                        max="100"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="data-card">
                        <div className="data-card-icon">
                            <User size={24} />
                        </div>
                        <div className="data-card-content">
                            <div className="data-card-title">Genders</div>
                            <div className="data-card-value">
                                <div className="tag-list">
                                    {(formData?.demographics?.genders || data?.demographics?.genders || []).length > 0 ? (
                                        (formData?.demographics?.genders || data?.demographics?.genders || []).map((gender, index) => (
                                            <span key={index} className="tag">
                                                <User size={12} style={{ marginRight: '0.25rem' }} />
                                                {gender}
                                                {editing && (
                                                    <button onClick={() => onArrayRemove('targetAudience.demographics.genders', index)}>
                                                        <X size={12} />
                                                    </button>
                                                )}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="empty-state-small">
                                            <User size={20} />
                                            No genders specified
                                        </span>
                                    )}
                                    {editing && (
                                        <select
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    onArrayAdd('targetAudience.demographics.genders', e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                            className="profile-select"
                                        >
                                            <option value="">Add Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="non-binary">Non-binary</option>
                                            <option value="other">Other</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="data-card form-group-full">
                        <div className="data-card-icon">
                            <Globe size={24} />
                        </div>
                        <div className="data-card-content">
                            <div className="data-card-title">Languages</div>
                            <div className="data-card-value">
                                <div className="tag-list">
                                    {(formData?.demographics?.languages || data?.demographics?.languages || []).length > 0 ? (
                                        (formData?.demographics?.languages || data?.demographics?.languages || []).map((language, index) => (
                                            <span key={index} className="tag">
                                                <Globe size={12} style={{ marginRight: '0.25rem' }} />
                                                {language}
                                                {editing && (
                                                    <button onClick={() => onArrayRemove('targetAudience.demographics.languages', index)}>
                                                        <X size={12} />
                                                    </button>
                                                )}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="empty-state-small">
                                            <Globe size={20} />
                                            No languages specified
                                        </span>
                                    )}
                                    {editing && (
                                        <button
                                            className="add-tag-btn"
                                            onClick={() => {
                                                const newLanguage = prompt('Enter language:');
                                                if (newLanguage) onArrayAdd('targetAudience.demographics.languages', newLanguage);
                                            }}
                                        >
                                            <Plus size={16} />
                                            Add Language
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="audience-section">
                <h3>
                    <Brain size={18} style={{ marginRight: '0.5rem' }} />
                    Psychographics
                </h3>
                <div className="form-grid">
                    <div className="data-card form-group-full">
                        <div className="data-card-icon">
                            <Heart size={24} />
                        </div>
                        <div className="data-card-content">
                            <div className="data-card-title">Interests</div>
                            <div className="data-card-value">
                                <div className="tag-list">
                                    {(formData?.psychographics?.interests || data?.psychographics?.interests || []).length > 0 ? (
                                        (formData?.psychographics?.interests || data?.psychographics?.interests || []).map((interest, index) => (
                                            <span key={index} className="tag">
                                                <Heart size={12} style={{ marginRight: '0.25rem' }} />
                                                {interest}
                                                {editing && (
                                                    <button onClick={() => onArrayRemove('targetAudience.psychographics.interests', index)}>
                                                        <X size={12} />
                                                    </button>
                                                )}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="empty-state-small">
                                            <Heart size={20} />
                                            No interests specified
                                        </span>
                                    )}
                                    {editing && (
                                        <button
                                            className="add-tag-btn"
                                            onClick={() => {
                                                const newInterest = prompt('Enter interest:');
                                                if (newInterest) onArrayAdd('targetAudience.psychographics.interests', newInterest);
                                            }}
                                        >
                                            <Plus size={16} />
                                            Add Interest
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="data-card form-group-full">
                        <div className="data-card-icon">
                            <AlertTriangle size={24} />
                        </div>
                        <div className="data-card-content">
                            <div className="data-card-title">Pain Points</div>
                            <div className="data-card-value">
                                <div className="tag-list">
                                    {(formData?.psychographics?.painPoints || data?.psychographics?.painPoints || []).length > 0 ? (
                                        (formData?.psychographics?.painPoints || data?.psychographics?.painPoints || []).map((painPoint, index) => (
                                            <span key={index} className="tag">
                                                <AlertTriangle size={12} style={{ marginRight: '0.25rem' }} />
                                                {painPoint}
                                                {editing && (
                                                    <button onClick={() => onArrayRemove('targetAudience.psychographics.painPoints', index)}>
                                                        <X size={12} />
                                                    </button>
                                                )}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="empty-state-small">
                                            <AlertTriangle size={20} />
                                            No pain points specified
                                        </span>
                                    )}
                                    {editing && (
                                        <button
                                            className="add-tag-btn"
                                            onClick={() => {
                                                const newPainPoint = prompt('Enter pain point:');
                                                if (newPainPoint) onArrayAdd('targetAudience.psychographics.painPoints', newPainPoint);
                                            }}
                                        >
                                            <Plus size={16} />
                                            Add Pain Point
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// AI Preferences Tab Component
const AIPreferencesTab = ({ data, editing, onEdit, onSave, onCancel, onChange, formData, isDarkMode }) => (
    <div className="tab-section animate-fade-in">
        <div className="section-header">
            <div className="data-row-label">
                <Bot size={20} />
                <h2>AI Preferences</h2>
            </div>
            {!editing ? (
                <button className="edit-btn" onClick={onEdit}>
                    <Edit3 size={16} />
                    Edit
                </button>
            ) : (
                <div className="action-buttons">
                    <button className="save-btn" onClick={onSave}>
                        <Save size={16} />
                        Save
                    </button>
                    <button className="cancel-btn" onClick={onCancel}>
                        <X size={16} />
                        Cancel
                    </button>
                </div>
            )}
        </div>

        <div className="ai-sections">
            <div className="ai-section">
                <h3>
                    <FileText size={18} style={{ marginRight: '0.5rem' }} />
                    Content Generation
                </h3>
                <div className="form-grid">
                    <div className="data-card">
                        <div className="data-card-icon">
                            <Volume2 size={24} />
                        </div>
                        <div className="data-card-content">
                            <div className="data-card-title">Brand Voice</div>
                            <div className="data-card-value">
                                {editing ? (
                                    <select
                                        value={formData?.contentGeneration?.brandVoice || ''}
                                        onChange={(e) => onChange('aiPreferences.contentGeneration.brandVoice', e.target.value)}
                                        className="profile-select"
                                    >
                                        <option value="">Select Voice</option>
                                        <option value="professional">Professional</option>
                                        <option value="friendly">Friendly</option>
                                        <option value="authoritative">Authoritative</option>
                                        <option value="quirky">Quirky</option>
                                        <option value="enthusiastic">Enthusiastic</option>
                                    </select>
                                ) : (
                                    data?.contentGeneration?.brandVoice || 'Not set'
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="data-card form-group-full">
                        <div className="data-card-icon">
                            <Palette size={24} />
                        </div>
                        <div className="data-card-content">
                            <div className="data-card-title">Style Guide</div>
                            <div className="data-card-value">
                                {editing ? (
                                    <textarea
                                        value={formData?.contentGeneration?.styleGuide || ''}
                                        onChange={(e) => onChange('aiPreferences.contentGeneration.styleGuide', e.target.value)}
                                        className="profile-textarea"
                                        rows={4}
                                        placeholder="Describe your brand's style and tone guidelines..."
                                    />
                                ) : (
                                    data?.contentGeneration?.styleGuide || 'No style guide set'
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ai-section automation-settings">
                <h3>
                    <Settings size={18} style={{ marginRight: '0.5rem' }} />
                    Automation Settings
                </h3>
                <div className="automation-toggles">
                    <div className="toggle-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={formData?.automationSettings?.postScheduling || false}
                                onChange={(e) => onChange('aiPreferences.automationSettings.postScheduling', e.target.checked)}
                                disabled={!editing}
                            />
                            <Calendar size={16} style={{ marginRight: '0.5rem' }} />
                            Post Scheduling
                        </label>
                    </div>
                    <div className="toggle-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={formData?.automationSettings?.autoResponses || false}
                                onChange={(e) => onChange('aiPreferences.automationSettings.autoResponses', e.target.checked)}
                                disabled={!editing}
                            />
                            <MessageSquare size={16} style={{ marginRight: '0.5rem' }} />
                            Auto Responses
                        </label>
                    </div>
                    <div className="toggle-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={formData?.automationSettings?.sentimentAnalysis || false}
                                onChange={(e) => onChange('aiPreferences.automationSettings.sentimentAnalysis', e.target.checked)}
                                disabled={!editing}
                            />
                            <BarChart size={16} style={{ marginRight: '0.5rem' }} />
                            Sentiment Analysis
                        </label>
                    </div>
                    <div className="toggle-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={formData?.automationSettings?.competitorMonitoring || false}
                                onChange={(e) => onChange('aiPreferences.automationSettings.competitorMonitoring', e.target.checked)}
                                disabled={!editing}
                            />
                            <Eye size={16} style={{ marginRight: '0.5rem' }} />
                            Competitor Monitoring
                        </label>
                    </div>
                </div>
            </div>

            <div className="ai-section model-preferences">
                <h3>
                    <Cpu size={18} style={{ marginRight: '0.5rem' }} />
                    Model Preferences
                </h3>
                <div className="form-grid">
                    <div className="data-card">
                        <div className="data-card-icon">
                            <Bot size={24} />
                        </div>
                        <div className="data-card-content">
                            <div className="data-card-title">Primary Model</div>
                            <div className="data-card-value">
                                {editing ? (
                                    <select
                                        value={formData?.modelPreferences?.primaryModel || 'gpt-4'}
                                        onChange={(e) => onChange('aiPreferences.modelPreferences.primaryModel', e.target.value)}
                                        className="profile-select"
                                    >
                                        <option value="gpt-4">GPT-4</option>
                                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                                        <option value="claude-3">Claude 3</option>
                                    </select>
                                ) : (
                                    <div className="status-badge status-badge-info">
                                        {data?.modelPreferences?.primaryModel || 'GPT-4'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="data-card">
                        <div className="data-card-icon">
                            <ImageIcon size={24} />
                        </div>
                        <div className="data-card-content">
                            <div className="data-card-title">Image Model</div>
                            <div className="data-card-value">
                                {editing ? (
                                    <select
                                        value={formData?.modelPreferences?.imageModel || 'dall-e-3'}
                                        onChange={(e) => onChange('aiPreferences.modelPreferences.imageModel', e.target.value)}
                                        className="profile-select"
                                    >
                                        <option value="dall-e-3">DALL-E 3</option>
                                        <option value="midjourney">Midjourney</option>
                                        <option value="stable-diffusion">Stable Diffusion</option>
                                    </select>
                                ) : (
                                    <div className="status-badge status-badge-info">
                                        {data?.modelPreferences?.imageModel || 'DALL-E 3'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Content Assets Tab Component
const ContentAssetsTab = ({ data, editing, onEdit, onSave, onCancel, onChange, onArrayAdd, onArrayRemove, formData, isDarkMode }) => {
    const [assetModal, setAssetModal] = useState(false);
    const [templateModal, setTemplateModal] = useState(false);
    const [newAsset, setNewAsset] = useState({
        type: 'image',
        url: '',
        description: '',
        tags: []
    });
    const [newTemplate, setNewTemplate] = useState({
        name: '',
        type: 'post',
        content: '',
        variables: []
    });
    const [newTag, setNewTag] = useState('');
    const [newVariable, setNewVariable] = useState('');

    const handleAddAsset = () => {
        if (!newAsset.description.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Description',
                text: 'Please provide a description for the asset',
                timer: 2000
            });
            return;
        }

        const assetToAdd = {
            ...newAsset,
            publicId: `asset_${Date.now()}`,
            created: new Date().toISOString()
        };

        const currentAssets = formData?.brandAssets || data?.brandAssets || [];
        const updatedAssets = [...currentAssets, assetToAdd];

        onChange('contentAssets.brandAssets', updatedAssets);

        setNewAsset({
            type: 'image',
            url: '',
            description: '',
            tags: []
        });
        setAssetModal(false);

        Swal.fire({
            icon: 'success',
            title: 'Asset Added',
            text: 'Your brand asset has been added successfully',
            timer: 1500
        });
    };

    const handleAddTemplate = () => {
        if (!newTemplate.name.trim() || !newTemplate.content.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Information',
                text: 'Please provide both name and content for the template',
                timer: 2000
            });
            return;
        }

        const templateToAdd = {
            ...newTemplate,
            lastUsed: null
        };

        const currentTemplates = formData?.contentTemplates || data?.contentTemplates || [];
        const updatedTemplates = [...currentTemplates, templateToAdd];

        onChange('contentAssets.contentTemplates', updatedTemplates);

        setNewTemplate({
            name: '',
            type: 'post',
            content: '',
            variables: []
        });
        setTemplateModal(false);

        Swal.fire({
            icon: 'success',
            title: 'Template Created',
            text: 'Your content template has been created successfully',
            timer: 1500
        });
    };

    const addTagToAsset = () => {
        if (newTag.trim() && !newAsset.tags.includes(newTag.trim())) {
            setNewAsset(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const removeTagFromAsset = (index) => {
        setNewAsset(prev => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index)
        }));
    };

    const addVariableToTemplate = () => {
        if (newVariable.trim() && !newTemplate.variables.includes(newVariable.trim())) {
            setNewTemplate(prev => ({
                ...prev,
                variables: [...prev.variables, newVariable.trim()]
            }));
            setNewVariable('');
        }
    };

    const removeVariableFromTemplate = (index) => {
        setNewTemplate(prev => ({
            ...prev,
            variables: prev.variables.filter((_, i) => i !== index)
        }));
    };

    const brandAssets = formData?.brandAssets || data?.brandAssets || [];
    const contentTemplates = formData?.contentTemplates || data?.contentTemplates || [];

    return (
        <div className="tab-section animate-fade-in">
            <div className="section-header">
                <div className="data-row-label">
                    <FileText size={20} />
                    <h2>Content Assets</h2>
                </div>
                {!editing ? (
                    <button className="edit-btn" onClick={onEdit}>
                        <Edit3 size={16} />
                        Edit
                    </button>
                ) : (
                    <div className="action-buttons">
                        <button className="save-btn" onClick={onSave}>
                            <Save size={16} />
                            Save
                        </button>
                        <button className="cancel-btn" onClick={onCancel}>
                            <X size={16} />
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {assetModal && (
                <div className="modal-overlay" onClick={() => setAssetModal(false)}>
                    <div className="asset-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>
                                <ImageIcon size={20} style={{ marginRight: '0.5rem' }} />
                                Add Brand Asset
                            </h3>
                            <button onClick={() => setAssetModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="form-group">
                                <label>
                                    <FileText size={16} style={{ marginRight: '0.5rem' }} />
                                    Asset Type
                                </label>
                                <select
                                    value={newAsset.type}
                                    onChange={(e) => setNewAsset(prev => ({ ...prev, type: e.target.value }))}
                                    className="profile-select"
                                >
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                    <option value="logo">Logo</option>
                                    <option value="document">Document</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>
                                    <Link size={16} style={{ marginRight: '0.5rem' }} />
                                    URL
                                </label>
                                <input
                                    type="url"
                                    value={newAsset.url}
                                    onChange={(e) => setNewAsset(prev => ({ ...prev, url: e.target.value }))}
                                    className="profile-input"
                                    placeholder="https://example.com/asset.jpg"
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <MessageSquare size={16} style={{ marginRight: '0.5rem' }} />
                                    Description
                                </label>
                                <textarea
                                    value={newAsset.description}
                                    onChange={(e) => setNewAsset(prev => ({ ...prev, description: e.target.value }))}
                                    className="profile-textarea"
                                    rows={3}
                                    placeholder="Describe this asset..."
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <Tag size={16} style={{ marginRight: '0.5rem' }} />
                                    Tags
                                </label>
                                <div className="tag-input-group">
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        className="profile-input"
                                        placeholder="Add tag"
                                        onKeyPress={(e) => e.key === 'Enter' && addTagToAsset()}
                                    />
                                    <button type="button" onClick={addTagToAsset}>
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <div className="tag-list">
                                    {newAsset.tags.map((tag, index) => (
                                        <span key={index} className="tag">
                                            <Tag size={12} style={{ marginRight: '0.25rem' }} />
                                            {tag}
                                            <button onClick={() => removeTagFromAsset(index)}>
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setAssetModal(false)}>
                                Cancel
                            </button>
                            <button className="save-btn" onClick={handleAddAsset}>
                                <Plus size={16} />
                                Add Asset
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {templateModal && (
                <div className="modal-overlay" onClick={() => setTemplateModal(false)}>
                    <div className="template-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>
                                <FileText size={20} style={{ marginRight: '0.5rem' }} />
                                Add Content Template
                            </h3>
                            <button onClick={() => setTemplateModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="form-group">
                                <label>
                                    <Type size={16} style={{ marginRight: '0.5rem' }} />
                                    Template Name
                                </label>
                                <input
                                    type="text"
                                    value={newTemplate.name}
                                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                                    className="profile-input"
                                    placeholder="e.g., Social Media Post Template"
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <Layout size={16} style={{ marginRight: '0.5rem' }} />
                                    Template Type
                                </label>
                                <select
                                    value={newTemplate.type}
                                    onChange={(e) => setNewTemplate(prev => ({ ...prev, type: e.target.value }))}
                                    className="profile-select"
                                >
                                    <option value="post">Social Media Post</option>
                                    <option value="ad">Advertisement</option>
                                    <option value="email">Email</option>
                                    <option value="landing-page">Landing Page</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>
                                    <FileText size={16} style={{ marginRight: '0.5rem' }} />
                                    Content
                                </label>
                                <textarea
                                    value={newTemplate.content}
                                    onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                                    className="profile-textarea"
                                    rows={6}
                                    placeholder="Template content with variables like {{company_name}}, {{product_name}}"
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <Hash size={16} style={{ marginRight: '0.5rem' }} />
                                    Variables
                                </label>
                                <div className="tag-input-group">
                                    <input
                                        type="text"
                                        value={newVariable}
                                        onChange={(e) => setNewVariable(e.target.value)}
                                        className="profile-input"
                                        placeholder="e.g., company_name"
                                        onKeyPress={(e) => e.key === 'Enter' && addVariableToTemplate()}
                                    />
                                    <button type="button" onClick={addVariableToTemplate}>
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <div className="tag-list">
                                    {newTemplate.variables.map((variable, index) => (
                                        <span key={index} className="tag">
                                            <Hash size={12} style={{ marginRight: '0.25rem' }} />
                                            {variable}
                                            <button onClick={() => removeVariableFromTemplate(index)}>
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setTemplateModal(false)}>
                                Cancel
                            </button>
                            <button className="save-btn" onClick={handleAddTemplate}>
                                <Plus size={16} />
                                Add Template
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="content-sections">
                <div className="content-section">
                    <div className="section-header-inline">
                        <h3>
                            <ImageIcon size={18} style={{ marginRight: '0.5rem' }} />
                            Brand Assets
                        </h3>
                        {editing && (
                            <button className="add-asset-btn" onClick={() => setAssetModal(true)}>
                                <Plus size={16} />
                                Add Asset
                            </button>
                        )}
                    </div>
                    <div className="assets-grid">
                        {brandAssets.length > 0 ? (
                            brandAssets.map((asset, index) => (
                                <div key={index} className="asset-card animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <div className="asset-preview">
                                        {asset.type === 'image' || asset.type === 'logo' ? (
                                            asset.url ? (
                                                <img src={asset.url} alt={asset.description} className="asset-thumbnail" />
                                            ) : (
                                                <ImageIcon size={40} />
                                            )
                                        ) : asset.type === 'video' ? (
                                            <Video size={40} />
                                        ) : (
                                            <FileText size={40} />
                                        )}
                                    </div>
                                    <div className="asset-info">
                                        <div className="asset-description">{asset.description || 'No description'}</div>
                                        <div className="asset-type">
                                            {asset.type === 'image' && <ImageIcon size={12} style={{ marginRight: '0.25rem' }} />}
                                            {asset.type === 'video' && <Video size={12} style={{ marginRight: '0.25rem' }} />}
                                            {asset.type === 'logo' && <Star size={12} style={{ marginRight: '0.25rem' }} />}
                                            {asset.type === 'document' && <FileText size={12} style={{ marginRight: '0.25rem' }} />}
                                            {asset.type}
                                        </div>
                                        <div className="asset-tags">
                                            {asset.tags?.map((tag, tagIndex) => (
                                                <span key={tagIndex} className="asset-tag">
                                                    <Tag size={10} style={{ marginRight: '0.1rem' }} />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {editing && (
                                        <button
                                            className="remove-asset-btn"
                                            onClick={() => {
                                                const updatedAssets = brandAssets.filter((_, i) => i !== index);
                                                onChange('contentAssets.brandAssets', updatedAssets);
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <ImageIcon size={48} />
                                <h4>No Brand Assets</h4>
                                <p>Upload brand assets like logos, images, and documents to use in your content.</p>
                                {editing && (
                                    <button className="add-asset-btn" onClick={() => setAssetModal(true)} style={{ marginTop: '1rem' }}>
                                        <Plus size={16} />
                                        Add Your First Asset
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="content-section">
                    <div className="section-header-inline">
                        <h3>
                            <Copy size={18} style={{ marginRight: '0.5rem' }} />
                            Content Templates
                        </h3>
                        {editing && (
                            <button className="add-template-btn" onClick={() => setTemplateModal(true)}>
                                <Plus size={16} />
                                Add Template
                            </button>
                        )}
                    </div>
                    <div className="templates-list">
                        {contentTemplates.length > 0 ? (
                            contentTemplates.map((template, index) => (
                                <div key={index} className="template-card animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <div className="template-header">
                                        <h4>
                                            <FileText size={16} style={{ marginRight: '0.5rem' }} />
                                            {template.name}
                                        </h4>
                                        <span className="template-type">
                                            {template.type === 'post' && <MessageSquare size={12} style={{ marginRight: '0.25rem' }} />}
                                            {template.type === 'ad' && <Target size={12} style={{ marginRight: '0.25rem' }} />}
                                            {template.type === 'email' && <Mail size={12} style={{ marginRight: '0.25rem' }} />}
                                            {template.type === 'landing-page' && <Globe size={12} style={{ marginRight: '0.25rem' }} />}
                                            {template.type}
                                        </span>
                                    </div>
                                    <div className="template-content">
                                        {template.content?.substring(0, 150)}
                                        {template.content?.length > 150 && '...'}
                                    </div>
                                    <div className="template-variables">
                                        {template.variables?.map((variable, varIndex) => (
                                            <span key={varIndex} className="variable-tag">
                                                <Hash size={10} style={{ marginRight: '0.1rem' }} />
                                                {variable}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="template-meta">
                                        <Clock size={12} style={{ marginRight: '0.25rem' }} />
                                        Last used: {template.lastUsed ? new Date(template.lastUsed).toLocaleDateString() : 'Never'}
                                    </div>
                                    {editing && (
                                        <button
                                            className="remove-template-btn"
                                            onClick={() => {
                                                const updatedTemplates = contentTemplates.filter((_, i) => i !== index);
                                                onChange('contentAssets.contentTemplates', updatedTemplates);
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <Copy size={48} />
                                <h4>No Content Templates</h4>
                                <p>Create reusable templates for your content to save time and maintain consistency.</p>
                                {editing && (
                                    <button className="add-template-btn" onClick={() => setTemplateModal(true)} style={{ marginTop: '1rem' }}>
                                        <Plus size={16} />
                                        Create Your First Template
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;