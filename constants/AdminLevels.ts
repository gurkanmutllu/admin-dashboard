
export const ADMIN_LEVELS = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    VERY_HIGH: 4,
  } as const;
  
  // Type-safe route helper
  export const getAdminLevel = (level: keyof typeof ADMIN_LEVELS) => ADMIN_LEVELS[level]; 