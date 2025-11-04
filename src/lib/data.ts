import { User, Report, CorrectiveAction, UserRole, Severity, Probability, ActionStatus, ReportType } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { subDays, formatISO } from 'date-fns';

const userAvatars = {
  'user-1': PlaceHolderImages.find(img => img.id === 'user-avatar-1')?.imageUrl || '',
  'user-2': PlaceHolderImages.find(img => img.id === 'user-avatar-2')?.imageUrl || '',
  'user-3': PlaceHolderImages.find(img => img.id === 'user-avatar-3')?.imageUrl || '',
  'user-4': PlaceHolderImages.find(img => img.id === 'user-avatar-4')?.imageUrl || '',
};

export const users: User[] = [
  { id: 'user-1', name: 'Capt. Alex Ray', email: 'capt.ray@example.com', avatar: userAvatars['user-1'], role: 'Reporter' },
  { id: 'user-2', name: 'Jane Doe', email: 'officer@example.com', avatar: userAvatars['user-2'], role: 'Safety Officer' },
  { id: 'user-3', name: 'Admin User', email: 'admin@example.com', avatar: userAvatars['user-3'], role: 'Admin' },
  { id: 'user-4', name: 'First Officer Kai', email: 'fo.kai@example.com', avatar: userAvatars['user-4'], role: 'Reporter' },
];

export const reports: Report[] = [
];

export const correctiveActions: CorrectiveAction[] = [
];

// Mock current user - in a real app, this would come from an auth context
export const getCurrentUser = (): User => {
  return users.find(u => u.role === 'Safety Officer')!;
};
