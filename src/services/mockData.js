export const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    gender: "Male",
    phone: "(555) 123-4567",
    email: "john.doe@email.com",
    address: "123 Main St, City, State",
    bloodType: "A+",
    status: "Active",
    medicalHistory: [
      {
        date: "2024-01-15",
        diagnosis: "Hypertension",
        treatment: "Prescribed Lisinopril",
        doctor: "Dr. Sarah Wilson"
      },
      {
        date: "2023-12-10",
        diagnosis: "Influenza",
        treatment: "Prescribed Tamiflu",
        doctor: "Dr. Michael Chen"
      }
    ],
    upcomingAppointments: [
      {
        id: 1,
        date: "2024-03-20",
        time: "10:00 AM",
        doctor: "Dr. Sarah Wilson",
        purpose: "Follow-up"
      }
    ],
    bills: [
      {
        id: 1,
        date: "2024-01-15",
        amount: 150.00,
        description: "Regular Checkup",
        status: "Paid"
      },
      {
        id: 2,
        date: "2023-12-10",
        amount: 200.00,
        description: "Flu Treatment",
        status: "Pending"
      }
    ]
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    diagnosis: 'Diabetes Type 2',
    admissionDate: '2024-03-18',
    status: 'Active',
    phone: "(555) 234-5678",
    email: "sarah.j@email.com"
  },
  {
    id: 3,
    name: 'Michael Brown',
    age: 58,
    gender: 'Male',
    diagnosis: 'Coronary Artery Disease',
    admissionDate: '2024-03-10',
    status: 'Discharged',
    phone: "(555) 345-6789",
    email: "m.brown@email.com"
  },
  {
    id: 4,
    name: 'Emily Wilson',
    age: 28,
    gender: 'Female',
    diagnosis: 'Pregnancy',
    admissionDate: '2024-03-19',
    status: 'Active',
    phone: "(555) 456-7890",
    email: "e.wilson@email.com"
  },
  {
    id: 5,
    name: 'Robert Chen',
    age: 52,
    gender: 'Male',
    diagnosis: 'Lower Back Pain',
    admissionDate: '2024-03-17',
    status: 'Pending',
    phone: "(555) 567-8901",
    email: "r.chen@email.com"
  }
];

export const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    specialization: "Cardiology",
    email: "sarah.wilson@hic.com",
    phone: "(555) 987-6543",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    availability: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 3:00 PM"
    },
    patients: 45,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Dr. James Wilson',
    specialization: 'General Medicine',
    availability: ['Mon', 'Tue', 'Thu'],
    patients: 30
  },
  {
    id: 3,
    name: 'Dr. Maria Garcia',
    specialization: 'Pediatrics',
    availability: ['Tue', 'Wed', 'Fri'],
    patients: 20
  },
  {
    id: 4,
    name: 'Dr. David Lee',
    specialization: 'Orthopedics',
    availability: ['Mon', 'Thu', 'Fri'],
    patients: 15
  },
  {
    id: 5,
    name: 'Dr. Lisa Anderson',
    specialization: 'Gynecology',
    availability: ['Wed', 'Thu', 'Fri'],
    patients: 22
  }
];

// Get today's date for appointments
const today = new Date().toISOString().split('T')[0];

export const appointments = [
  {
    id: 1,
    patientName: "John Doe",
    patientId: 1,
    doctorName: "Dr. Sarah Wilson",
    doctorId: 1,
    date: "2024-03-20",
    time: "10:00 AM",
    status: "Scheduled",
    purpose: "Follow-up",
    notes: "Regular blood pressure check"
  },
  {
    id: 2,
    patientId: 2,
    date: today,
    time: '10:30',
    doctor: 'Dr. James Wilson',
    department: 'General Medicine',
    status: 'Pending'
  },
  {
    id: 3,
    patientId: 3,
    date: today,
    time: '11:15',
    doctor: 'Dr. Sarah Smith',
    department: 'Cardiology',
    status: 'Completed'
  },
  {
    id: 4,
    patientId: 4,
    date: today,
    time: '14:00',
    doctor: 'Dr. Lisa Anderson',
    department: 'Gynecology',
    status: 'Scheduled'
  },
  {
    id: 5,
    patientId: 5,
    date: today,
    time: '15:30',
    doctor: 'Dr. David Lee',
    department: 'Orthopedics',
    status: 'Pending'
  },
  {
    id: 6,
    patientId: 1,
    date: '2024-03-25',
    time: '09:30',
    doctor: 'Dr. Sarah Smith',
    department: 'Cardiology',
    status: 'Scheduled'
  }
];

export const bills = [
  {
    id: 1,
    patientId: 1,
    patientName: "John Doe",
    date: '2024-03-15',
    dueDate: '2024-04-15',
    items: [
      { description: 'Consultation', amount: 150 },
      { description: 'Blood Test', amount: 75 },
      { description: 'Medication', amount: 200 }
    ],
    total: 425,
    status: 'Pending',
    paymentMethod: null,
    insurance: {
      coverage: 80,
      amount: 340
    },
    patientResponsibility: 85
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Sarah Johnson",
    date: '2024-03-10',
    dueDate: '2024-04-10',
    items: [
      { description: 'Diabetes Checkup', amount: 200 },
      { description: 'HbA1c Test', amount: 85 }
    ],
    total: 285,
    status: 'Paid',
    insurance: {
      coverage: 70,
      amount: 199.50
    },
    patientResponsibility: 85.50
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Michael Brown",
    date: '2024-03-05',
    dueDate: '2024-04-05',
    items: [
      { description: 'Cardiology Consultation', amount: 250 },
      { description: 'ECG', amount: 150 },
      { description: 'Stress Test', amount: 300 }
    ],
    total: 700,
    status: 'Overdue',
    insurance: {
      coverage: 75,
      amount: 525
    },
    patientResponsibility: 175
  },
  {
    id: 4,
    patientId: 4,
    patientName: "Emily Wilson",
    date: '2024-03-18',
    dueDate: '2024-04-18',
    items: [
      { description: 'Prenatal Checkup', amount: 180 },
      { description: 'Ultrasound', amount: 220 }
    ],
    total: 400,
    status: 'Pending',
    insurance: {
      coverage: 90,
      amount: 360
    },
    patientResponsibility: 40
  }
];

// You can add more mock data categories as needed
export const departments = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Internal Medicine',
  'Dermatology',
  'Ophthalmology',
  'Psychiatry'
];

export const statuses = [
  'Scheduled',
  'Pending',
  'Completed',
  'Cancelled'
];

export const hospitalStats = {
  totalPatients: 1250,
  activePatients: 180,
  totalDoctors: 45,
  totalAppointments: 120,
  occupancyRate: 75,
  averageWaitTime: "25 minutes",
  monthlyRevenue: 285000,
  pendingBills: 45
}; 