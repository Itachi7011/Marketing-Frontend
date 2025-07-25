import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Swal from 'sweetalert2';
import {
    User,
    Building2,
    Target,
    Bot,
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
    Music
} from 'lucide-react';

const ClientProfile = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const [userProfile, setUserProfile] = useState(null);
    const [activeTab, setActiveTab] = useState('personal');
    const [editingSection, setEditingSection] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch user profile data
    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/auth/userProfile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUserProfile(data);
                setFormData(data);
            } else {
                throw new Error('Failed to fetch profile');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load profile data'
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
            const response = await fetch('/api/auth/userProfile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedData = await response.json();
                setUserProfile(updatedData);
                setEditingSection(null);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Profile updated successfully!'
                });
            } else {
                throw new Error('Failed to update profile');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update profile'
            });
        }
    };

    const handleCancel = () => {
        setFormData(userProfile);
        setEditingSection(null);
    };

    const handleInputChange = (path, value) => {
        const keys = path.split('.');
        const updatedData = { ...formData };
        let current = updatedData;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
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

        if (!current[keys[keys.length - 1]]) current[keys[keys.length - 1]] = [];
        current[keys[keys.length - 1]].push(item);
        setFormData(updatedData);
    };

    const handleArrayRemove = (path, index) => {
        const keys = path.split('.');
        const updatedData = { ...formData };
        let current = updatedData;

        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }

        current[keys[keys.length - 1]].splice(index, 1);
        setFormData(updatedData);
    };

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: User },
        { id: 'business', label: 'Business', icon: Building2 },
        { id: 'marketing', label: 'Marketing', icon: Target },
        { id: 'integrations', label: 'Integrations', icon: Zap },
        { id: 'audience', label: 'Target Audience', icon: Target },
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
            </div>
        );
    }

    if (!userProfile) {
        return (
            <div className={`client-profile-error ${isDarkMode ? 'dark' : 'light'}`}>
                <p>Failed to load profile data</p>
            </div>
        );
    }

    return (
        <div className={`client-profile-container ${isDarkMode ? 'dark' : 'light'}`}>
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
                            <p className="profile-role">{userProfile.personalInfo?.userType || 'Client'}</p>
                            <p className="profile-bio">{userProfile.personalInfo?.bio || 'No bio added yet'}</p>
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
                                {/* <IconComponent size={20} /> */}
                                <span style={{marginLeft:"-0.8rem"}}>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="profile-tab-content">
                    {activeTab === 'personal' && (
                        <PersonalInfoTab
                            data={userProfile.personalInfo}
                            editing={editingSection === 'personal'}
                            onEdit={() => handleEdit('personal')}
                            onSave={() => handleSave('personal')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            formData={formData.personalInfo}
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
                        />
                    )}

                    {activeTab === 'marketing' && (
                        <MarketingTab
                            data={userProfile.marketingProfile}
                            editing={editingSection === 'marketing'}
                            onEdit={() => handleEdit('marketing')}
                            onSave={() => handleSave('marketing')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            onArrayAdd={handleArrayAdd}
                            onArrayRemove={handleArrayRemove}
                            formData={formData.marketingProfile}
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
                        />
                    )}

                    {activeTab === 'audience' && (
                        <AudienceTab
                            data={userProfile.targetAudience}
                            editing={editingSection === 'audience'}
                            onEdit={() => handleEdit('audience')}
                            onSave={() => handleSave('audience')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            onArrayAdd={handleArrayAdd}
                            onArrayRemove={handleArrayRemove}
                            formData={formData.targetAudience}
                        />
                    )}

                    {activeTab === 'ai' && (
                        <AIPreferencesTab
                            data={userProfile.aiPreferences}
                            editing={editingSection === 'ai'}
                            onEdit={() => handleEdit('ai')}
                            onSave={() => handleSave('ai')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            formData={formData.aiPreferences}
                        />
                    )}

                    {activeTab === 'content' && (
                        <ContentAssetsTab
                            data={userProfile.contentAssets}
                            editing={editingSection === 'content'}
                            onEdit={() => handleEdit('content')}
                            onSave={() => handleSave('content')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            onArrayAdd={handleArrayAdd}
                            onArrayRemove={handleArrayRemove}
                            formData={formData.contentAssets}
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
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// Personal Info Tab Component
const PersonalInfoTab = ({ data, editing, onEdit, onSave, onCancel, onChange, formData }) => (
    <div className="tab-section">
        <div className="section-header">
            <h2>Personal Information</h2>
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
            <div className="form-group">
                <label>First Name</label>
                {editing ? (
                    <input
                        type="text"
                        value={formData?.firstName || ''}
                        onChange={(e) => onChange('personalInfo.firstName', e.target.value)}
                        className="profile-input"
                    />
                ) : (
                    <div className="form-value">{data?.firstName || 'Not provided'}</div>
                )}
            </div>

            <div className="form-group">
                <label>Last Name</label>
                {editing ? (
                    <input
                        type="text"
                        value={formData?.lastName || ''}
                        onChange={(e) => onChange('personalInfo.lastName', e.target.value)}
                        className="profile-input"
                    />
                ) : (
                    <div className="form-value">{data?.lastName || 'Not provided'}</div>
                )}
            </div>

            <div className="form-group">
                <label>Display Name</label>
                {editing ? (
                    <input
                        type="text"
                        value={formData?.displayName || ''}
                        onChange={(e) => onChange('personalInfo.displayName', e.target.value)}
                        className="profile-input"
                    />
                ) : (
                    <div className="form-value">{data?.displayName || 'Not provided'}</div>
                )}
            </div>

            <div className="form-group">
                <label>User Type</label>
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
                    <div className="form-value">{data?.userType || 'Client'}</div>
                )}
            </div>

            <div className="form-group form-group-full">
                <label>Bio</label>
                {editing ? (
                    <textarea
                        value={formData?.bio || ''}
                        onChange={(e) => onChange('personalInfo.bio', e.target.value)}
                        className="profile-textarea"
                        maxLength={250}
                        rows={3}
                    />
                ) : (
                    <div className="form-value">{data?.bio || 'No bio added yet'}</div>
                )}
            </div>

            <div className="form-group">
                <label>Timezone</label>
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
                    <div className="form-value">{data?.timezone || 'Not set'}</div>
                )}
            </div>

            <div className="form-group">
                <label>Preferred Language</label>
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
                    <div className="form-value">{data?.preferredLanguage || 'English'}</div>
                )}
            </div>
        </div>
    </div>
);

// Business Tab Component
const BusinessTab = ({ data, editing, onEdit, onSave, onCancel, onChange, formData }) => (
    <div className="tab-section">
        <div className="section-header">
            <h2>Business Information</h2>
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
            <div className="form-group">
                <label>Company Name</label>
                {editing ? (
                    <input
                        type="text"
                        value={formData?.companyName || ''}
                        onChange={(e) => onChange('business.companyName', e.target.value)}
                        className="profile-input"
                    />
                ) : (
                    <div className="form-value">{data?.companyName || 'Not provided'}</div>
                )}
            </div>

            <div className="form-group">
                <label>Website</label>
                {editing ? (
                    <input
                        type="url"
                        value={formData?.website || ''}
                        onChange={(e) => onChange('business.website', e.target.value)}
                        className="profile-input"
                        placeholder="https://example.com"
                    />
                ) : (
                    <div className="form-value">
                        {data?.website ? (
                            <a href={data.website} target="_blank" rel="noopener noreferrer">
                                {data.website}
                            </a>
                        ) : (
                            'Not provided'
                        )}
                    </div>
                )}
            </div>

            <div className="form-group">
                <label>Industry</label>
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
                    <div className="form-value">{data?.industry || 'Not selected'}</div>
                )}
            </div>

            <div className="form-group">
                <label>Business Type</label>
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
                    <div className="form-value">{data?.businessType || 'Not selected'}</div>
                )}
            </div>

            <div className="form-group">
                <label>Company Size</label>
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
                    <div className="form-value">{data?.companySize || 'Not selected'}</div>
                )}
            </div>

            <div className="form-group">
                <label>Tax ID</label>
                {editing ? (
                    <input
                        type="text"
                        value={formData?.taxID || ''}
                        onChange={(e) => onChange('business.taxID', e.target.value)}
                        className="profile-input"
                    />
                ) : (
                    <div className="form-value">{data?.taxID || 'Not provided'}</div>
                )}
            </div>

            <div className="form-group form-group-full">
                <label>Company Description</label>
                {editing ? (
                    <textarea
                        value={formData?.companyDescription || ''}
                        onChange={(e) => onChange('business.companyDescription', e.target.value)}
                        className="profile-textarea"
                        rows={4}
                    />
                ) : (
                    <div className="form-value">{data?.companyDescription || 'No description provided'}</div>
                )}
            </div>
        </div>
    </div>
);

// Marketing Tab Component
const MarketingTab = ({ data, editing, onEdit, onSave, onCancel, onChange, onArrayAdd, onArrayRemove, formData }) => (
    <div className="tab-section">
        <div className="section-header">
            <h2>Marketing Profile</h2>
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
            <div className="form-group">
                <label>Role</label>
                {editing ? (
                    <select
                        value={formData?.role || ''}
                        onChange={(e) => onChange('marketingProfile.role', e.target.value)}
                        className="profile-select"
                    >
                        <option value="">Select Role</option>
                        <option value="owner">Owner</option>
                        <option value="cmio">CMO</option>
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
                    <div className="form-value">{data?.role || 'Not selected'}</div>
                )}
            </div>

            <div className="form-group">
                <label>Experience Level</label>
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
                    <div className="form-value">{data?.experienceLevel || 'Not selected'}</div>
                )}
            </div>

            <div className="form-group">
                <label>Monthly Ad Budget</label>
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
                    <div className="form-value">{data?.monthlyAdBudget || 'Not selected'}</div>
                )}
            </div>

            <div className="form-group form-group-full">
                <label>Marketing Goals</label>
                <div className="tag-list">
                    {data?.marketingGoals?.map((goal, index) => (
                        <span key={index} className="tag">
                            {goal.replace('-', ' ')}
                            {editing && (
                                <button onClick={() => onArrayRemove('marketingProfile.marketingGoals', index)}>
                                    <X size={12} />
                                </button>
                            )}
                        </span>
                    ))}
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

            <div className="form-group form-group-full">
                <label>Challenges</label>
                <div className="tag-list">
                    {data?.challenges?.map((challenge, index) => (
                        <span key={index} className="tag">
                            {challenge.replace('-', ' ')}
                            {editing && (
                                <button onClick={() => onArrayRemove('marketingProfile.challenges', index)}>
                                    <X size={12} />
                                </button>
                            )}
                        </span>
                    ))}
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
);

// Add other tab components (IntegrationsTab, AudienceTab, etc.) here...
// For brevity, I'll show the structure for a few more key tabs:

const IntegrationsTab = ({ data, editing, onEdit, onSave, onCancel, onChange, formData }) => (
    <div className="tab-section">
        <div className="section-header">
            <h2>Platform Integrations</h2>
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

        <div className="integrations-grid">
            {Object.entries(data || {}).map(([platform, config]) => (
                <div key={platform} className="integration-card">
                    <div className="integration-header">
                        <h3>{platform.charAt(0).toUpperCase() + platform.slice(1)}</h3>
                        <div className={`connection-status ${config.connected ? 'connected' : 'disconnected'}`}>
                            {config.connected ? 'Connected' : 'Not Connected'}
                        </div>
                    </div>
                    {config.connected && config.lastSynced && (
                        <p className="last-synced">Last synced: {new Date(config.lastSynced).toLocaleDateString()}</p>
                    )}
                    <button className="connect-btn">
                        {config.connected ? 'Reconnect' : 'Connect'}
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const BillingTab = ({ data, editing, onEdit, onSave, onCancel, onChange, formData }) => (
    <div className="tab-section">
        <div className="section-header">
            <h2>Billing & Subscription</h2>
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
                <h3>Current Plan</h3>
                <div className="plan-name">{data?.plan || 'Free'}</div>
                <div className="billing-cycle">{data?.billingCycle || 'Monthly'}</div>
                {data?.nextBillingDate && (
                    <div className="next-billing">Next billing: {new Date(data.nextBillingDate).toLocaleDateString()}</div>
                )}
            </div>

            <div className="credits-card">
                <h3>Credits</h3>
                <div className="credits-info">
                    <div className="credit-item">
                        <span>Available:</span>
                        <span>{data?.credits?.available || 0}</span>
                    </div>
                    <div className="credit-item">
                        <span>Used:</span>
                        <span>{data?.credits?.used || 0}</span>
                    </div>
                </div>
            </div>
        </div>

        {data?.billingHistory && data.billingHistory.length > 0 && (
            <div className="billing-history">
                <h3>Billing History</h3>
                <div className="history-table">
                    {data.billingHistory.map((transaction, index) => (
                        <div key={index} className="history-row">
                            <div className="transaction-date">
                                {new Date(transaction.date).toLocaleDateString()}
                            </div>
                            <div className="transaction-amount">
                                ${transaction.amount} {transaction.currency}
                            </div>
                            <div className={`transaction-status ${transaction.status}`}>
                                {transaction.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);

const SecurityTab = ({ data, editing, onEdit, onSave, onCancel, onChange, onArrayAdd, onArrayRemove, formData }) => (
    <div className="tab-section">
        <div className="section-header">
            <h2>Security & Privacy</h2>
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
            <div className="security-section">
                <h3>Trusted Devices</h3>
                <div className="devices-list">
                    {data?.devices?.map((device, index) => (
                        <div key={index} className="device-card">
                            <div className="device-info">
                                <div className="device-name">{device.name}</div>
                                <div className="device-details">{device.type} - {device.os}</div>
                                <div className="device-last-used">Last used: {new Date(device.lastUsed).toLocaleDateString()}</div>
                            </div>
                            <div className={`device-status ${device.trusted ? 'trusted' : 'untrusted'}`}>
                                {device.trusted ? 'Trusted' : 'Untrusted'}
                            </div>
                        </div>
                    )) || <div className="no-devices">No devices registered</div>}
                </div>
            </div>

            <div className="security-section">
                <h3>Data Processing Consent</h3>
                <div className="consent-options">
                    <div className="consent-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={data?.dataProcessingConsent?.gdpr || false}
                                onChange={(e) => onChange('security.dataProcessingConsent.gdpr', e.target.checked)}
                                disabled={!editing}
                            />
                            GDPR Compliance
                        </label>
                    </div>
                    <div className="consent-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={data?.dataProcessingConsent?.ccpa || false}
                                onChange={(e) => onChange('security.dataProcessingConsent.ccpa', e.target.checked)}
                                disabled={!editing}
                            />
                            CCPA Compliance
                        </label>
                    </div>
                </div>
            </div>

            <div className="security-section">
                <h3>IP Whitelist</h3>
                <div className="ip-list">
                    {data?.ipWhitelist?.map((ip, index) => (
                        <div key={index} className="ip-item">
                            {ip}
                            {editing && (
                                <button onClick={() => onArrayRemove('security.ipWhitelist', index)}>
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    )) || <div className="no-ips">No IP addresses whitelisted</div>}
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

const AudienceTab = ({ data, editing, onEdit, onSave, onCancel, onChange, onArrayAdd, onArrayRemove, formData }) => (
    <div className="tab-section">
        <div className="section-header">
            <h2>Target Audience</h2>
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
                <h3>Demographics</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Age Range</label>
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

                    <div className="form-group">
                        <label>Genders</label>
                        <div className="tag-list">
                            {data?.demographics?.genders?.map((gender, index) => (
                                <span key={index} className="tag">
                                    {gender}
                                    {editing && (
                                        <button onClick={() => onArrayRemove('targetAudience.demographics.genders', index)}>
                                            <X size={12} />
                                        </button>
                                    )}
                                </span>
                            ))}
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

                    <div className="form-group form-group-full">
                        <label>Languages</label>
                        <div className="tag-list">
                            {data?.demographics?.languages?.map((language, index) => (
                                <span key={index} className="tag">
                                    {language}
                                    {editing && (
                                        <button onClick={() => onArrayRemove('targetAudience.demographics.languages', index)}>
                                            <X size={12} />
                                        </button>
                                    )}
                                </span>
                            ))}
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

            <div className="audience-section">
                <h3>Psychographics</h3>
                <div className="form-grid">
                    <div className="form-group form-group-full">
                        <label>Interests</label>
                        <div className="tag-list">
                            {data?.psychographics?.interests?.map((interest, index) => (
                                <span key={index} className="tag">
                                    {interest}
                                    {editing && (
                                        <button onClick={() => onArrayRemove('targetAudience.psychographics.interests', index)}>
                                            <X size={12} />
                                        </button>
                                    )}
                                </span>
                            ))}
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

                    <div className="form-group form-group-full">
                        <label>Pain Points</label>
                        <div className="tag-list">
                            {data?.psychographics?.painPoints?.map((painPoint, index) => (
                                <span key={index} className="tag">
                                    {painPoint}
                                    {editing && (
                                        <button onClick={() => onArrayRemove('targetAudience.psychographics.painPoints', index)}>
                                            <X size={12} />
                                        </button>
                                    )}
                                </span>
                            ))}
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
);

const AIPreferencesTab = ({ data, editing, onEdit, onSave, onCancel, onChange, formData }) => (
    <div className="tab-section">
        <div className="section-header">
            <h2>AI Preferences</h2>
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
                <h3>Content Generation</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Brand Voice</label>
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
                            <div className="form-value">{data?.contentGeneration?.brandVoice || 'Not set'}</div>
                        )}
                    </div>

                    <div className="form-group form-group-full">
                        <label>Style Guide</label>
                        {editing ? (
                            <textarea
                                value={formData?.contentGeneration?.styleGuide || ''}
                                onChange={(e) => onChange('aiPreferences.contentGeneration.styleGuide', e.target.value)}
                                className="profile-textarea"
                                rows={4}
                                placeholder="Describe your brand's style and tone guidelines..."
                            />
                        ) : (
                            <div className="form-value">{data?.contentGeneration?.styleGuide || 'No style guide set'}</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="ai-section">
                <h3>Automation Settings</h3>
                <div className="automation-toggles">
                    <div className="toggle-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={formData?.automationSettings?.postScheduling || false}
                                onChange={(e) => onChange('aiPreferences.automationSettings.postScheduling', e.target.checked)}
                                disabled={!editing}
                            />
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
                            Competitor Monitoring
                        </label>
                    </div>
                </div>
            </div>

            <div className="ai-section">
                <h3>Model Preferences</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Primary Model</label>
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
                            <div className="form-value">{data?.modelPreferences?.primaryModel || 'GPT-4'}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Image Model</label>
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
                            <div className="form-value">{data?.modelPreferences?.imageModel || 'DALL-E 3'}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ContentAssetsTab = ({ data, editing, onEdit, onSave, onCancel, onChange, onArrayAdd, onArrayRemove, formData }) => (
    <div className="tab-section">
        <div className="section-header">
            <h2>Content Assets</h2>
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

        <div className="content-sections">
            <div className="content-section">
                <h3>Brand Assets</h3>
                <div className="assets-grid">
                    {data?.brandAssets?.map((asset, index) => (
                        <div key={index} className="asset-card">
                            <div className="asset-preview">
                                {asset.type === 'image' ? (
                                    <Image size={40} />
                                ) : asset.type === 'video' ? (
                                    <Video size={40} />
                                ) : asset.type === 'audio' ? (
                                    <Music size={40} />
                                ) : (
                                    <FileText size={40} />
                                )}
                            </div>
                            <div className="asset-info">
                                <div className="asset-description">{asset.description || 'No description'}</div>
                                <div className="asset-tags">
                                    {asset.tags?.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="asset-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            {editing && (
                                <button
                                    className="remove-asset-btn"
                                    onClick={() => onArrayRemove('contentAssets.brandAssets', index)}
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    )) || <div className="no-assets">No brand assets uploaded</div>}
                    {editing && (
                        <button className="add-asset-btn">
                            <Plus size={20} />
                            Add Asset
                        </button>
                    )}
                </div>
            </div>

            <div className="content-section">
                <h3>Content Templates</h3>
                <div className="templates-list">
                    {data?.contentTemplates?.map((template, index) => (
                        <div key={index} className="template-card">
                            <div className="template-header">
                                <h4>{template.name}</h4>
                                <span className="template-type">{template.type}</span>
                            </div>
                            <div className="template-content">{template.content?.substring(0, 100)}...</div>
                            <div className="template-meta">
                                Last used: {template.lastUsed ? new Date(template.lastUsed).toLocaleDateString() : 'Never'}
                            </div>
                            {editing && (
                                <button
                                    className="remove-template-btn"
                                    onClick={() => onArrayRemove('contentAssets.contentTemplates', index)}
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    )) || <div className="no-templates">No content templates created</div>}
                    {editing && (
                        <button className="add-template-btn">
                            <Plus size={16} />
                            Add Template
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
);

export default ClientProfile;