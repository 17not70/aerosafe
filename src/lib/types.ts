import type { LucideIcon } from 'lucide-react';

export type UserRole = 'Admin' | 'Safety Officer' | 'Reporter';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
};

export type ReportType = 'VSR' | 'MOR';
export type Severity = 1 | 2 | 3 | 4 | 5;
export type Probability = 1 | 2 | 3 | 4 | 5;
export type ActionStatus = 'Open' | 'In Progress' | 'Completed' | 'Closed';

export type Report = {
  id: string;
  type: ReportType;
  title: string;
  description: string;
  severity: Severity;
  probability: Probability;
  risk_index: number;
  action_status: ActionStatus;
  attachments?: { name: string; url: string }[];
  reporter_id: string;
  created_at: string; // ISO 8601 format
  hazardType?: string;
};

export type CorrectiveAction = {
  id: string;
  report_id: string;
  assigned_to_id: string; // User ID
  description: string;
  due_date: string; // ISO 8601 format
  status: ActionStatus;
  created_at: string; // ISO 8601 format
};

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  roles: UserRole[];
};

export type AuditLog = {
  id: string;
  actor_uid: string;
  action: string;
  timestamp: string; // ISO 8601 format
  details: Record<string, any>;
};
