import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon.jsx';
import Button from '../components/ui/Button.jsx';
import DashboardNav from '../components/layout/DashboardNav.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import {
  memberStats,
  dailyProtocol,
  weeklyActivity,
  upcomingClasses,
  billingReceipts,
  bodyComposition,
  memberAccessPass,
} from '../data/dashboardData.js';
import { plans } from '../data/landing.js';
import './MemberDashboard.css';

export default function MemberDashboard() {
  const { user } = useAuth();
  const plan = plans.find((p) => String(p.id) === String(user.planId));
  const firstName = user.fullName.split(' ')[0];

  return (
    <div className="member-dash">
      <DashboardNav />
      
      {/* Header Section */}
      <header className="member-dash__header">
        <div className="container">
          <div className="member-dash__header-top">
            <div>
              <p className="mono member-dash__terminal">
                <Icon name="circle" size={8} className="dot-indicator" />
                {memberAccessPass.membershipDetails.terminal}
              </p>
              <h1 className="member-dash__greeting">{memberAccessPass.membershipDetails.greeting}</h1>
              <p className="member-dash__subtext">
                {memberAccessPass.membershipDetails.session}
              </p>
            </div>
            <Button variant="primary" size="lg" className="member-dash__launch-btn">
              <Icon name="play_arrow" />
              {memberAccessPass.launchButton}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        <div className="member-dash__content">
          
          {/* Top Row - Stats */}
          <section className="member-dash__stats">
            <div className="card member-dash__stat-card">
              <p className="mono text-muted text-sm">ATTENDANCE STREAK</p>
              <div className="member-dash__stat-value">
                <span className="stat-number">{memberStats.attendanceStreak}</span>
                <span className="stat-unit">DAYS FIRE</span>
              </div>
              <p className="text-muted text-xs">{memberStats.streakContext}</p>
            </div>

            <div className="card member-dash__stat-card">
              <p className="mono text-muted text-sm">MONTHLY TONNAGE</p>
              <div className="member-dash__stat-value">
                <span className="stat-number">{memberStats.monthlyTonnage.toLocaleString()}</span>
                <span className="stat-unit">KG</span>
              </div>
              <p className="text-accent text-xs">{memberStats.tonnageDelta} {memberStats.tonnagePrevious}</p>
            </div>

            <div className="card member-dash__stat-card">
              <p className="mono text-muted text-sm">ASSIGNED COACH</p>
              <div className="member-dash__coach-info">
                <div className="member-dash__coach-avatar">
                  <Icon name="person" />
                </div>
                <div>
                  <p className="member-dash__coach-name">{memberStats.assignedCoach.name}</p>
                  <p className="text-muted text-xs">{memberStats.assignedCoach.specialty}</p>
                </div>
              </div>
              <span className="status-badge status-badge--success">{memberStats.assignedCoach.status}</span>
            </div>

            <div className="card member-dash__stat-card">
              <p className="mono text-muted text-sm">CURRENT WEIGHT / GOAL</p>
              <div className="member-dash__stat-value">
                <span className="stat-number">{memberStats.currentWeight}</span>
                <span className="stat-unit">KG / {memberStats.goalWeight} KG</span>
              </div>
              <p className="text-accent text-xs">{memberStats.weightChange}</p>
            </div>
          </section>

          {/* Main Two-Column Layout */}
          <div className="member-dash__main-grid">
            
            {/* Left Column */}
            <div className="member-dash__left-col">
              
              {/* Daily Protocol */}
              <section className="card member-dash__card">
                <div className="member-dash__card-header">
                  <div>
                    <p className="mono text-accent text-sm">{dailyProtocol.phase}</p>
                    <h2 className="member-dash__card-title">{dailyProtocol.programName}</h2>
                    <p className="text-muted text-sm">{dailyProtocol.duration}</p>
                  </div>
                </div>

                <div className="member-dash__exercises">
                  {dailyProtocol.exercises.map((exercise) => (
                    <div key={exercise.id} className="member-dash__exercise">
                      <div className="member-dash__exercise-header">
                        <span className="member-dash__exercise-order mono">{exercise.order}</span>
                        <div className="member-dash__exercise-info">
                          <h3 className="member-dash__exercise-name">{exercise.name}</h3>
                          <p className="text-muted text-xs">{exercise.specs}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Icon name="check_circle" />
                        {exercise.status}
                      </Button>
                    </div>
                  ))}
                </div>

                <Button variant="ghost" size="sm" fullWidth className="member-dash__log-custom">
                  <Icon name="add" />
                  {dailyProtocol.footer}
                </Button>
              </section>

              {/* Weekly Activity */}
              <section className="card member-dash__card">
                <div className="member-dash__card-header">
                  <div>
                    <h2 className="member-dash__card-title">{weeklyActivity.title}</h2>
                    <p className="text-muted text-sm">{weeklyActivity.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="mono text-sm">
                      {weeklyActivity.completedSessions} / {weeklyActivity.totalSessions} Sessions
                    </p>
                  </div>
                </div>

                <div className="member-dash__weekly-grid">
                  {weeklyActivity.days.map((day, idx) => (
                    <div key={idx} className={`member-dash__day ${day.completed ? 'member-dash__day--completed' : ''}`}>
                      <p className="mono text-xs text-muted">{day.day}</p>
                      <div className={`member-dash__day-indicator ${day.completed ? 'active' : ''}`}>
                        {day.completed && <Icon name="check" size={16} />}
                      </div>
                      <p className="member-dash__day-time">{day.time}</p>
                      <p className="text-muted text-xs">{day.checkIn}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="member-dash__right-col">
              
              {/* Membership Card */}
              <section className="card member-dash__card">
                <div className="member-dash__card-header">
                  <div>
                    <p className="mono text-muted text-sm">{memberAccessPass.type}</p>
                    <div className="member-dash__status">
                      <span className="status-badge status-badge--active">{memberAccessPass.status.split(' ·')[0]}</span>
                      <span className="text-muted text-sm">· {memberAccessPass.daysRemaining} DAYS LEFT</span>
                    </div>
                  </div>
                </div>
                
                <div className="member-dash__barcode">
                  <div className="barcode-stripes">
                    {[...Array(40)].map((_, i) => (
                      <div key={i} className="barcode-stripe" style={{ width: `${Math.random() * 3 + 1}px` }} />
                    ))}
                  </div>
                  <p className="mono barcode-number">{memberAccessPass.barcode}</p>
                  <p className="mono text-muted text-xs">{memberAccessPass.nfcInfo}</p>
                </div>

                <Button variant="outline" size="sm" fullWidth>
                  <Icon name="wallet" />
                  {memberAccessPass.admitButton}
                </Button>

                <p className="text-muted text-xs member-dash__renewal">
                  {memberAccessPass.renewalDate}
                </p>
              </section>

              {/* Body Composition */}
              <section className="card member-dash__card">
                <div className="member-dash__card-header">
                  <div>
                    <h2 className="member-dash__card-title">{bodyComposition.title}</h2>
                    <p className="text-muted text-sm">{bodyComposition.subtitle}</p>
                  </div>
                </div>

                <div className="member-dash__metrics-grid">
                  {bodyComposition.metrics.map((metric, idx) => (
                    <div key={idx} className="member-dash__metric">
                      <p className="mono text-muted text-xs">{metric.label}</p>
                      <p className="member-dash__metric-value">{metric.value}</p>
                      <p className="text-accent text-xs">{metric.sublabel}</p>
                    </div>
                  ))}
                </div>

                <div className="member-dash__weight-chart">
                  <div className="member-dash__chart-line" style={{ width: '75%' }}></div>
                </div>

                <Button variant="primary" size="sm" fullWidth>
                  <Icon name="analytics" />
                  {bodyComposition.cta}
                </Button>
              </section>

              {/* Upcoming Classes */}
              <section className="card member-dash__card">
                <div className="member-dash__card-header">
                  <h2 className="member-dash__card-title">Upcoming Classes</h2>
                  <Link to="#" className="text-accent text-sm">View All</Link>
                </div>

                <div className="member-dash__classes">
                  {upcomingClasses.map((cls) => (
                    <div key={cls.id} className={`member-dash__class ${!cls.date ? 'member-dash__class--add' : ''}`}>
                      {cls.icon && <span className="member-dash__class-icon">{cls.icon}</span>}
                      <div className="member-dash__class-info">
                        <h3 className="member-dash__class-name">{cls.name}</h3>
                        {cls.date && <p className="text-muted text-sm">{cls.date}</p>}
                        {cls.location && <p className="text-muted text-xs">{cls.location}</p>}
                      </div>
                      {cls.status && (
                        <span className={`status-badge ${cls.status === 'CONFIRMED' ? 'status-badge--success' : 'status-badge--info'}`}>
                          {cls.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Billing */}
              <section className="card member-dash__card">
                <div className="member-dash__card-header">
                  <h2 className="member-dash__card-title">Billing & Receipts</h2>
                  <Link to="#" className="text-accent text-sm">Settings</Link>
                </div>

                {billingReceipts.map((receipt) => (
                  <div key={receipt.id} className="member-dash__receipt">
                    <div>
                      <p className="member-dash__receipt-id mono">{receipt.id} <span className="text-accent">(${receipt.amount.toFixed(2)})</span></p>
                      <p className="text-muted text-sm">{receipt.date}</p>
                      <p className="text-muted text-xs">{receipt.nextBilling}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Icon name="download" />
                    </Button>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
