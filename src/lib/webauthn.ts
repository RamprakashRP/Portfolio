export const rpName = 'Ramprakash Portfolio';
export const rpID = process.env.NODE_ENV === 'development' ? 'localhost' : (process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname : 'localhost');
export const origin = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');

export const ADMIN_USER_ID = 'ramprakash-admin-id';
export const ADMIN_USERNAME = 'admin@ramprakash.dev';
