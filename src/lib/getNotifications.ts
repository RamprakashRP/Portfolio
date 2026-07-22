import { supabase } from '@/lib/supabase';

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

export async function getNotifications(): Promise<NotificationItem[]> {
  const notifications: NotificationItem[] = [];

  const [ { data: projects }, { data: achievements }, { data: experiences } ] = await Promise.all([
    supabase.from('projects').select('*'),
    supabase.from('achievements').select('*'),
    supabase.from('experiences').select('*')
  ]);

  if (projects) {
    projects.forEach(project => {
      notifications.push({
        id: `proj-${project.id}`,
        title: `New Project: ${project.name || project.title}`,
        description: project.description || 'Check out my latest project.',
        type: 'project',
        dateStr: project.period || project.date || '',
        timestamp: project.created_at ? Date.parse(project.created_at) : project.sortDate || parseDateString(project.period || project.date || ''),
        link: `/projects/${project.id || project.slug || project.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      });
    });
  }

  if (achievements) {
    achievements.forEach(ach => {
      notifications.push({
        id: `ach-${ach.id}`,
        title: `Achievement Unlocked: ${ach.title}`,
        description: ach.description ? ach.description.substring(0, 100) + '...' : '',
        type: 'achievement',
        dateStr: ach.date || '',
        timestamp: ach.created_at ? Date.parse(ach.created_at) : parseDateString(ach.date || ''),
        link: `/achievements/${ach.id || ach.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      });
    });
  }

  if (experiences) {
    experiences.forEach((company) => {
      if (company.roles && Array.isArray(company.roles)) {
        company.roles.forEach((role: any, rIdx: number) => {
          notifications.push({
            id: `role-${company.id}-${rIdx}`,
            title: `New Role at ${company.company}`,
            description: role.position,
            type: 'role',
            dateStr: role.duration || '',
            timestamp: company.created_at ? Date.parse(company.created_at) : parseDateString(role.duration || ''),
            link: `/#experience`
          });
        });
      }
    });
  }

  // Sort descending by timestamp (newest first)
  notifications.sort((a, b) => b.timestamp - a.timestamp);

  // Return the top 10 most recent
  return notifications.slice(0, 10);
}
