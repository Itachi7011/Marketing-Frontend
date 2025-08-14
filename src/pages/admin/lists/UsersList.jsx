import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';

const UsersList = () => {
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
    const [users, setUsers] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [expandedUser, setExpandedUser] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const UserListDetails = async () => {
        try {
            const res = await fetch("/api/userList", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error(`Error during retrieve data - ${res.statusText}`);
            }

            const data = await res.json();
            console.log("Fetched user data:", data);
            setUsers(data);

        } catch (err) {
            console.error("Error fetching user data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        UserListDetails();
    }, []);

    const getSafeValue = (obj, path, defaultValue = 'Not Entered') => {
        try {
            const value = path.split('.').reduce((acc, part) => acc && acc[part], obj);
            return value !== undefined && value !== null ? value : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    };

    const handleSort = (field) => {
        const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortBy(field);
        setSortOrder(newOrder);
    };

    const handleSelectUser = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSelectAll = () => {
        setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u._id));
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(prev => prev.filter(u => u._id !== userId));
        }
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleExportPDF = () => {
        console.log('Exporting to PDF...');
    };

    const handleExportCSV = () => {
        console.log('Exporting to CSV...');
    };

    const filteredUsers = users.filter(user => {
        const firstName = getSafeValue(user, 'personalInfo.firstName', '').toLowerCase();
        const lastName = getSafeValue(user, 'personalInfo.lastName', '').toLowerCase();
        const email = getSafeValue(user, 'auth.email', '').toLowerCase();
        const search = searchTerm.toLowerCase();

        return firstName.includes(search) ||
            lastName.includes(search) ||
            email.includes(search);
    });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        let aVal, bVal;
        switch (sortBy) {
            case 'name':
                aVal = getSafeValue(a, 'personalInfo.firstName', '').toLowerCase();
                bVal = getSafeValue(b, 'personalInfo.firstName', '').toLowerCase();
                break;
            case 'email':
                aVal = getSafeValue(a, 'auth.email', '').toLowerCase();
                bVal = getSafeValue(b, 'auth.email', '').toLowerCase();
                break;
            case 'joinDate':
                aVal = new Date(getSafeValue(a, 'metadata.createdAt', new Date(0)));
                bVal = new Date(getSafeValue(b, 'metadata.createdAt', new Date(0)));
                break;
            case 'plan':
                aVal = getSafeValue(a, 'billing.plan', '').toLowerCase();
                bVal = getSafeValue(b, 'billing.plan', '').toLowerCase();
                break;
            default:
                return 0;
        }

        if (sortOrder === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });

    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

    const UserCard = ({ user }) => {
        const status = getSafeValue(user, 'status', 'Active');
        const isBlocked = getSafeValue(user, 'isBlocked', false);
        const emailVerified = getSafeValue(user, 'auth.emailVerified', false);
        const lastLogin = getSafeValue(user, 'activity.lastLogin', new Date());
        const createdAt = getSafeValue(user, 'metadata.createdAt', new Date());

        return (
            <div className={`ul-user-card ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="ul-user-header">
                    <div className="ul-user-checkbox">
                        <input
                            type="checkbox"
                            checked={selectedUsers.includes(user._id)}
                            onChange={() => handleSelectUser(user._id)}
                            id={`user-${user._id}`}
                        />
                        <label htmlFor={`user-${user._id}`}></label>
                    </div>

                    <div className="ul-user-avatar">
                        <img src={getSafeValue(user, 'personalInfo.avatar.url', 'https://via.placeholder.com/60')} alt="Avatar" />
                        <div className="ul-status-indicator">
                            <i className={`fas fa-circle ul-status-${status.toLowerCase()}`}></i>
                        </div>
                    </div>

                    <div className="ul-user-basic-info">
                        <h3>
                            <i className="fas fa-user"></i>
                            {getSafeValue(user, 'personalInfo.firstName')} {getSafeValue(user, 'personalInfo.lastName')}
                            <span className="ul-username">(@{getSafeValue(user, 'personalInfo.displayName', 'username')})</span>
                        </h3>
                        <div className="ul-user-meta">
                            <span className="ul-user-type">
                                <i className="fas fa-briefcase"></i>
                                {getSafeValue(user, 'personalInfo.userType', 'Client')}
                            </span>
                            <span className="ul-user-plan">
                                <i className="fas fa-crown"></i>
                                {getSafeValue(user, 'billing.plan', 'free')}
                            </span>
                            <span className="ul-verification-status">
                                <i className={`fas ${emailVerified ? 'fa-check-circle' : 'fa-times-circle'} ${emailVerified ? 'verified' : 'unverified'}`}></i>
                                Email {emailVerified ? 'Verified' : 'Unverified'}
                            </span>
                        </div>
                    </div>

                    <div className="ul-user-actions">
                        <button
                            className="ul-btn ul-btn-expand"
                            onClick={() => setExpandedUser(expandedUser === user._id ? null : user._id)}
                        >
                            <i className={`fas ${expandedUser === user._id ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                        </button>
                        <button
                            className="ul-btn ul-btn-edit"
                            onClick={() => handleEditUser(user)}
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                        <button
                            className="ul-btn ul-btn-delete"
                            onClick={() => handleDeleteUser(user._id)}
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                </div>

                {expandedUser === user._id && (
                    <div className="ul-user-expanded">
                        <div className="ul-expanded-grid">
                            <div className="ul-expanded-section">
                                <h4><i className="fas fa-id-card"></i> Personal Information</h4>
                                <div className="ul-info-grid">
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-envelope"></i> Email:</span>
                                        <span className="ul-info-value">{getSafeValue(user, 'auth.email')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-phone"></i> Phone:</span>
                                        <span className="ul-info-value">{getSafeValue(user, 'auth.phone')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-globe"></i> Timezone:</span>
                                        <span className="ul-info-value">{getSafeValue(user, 'personalInfo.timezone')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-calendar-alt"></i> Joined:</span>
                                        <span className="ul-info-value">{new Date(createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="ul-expanded-section">
                                <h4><i className="fas fa-building"></i> Business Profile</h4>
                                <div className="ul-info-grid">
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-company"></i> Company:</span>
                                        <span className="ul-info-value">{getSafeValue(user, 'business.companyName')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-industry"></i> Industry:</span>
                                        <span className="ul-info-value">{getSafeValue(user, 'business.industry')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-users"></i> Company Size:</span>
                                        <span className="ul-info-value">{getSafeValue(user, 'business.companySize')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="ul-expanded-section">
                                <h4><i className="fas fa-chart-line"></i> Marketing Profile</h4>
                                <div className="ul-info-grid">
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-user-tie"></i> Role:</span>
                                        <span className="ul-info-value">{getSafeValue(user, 'marketingProfile.role')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-level-up-alt"></i> Experience:</span>
                                        <span className="ul-info-value">{getSafeValue(user, 'marketingProfile.experienceLevel')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-dollar-sign"></i> Ad Budget:</span>
                                        <span className="ul-info-value">{getSafeValue(user, 'marketingProfile.monthlyAdBudget')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="ul-expanded-section">
                                <h4><i className="fas fa-activity"></i> Activity</h4>
                                <div className="ul-info-grid">
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-clock"></i> Last Login:</span>
                                        <span className="ul-info-value">{new Date(lastLogin).toLocaleDateString()}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-shield-alt"></i> Status:</span>
                                        <span className={`ul-info-value ul-status-badge ul-status-${status.toLowerCase()}`}>
                                            {status}
                                        </span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-ban"></i> Blocked:</span>
                                        <span className={`ul-info-value ul-blocked-${isBlocked ? 'yes' : 'no'}`}>
                                            <i className={`fas ${isBlocked ? 'fa-times-circle' : 'fa-check-circle'}`}></i>
                                            {isBlocked ? 'Yes' : 'No'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={`ul-users-list-container ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="ul-header-section">
                <div className="ul-header-content">
                    <div className="ul-title-area">
                        <h1 className="ul-main-title">
                            <i className="fas fa-users"></i>
                            Users Management Dashboard
                        </h1>
                        <p className="ul-subtitle">
                            Comprehensive user management with advanced analytics and control features
                        </p>
                    </div>

                    <div className="ul-header-actions">
                        <button
                            className="ul-btn ul-btn-primary"
                            onClick={() => setShowAddModal(true)}
                        >
                            <i className="fas fa-plus"></i>
                            Add New User
                        </button>
                        <button
                            className="ul-btn ul-btn-theme"
                            onClick={toggleDarkMode}
                        >
                            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                        </button>
                    </div>
                </div>

                <div className="ul-stats-grid">
                    <div className="ul-stat-card">
                        <div className="ul-stat-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="ul-stat-content">
                            <h3>{users.length}</h3>
                            <p>Total Users</p>
                        </div>
                    </div>
                    <div className="ul-stat-card">
                        <div className="ul-stat-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <div className="ul-stat-content">
                            <h3>{users.filter(u => getSafeValue(u, 'status', 'Active') === 'Active').length}</h3>
                            <p>Active Users</p>
                        </div>
                    </div>
                    <div className="ul-stat-card">
                        <div className="ul-stat-icon">
                            <i className="fas fa-shield-alt"></i>
                        </div>
                        <div className="ul-stat-content">
                            <h3>{users.filter(u => getSafeValue(u, 'auth.emailVerified', false)).length}</h3>
                            <p>Verified Users</p>
                        </div>
                    </div>
                    <div className="ul-stat-card">
                        <div className="ul-stat-icon">
                            <i className="fas fa-crown"></i>
                        </div>
                        <div className="ul-stat-content">
                            <h3>{users.filter(u => getSafeValue(u, 'billing.plan', 'free') !== 'free').length}</h3>
                            <p>Premium Users</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ul-controls-section">
                <div className="ul-search-bar">
                    <div className="ul-search-input-wrapper">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search users by name, email, or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="ul-search-input"
                        />
                    </div>
                </div>

                <div className="ul-filter-controls">
                    <div className="ul-sort-controls">
                        <label>Sort by:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => handleSort(e.target.value)}
                            className="ul-sort-select"
                        >
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                            <option value="joinDate">Join Date</option>
                            <option value="plan">Plan</option>
                        </select>
                        <button
                            className="ul-sort-order-btn"
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        >
                            <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                        </button>
                    </div>

                    <div className="ul-items-per-page">
                        <label>Show:</label>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            className="ul-items-select"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    <div className="ul-bulk-actions">
                        <button
                            className="ul-btn ul-btn-secondary"
                            onClick={handleSelectAll}
                        >
                            <i className="fas fa-check-square"></i>
                            {selectedUsers.length === users.length ? 'Deselect All' : 'Select All'}
                        </button>
                    </div>

                    <div className="ul-export-controls">
                        <button
                            className="ul-btn ul-btn-export"
                            onClick={handleExportPDF}
                        >
                            <i className="fas fa-file-pdf"></i>
                            PDF
                        </button>
                        <button
                            className="ul-btn ul-btn-export"
                            onClick={handleExportCSV}
                        >
                            <i className="fas fa-file-csv"></i>
                            CSV
                        </button>
                    </div>
                </div>
            </div>

            <div className="ul-users-grid">
                {loading ? (
                    <div className="ul-loading">
                        <i className="fas fa-spinner fa-spin"></i> Loading users...
                    </div>
                ) : currentUsers.length > 0 ? (
                    currentUsers.map(user => <UserCard key={user._id} user={user} />)
                ) : (
                    <div className="ul-no-results">
                        <i className="fas fa-user-slash"></i> No users found matching your criteria
                    </div>
                )}
            </div>

            <div className="ul-pagination-section">
                <div className="ul-pagination-info">
                    <span>
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedUsers.length)} of {sortedUsers.length} users
                    </span>
                </div>

                <div className="ul-pagination-controls">
                    <button
                        className="ul-btn ul-btn-pagination"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                    >
                        <i className="fas fa-angle-double-left"></i>
                        First
                    </button>
                    <button
                        className="ul-btn ul-btn-pagination"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        <i className="fas fa-angle-left"></i>
                        Prev
                    </button>

                    <div className="ul-page-numbers">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNum = Math.max(1, currentPage - 2) + i;
                            if (pageNum <= totalPages) {
                                return (
                                    <button
                                        key={pageNum}
                                        className={`ul-btn ul-btn-page ${pageNum === currentPage ? 'active' : ''}`}
                                        onClick={() => setCurrentPage(pageNum)}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            }
                            return null;
                        })}
                    </div>

                    <button
                        className="ul-btn ul-btn-pagination"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <i className="fas fa-angle-right"></i>
                    </button>
                    <button
                        className="ul-btn ul-btn-pagination"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        Last
                        <i className="fas fa-angle-double-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UsersList;