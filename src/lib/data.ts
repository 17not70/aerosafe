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
  {
    id: 'rep-001',
    type: 'MOR',
    title: 'Runway Incursion at VNKT',
    description: 'Aircraft entered the runway without clearance while another was on final approach. Immediate go-around was initiated by the approaching aircraft. Weather was clear, visibility 10km. Communication breakdown between tower and ground vehicle suspected.',
    severity: 4,
    probability: 2,
    risk_index: 8,
    action_status: 'In Progress',
    reporter_id: 'user-1',
    created_at: formatISO(subDays(new Date(), 2)),
    attachments: [{ name: 'ground_track.pdf', url: '#' }],
  },
  {
    id: 'rep-002',
    type: 'VSR',
    title: 'Unstabilized Approach due to strong tailwind',
    description: 'During approach to RWY 20, an unexpected increase in tailwind component resulted in an unstabilized approach. A go-around was performed and the subsequent approach and landing were normal. Suggest reviewing wind shear training.',
    severity: 3,
    probability: 3,
    risk_index: 9,
    action_status: 'Open',
    reporter_id: 'user-4',
    created_at: formatISO(subDays(new Date(), 5)),
  },
  {
    id: 'rep-003',
    type: 'MOR',
    title: 'TCAS Resolution Advisory',
    description: 'Received a TCAS RA "Climb, Climb" while in cruise at FL340. The conflicting traffic was correctly identified and visual contact was made. ATC was informed. The event occurred in a non-radar environment.',
    severity: 4,
    probability: 1,
    risk_index: 4,
    action_status: 'Completed',
    reporter_id: 'user-1',
    created_at: formatISO(subDays(new Date(), 15)),
  },
  {
    id: 'rep-004',
    type: 'VSR',
    title: 'Incorrect fueling calculation sheet',
    description: 'Pre-flight check discovered the fueling sheet provided by ground handling had a calculation error. If not caught, it would have resulted in 500kgs less fuel than required for the flight plan. The sheet was corrected before fueling began.',
    severity: 2,
    probability: 4,
    risk_index: 8,
    action_status: 'Closed',
    reporter_id: 'user-4',
    created_at: formatISO(subDays(new Date(), 30)),
  },
  {
    id: 'rep-005',
    type: 'VSR',
    title: 'Bird strike on landing',
    description: 'A single bird strike occurred on the right wing leading edge during the landing flare. No significant damage was observed. Post-flight inspection confirmed minor scratches. Standard procedure followed.',
    severity: 1,
    probability: 5,
    risk_index: 5,
    action_status: 'Open',
    reporter_id: 'user-1',
    created_at: formatISO(subDays(new Date(), 1)),
  },
    {
    id: 'rep-006',
    type: 'MOR',
    title: 'Loss of Cabin Pressurization',
    description: 'At FL360, the cabin altitude warning horn sounded. Crew executed an emergency descent to 10,000 feet. Oxygen masks deployed as per procedure. No injuries reported among passengers or crew. Suspected outflow valve malfunction.',
    severity: 5,
    probability: 1,
    risk_index: 5,
    action_status: 'In Progress',
    reporter_id: 'user-4',
    created_at: formatISO(subDays(new Date(), 45)),
    attachments: [{ name: 'maintenance_log.txt', url: '#' }, {name: 'flight_data.csv', url: '#'}],
  },
];

export const correctiveActions: CorrectiveAction[] = [
  {
    id: 'ca-001',
    report_id: 'rep-001',
    assigned_to_id: 'user-2',
    description: 'Investigate communication logs between VNKT tower and ground vehicles for the specified time.',
    due_date: formatISO(subDays(new Date(), -10)),
    status: 'In Progress',
    created_at: formatISO(subDays(new Date(), 1)),
  },
  {
    id: 'ca-002',
    report_id: 'rep-001',
    assigned_to_id: 'user-2',
    description: 'Review and reinforce runway incursion prevention protocols with all ground staff.',
    due_date: formatISO(subDays(new Date(), -20)),
    status: 'Open',
    created_at: formatISO(subDays(new Date(), 1)),
  },
  {
    id: 'ca-003',
    report_id: 'rep-003',
    assigned_to_id: 'user-2',
    description: 'Confirm with maintenance that the TCAS system software is up to the latest version.',
    due_date: formatISO(subDays(new Date(), 10)),
    status: 'Completed',
    created_at: formatISO(subDays(new Date(), 14)),
  },
  {
    id: 'ca-004',
    report_id: 'rep-006',
    assigned_to_id: 'user-2',
    description: 'Perform detailed inspection and testing of the cabin pressurization outflow valve.',
    due_date: formatISO(subDays(new Date(), -5)),
    status: 'In Progress',
    created_at: formatISO(subDays(new Date(), 44)),
  }
];

// Mock current user - in a real app, this would come from an auth context
export const getCurrentUser = (): User => {
  return users.find(u => u.role === 'Safety Officer')!;
};
