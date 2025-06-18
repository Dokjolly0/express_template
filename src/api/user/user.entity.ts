export interface User {
  // Unique ID
  id?: string;
  // Base Info
  firstName: string;
  lastName: string;
  picture?: string;
  // Authentication Info
  status?: string;
  role?: string;
  isConfirmed?: boolean;
  // Security Info
  createdAt?: Date | string;
  lastUpdateAt?: Date | string | undefined;
  lastLogin?: Date | string | undefined;
  lastAllowedIp?: string | undefined;
  allowedIps?: string[] | undefined;
}
