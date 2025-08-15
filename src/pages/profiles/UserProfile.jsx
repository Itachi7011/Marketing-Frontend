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
    const [loading, setLoading] = useState(true);

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

    const handleEdit = (section) => {
        setEditingSection(section);
    };

    const handleSave = async (section) => {
        try {
            const token = localStorage.getItem('token');

            // if (!token) {
            //     throw new Error('No authentication token found');
            // }

            // Create the payload with the correct structure
            const payload = {
                [section]: formData[section]
            };

            console.log("Sending payload:", JSON.stringify(payload, null, 2)); // Better debug log

            const response = await fetch('/api/auth/userProfile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
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
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error('Server returned non-JSON response');
            }

            console.log("Response:", result);

            if (response.ok) {
                // Update the userProfile state with the new data
                setUserProfile(prev => ({
                    ...prev,
                    [section]: formData[section]
                }));
                setEditingSection(null);

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: result.message || 'Profile updated successfully!',
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                throw new Error(result.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Update error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to update profile'
            });
        }
    };

    const handleCancel = () => {
        // Reset formData to original userProfile data
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
        console.log('Input change:', path, value); // Debug log

        const keys = path.split('.');
        const updatedData = { ...formData };
        let current = updatedData;

        // Navigate to the correct nested object
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }

        // Set the value
        current[keys[keys.length - 1]] = value;

        console.log('Updated formData:', updatedData); // Debug log
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

        // Only add if item is not empty and not already in array
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
            if (!current[keys[i]]) return; // Safety check
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
                <button onClick={fetchUserProfile}>Retry</button>
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
                                <span style={{ marginLeft: "-0.8rem" }}>{tab.label}</span>
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
                            editing={editingSection === 'marketingProfile'}
                            onEdit={() => handleEdit('marketingProfile')}
                            onSave={() => handleSave('marketingProfile')}
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
                            editing={editingSection === 'targetAudience'}
                            onEdit={() => handleEdit('targetAudience')}
                            onSave={() => handleSave('targetAudience')}
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
                            editing={editingSection === 'aiPreferences'}
                            onEdit={() => handleEdit('aiPreferences')}
                            onSave={() => handleSave('aiPreferences')}
                            onCancel={handleCancel}
                            onChange={handleInputChange}
                            formData={formData.aiPreferences}
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

const IntegrationsTab = ({ data, editing, onEdit, onSave, onCancel, onChange, formData }) => {
    const [newIntegrationModal, setNewIntegrationModal] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState('');

    const integrationPlatforms = {
        // Social Media
        facebook: { name: 'Facebook', category: 'Social Media', fields: ['pageId', 'pageName', 'accessToken'] },
        instagram: { name: 'Instagram', category: 'Social Media', fields: ['username', 'businessId', 'accessToken'] },
        twitter: { name: 'Twitter', category: 'Social Media', fields: ['userId', 'username', 'accessToken'] },
        linkedin: { name: 'LinkedIn', category: 'Social Media', fields: ['companyId', 'accessToken'] },
        tiktok: { name: 'TikTok', category: 'Social Media', fields: ['username', 'businessId', 'accessToken'] },

        // Messaging
        whatsapp: { name: 'WhatsApp Business', category: 'Messaging', fields: ['businessId'] },
        telegram: { name: 'Telegram', category: 'Messaging', fields: ['botToken'] },
        discord: { name: 'Discord', category: 'Messaging', fields: ['serverId'] },

        // E-commerce
        shopify: { name: 'Shopify', category: 'E-commerce', fields: ['storeName', 'accessToken'] },
        woocommerce: { name: 'WooCommerce', category: 'E-commerce', fields: ['storeUrl', 'consumerKey', 'consumerSecret'] },
        amazonSeller: { name: 'Amazon Seller', category: 'E-commerce', fields: ['sellerId'] },

        // Advertising
        googleAds: { name: 'Google Ads', category: 'Advertising', fields: ['customerId', 'refreshToken'] },
        metaAds: { name: 'Meta Ads', category: 'Advertising', fields: ['adAccountId', 'accessToken'] },
        tiktokAds: { name: 'TikTok Ads', category: 'Advertising', fields: ['adAccountId', 'accessToken'] },

        // Analytics
        googleAnalytics: { name: 'Google Analytics', category: 'Analytics', fields: ['propertyId', 'accessToken'] },
        googleSearchConsole: { name: 'Google Search Console', category: 'Analytics', fields: ['siteUrl', 'accessToken'] },
        googleMyBusiness: { name: 'Google My Business', category: 'Analytics', fields: ['locationId'] },

        // Email Marketing
        mailchimp: { name: 'Mailchimp', category: 'Email Marketing', fields: ['accountId', 'apiKey'] },
        klaviyo: { name: 'Klaviyo', category: 'Email Marketing', fields: ['accountId', 'apiKey'] },

        // CRM
        hubspot: { name: 'HubSpot', category: 'CRM', fields: ['portalId', 'accessToken'] },
        salesforce: { name: 'Salesforce', category: 'CRM', fields: ['instanceUrl', 'accessToken'] },

        // Tools
        zapier: { name: 'Zapier', category: 'Automation', fields: ['apiKey'] },
        slack: { name: 'Slack', category: 'Communication', fields: ['teamId', 'accessToken'] }
    };

    const handleAddIntegration = () => {
        if (!selectedPlatform) return;

        const newIntegration = {
            connected: false,
            lastSynced: null
        };

        // Initialize fields based on platform
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
            // If connecting, set lastSynced to now
            onChange(`integrations.${platform}.lastSynced`, new Date().toISOString());
        }
    };

    const handleRemoveIntegration = (platform) => {
        // Get current integrations from formData or data
        const currentIntegrations = { ...formData } || { ...data } || {};

        // Remove the specific platform
        delete currentIntegrations[platform];

        // Update the entire integrations object
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

    return (
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
                            <h3>Add New Integration</h3>
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
                                    <option key={key} value={key}>{platform.name}</option>
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
                                Add Integration
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="integrations-content">
                {Object.entries(groupedPlatforms).map(([category, platforms]) => (
                    <div key={category} className="integration-category">
                        <h3 className="category-title">{category}</h3>
                        <div className="integrations-grid">
                            {platforms
                                .filter(platform => data?.[platform.key] || formData?.[platform.key])
                                .map(platform => {
                                    const config = formData?.[platform.key] || data?.[platform.key] || {};
                                    return (
                                        <div key={platform.key} className="integration-card">
                                            <div className="integration-header">
                                                <h4>{platform.name}</h4>
                                                <div className={`connection-status ${config.connected ? 'connected' : 'disconnected'}`}>
                                                    {config.connected ? 'Connected' : 'Not Connected'}
                                                </div>
                                            </div>

                                            {config.connected && config.lastSynced && (
                                                <p className="last-synced">
                                                    Last synced: {new Date(config.lastSynced).toLocaleDateString()}
                                                </p>
                                            )}

                                            {editing && (
                                                <div className="integration-fields">
                                                    {platform.fields.map(field => (
                                                        <div key={field} className="field-group">
                                                            <label>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</label>
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
                                                            {config.connected ? 'Disconnect' : 'Connect'}
                                                        </button>
                                                        <button
                                                            className="remove-btn"
                                                            onClick={() => handleRemoveIntegration(platform.key)}
                                                            title={`Remove ${platform.name} integration`}
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </>
                                                )}
                                                {!editing && (
                                                    <button className="connect-btn">
                                                        {config.connected ? 'Reconnect' : 'Connect'}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                ))}

                {(!data || Object.keys(data).length === 0) && (!formData || Object.keys(formData).length === 0) && (
                    <div className="no-integrations">
                        <p>No integrations configured yet.</p>
                        {editing && <p>Click "Add New Integration" to get started.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

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
                                checked={formData?.dataProcessingConsent?.gdpr || false}
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
                                checked={formData?.dataProcessingConsent?.ccpa || false}
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

const ContentAssetsTab = ({ data, editing, onEdit, onSave, onCancel, onChange, onArrayAdd, onArrayRemove, formData }) => {
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
            alert('Please provide a description for the asset');
            return;
        }

        const assetToAdd = {
            ...newAsset,
            publicId: `asset_${Date.now()}`,
            created: new Date().toISOString()
        };

        // Get current brand assets and add the new one
        const currentAssets = formData?.brandAssets || data?.brandAssets || [];
        const updatedAssets = [...currentAssets, assetToAdd];

        // Update the contentAssets.brandAssets path
        onChange('contentAssets.brandAssets', updatedAssets);

        // Reset form
        setNewAsset({
            type: 'image',
            url: '',
            description: '',
            tags: []
        });
        setAssetModal(false);
    };

    const handleAddTemplate = () => {
        if (!newTemplate.name.trim() || !newTemplate.content.trim()) {
            alert('Please provide both name and content for the template');
            return;
        }

        const templateToAdd = {
            ...newTemplate,
            lastUsed: null
        };

        // Get current templates and add the new one
        const currentTemplates = formData?.contentTemplates || data?.contentTemplates || [];
        const updatedTemplates = [...currentTemplates, templateToAdd];

        // Update the contentAssets.contentTemplates path
        onChange('contentAssets.contentTemplates', updatedTemplates);

        // Reset form
        setNewTemplate({
            name: '',
            type: 'post',
            content: '',
            variables: []
        });
        setTemplateModal(false);
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

    return (
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

            {/* Asset Modal */}
            {assetModal && (
                <div className="modal-overlay" onClick={() => setAssetModal(false)}>
                    <div className="asset-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Add Brand Asset</h3>
                            <button onClick={() => setAssetModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="form-group">
                                <label>Asset Type</label>
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
                                <label>URL</label>
                                <input
                                    type="url"
                                    value={newAsset.url}
                                    onChange={(e) => setNewAsset(prev => ({ ...prev, url: e.target.value }))}
                                    className="profile-input"
                                    placeholder="https://example.com/asset.jpg"
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={newAsset.description}
                                    onChange={(e) => setNewAsset(prev => ({ ...prev, description: e.target.value }))}
                                    className="profile-textarea"
                                    rows={3}
                                    placeholder="Describe this asset..."
                                />
                            </div>

                            <div className="form-group">
                                <label>Tags</label>
                                <div className="tag-input-group">
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        className="profile-input"
                                        placeholder="Add tag"
                                        onKeyPress={(e) => e.key === 'Enter' && addTagToAsset()}
                                    />
                                    <button type="button" onClick={addTagToAsset}>Add</button>
                                </div>
                                <div className="tag-list">
                                    {newAsset.tags.map((tag, index) => (
                                        <span key={index} className="tag">
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
                                Add Asset
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Template Modal */}
            {templateModal && (
                <div className="modal-overlay" onClick={() => setTemplateModal(false)}>
                    <div className="template-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Add Content Template</h3>
                            <button onClick={() => setTemplateModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="form-group">
                                <label>Template Name</label>
                                <input
                                    type="text"
                                    value={newTemplate.name}
                                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                                    className="profile-input"
                                    placeholder="e.g., Social Media Post Template"
                                />
                            </div>

                            <div className="form-group">
                                <label>Template Type</label>
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
                                <label>Content</label>
                                <textarea
                                    value={newTemplate.content}
                                    onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                                    className="profile-textarea"
                                    rows={6}
                                    placeholder="Template content with variables like {{company_name}}, {{product_name}}"
                                />
                            </div>

                            <div className="form-group">
                                <label>Variables</label>
                                <div className="tag-input-group">
                                    <input
                                        type="text"
                                        value={newVariable}
                                        onChange={(e) => setNewVariable(e.target.value)}
                                        className="profile-input"
                                        placeholder="e.g., company_name"
                                        onKeyPress={(e) => e.key === 'Enter' && addVariableToTemplate()}
                                    />
                                    <button type="button" onClick={addVariableToTemplate}>Add</button>
                                </div>
                                <div className="tag-list">
                                    {newTemplate.variables.map((variable, index) => (
                                        <span key={index} className="tag">
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
                                Add Template
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="content-sections">
                <div className="content-section">
                    <div className="section-header-inline">
                        <h3>Brand Assets</h3>
                        {editing && (
                            <button className="add-asset-btn" onClick={() => setAssetModal(true)}>
                                <Plus size={16} />
                                Add Asset
                            </button>
                        )}
                    </div>
                    <div className="assets-grid">
                        {(formData?.brandAssets || data?.brandAssets || []).map((asset, index) => (
                            <div key={index} className="asset-card">
                                <div className="asset-preview">
                                    {asset.type === 'image' || asset.type === 'logo' ? (
                                        asset.url ? (
                                            <img src={asset.url} alt={asset.description} className="asset-thumbnail" />
                                        ) : (
                                            <Image size={40} />
                                        )
                                    ) : asset.type === 'video' ? (
                                        <Video size={40} />
                                    ) : (
                                        <FileText size={40} />
                                    )}
                                </div>
                                <div className="asset-info">
                                    <div className="asset-description">{asset.description || 'No description'}</div>
                                    <div className="asset-type">{asset.type}</div>
                                    <div className="asset-tags">
                                        {asset.tags?.map((tag, tagIndex) => (
                                            <span key={tagIndex} className="asset-tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                {editing && (
                                    <button
                                        className="remove-asset-btn"
                                        onClick={() => {
                                            const currentAssets = formData?.brandAssets || data?.brandAssets || [];
                                            const updatedAssets = currentAssets.filter((_, i) => i !== index);
                                            onChange('contentAssets.brandAssets', updatedAssets);
                                        }}
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                        {(!data?.brandAssets || data.brandAssets.length === 0) &&
                            (!formData?.brandAssets || formData.brandAssets.length === 0) && (
                                <div className="no-assets">No brand assets uploaded yet</div>
                            )}
                    </div>
                </div>

                <div className="content-section">
                    <div className="section-header-inline">
                        <h3>Content Templates</h3>
                        {editing && (
                            <button className="add-template-btn" onClick={() => setTemplateModal(true)}>
                                <Plus size={16} />
                                Add Template
                            </button>
                        )}
                    </div>
                    <div className="templates-list">
                        {(formData?.contentTemplates || data?.contentTemplates || []).map((template, index) => (
                            <div key={index} className="template-card">
                                <div className="template-header">
                                    <h4>{template.name}</h4>
                                    <span className="template-type">{template.type}</span>
                                </div>
                                <div className="template-content">
                                    {template.content?.substring(0, 150)}
                                    {template.content?.length > 150 && '...'}
                                </div>
                                <div className="template-variables">
                                    {template.variables?.map((variable, varIndex) => (
                                        <span key={varIndex} className="variable-tag">{{ variable }}</span>
                                    ))}
                                </div>
                                <div className="template-meta">
                                    Last used: {template.lastUsed ? new Date(template.lastUsed).toLocaleDateString() : 'Never'}
                                </div>
                                {editing && (
                                    <button
                                        className="remove-template-btn"
                                        onClick={() => {
                                            const currentTemplates = formData?.contentTemplates || data?.contentTemplates || [];
                                            const updatedTemplates = currentTemplates.filter((_, i) => i !== index);
                                            onChange('contentAssets.contentTemplates', updatedTemplates);
                                        }}
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                        {(!data?.contentTemplates || data.contentTemplates.length === 0) &&
                            (!formData?.contentTemplates || formData.contentTemplates.length === 0) && (
                                <div className="no-templates">No content templates created yet</div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;