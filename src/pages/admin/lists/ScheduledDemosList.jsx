import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

const ScheduleDemosList = () => {
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
    const [demos, setDemos] = useState([]);
    const [demosList, setDemosList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedDemos, setSelectedDemos] = useState([]);
    const [expandedDemo, setExpandedDemo] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedDemo, setSelectedDemo] = useState(null);

    const DemoListDetails = async () => {
        try {
            const res = await fetch("/api/admin/scheduleDemoList", {
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
            console.log("Fetched demo data:", data);
            setDemos(data);

        } catch (err) {
            console.error("Error fetching demo data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        DemoListDetails();
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

    const handleSelectDemo = (demoId) => {
        setSelectedDemos(prev =>
            prev.includes(demoId)
                ? prev.filter(id => id !== demoId)
                : [...prev, demoId]
        );
    };

    const handleSelectAll = () => {
        setSelectedDemos(selectedDemos.length === demos.length ? [] : demos.map(d => d._id));
    };

    const handleDeleteDemo = (demoId) => {
        if (window.confirm('Are you sure you want to delete this demo request?')) {
            setDemos(prev => prev.filter(d => d._id !== demoId));
        }
    };

    const handleEditDemo = (demo) => {
        setSelectedDemo(demo);
        setShowEditModal(true);
    };

    const handleExportCSV = () => {
        // Get all demos (not just current page)
        const demosToExport = sortedDemos;

        // Define CSV headers
        const headers = [
            'Name', 'Email', 'Company', 'Industry', 'Phone',
            'Demo Type', 'Preferred Date', 'Status', 'Duration',
            'Assigned To', 'Created Date'
        ];

        // Map demo data to CSV rows
        const rows = demosToExport.map(demo => [
            `"${getSafeValue(demo, 'requester.personalInfo.firstName')} ${getSafeValue(demo, 'requester.personalInfo.lastName')}"`,
            `"${getSafeValue(demo, 'requester.contactInfo.email')}"`,
            `"${getSafeValue(demo, 'company.name')}"`,
            `"${getSafeValue(demo, 'company.industry')}"`,
            `"${getSafeValue(demo, 'requester.contactInfo.phone')}"`,
            `"${getSafeValue(demo, 'demoDetails.demoType')}"`,
            `"${new Date(getSafeValue(demo, 'demoDetails.preferredDate')).toLocaleDateString()}"`,
            `"${getSafeValue(demo, 'status.current')}"`,
            `"${getSafeValue(demo, 'demoDetails.duration')}"`,
            `"${getSafeValue(demo, 'status.assignedTo')}"`,
            `"${new Date(getSafeValue(demo, 'metadata.createdAt')).toLocaleDateString()}"`
        ]);

        // Combine headers and rows
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `schedule_demos_export_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportPDF = () => {
        try {
            const doc = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4"
            });

            // Document metadata
            doc.setProperties({
                title: "Complete Schedule Demos Export",
                subject: "Detailed demo requests export",
                author: "Marketing AI"
            });

            // Main title
            doc.setFontSize(22);
            doc.setFont("helvetica", "bold");
            doc.text("COMPLETE SCHEDULE DEMOS EXPORT", 105, 20, { align: "center" });

            // Subtitle
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(100);
            doc.text(`Generated on ${new Date().toLocaleString()} | Page 1`, 105, 27, { align: "center" });

            // Prepare all demo data
            const allDemoData = sortedDemos.map(demo => ({
                // Requester Info
                name: `${getSafeValue(demo, "requester.personalInfo.firstName")} ${getSafeValue(demo, "requester.personalInfo.lastName")}`,
                email: getSafeValue(demo, "requester.contactInfo.email"),
                phone: getSafeValue(demo, "requester.contactInfo.phone"),
                jobTitle: getSafeValue(demo, "requester.personalInfo.jobTitle"),
                timezone: getSafeValue(demo, "requester.personalInfo.timezone"),

                // Company Info
                company: getSafeValue(demo, "company.name"),
                website: getSafeValue(demo, "company.website"),
                industry: getSafeValue(demo, "company.industry"),
                companySize: getSafeValue(demo, "company.size"),
                marketingTeamSize: getSafeValue(demo, "company.marketingTeamSize"),

                // Demo Details
                demoType: getSafeValue(demo, "demoDetails.demoType"),
                preferredDate: new Date(getSafeValue(demo, "demoDetails.preferredDate")).toLocaleDateString(),
                preferredTime: getSafeValue(demo, "demoDetails.preferredTime"),
                duration: getSafeValue(demo, "demoDetails.duration"),
                customTopics: getSafeValue(demo, "demoDetails.customTopics", []).join(", "),

                // Status
                status: getSafeValue(demo, "status.current"),
                assignedTo: getSafeValue(demo, "status.assignedTo"),
                confirmationSent: getSafeValue(demo, "status.confirmationSent") ? "Yes" : "No",
                reminderSent: getSafeValue(demo, "status.reminderSent") ? "Yes" : "No",

                // Marketing Context
                challenges: getSafeValue(demo, "marketingContext.currentChallenges", []).join(", "),
                currentTools: getSafeValue(demo, "marketingContext.currentTools", []).join(", "),
                budget: getSafeValue(demo, "marketingContext.monthlyAdBudget"),

                // Dates
                created: new Date(getSafeValue(demo, "metadata.createdAt")).toLocaleDateString(),
                updated: new Date(getSafeValue(demo, "updatedAt")).toLocaleDateString()
            }));

            // Track vertical position
            let startY = 40;

            // Export each demo's data
            allDemoData.forEach((demo, index) => {
                // Add page break if needed (except first demo)
                if (index > 0) {
                    doc.addPage();
                    startY = 20;
                    doc.setPage(index + 1);
                    doc.setFontSize(12);
                    doc.text(`Demo ${index + 1} of ${allDemoData.length}`, 105, 15, { align: "center" });
                }

                // Requester Information Table
                autoTable(doc, {
                    head: [["Requester Information", " Demo " + (index + 1)]],
                    body: [
                        ["Full Name", demo.name],
                        ["Email", demo.email],
                        ["Phone", demo.phone],
                        ["Job Title", demo.jobTitle],
                        ["Timezone", demo.timezone]
                    ],
                    startY: startY,
                    theme: "grid",
                    headStyles: {
                        fillColor: [51, 102, 153],
                        textColor: 255
                    },
                    columnStyles: {
                        0: { fontStyle: "bold", cellWidth: 40 },
                        1: { cellWidth: "auto" }
                    }
                });

                // Company Information Table
                autoTable(doc, {
                    head: [["Company Information", ""]],
                    body: [
                        ["Company Name", demo.company],
                        ["Website", demo.website],
                        ["Industry", demo.industry],
                        ["Company Size", demo.companySize],
                        ["Marketing Team Size", demo.marketingTeamSize]
                    ],
                    startY: doc.lastAutoTable.finalY + 10,
                    theme: "grid",
                    headStyles: {
                        fillColor: [51, 102, 153],
                        textColor: 255
                    },
                    columnStyles: {
                        0: { fontStyle: "bold", cellWidth: 40 },
                        1: { cellWidth: "auto" }
                    }
                });

                // Demo Details Table
                autoTable(doc, {
                    head: [["Demo Details", ""]],
                    body: [
                        ["Demo Type", demo.demoType],
                        ["Preferred Date", demo.preferredDate],
                        ["Preferred Time", demo.preferredTime],
                        ["Duration", demo.duration],
                        ["Custom Topics", demo.customTopics]
                    ],
                    startY: doc.lastAutoTable.finalY + 10,
                    theme: "grid",
                    headStyles: {
                        fillColor: [51, 102, 153],
                        textColor: 255
                    },
                    columnStyles: {
                        0: { fontStyle: "bold", cellWidth: 40 },
                        1: { cellWidth: "auto" }
                    }
                });

                // Status & Assignment Table
                autoTable(doc, {
                    head: [["Status & Assignment", ""]],
                    body: [
                        ["Status", demo.status],
                        ["Assigned To", demo.assignedTo],
                        ["Confirmation Sent", demo.confirmationSent],
                        ["Reminder Sent", demo.reminderSent]
                    ],
                    startY: doc.lastAutoTable.finalY + 10,
                    theme: "grid",
                    headStyles: {
                        fillColor: [51, 102, 153],
                        textColor: 255
                    },
                    columnStyles: {
                        0: { fontStyle: "bold", cellWidth: 40 },
                        1: { cellWidth: "auto" }
                    }
                });

                // Marketing Context Table
                autoTable(doc, {
                    head: [["Marketing Context", ""]],
                    body: [
                        ["Current Challenges", demo.challenges],
                        ["Current Tools", demo.currentTools],
                        ["Monthly Ad Budget", demo.budget]
                    ],
                    startY: doc.lastAutoTable.finalY + 10,
                    theme: "grid",
                    headStyles: {
                        fillColor: [51, 102, 153],
                        textColor: 255
                    },
                    columnStyles: {
                        0: { fontStyle: "bold", cellWidth: 40 },
                        1: { cellWidth: "auto" }
                    }
                });

                // Activity Table
                autoTable(doc, {
                    head: [["Activity", ""]],
                    body: [
                        ["Created Date", demo.created],
                        ["Last Updated", demo.updated]
                    ],
                    startY: doc.lastAutoTable.finalY + 10,
                    theme: "grid",
                    headStyles: {
                        fillColor: [51, 102, 153],
                        textColor: 255
                    },
                    columnStyles: {
                        0: { fontStyle: "bold", cellWidth: 40 },
                        1: { cellWidth: "auto" }
                    }
                });

                // Add footer to each page
                doc.setFontSize(10);
                doc.setTextColor(150);
                doc.text(
                    `Page ${doc.getNumberOfPages()} of ${Math.ceil(allDemoData.length)}`,
                    doc.internal.pageSize.width - 20,
                    doc.internal.pageSize.height - 10,
                    { align: "right" }
                );
            });

            // Save the PDF
            doc.save(`complete_schedule_demos_export_${new Date().toISOString().slice(0, 10)}.pdf`);

        } catch (error) {
            console.error('PDF Generation Error:', error);
            Swal.fire({
                title: 'Export Failed',
                text: 'Could not generate complete PDF report.',
                icon: 'error',
                confirmButtonColor: '#6366f1'
            });
        }
    };

    const filteredDemos = demos.filter(demo => {
        const firstName = getSafeValue(demo, 'requester.personalInfo.firstName', '').toLowerCase();
        const lastName = getSafeValue(demo, 'requester.personalInfo.lastName', '').toLowerCase();
        const email = getSafeValue(demo, 'requester.contactInfo.email', '').toLowerCase();
        const company = getSafeValue(demo, 'company.name', '').toLowerCase();
        const search = searchTerm.toLowerCase();

        return firstName.includes(search) ||
            lastName.includes(search) ||
            email.includes(search) ||
            company.includes(search);
    });

    const sortedDemos = [...filteredDemos].sort((a, b) => {
        let aVal, bVal;
        switch (sortBy) {
            case 'name':
                aVal = getSafeValue(a, 'requester.personalInfo.firstName', '').toLowerCase();
                bVal = getSafeValue(b, 'requester.personalInfo.firstName', '').toLowerCase();
                break;
            case 'email':
                aVal = getSafeValue(a, 'requester.contactInfo.email', '').toLowerCase();
                bVal = getSafeValue(b, 'requester.contactInfo.email', '').toLowerCase();
                break;
            case 'demoDate':
                aVal = new Date(getSafeValue(a, 'demoDetails.preferredDate', new Date(0)));
                bVal = new Date(getSafeValue(b, 'demoDetails.preferredDate', new Date(0)));
                break;
            case 'status':
                aVal = getSafeValue(a, 'status.current', '').toLowerCase();
                bVal = getSafeValue(b, 'status.current', '').toLowerCase();
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

    const totalPages = Math.ceil(sortedDemos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentDemos = sortedDemos.slice(startIndex, startIndex + itemsPerPage);

    const DemoCard = ({ demo }) => {
        const status = getSafeValue(demo, 'status.current', 'scheduled');
        const confirmationSent = getSafeValue(demo, 'status.confirmationSent', false);
        const reminderSent = getSafeValue(demo, 'status.reminderSent', false);
        const preferredDate = getSafeValue(demo, 'demoDetails.preferredDate', new Date());
        const createdAt = getSafeValue(demo, 'metadata.createdAt', new Date());

        return (
            <div className={`ul-user-card ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="ul-user-header">
                    <div className="ul-user-checkbox">
                        <input
                            type="checkbox"
                            checked={selectedDemos.includes(demo._id)}
                            onChange={() => handleSelectDemo(demo._id)}
                            id={`demo-${demo._id}`}
                        />
                        <label htmlFor={`demo-${demo._id}`}></label>
                    </div>

                    <div className="ul-user-avatar">
                        <div className="ul-demo-icon">
                            <i className="fas fa-calendar-check"></i>
                        </div>
                        <div className="ul-status-indicator">
                            <i className={`fas fa-circle ul-status-${status.toLowerCase()}`}></i>
                        </div>
                    </div>

                    <div className="ul-user-basic-info">
                        <h3>
                            <i className="fas fa-user"></i>
                            {getSafeValue(demo, 'requester.personalInfo.firstName')} {getSafeValue(demo, 'requester.personalInfo.lastName')}
                            <span className="ul-username">({getSafeValue(demo, 'company.name')})</span>
                        </h3>
                        <div className="ul-user-meta">
                            <span className="ul-user-type">
                                <i className="fas fa-play-circle"></i>
                                {getSafeValue(demo, 'demoDetails.demoType', 'platform-overview').replace('-', ' ')}
                            </span>
                            <span className="ul-user-plan">
                                <i className="fas fa-clock"></i>
                                {getSafeValue(demo, 'demoDetails.duration', '30-min')}
                            </span>
                            <span className="ul-verification-status">
                                <i className={`fas ${confirmationSent ? 'fa-check-circle' : 'fa-times-circle'} ${confirmationSent ? 'verified' : 'unverified'}`}></i>
                                Confirmation {confirmationSent ? 'Sent' : 'Pending'}
                            </span>
                        </div>
                    </div>

                    <div className="ul-user-actions">
                        <button
                            className="ul-btn ul-btn-expand"
                            onClick={() => setExpandedDemo(expandedDemo === demo._id ? null : demo._id)}
                        >
                            <i className={`fas ${expandedDemo === demo._id ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                        </button>
                        <button
                            className="ul-btn ul-btn-edit"
                            onClick={() => handleEditDemo(demo)}
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                        <button
                            className="ul-btn ul-btn-delete"
                            onClick={() => handleDeleteDemo(demo._id)}
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                </div>

                {expandedDemo === demo._id && (
                    <div className="ul-user-expanded">
                        <div className="ul-expanded-grid">
                            <div className="ul-expanded-section">
                                <h4><i className="fas fa-id-card"></i> Requester Information</h4>
                                <div className="ul-info-grid">
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-envelope"></i> Email:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'requester.contactInfo.email')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-phone"></i> Phone:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'requester.contactInfo.phone')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-briefcase"></i> Job Title:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'requester.personalInfo.jobTitle')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-globe"></i> Timezone:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'requester.personalInfo.timezone')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="ul-expanded-section">
                                <h4><i className="fas fa-building"></i> Company Profile</h4>
                                <div className="ul-info-grid">
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-company"></i> Company:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'company.name')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-industry"></i> Industry:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'company.industry')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-users"></i> Company Size:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'company.size')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-link"></i> Website:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'company.website')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="ul-expanded-section">
                                <h4><i className="fas fa-calendar-alt"></i> Demo Details</h4>
                                <div className="ul-info-grid">
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-play-circle"></i> Demo Type:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'demoDetails.demoType').replace('-', ' ')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-calendar"></i> Preferred Date:</span>
                                        <span className="ul-info-value">{new Date(preferredDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-clock"></i> Time & Duration:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'demoDetails.preferredTime')} ({getSafeValue(demo, 'demoDetails.duration')})</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-users"></i> Attendees:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'demoDetails.attendees', []).length || 1} person(s)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="ul-expanded-section">
                                <h4><i className="fas fa-chart-line"></i> Marketing Context</h4>
                                <div className="ul-info-grid">
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-exclamation-triangle"></i> Challenges:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'marketingContext.currentChallenges', []).join(', ')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-tools"></i> Current Tools:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'marketingContext.currentTools', []).join(', ')}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-dollar-sign"></i> Ad Budget:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'marketingContext.monthlyAdBudget')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="ul-expanded-section">
                                <h4><i className="fas fa-tasks"></i> Status & Assignment</h4>
                                <div className="ul-info-grid">
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-info-circle"></i> Status:</span>
                                        <span className={`ul-info-value ul-status-badge ul-status-${status.toLowerCase()}`}>
                                            {status}
                                        </span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-user-tie"></i> Assigned To:</span>
                                        <span className="ul-info-value">{getSafeValue(demo, 'status.assignedTo') || 'Unassigned'}</span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-bell"></i> Reminder Sent:</span>
                                        <span className={`ul-info-value ul-blocked-${reminderSent ? 'yes' : 'no'}`}>
                                            <i className={`fas ${reminderSent ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                                            {reminderSent ? 'Yes' : 'No'}
                                        </span>
                                    </div>
                                    <div className="ul-info-item">
                                        <span className="ul-info-label"><i className="fas fa-calendar-plus"></i> Created:</span>
                                        <span className="ul-info-value">{new Date(createdAt).toLocaleDateString()}</span>
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
                            <i className="fas fa-calendar-check"></i>
                            Schedule Demos Management Dashboard
                        </h1>
                        <p className="ul-subtitle">
                            Comprehensive demo scheduling management with advanced analytics and control features
                        </p>
                    </div>

                    <div className="ul-header-actions">
                        <button
                            className="ul-btn ul-btn-primary"
                            onClick={() => setShowAddModal(true)}
                        >
                            <i className="fas fa-plus"></i>
                            Schedule New Demo
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
                            <i className="fas fa-calendar-check"></i>
                        </div>
                        <div className="ul-stat-content">
                            <h3>{demos.length}</h3>
                            <p>Total Demos</p>
                        </div>
                    </div>
                    <div className="ul-stat-card">
                        <div className="ul-stat-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <div className="ul-stat-content">
                            <h3>{demos.filter(d => getSafeValue(d, 'status.current', 'scheduled') === 'scheduled').length}</h3>
                            <p>Scheduled Demos</p>
                        </div>
                    </div>
                    <div className="ul-stat-card">
                        <div className="ul-stat-icon">
                            <i className="fas fa-check-double"></i>
                        </div>
                        <div className="ul-stat-content">
                            <h3>{demos.filter(d => getSafeValue(d, 'status.current', 'scheduled') === 'completed').length}</h3>
                            <p>Completed Demos</p>
                        </div>
                    </div>
                    <div className="ul-stat-card">
                        <div className="ul-stat-icon">
                            <i className="fas fa-user-tie"></i>
                        </div>
                        <div className="ul-stat-content">
                            <h3>{demos.filter(d => getSafeValue(d, 'status.assignedTo', null) !== null).length}</h3>
                            <p>Assigned Demos</p>
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
                            placeholder="Search demos by name, email, company, or demo type..."
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
                            <option value="demoDate">Demo Date</option>
                            <option value="status">Status</option>
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
                            {selectedDemos.length === demos.length ? 'Deselect All' : 'Select All'}
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
                        <i className="fas fa-spinner fa-spin"></i> Loading demo requests...
                    </div>
                ) : currentDemos.length > 0 ? (
                    currentDemos.map(demo => <DemoCard key={demo._id} demo={demo} />)
                ) : (
                    <div className="ul-no-results">
                        <i className="fas fa-calendar-times"></i> No demo requests found matching your criteria
                    </div>
                )}
            </div>

            <div className="ul-pagination-section">
                <div className="ul-pagination-info">
                    <span>
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedDemos.length)} of {sortedDemos.length} demo requests
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

export default ScheduleDemosList;