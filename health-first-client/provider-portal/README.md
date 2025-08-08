# EHR Dashboard System

A comprehensive Electronic Health Record (EHR) dashboard system with separate Patient and Provider portals built with React, Material-UI, and TypeScript.

## 🏥 Features

### Patient Portal

- **Dashboard**: Health overview, upcoming appointments, recent results
- **Appointments**: View, book, and manage appointments
- **Medical Records**: Access to health history, lab results, procedures
- **Prescriptions**: Current medications and refill requests
- **Lab Results**: Test results with visual indicators
- **Billing**: Payment history and outstanding balances
- **Messages**: Secure communication with providers
- **Profile**: Personal information management

### Provider Portal

- **Dashboard**: Daily schedule, patient summaries, performance metrics
- **Patient Management**: Patient list, search, detailed profiles
- **Appointment Management**: Schedule view, booking, rescheduling
- **Schedule**: Calendar view of appointments and availability
- **Prescription Management**: E-prescribing and medication history
- **Lab Orders**: Order tests and view results
- **Billing**: Invoice generation and payment tracking
- **Messages**: Communication with patients and staff
- **Settings**: Practice management and user preferences

## 🛠️ Technical Stack

- **Frontend**: React 18+ with TypeScript
- **UI Framework**: Material-UI (MUI) v5+
- **Routing**: React Router v6+
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: MUI Theme + Custom CSS
- **Icons**: MUI Icons + Healthcare-specific icons
- **Build Tool**: Vite
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd provider-portal
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials

#### Patient Login

- Email: `patient@demo.com`
- Password: `demo123`

#### Provider Login

- Email: `provider@demo.com`
- Password: `demo123`

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/                 # Authentication components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── ProtectedRoute.tsx
│   ├── layout/               # Layout components
│   │   ├── DashboardLayout.tsx
│   │   └── AuthLayout.tsx
│   ├── patient/              # Patient portal components
│   │   ├── Dashboard.tsx
│   │   ├── Appointments.tsx
│   │   ├── MedicalRecords.tsx
│   │   ├── Prescriptions.tsx
│   │   ├── LabResults.tsx
│   │   ├── Billing.tsx
│   │   ├── Messages.tsx
│   │   └── Profile.tsx
│   ├── provider/             # Provider portal components
│   │   ├── Dashboard.tsx
│   │   ├── Patients.tsx
│   │   ├── Appointments.tsx
│   │   ├── Schedule.tsx
│   │   ├── Prescriptions.tsx
│   │   ├── LabOrders.tsx
│   │   ├── Billing.tsx
│   │   ├── Messages.tsx
│   │   └── Settings.tsx
│   └── ui/                   # Reusable UI components
│       ├── StatCard.tsx
│       └── HealthChart.tsx
├── store/                    # Redux store
│   ├── store.ts
│   └── slices/
│       └── authSlice.ts
├── App.tsx                   # Main application component
├── main.tsx                  # Application entry point
└── index.css                 # Global styles
```

## 🎨 Design System

### Color Palette

- **Primary**: Healthcare Blue (#1976d2)
- **Secondary**: Medical Green (#4caf50)
- **Error**: Medical Red (#f44336)
- **Warning**: Amber (#ff9800)

### Typography

- **Font Family**: Roboto
- **Responsive**: Mobile-first design
- **Accessibility**: WCAG 2.1 AA compliant

### Components

- **StatCard**: Dashboard statistics with icons
- **HealthChart**: Medical data visualization
- **DataTable**: Patient/appointment listings
- **MessageCenter**: Communication hub
- **NotificationPanel**: Alerts and updates

## 🔐 Security & Compliance

### HIPAA Compliance

- Data encryption in transit and at rest
- Audit trails for all data access
- Role-based access control (RBAC)
- Session management with timeout

### Authentication

- JWT token-based authentication
- Secure password handling
- Multi-factor authentication ready
- Session timeout handling

## 📱 Responsive Design

- **Mobile**: 320px+ support
- **Tablet**: 768px+ with sidebar collapse
- **Desktop**: 1024px+ full layout
- **Large Desktop**: 1440px+ extended content

## 🧪 Testing

### Available Scripts

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=EHR Dashboard
```

## 🔧 Configuration

### MUI Theme Customization

The theme is configured in `src/App.tsx` with healthcare-specific colors and typography.

### Routing Configuration

Routes are defined in `src/App.tsx` with protected routes for both patient and provider portals.

## 📊 Performance

- **Initial Load**: < 3 seconds
- **Route Changes**: < 500ms
- **Bundle Size**: Optimized with code splitting
- **Caching**: Browser and API-level caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Roadmap

### Phase 1: Core Features ✅

- [x] Basic layout and routing
- [x] Authentication system
- [x] Patient portal dashboard
- [x] Provider portal dashboard

### Phase 2: Advanced Features 🚧

- [ ] Real-time messaging
- [ ] Calendar integration
- [ ] Advanced reporting
- [ ] Mobile app

### Phase 3: Enterprise Features 📋

- [ ] Multi-tenant support
- [ ] Advanced analytics
- [ ] API integrations
- [ ] Custom workflows

---

**Built with ❤️ for healthcare professionals and patients**
