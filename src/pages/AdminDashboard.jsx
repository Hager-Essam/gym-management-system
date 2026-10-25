import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon.jsx';
import Button from '../components/ui/Button.jsx';
import DashboardNav from '../components/layout/DashboardNav.jsx';
import Modal from '../components/ui/Modal.jsx';
import AddMemberForm from '../components/admin/AddMemberForm.jsx';
import AddTrainerForm from '../components/admin/AddTrainerForm.jsx';
import AddManagerForm from '../components/admin/AddManagerForm.jsx';
import AddPlanForm from '../components/admin/AddPlanForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { adminDashboardData } from '../data/adminDashboardData.js';
import { 
  getMembers, 
  getTrainers, 
  getManagers, 
  getAllPlans,
  deleteUser, 
  suspendUser, 
  activateUser,
  deletePlan,
  activatePlan,
  deactivatePlan,
  getStatistics 
} from '../services/dataService.js';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const stats = adminDashboardData.stats;

  return (
    <div className="admin-dashboard">
      <DashboardNav />

      <div className="admin-dashboard__wrapper">
        {/* Sidebar */}
        <aside className="admin-dashboard__sidebar">
          <div className="admin-dashboard__logo">
            <div className="admin-dashboard__logo-icon">
              <Icon name="admin_panel_settings" size={24} />
            </div>
            <div>
              <h3 className="admin-dashboard__logo-title">Admin Portal</h3>
              <p className="admin-dashboard__logo-subtitle mono">SYSTEM CONTROL</p>
            </div>
          </div>

          <div className="admin-dashboard__user-info">
            <div className="admin-dashboard__user-avatar">
              <Icon name="person" size={20} />
            </div>
            <div>
              <p className="admin-dashboard__user-name">{user.fullName}</p>
              <p className="admin-dashboard__user-role mono">SYSTEM ADMINISTRATOR</p>
            </div>
          </div>

          <nav className="admin-dashboard__nav">
            <div className="admin-dashboard__nav-section">
              <p className="mono text-xs text-muted">DASHBOARD</p>
              <button
                onClick={() => setActiveSection('overview')}
                className={`admin-dashboard__nav-link ${activeSection === 'overview' ? 'active' : ''}`}
              >
                <Icon name="dashboard" size={20} />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveSection('analytics')}
                className={`admin-dashboard__nav-link ${activeSection === 'analytics' ? 'active' : ''}`}
              >
                <Icon name="analytics" size={20} />
                <span>Analytics & Reports</span>
              </button>
            </div>

            <div className="admin-dashboard__nav-section">
              <p className="mono text-xs text-muted">USER MANAGEMENT</p>
              <button
                onClick={() => setActiveSection('members')}
                className={`admin-dashboard__nav-link ${activeSection === 'members' ? 'active' : ''}`}
              >
                <Icon name="groups" size={20} />
                <span>Members</span>
                <span className="admin-dashboard__nav-badge">{stats.totalMembers}</span>
              </button>
              <button
                onClick={() => setActiveSection('trainers')}
                className={`admin-dashboard__nav-link ${activeSection === 'trainers' ? 'active' : ''}`}
              >
                <Icon name="sports" size={20} />
                <span>Trainers & Coaches</span>
                <span className="admin-dashboard__nav-badge">{stats.totalTrainers}</span>
              </button>
              <button
                onClick={() => setActiveSection('managers')}
                className={`admin-dashboard__nav-link ${activeSection === 'managers' ? 'active' : ''}`}
              >
                <Icon name="badge" size={20} />
                <span>Managers & Staff</span>
                <span className="admin-dashboard__nav-badge">{stats.totalManagers}</span>
              </button>
              <button
                onClick={() => setActiveSection('users')}
                className={`admin-dashboard__nav-link ${activeSection === 'users' ? 'active' : ''}`}
              >
                <Icon name="people" size={20} />
                <span>All Users</span>
                <span className="admin-dashboard__nav-badge">{stats.totalUsers}</span>
              </button>
            </div>

            <div className="admin-dashboard__nav-section">
              <p className="mono text-xs text-muted">BUSINESS & BILLING</p>
              <button
                onClick={() => setActiveSection('plans')}
                className={`admin-dashboard__nav-link ${activeSection === 'plans' ? 'active' : ''}`}
              >
                <Icon name="card_membership" size={20} />
                <span>Membership Plans</span>
              </button>
              <button
                onClick={() => setActiveSection('subscriptions')}
                className={`admin-dashboard__nav-link ${activeSection === 'subscriptions' ? 'active' : ''}`}
              >
                <Icon name="autorenew" size={20} />
                <span>Subscriptions</span>
                <span className="admin-dashboard__nav-badge success">{stats.activeSubscriptions}</span>
              </button>
              <button
                onClick={() => setActiveSection('payments')}
                className={`admin-dashboard__nav-link ${activeSection === 'payments' ? 'active' : ''}`}
              >
                <Icon name="payments" size={20} />
                <span>Payments & Revenue</span>
                <span className="admin-dashboard__nav-badge accent">{stats.monthlyRevenue}</span>
              </button>
            </div>

            <div className="admin-dashboard__nav-section">
              <p className="mono text-xs text-muted">OPERATIONS</p>
              <button
                onClick={() => setActiveSection('attendance')}
                className={`admin-dashboard__nav-link ${activeSection === 'attendance' ? 'active' : ''}`}
              >
                <Icon name="door_front" size={20} />
                <span>Attendance & Check-ins</span>
                <span className="admin-dashboard__nav-badge success">{stats.currentCheckIns}</span>
              </button>
              <button
                onClick={() => setActiveSection('floor')}
                className={`admin-dashboard__nav-link ${activeSection === 'floor' ? 'active' : ''}`}
              >
                <Icon name="fitness_center" size={20} />
                <span>Floor Operations</span>
              </button>
              <Link to="/operations/members" className="admin-dashboard__nav-link">
                <Icon name="view_list" size={20} />
                <span>Member Directory</span>
              </Link>
            </div>

            <div className="admin-dashboard__nav-section">
              <p className="mono text-xs text-muted">SYSTEM & SETTINGS</p>
              <button
                onClick={() => setActiveSection('gym-settings')}
                className={`admin-dashboard__nav-link ${activeSection === 'gym-settings' ? 'active' : ''}`}
              >
                <Icon name="settings" size={20} />
                <span>Gym Settings</span>
              </button>
              <button
                onClick={() => setActiveSection('roles')}
                className={`admin-dashboard__nav-link ${activeSection === 'roles' ? 'active' : ''}`}
              >
                <Icon name="shield" size={20} />
                <span>Roles & Permissions</span>
              </button>
              <button
                onClick={() => setActiveSection('system')}
                className={`admin-dashboard__nav-link ${activeSection === 'system' ? 'active' : ''}`}
              >
                <Icon name="tune" size={20} />
                <span>System Configuration</span>
              </button>
              <button
                onClick={() => setActiveSection('notifications')}
                className={`admin-dashboard__nav-link ${activeSection === 'notifications' ? 'active' : ''}`}
              >
                <Icon name="notifications" size={20} />
                <span>Notifications</span>
                <span className="admin-dashboard__nav-dot"></span>
              </button>
            </div>
          </nav>

          <div className="admin-dashboard__footer">
            <div className="admin-dashboard__system-status">
              <Icon name="check_circle" size={16} />
              <span className="text-sm">SYSTEM STATUS</span>
              <span className="admin-dashboard__status-indicator success">ONLINE</span>
            </div>
            <p className="text-xs text-muted">All services operational • v3.4.2</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="admin-dashboard__main">
          {activeSection === 'overview' && <OverviewSection stats={stats} />}
          {activeSection === 'members' && <MembersSection />}
          {activeSection === 'trainers' && <TrainersSection />}
          {activeSection === 'managers' && <ManagersSection />}
          {activeSection === 'users' && <UsersSection />}
          {activeSection === 'plans' && <PlansSection />}
          {activeSection === 'subscriptions' && <SubscriptionsSection />}
          {activeSection === 'payments' && <PaymentsSection />}
          {activeSection === 'attendance' && <AttendanceSection />}
          {activeSection === 'analytics' && <AnalyticsSection />}
          {activeSection === 'gym-settings' && <GymSettingsSection />}
          {activeSection === 'roles' && <RolesSection />}
          {activeSection === 'system' && <SystemSection />}
        </main>
      </div>
    </div>
  );
}

// Overview Section
function OverviewSection({ stats }) {
  return (
    <div className="admin-section">
      <header className="admin-section__header">
        <div>
          <h1 className="admin-section__title">System Overview</h1>
          <p className="text-muted">Complete system metrics and operational status</p>
        </div>
        <div className="admin-section__actions">
          <Button variant="outline" size="sm">
            <Icon name="download" />
            Export Report
          </Button>
          <Button variant="primary" size="sm">
            <Icon name="refresh" />
            Refresh Data
          </Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon users">
            <Icon name="groups" size={24} />
          </div>
          <div className="admin-stat-card__content">
            <p className="mono text-xs text-muted">TOTAL MEMBERS</p>
            <div className="admin-stat-card__value">
              <span className="stat-number">{stats.totalMembers}</span>
              <span className="admin-stat-card__change positive">+{stats.memberGrowth}</span>
            </div>
            <p className="text-xs text-muted">Active: {stats.activeMembers} • Suspended: {stats.suspendedMembers}</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card__icon revenue">
            <Icon name="payments" size={24} />
          </div>
          <div className="admin-stat-card__content">
            <p className="mono text-xs text-muted">MONTHLY REVENUE</p>
            <div className="admin-stat-card__value">
              <span className="stat-number">{stats.monthlyRevenue}</span>
              <span className="admin-stat-card__change positive">+{stats.revenueGrowth}</span>
            </div>
            <p className="text-xs text-muted">MRR: {stats.mrr} • Churn: {stats.churnRate}</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card__icon attendance">
            <Icon name="door_front" size={24} />
          </div>
          <div className="admin-stat-card__content">
            <p className="mono text-xs text-muted">CHECK-INS TODAY</p>
            <div className="admin-stat-card__value">
              <span className="stat-number">{stats.todayCheckIns}</span>
              <span className="admin-stat-card__change positive">+{stats.checkInGrowth}</span>
            </div>
            <p className="text-xs text-muted">Currently in gym: {stats.currentCheckIns}</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card__icon staff">
            <Icon name="badge" size={24} />
          </div>
          <div className="admin-stat-card__content">
            <p className="mono text-xs text-muted">STAFF & TRAINERS</p>
            <div className="admin-stat-card__value">
              <span className="stat-number">{stats.totalStaff}</span>
              <span className="admin-stat-card__badge success">All Active</span>
            </div>
            <p className="text-xs text-muted">Trainers: {stats.totalTrainers} • Managers: {stats.totalManagers}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-quick-actions">
        <h2 className="admin-section__subtitle">Quick Actions</h2>
        <div className="admin-quick-actions__grid">
          <button className="admin-quick-action">
            <Icon name="person_add" size={20} />
            <span>Add New Member</span>
          </button>
          <button className="admin-quick-action">
            <Icon name="badge" size={20} />
            <span>Add Staff/Trainer</span>
          </button>
          <button className="admin-quick-action">
            <Icon name="card_membership" size={20} />
            <span>Create Plan</span>
          </button>
          <button className="admin-quick-action">
            <Icon name="receipt" size={20} />
            <span>Record Payment</span>
          </button>
          <button className="admin-quick-action">
            <Icon name="contactless" size={20} />
            <span>Manual Check-in</span>
          </button>
          <button className="admin-quick-action">
            <Icon name="notifications" size={20} />
            <span>Send Notification</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-recent-activity">
        <h2 className="admin-section__subtitle">Recent System Activity</h2>
        <div className="admin-activity-list">
          {stats.recentActivity.map((activity, idx) => (
            <div key={idx} className="admin-activity-item">
              <div className={`admin-activity-icon ${activity.type}`}>
                <Icon name={activity.icon} size={16} />
              </div>
              <div className="admin-activity-content">
                <p className="admin-activity-title">{activity.title}</p>
                <p className="text-xs text-muted">{activity.description}</p>
              </div>
              <span className="text-xs text-muted">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Members Section
function MembersSection() {
  const [members, setMembers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadMembers();
  }, []);

  function loadMembers() {
    const allMembers = getMembers();
    setMembers(allMembers);
  }

  async function handleDelete(memberId) {
    if (!confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteUser(memberId);
      loadMembers();
    } catch (err) {
      alert('Error deleting member: ' + err.message);
    }
  }

  async function handleSuspend(memberId) {
    const reason = prompt('Reason for suspension:');
    if (reason === null) return;

    try {
      await suspendUser(memberId, reason);
      loadMembers();
    } catch (err) {
      alert('Error suspending member: ' + err.message);
    }
  }

  async function handleActivate(memberId) {
    try {
      await activateUser(memberId);
      loadMembers();
    } catch (err) {
      alert('Error activating member: ' + err.message);
    }
  }

  function handleAddSuccess(newMember) {
    setShowAddModal(false);
    loadMembers();
    alert(`Member ${newMember.fullName} added successfully!`);
  }

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-section">
      <header className="admin-section__header">
        <div>
          <h1 className="admin-section__title">Member Management</h1>
          <p className="text-muted">Manage all gym members, subscriptions, and access</p>
        </div>
        <div className="admin-section__actions">
          <Link to="/operations/members">
            <Button variant="outline" size="sm">
              <Icon name="view_list" />
              Directory View
            </Button>
          </Link>
          <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
            <Icon name="person_add" />
            Add Member
          </Button>
        </div>
      </header>

      {/* Filters */}
      <div className="admin-filters">
        <div className="admin-search">
          <Icon name="search" size={20} />
          <input
            type="text"
            placeholder="Search members by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search__input"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="admin-filter-select"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Members Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan="6" className="admin-table__empty">
                  <Icon name="search_off" size={32} />
                  <p>No members found</p>
                </td>
              </tr>
            ) : (
              filteredMembers.map(member => (
                <tr key={member.id}>
                  <td>
                    <div className="admin-table__user">
                      <div className="admin-table__avatar">
                        <Icon name="person" size={20} />
                      </div>
                      <div>
                        <p className="admin-table__name">{member.fullName}</p>
                        <p className="text-xs text-muted">ID: {member.id}</p>
                      </div>
                    </div>
                  </td>
                  <td>{member.email}</td>
                  <td>{member.phone || '—'}</td>
                  <td>
                    <span className={`admin-badge admin-badge--${member.status}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="admin-table__actions">
                      {member.status === 'active' ? (
                        <button
                          onClick={() => handleSuspend(member.id)}
                          className="admin-action-btn admin-action-btn--warning"
                          title="Suspend"
                        >
                          <Icon name="block" size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(member.id)}
                          className="admin-action-btn admin-action-btn--success"
                          title="Activate"
                        >
                          <Icon name="check_circle" size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="admin-action-btn admin-action-btn--danger"
                        title="Delete"
                      >
                        <Icon name="delete" size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <Modal
          title="Add New Member"
          onClose={() => setShowAddModal(false)}
        >
          <AddMemberForm
            onSuccess={handleAddSuccess}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

// Trainers Section
function TrainersSection() {
  const [trainers, setTrainers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTrainers();
  }, []);

  function loadTrainers() {
    const allTrainers = getTrainers();
    setTrainers(allTrainers);
  }

  async function handleDelete(trainerId) {
    if (!confirm('Are you sure you want to remove this trainer?')) {
      return;
    }

    try {
      await deleteUser(trainerId);
      loadTrainers();
    } catch (err) {
      alert('Error deleting trainer: ' + err.message);
    }
  }

  async function handleSuspend(trainerId) {
    const reason = prompt('Reason for suspension:');
    if (reason === null) return;

    try {
      await suspendUser(trainerId, reason);
      loadTrainers();
    } catch (err) {
      alert('Error suspending trainer: ' + err.message);
    }
  }

  async function handleActivate(trainerId) {
    try {
      await activateUser(trainerId);
      loadTrainers();
    } catch (err) {
      alert('Error activating trainer: ' + err.message);
    }
  }

  function handleAddSuccess(newTrainer) {
    setShowAddModal(false);
    loadTrainers();
    alert(`Trainer ${newTrainer.fullName} added successfully!`);
  }

  const filteredTrainers = trainers.filter(trainer =>
    trainer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-section">
      <header className="admin-section__header">
        <div>
          <h1 className="admin-section__title">Trainer & Coach Management</h1>
          <p className="text-muted">Manage coaching staff, schedules, and client assignments</p>
        </div>
        <div className="admin-section__actions">
          <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
            <Icon name="person_add" />
            Add Trainer
          </Button>
        </div>
      </header>

      {/* Search */}
      <div className="admin-filters">
        <div className="admin-search">
          <Icon name="search" size={20} />
          <input
            type="text"
            placeholder="Search trainers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search__input"
          />
        </div>
      </div>

      {/* Trainers Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Trainer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainers.length === 0 ? (
              <tr>
                <td colSpan="6" className="admin-table__empty">
                  <Icon name="search_off" size={32} />
                  <p>No trainers found</p>
                </td>
              </tr>
            ) : (
              filteredTrainers.map(trainer => (
                <tr key={trainer.id}>
                  <td>
                    <div className="admin-table__user">
                      <div className="admin-table__avatar">
                        <Icon name="sports" size={20} />
                      </div>
                      <div>
                        <p className="admin-table__name">{trainer.fullName}</p>
                        <p className="text-xs text-muted">Coach</p>
                      </div>
                    </div>
                  </td>
                  <td>{trainer.email}</td>
                  <td>{trainer.phone || '—'}</td>
                  <td>
                    <span className={`admin-badge admin-badge--${trainer.status}`}>
                      {trainer.status}
                    </span>
                  </td>
                  <td>{new Date(trainer.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="admin-table__actions">
                      {trainer.status === 'active' ? (
                        <button
                          onClick={() => handleSuspend(trainer.id)}
                          className="admin-action-btn admin-action-btn--warning"
                          title="Suspend"
                        >
                          <Icon name="block" size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(trainer.id)}
                          className="admin-action-btn admin-action-btn--success"
                          title="Activate"
                        >
                          <Icon name="check_circle" size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(trainer.id)}
                        className="admin-action-btn admin-action-btn--danger"
                        title="Delete"
                      >
                        <Icon name="delete" size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Trainer Modal */}
      {showAddModal && (
        <Modal
          title="Add New Trainer"
          onClose={() => setShowAddModal(false)}
        >
          <AddTrainerForm
            onSuccess={handleAddSuccess}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

// Managers Section
function ManagersSection() {
  const [managers, setManagers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadManagers();
  }, []);

  function loadManagers() {
    const allManagers = getManagers();
    setManagers(allManagers);
  }

  async function handleDelete(managerId) {
    if (!confirm('Are you sure you want to remove this manager?')) {
      return;
    }

    try {
      await deleteUser(managerId);
      loadManagers();
    } catch (err) {
      alert('Error deleting manager: ' + err.message);
    }
  }

  async function handleSuspend(managerId) {
    const reason = prompt('Reason for suspension:');
    if (reason === null) return;

    try {
      await suspendUser(managerId, reason);
      loadManagers();
    } catch (err) {
      alert('Error suspending manager: ' + err.message);
    }
  }

  async function handleActivate(managerId) {
    try {
      await activateUser(managerId);
      loadManagers();
    } catch (err) {
      alert('Error activating manager: ' + err.message);
    }
  }

  function handleAddSuccess(newManager) {
    setShowAddModal(false);
    loadManagers();
    alert(`Manager ${newManager.fullName} added successfully!`);
  }

  const filteredManagers = managers.filter(manager =>
    manager.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-section">
      <header className="admin-section__header">
        <div>
          <h1 className="admin-section__title">Manager & Staff Management</h1>
          <p className="text-muted">Manage operational staff and administrative users</p>
        </div>
        <div className="admin-section__actions">
          <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
            <Icon name="person_add" />
            Add Manager
          </Button>
        </div>
      </header>

      {/* Search */}
      <div className="admin-filters">
        <div className="admin-search">
          <Icon name="search" size={20} />
          <input
            type="text"
            placeholder="Search managers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search__input"
          />
        </div>
      </div>

      {/* Managers Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Manager</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredManagers.length === 0 ? (
              <tr>
                <td colSpan="6" className="admin-table__empty">
                  <Icon name="search_off" size={32} />
                  <p>No managers found</p>
                </td>
              </tr>
            ) : (
              filteredManagers.map(manager => (
                <tr key={manager.id}>
                  <td>
                    <div className="admin-table__user">
                      <div className="admin-table__avatar">
                        <Icon name="badge" size={20} />
                      </div>
                      <div>
                        <p className="admin-table__name">{manager.fullName}</p>
                        <p className="text-xs text-muted">Manager</p>
                      </div>
                    </div>
                  </td>
                  <td>{manager.email}</td>
                  <td>{manager.phone || '—'}</td>
                  <td>
                    <span className={`admin-badge admin-badge--${manager.status}`}>
                      {manager.status}
                    </span>
                  </td>
                  <td>{new Date(manager.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="admin-table__actions">
                      {manager.status === 'active' ? (
                        <button
                          onClick={() => handleSuspend(manager.id)}
                          className="admin-action-btn admin-action-btn--warning"
                          title="Suspend"
                        >
                          <Icon name="block" size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(manager.id)}
                          className="admin-action-btn admin-action-btn--success"
                          title="Activate"
                        >
                          <Icon name="check_circle" size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(manager.id)}
                        className="admin-action-btn admin-action-btn--danger"
                        title="Delete"
                      >
                        <Icon name="delete" size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Manager Modal */}
      {showAddModal && (
        <Modal
          title="Add New Manager"
          onClose={() => setShowAddModal(false)}
        >
          <AddManagerForm
            onSuccess={handleAddSuccess}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

// Users Section
function UsersSection() {
  return (
    <div className="admin-section">
      <header className="admin-section__header">
        <div>
          <h1 className="admin-section__title">All Users</h1>
          <p className="text-muted">Complete user directory across all roles</p>
        </div>
        <div className="admin-section__actions">
          <Button variant="outline" size="sm">
            <Icon name="download" />
            Export Users
          </Button>
        </div>
      </header>

      <div className="admin-placeholder">
        <Icon name="people" size={48} />
        <h3>Universal User Directory</h3>
        <p>View and manage all users: members, trainers, managers, and admins.</p>
      </div>
    </div>
  );
}

// Plans Section
function PlansSection() {
  const [plans, setPlans] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadPlans();
  }, []);

  function loadPlans() {
    const allPlans = getAllPlans();
    setPlans(allPlans);
  }

  async function handleDelete(planId) {
    if (!confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
      return;
    }

    try {
      await deletePlan(planId);
      loadPlans();
    } catch (err) {
      alert('Error deleting plan: ' + err.message);
    }
  }

  async function handleToggleStatus(planId, currentStatus) {
    try {
      if (currentStatus) {
        await deactivatePlan(planId);
      } else {
        await activatePlan(planId);
      }
      loadPlans();
    } catch (err) {
      alert('Error updating plan: ' + err.message);
    }
  }

  function handleAddSuccess(newPlan) {
    setShowAddModal(false);
    loadPlans();
    alert(`Plan "${newPlan.name}" created successfully!`);
  }

  return (
    <div className="admin-section">
      <header className="admin-section__header">
        <div>
          <h1 className="admin-section__title">Membership Plans</h1>
          <p className="text-muted">Create and manage membership tiers and pricing</p>
        </div>
        <div className="admin-section__actions">
          <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
            <Icon name="add" />
            Create Plan
          </Button>
        </div>
      </header>

      {/* Plans Grid */}
      <div className="admin-plans-grid">
        {plans.map(plan => (
          <div key={plan.id} className={`admin-plan-card ${!plan.isActive ? 'inactive' : ''}`}>
            <div className="admin-plan-card__header">
              <div>
                <p className="admin-plan-card__tier">{plan.tier}</p>
                <h3 className="admin-plan-card__name">{plan.name}</h3>
              </div>
              <span className={`admin-badge admin-badge--${plan.isActive ? 'active' : 'inactive'}`}>
                {plan.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="admin-plan-card__price">
              <span className="admin-plan-card__currency">$</span>
              <span className="admin-plan-card__amount">{plan.price}</span>
              <span className="admin-plan-card__period">/{plan.duration}</span>
            </div>

            <p className="admin-plan-card__description">{plan.description}</p>

            <div className="admin-plan-card__features">
              {plan.features.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="admin-plan-card__feature">
                  <Icon name="check" size={16} />
                  <span>{feature}</span>
                </div>
              ))}
              {plan.features.length > 4 && (
                <p className="text-xs text-muted">+{plan.features.length - 4} more features</p>
              )}
            </div>

            <div className="admin-plan-card__meta">
              <span className="text-xs text-muted">Access: {plan.accessLevel}</span>
              {plan.personalTraining && (
                <span className="text-xs" style={{ color: 'var(--accent)' }}>
                  <Icon name="fitness_center" size={14} /> PT Included
                </span>
              )}
            </div>

            <div className="admin-plan-card__actions">
              <button
                onClick={() => handleToggleStatus(plan.id, plan.isActive)}
                className="admin-card-action-btn"
              >
                <Icon name={plan.isActive ? 'visibility_off' : 'visibility'} size={18} />
                {plan.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={() => handleDelete(plan.id)}
                className="admin-card-action-btn admin-card-action-btn--danger"
              >
                <Icon name="delete" size={18} />
                Delete
              </button>
            </div>
          </div>
        ))}

        {plans.length === 0 && (
          <div className="admin-empty-state">
            <Icon name="card_membership" size={48} />
            <h3>No plans yet</h3>
            <p>Create your first membership plan to get started</p>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              <Icon name="add" />
              Create Plan
            </Button>
          </div>
        )}
      </div>

      {/* Add Plan Modal */}
      {showAddModal && (
        <Modal
          title="Create Membership Plan"
          onClose={() => setShowAddModal(false)}
        >
          <AddPlanForm
            onSuccess={handleAddSuccess}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

// Subscriptions Section
function SubscriptionsSection() {
  return (
    <div className="admin-section">
      <header className="admin-section__header">
        <div>
          <h1 className="admin-section__title">Subscription Management</h1>
          <p className="text-muted">Monitor and manage all active subscriptions</p>
        </div>
        <div className="admin-section__actions">
          <Button variant="outline" size="sm">
            <Icon name="filter_list" />
            Filter
          </Button>
        </div>
      </header>

      <div className="admin-placeholder">
        <Icon name="autorenew" size={48} />
        <h3>Subscription Dashboard</h3>
        <p>Track renewals, cancellations, and subscription lifecycle management.</p>
      </div>
    </div>
  );
}

// Payments Section
function PaymentsSection() {
  return (
    <div className="admin-section">
      <header className="admin-section__header">
        <div>
          <h1 className="admin-section__title">Payments & Revenue</h1>
          <p className="text-muted">Track transactions, invoices, and financial metrics</p>
        </div>
        <div className="admin-section__actions">
          <Button variant="outline" size="sm">
            <Icon name="download" />
            Export Transactions
          </Button>
        </div>
      </header>

      <div className="admin-placeholder">
        <Icon name="payments" size={48} />
        <h3>Payment Processing Center</h3>
        <p>View payment history, process refunds, and generate financial reports.</p>
      </div>
    </div>
  );
}

// Attendance Section
function AttendanceSection() {
  return (
    <div className="admin-section">
      <header className="admin-section__header">
        <div>
          <h1 className="admin-section__title">Attendance & Check-ins</h1>
          <p className="text-muted">Monitor facility usage and member check-ins</p>
        </div>
      </header>

      <div className="admin-placeholder">
        <Icon name="door_front" size={48} />
        <h3>Attendance Tracking System</h3>
        <p>Real-time check-ins, attendance reports, and facility capacity monitoring.</p>
      </div>
    </div>
  );
}

// Analytics Section
function AnalyticsSection() {
  return (
    <div className="admin-section">
      <header className="admin-section__header">
        <div>
          <h1 className="admin-section__title">Analytics & Reports</h1>
          <p className="text-muted">Business intelligence and data insights</p>
        </div>
      </header>

      <div className="admin-placeholder">
        <Icon name="analytics" size={48} />
        <h3>Analytics Dashboard</h3>
        <p>Revenue trends, member growth, retention rates, and operational KPIs.</p>
      </div>
    </div>
  );
}

// Gym Settings Section
function GymSettingsSection() {
  return (
    <div className="admin-section">
      <header className="admin-section__header">
        <div>
          <h1 className="admin-section__title">Gym Settings</h1>
          <p className="text-muted">Configure gym operations and business rules</p>
        </div>
        <div className="admin-section__actions">
          <Button variant="primary" size="sm">
            <Icon name="save" />
            Save Changes
          </Button>
        </div>
      </header>

      <div className="admin-placeholder">
        <Icon name="settings" size={48} />
        <h3>Gym Configuration</h3>
        <p>Operating hours, facility rules, class schedules, and operational policies.</p>
      </div>
    </div>
  );
}

// Roles Section
function RolesSection() {
  return (
    <div className="admin-section">
      <header className="admin-section__header">
        <div>
          <h1 className="admin-section__title">Roles & Permissions</h1>
          <p className="text-muted">Manage user roles and access control</p>
        </div>
        <div className="admin-section__actions">
          <Button variant="primary" size="sm">
            <Icon name="add" />
            Create Role
          </Button>
        </div>
      </header>

      <div className="admin-placeholder">
        <Icon name="shield" size={48} />
        <h3>Role-Based Access Control</h3>
        <p>Define roles, permissions, and access levels for different user types.</p>
      </div>
    </div>
  );
}

// System Section
function SystemSection() {
  return (
    <div className="admin-section">
      <header className="admin-section__header">
        <div>
          <h1 className="admin-section__title">System Configuration</h1>
          <p className="text-muted">Advanced system settings and integrations</p>
        </div>
      </header>

      <div className="admin-placeholder">
        <Icon name="tune" size={48} />
        <h3>System Settings</h3>
        <p>API configurations, integrations, backup settings, and system maintenance.</p>
      </div>
    </div>
  );
}
