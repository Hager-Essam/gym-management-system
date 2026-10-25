import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon.jsx';
import Button from '../components/ui/Button.jsx';
import DashboardNav from '../components/layout/DashboardNav.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import {
  coachProfile,
  coachStats,
  assignedMembers,
  todaySchedule,
  activeProgramLibrary,
  liveClientExerciseLogs,
  rosterMetricVelocity,
  coachShiftNotes,
} from '../data/dashboardData.js';
import './CoachDashboard.css';

export default function CoachDashboard() {
  const { user } = useAuth();

  return (
    <div className="coach-dash">
      <DashboardNav />
      {/* Header */}
      <header className="coach-dash__header">
        <div className="coach-dash__header-content">
          <div>
            <div className="coach-dash__profile">
              <div className="coach-dash__avatar">
                <Icon name="person" size={32} />
              </div>
              <div>
                <h1 className="coach-dash__name">{coachProfile.name}</h1>
                <p className="mono coach-dash__credentials">{coachProfile.credentials}</p>
              </div>
            </div>
            <div className="coach-dash__status-bar">
              <div className="coach-dash__status-item">
                <Icon name="schedule" size={16} />
                <span>{coachProfile.status}</span>
              </div>
              <div className="coach-dash__status-item">
                <Icon name="location_on" size={16} />
                <span>{coachProfile.facility}</span>
              </div>
              <div className="coach-dash__status-item">
                <Icon name="verified" size={16} />
                <span>{coachProfile.protocol}</span>
              </div>
            </div>
          </div>
          <Button variant="primary" size="lg">
            <Icon name="add" />
            Workout Builder
          </Button>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="coach-dash__stats">
        <div className="card coach-dash__stat-card">
          <div className="coach-dash__stat-header">
            <Icon name="groups" className="coach-dash__stat-icon" />
            <p className="mono text-muted text-sm">ASSIGNED MEMBERS</p>
          </div>
          <div className="coach-dash__stat-value">
            <span className="stat-number">{coachStats.activeAthletes}</span>
            <span className="stat-label">Active Athletes</span>
          </div>
          <p className="text-muted text-sm">{coachStats.context}</p>
        </div>

        <div className="card coach-dash__stat-card">
          <div className="coach-dash__stat-header">
            <Icon name="event" className="coach-dash__stat-icon" />
            <p className="mono text-muted text-sm">TODAY'S 1-ON-1 SESSIONS</p>
          </div>
          <div className="coach-dash__stat-value">
            <span className="stat-number">{coachStats.bookedRoster}</span>
            <span className="stat-label">Booked Roster</span>
          </div>
          <div className="coach-dash__stat-breakdown">
            <span className="text-accent">{coachStats.done} Done</span>
            <span className="text-muted">·</span>
            <span>{coachStats.upcoming} Left</span>
            <span className="text-muted">·</span>
            <span className="text-muted">{coachStats.leftContext}</span>
          </div>
        </div>

        <div className="card coach-dash__stat-card">
          <div className="coach-dash__stat-header">
            <Icon name="fitness_center" className="coach-dash__stat-icon" />
            <p className="mono text-muted text-sm">ACTIVE SPLIT PROGRAMS</p>
          </div>
          <div className="coach-dash__stat-value">
            <span className="stat-number">{coachStats.todaySessions}</span>
            <span className="stat-label">Custom Blueprints</span>
          </div>
          <p className="text-muted text-sm">{coachStats.blocks}</p>
        </div>

        <div className="card coach-dash__stat-card coach-dash__stat-card--action">
          <div className="coach-dash__stat-header">
            <Icon name="priority_high" className="coach-dash__stat-icon coach-dash__stat-icon--alert" />
            <p className="mono text-sm text-accent">ACTION NEEDED</p>
          </div>
          <div className="coach-dash__stat-value">
            <span className="stat-number">5</span>
            <span className="stat-label">Priority Triggers</span>
          </div>
          <p className="text-sm">Check log & follow-up plateau flags</p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="coach-dash__grid">
        {/* Priority Follow-Ups */}
        <section className="card coach-dash__card coach-dash__priority">
          <div className="coach-dash__card-header">
            <div>
              <h2 className="coach-dash__card-title">
                <Icon name="notification_important" />
                Priority Follow-Ups
                <span className="badge badge--critical">{assignedMembers.length} ACTIVE</span>
              </h2>
            </div>
          </div>

          <div className="coach-dash__members">
            {assignedMembers.map((member) => (
              <div key={member.id} className={`coach-dash__member coach-dash__member--${member.status.toLowerCase()}`}>
                <div className="coach-dash__member-header">
                  <div className="coach-dash__member-avatar">{member.initials}</div>
                  <div className="coach-dash__member-info">
                    <h3 className="coach-dash__member-name">{member.name}</h3>
                    <p className="coach-dash__member-program">{member.program}</p>
                  </div>
                  {member.alert && (
                    <Icon name="warning" className="coach-dash__alert-icon" />
                  )}
                </div>
                <p className="coach-dash__member-message">{member.message}</p>
                <div className="coach-dash__member-actions">
                  {member.actions.map((action, idx) => (
                    <Button key={idx} variant="outline" size="sm">
                      <Icon name={action.includes('WhatsApp') ? 'chat' : action.includes('SMS') ? 'sms' : 'receipt'} />
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Today's Training Schedule */}
        <section className="card coach-dash__card coach-dash__schedule">
          <div className="coach-dash__card-header">
            <div>
              <h2 className="coach-dash__card-title">Today's Training Schedule & Session Roster</h2>
              <p className="text-muted text-sm">Live roster updates synced from turnstile gate check-in + floor slots</p>
            </div>
            <Link to="#" className="text-accent text-sm">
              <Icon name="calendar_month" size={16} />
              Wed, Oct 23
            </Link>
          </div>

          <div className="coach-dash__timeline">
            {todaySchedule.map((session) => (
              <div key={session.id} className={`coach-dash__session coach-dash__session--${session.status.toLowerCase().replace(' ', '-')}`}>
                <div className="coach-dash__session-time">
                  <span className="mono">{session.time}</span>
                  <div className={`coach-dash__session-status status-badge status-badge--${getStatusVariant(session.status)}`}>
                    {session.status}
                  </div>
                </div>
                <div className="coach-dash__session-content">
                  <div className="coach-dash__session-header">
                    <div className="coach-dash__session-avatar">
                      {session.client.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="coach-dash__session-client">{session.client}</h3>
                      <p className="coach-dash__session-program">{session.program}</p>
                    </div>
                  </div>
                  {session.action && (
                    <Button 
                      variant={session.status === 'NEXT UP' ? 'primary' : 'outline'} 
                      size="sm"
                    >
                      <Icon name={session.status === 'COMPLETED' ? 'visibility' : 'play_arrow'} />
                      {session.action}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Active Program Library */}
        <section className="card coach-dash__card">
          <div className="coach-dash__card-header">
            <div>
              <h2 className="coach-dash__card-title">Active Program Library & Split Management</h2>
              <p className="text-muted text-sm">Active group architectures assigned across roster</p>
            </div>
            <Link to="#" className="text-accent text-sm">View All (18)</Link>
          </div>

          <div className="coach-dash__programs">
            {activeProgramLibrary.map((program) => (
              <div key={program.id} className="coach-dash__program">
                <div className="coach-dash__program-header">
                  <span className={`coach-dash__program-badge badge badge--${program.category.toLowerCase()}`}>
                    {program.category}
                  </span>
                  <span className="mono text-muted text-sm">{program.athletes} Athletes</span>
                </div>
                <h3 className="coach-dash__program-name">{program.name}</h3>
                <p className="text-muted text-sm">{program.intensity}</p>
                
                <div className="coach-dash__program-progress">
                  <div className="coach-dash__progress-bar">
                    <div 
                      className="coach-dash__progress-fill" 
                      style={{ width: `${program.progress}%` }}
                    ></div>
                  </div>
                  <span className="mono text-sm">{program.duration}</span>
                </div>

                <Button variant="outline" size="sm" fullWidth>
                  <Icon name="edit" />
                  {program.edit}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Live Client Exercise Logs */}
        <section className="card coach-dash__card">
          <div className="coach-dash__card-header">
            <div>
              <h2 className="coach-dash__card-title">{liveClientExerciseLogs.title}</h2>
              <p className="text-muted text-sm">{liveClientExerciseLogs.subtitle}</p>
            </div>
            <span className="mono text-accent text-sm">
              <Icon name="sync" size={16} className="spinning" />
              {liveClientExerciseLogs.syncStatus}
            </span>
          </div>

          <div className="coach-dash__activity-feed">
            {liveClientExerciseLogs.activities.map((activity) => (
              <div key={activity.id} className="coach-dash__activity">
                <div className="coach-dash__activity-avatar">{activity.initials}</div>
                <div className="coach-dash__activity-content">
                  <div className="coach-dash__activity-header">
                    <span className="coach-dash__activity-name">{activity.name}</span>
                    <span className={`badge badge--${activity.status.includes('PR') ? 'success' : 'info'}`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="coach-dash__activity-exercise">{activity.exercise}</p>
                  <span className="text-muted text-xs">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Roster Metric Velocity */}
        <section className="card coach-dash__card">
          <div className="coach-dash__card-header">
            <div>
              <h2 className="coach-dash__card-title">{rosterMetricVelocity.title}</h2>
              <p className="text-muted text-sm">{rosterMetricVelocity.subtitle}</p>
            </div>
            <span className="mono text-sm">{rosterMetricVelocity.days} Days</span>
          </div>

          <div className="coach-dash__chart">
            <div className="coach-dash__chart-legend">
              <div className="coach-dash__legend-item">
                <div className="coach-dash__legend-dot" style={{ background: '#22c55e' }}></div>
                <span className="text-sm">{rosterMetricVelocity.legend.leanMass}</span>
              </div>
              <div className="coach-dash__legend-item">
                <div className="coach-dash__legend-dot" style={{ background: '#ef4444' }}></div>
                <span className="text-sm">{rosterMetricVelocity.legend.bodyFat}</span>
              </div>
            </div>
            
            <div className="coach-dash__chart-area">
              <svg viewBox="0 0 400 200" className="coach-dash__chart-svg">
                <defs>
                  <linearGradient id="leanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="fatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Lean Mass Line */}
                <polyline
                  points="0,180 133,160 266,130 400,100"
                  fill="url(#leanGradient)"
                  stroke="#22c55e"
                  strokeWidth="3"
                />
                
                {/* Body Fat Line */}
                <polyline
                  points="0,50 133,55 266,65 400,80"
                  fill="url(#fatGradient)"
                  stroke="#ef4444"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Coach Shift Notes */}
        <section className="card coach-dash__card">
          <div className="coach-dash__card-header">
            <div>
              <h2 className="coach-dash__card-title">{coachShiftNotes.title}</h2>
              <p className="text-muted text-sm">{coachShiftNotes.subtitle}</p>
            </div>
          </div>

          <div className="coach-dash__notes">
            {coachShiftNotes.notes.map((note, idx) => (
              <div key={idx} className="coach-dash__note">
                <Icon name="notes" />
                <p>{note}</p>
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" fullWidth>
            <Icon name="add" />
            {coachShiftNotes.cta}
          </Button>
        </section>
      </div>
    </div>
  );
}

function getStatusVariant(status) {
  const variants = {
    'COMPLETED': 'success',
    'IN SESSION': 'info',
    'NEXT UP': 'warning',
    'UPCOMING': 'default',
    'SCHEDULED': 'default',
  };
  return variants[status] || 'default';
}
