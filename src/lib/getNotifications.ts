import { projectsList } from '@/data/projects';
import { achievements } from '@/data/achievements';
import { experiences } from '@/data/experience';

export type NotificationType = 'project' | 'achievement' | 'role';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type: NotificationType;
  dateStr: string;
  timestamp: number;
  link: string;
}

// Helper to parse dates like "18th Feb 2026" or "Feb 2026" or "Jan 2025 - Mar 2025"
function parseDateString(dateStr: string): number {
  if (!dateStr) return 0;
  
  // Clean up "18th", "2nd", etc.
  let cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
  
  // If it's a range like "Jan 2025 - Mar 2025", just take the start date
  if (cleaned.includes('-')) {
    cleaned = cleaned.split('-')[0].trim();
  }
  
  const parsed = Date.parse(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function getNotifications(): NotificationItem[] {
  const notifications: NotificationItem[] = [];

  // 1. Projects
  projectsList.forEach(project => {
    notifications.push({
      id: `proj-${project.id}`,
      title: `New Project: ${project.name}`,
      description: project.description || 'Check out my latest project.',
      type: 'project',
      dateStr: project.period || project.date || '',
      timestamp: project.sortDate || parseDateString(project.period || project.date || ''),
      link: `/projects/${project.id}`
    });
  });

  // 2. Achievements
  achievements.forEach(ach => {
    notifications.push({
      id: `ach-${ach.id}`,
      title: `Achievement Unlocked: ${ach.title}`,
      description: ach.description.substring(0, 100) + '...',
      type: 'achievement',
      dateStr: ach.date,
      timestamp: parseDateString(ach.date),
      link: `/achievements`
    });
  });

  // 3. Experiences (Roles)
  experiences.forEach((company, cIdx) => {
    company.roles.forEach((role, rIdx) => {
      notifications.push({
        id: `role-${cIdx}-${rIdx}`,
        title: `New Role at ${company.company}`,
        description: role.position,
        type: 'role',
        dateStr: role.duration,
        timestamp: parseDateString(role.duration),
        link: `/#experience`
      });
    });
  });

  // Sort descending by timestamp
  notifications.sort((a, b) => b.timestamp - a.timestamp);

  // Return the top 10 most recent
  return notifications.slice(0, 10);
}
