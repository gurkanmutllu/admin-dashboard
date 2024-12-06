export const ROUTES = {
  LOGIN: '/',
  USERS: '/users',
  STATS: '/stats',
  // Add more routes as needed
} as const;

// Type-safe route helper
export const getRoute = (route: keyof typeof ROUTES) => ROUTES[route]; 