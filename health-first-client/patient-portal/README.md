# EHR Dashboard System

A comprehensive Electronic Health Record (EHR) dashboard system with separate Patient and Provider portals built with React, Material-UI, and TypeScript.

## 🏥 Features

### Patient Portal
- **Dashboard**: Health overview, upcoming appointments, recent lab results
- **Appointments**: View, book, and manage appointments
- **Medical Records**: Access to health history and documents
- **Prescriptions**: Current medications and refill requests
- **Lab Results**: Test results with visual charts
- **Billing**: Payment history and outstanding balances
- **Messages**: Secure communication with healthcare providers
- **Profile**: Personal information management

### Provider Portal
- **Dashboard**: Daily schedule, patient summaries, practice metrics
- **Patients**: Patient list, search, and detailed profiles
- **Appointments**: Schedule view, booking, and management
- **Schedule**: Calendar view of appointments and availability
- **Prescriptions**: E-prescribing and medication management
- **Lab Orders**: Order tests and view results
- **Billing**: Invoice generation and payment tracking
- **Messages**: Communication with patients and staff
- **Settings**: Practice management and user preferences

## 🛠️ Technical Stack

- **Frontend**: React 18+ with TypeScript
- **UI Framework**: Material-UI (MUI) v5+
- **Routing**: React Router v6+
- **State Management**: Redux Toolkit
- **Styling**: MUI Theme + Custom CSS
- **Icons**: MUI Icons + Healthcare-specific icons
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd patient-portal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔐 Authentication

### Demo Credentials

**Patient Login:**
- Email: `patient@demo.com`
- Password: `password123`

**Provider Login:**
- Email: `provider@demo.com`
- Password: `password123`

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.tsx    # Main dashboard layout
│   │   └── AuthLayout.tsx         # Authentication layout
│   └── ...
├── pages/
│   ├── auth/
│   │   ├── Login.tsx              # Login page
│   │   └── Register.tsx           # Registration page
│   ├── patient/                   # Patient portal pages
│   │   ├── Dashboard.tsx
│   │   ├── Appointments.tsx
│   │   ├── MedicalRecords.tsx
│   │   ├── Prescriptions.tsx
│   │   ├── LabResults.tsx
│   │   ├── Billing.tsx
│   │   ├── Messages.tsx
│   │   └── Profile.tsx
│   └── provider/                  # Provider portal pages
│       ├── Dashboard.tsx
│       ├── Patients.tsx
│       ├── Appointments.tsx
│       ├── Schedule.tsx
│       ├── Prescriptions.tsx
│       ├── LabOrders.tsx
│       ├── Billing.tsx
│       ├── Messages.tsx
│       └── Settings.tsx
├── store/
│   ├── store.ts                   # Redux store configuration
│   └── slices/                    # Redux slices
│       ├── authSlice.ts
│       ├── patientSlice.ts
│       ├── appointmentSlice.ts
│       ├── prescriptionSlice.ts
│       ├── labResultSlice.ts
│       ├── messageSlice.ts
│       └── billingSlice.ts
├── contexts/
│   └── AuthContext.tsx            # Authentication context
└── App.tsx                        # Main application component
```

## 🎨 Design System

### Color Palette
- **Primary**: Healthcare Blue (#1976d2)
- **Secondary**: Medical Green (#4caf50)
- **Error**: Medical Red (#f44336)
- **Warning**: Amber (#ff9800)

### Typography
- **Font Family**: Roboto
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliant

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and supports:
- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🔒 Security Features

- **Authentication**: JWT-based authentication
- **Authorization**: Role-based access control
- **Data Protection**: HIPAA-compliant data handling
- **Secure Communication**: HTTPS only
- **Session Management**: Automatic timeout handling

## 🚧 Development Status

### Phase 1 ✅ (Completed)
- Basic layout and routing
- Authentication system
- Dashboard layouts for both portals
- Redux store setup with mock data

### Phase 2 🔄 (In Progress)
- Patient portal core features
- Provider portal core features
- Advanced UI components

### Phase 3 📋 (Planned)
- Real API integration
- Advanced features and messaging
- Analytics and reporting
- Performance optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Note**: This is a demonstration application with mock data. For production use, proper backend integration, security measures, and HIPAA compliance must be implemented. 