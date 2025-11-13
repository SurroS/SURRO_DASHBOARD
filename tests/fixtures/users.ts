import { User } from '@/lib/userManagement';

export const mockPendingUsers: User[] = [
  {
    id: '#6548',
    name: 'Emily Johnson',
    email: 'emily.johnson@gmail.com',
    phone: '+1234567890',
    role: 'surrogate',
    status: 'pending',
    verificationStatus: 'kyc_pending',
    dateJoined: '2024-01-15',
    walletBalance: 0,
    documents: [
      {
        id: 'doc1',
        userId: '#6548',
        type: 'ID',
        name: 'passport.pdf',
        uploadDate: '2024-01-15',
        status: 'pending',
      },
      {
        id: 'doc2',
        userId: '#6548',
        type: 'Medical',
        name: 'health_check.pdf',
        uploadDate: '2024-01-15',
        status: 'pending',
      },
    ],
    activityLog: [],
    complianceFlags: [],
    linkedTickets: [],
  },
  {
    id: '#7003',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@gmail.com',
    phone: '+1234567802',
    role: 'parent',
    status: 'pending',
    verificationStatus: 'kyc_pending',
    dateJoined: '2024-01-18',
    walletBalance: 0,
    documents: [
      {
        id: 'doc3',
        userId: '#7003',
        type: 'Financial',
        name: 'bank_statement.pdf',
        uploadDate: '2024-01-18',
        status: 'pending',
      },
    ],
    activityLog: [],
    complianceFlags: [],
    linkedTickets: [],
  },
  {
    id: '#8003',
    name: 'Health & Wellness Center',
    email: 'health.wellness@gmail.com',
    phone: '+1234567702',
    role: 'clinic',
    status: 'pending',
    verificationStatus: 'kyc_pending',
    dateJoined: '2024-01-22',
    walletBalance: 0,
    documents: [
      {
        id: 'doc4',
        userId: '#8003',
        type: 'License',
        name: 'medical_license.pdf',
        uploadDate: '2024-01-22',
        status: 'pending',
      },
      {
        id: 'doc5',
        userId: '#8003',
        type: 'Certification',
        name: 'fertility_cert.pdf',
        uploadDate: '2024-01-22',
        status: 'pending',
      },
    ],
    activityLog: [],
    complianceFlags: [],
    linkedTickets: [],
  },
  {
    id: '#9004',
    name: 'Sophia Turner',
    email: 'sophia.turner@gmail.com',
    phone: '+1234567603',
    role: 'agent',
    status: 'pending',
    verificationStatus: 'kyc_pending',
    dateJoined: '2024-01-20',
    walletBalance: 0,
    documents: [
      {
        id: 'doc6',
        userId: '#9004',
        type: 'License',
        name: 'agent_license.pdf',
        uploadDate: '2024-01-20',
        status: 'pending',
      },
    ],
    activityLog: [],
    complianceFlags: [],
    linkedTickets: [],
  },
];

export const initializeTestUsers = () => {
  if (typeof window !== 'undefined') {
    const allUsers = JSON.parse(localStorage.getItem('surro_users') || '[]');
    const existingIds = new Set(allUsers.map((u: User) => u.id));
    
    // Add only users that don't already exist
    const newUsers = mockPendingUsers.filter(u => !existingIds.has(u.id));
    
    if (newUsers.length > 0) {
      localStorage.setItem('surro_users', JSON.stringify([...allUsers, ...newUsers]));
    }
  }
};

