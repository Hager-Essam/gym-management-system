export const adminDashboardData = {
  stats: {
    totalMembers: 1284,
    activeMembers: 1142,
    suspendedMembers: 42,
    memberGrowth: '12.4%',
    
    monthlyRevenue: '$48.2k',
    mrr: '$45.8k',
    churnRate: '2.3%',
    revenueGrowth: '8.7%',
    
    todayCheckIns: 342,
    currentCheckIns: 142,
    checkInGrowth: '15.2%',
    
    totalStaff: 18,
    totalTrainers: 12,
    totalManagers: 4,
    
    totalUsers: 1318,
    activeSubscriptions: 1142,
    
    recentActivity: [
      {
        type: 'member',
        icon: 'person_add',
        title: 'New Member Registration',
        description: 'Marcus Chen joined with Black Diamond VIP plan',
        time: '5 mins ago',
      },
      {
        type: 'payment',
        icon: 'payments',
        title: 'Payment Received',
        description: '$199.00 from Sarah Jenkins - Monthly renewal',
        time: '12 mins ago',
      },
      {
        type: 'alert',
        icon: 'warning',
        title: 'Expiring Memberships',
        description: '28 memberships expiring in next 7 days',
        time: '1 hour ago',
      },
      {
        type: 'staff',
        icon: 'badge',
        title: 'New Trainer Added',
        description: 'Jessica Martinez added as Yoga Instructor',
        time: '2 hours ago',
      },
      {
        type: 'system',
        icon: 'check_circle',
        title: 'System Backup Completed',
        description: 'Daily backup completed successfully',
        time: '3 hours ago',
      },
    ],
  },
};
