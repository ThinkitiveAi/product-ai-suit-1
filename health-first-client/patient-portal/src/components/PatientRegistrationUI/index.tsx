import React, { useState } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Shield, 
  Heart, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Loader2,
  Globe,
  Lock,
  Users,
  FileText,
  Bell,
  Eye,
  EyeOff,
  Star,
  Award,
  Clock,
  HelpCircle
} from 'lucide-react'
import styles from './PatientRegistrationUI.module.css'

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  gender: string
  preferredLanguage: string
  pronouns: string
  
  // Address Information
  streetAddress: string
  addressLine2: string
  city: string
  stateProvince: string
  zipPostalCode: string
  country: string
  
  // Emergency Contact
  emergencyContactName: string
  emergencyRelationship: string
  emergencyPhoneNumber: string
  emergencyEmail: string
  emergencyContactAddress: string
  
  // Medical Information
  primaryInsurance: string
  insuranceMemberID: string
  allergies: string
  medications: string
  primaryPhysician: string
  
  // Account Security
  password: string
  confirmPassword: string
  securityQuestion: string
  securityAnswer: string
  twoFactorAuth: boolean
  
  // Privacy & Consent
  acceptTermsOfService: boolean
  acceptPrivacyPolicy: boolean
  acceptHIPAANotice: boolean
  communicationPreferences: string[]
  marketingOptIn: boolean
  appointmentReminders: boolean
}

const PatientRegistrationUI: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [demoMode, setDemoMode] = useState<'empty' | 'filled' | 'error' | 'success' | 'loading'>('empty')

  // Demo data for different states
  const demoData: FormData = {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phoneNumber: '+1 (555) 123-4567',
    dateOfBirth: '1985-06-15',
    gender: 'female',
    preferredLanguage: 'English',
    pronouns: 'she/her',
    streetAddress: '1234 Oak Street',
    addressLine2: 'Apt 2B',
    city: 'Springfield',
    stateProvince: 'IL',
    zipPostalCode: '62701',
    country: 'United States',
    emergencyContactName: 'Michael Johnson',
    emergencyRelationship: 'spouse',
    emergencyPhoneNumber: '+1 (555) 987-6543',
    emergencyEmail: 'michael.johnson@email.com',
    emergencyContactAddress: '1234 Oak Street, Apt 2B, Springfield, IL 62701',
    primaryInsurance: 'Blue Cross Blue Shield',
    insuranceMemberID: 'BCBS123456789',
    allergies: 'Penicillin, Peanuts',
    medications: 'Lisinopril 10mg daily',
    primaryPhysician: 'Dr. Emily Chen - Springfield Medical Group',
    password: 'SecurePass123!',
    confirmPassword: 'SecurePass123!',
    securityQuestion: 'What was your first pet\'s name?',
    securityAnswer: 'Buddy',
    twoFactorAuth: true,
    acceptTermsOfService: true,
    acceptPrivacyPolicy: true,
    acceptHIPAANotice: true,
    communicationPreferences: ['email', 'sms'],
    marketingOptIn: false,
    appointmentReminders: true
  }

  const handleDemoModeChange = (mode: typeof demoMode) => {
    setDemoMode(mode)
    if (mode === 'success') {
      setSubmitSuccess(true)
    } else {
      setSubmitSuccess(false)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
    }, 3000)
  }

  if (submitSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <CheckCircle className={styles.checkIcon} />
          </div>
          <h2 className={styles.successTitle}>Welcome to HealthFirst, Sarah!</h2>
          <p className={styles.successMessage}>
            Your account has been created successfully. We're excited to be part of your healthcare journey.
          </p>
          
          <div className={styles.successSteps}>
            <div className={styles.step}>
              <CheckCircle className={styles.stepIcon} />
              <span>Account created</span>
            </div>
            <div className={styles.step}>
              <Mail className={styles.stepIcon} />
              <span>Verification email sent to sarah.johnson@email.com</span>
            </div>
            <div className={styles.step}>
              <FileText className={styles.stepIcon} />
              <span>Complete your health profile</span>
            </div>
            <div className={styles.step}>
              <Calendar className={styles.stepIcon} />
              <span>Schedule your first appointment</span>
            </div>
          </div>

          <div className={styles.nextActions}>
            <button className={styles.primaryButton}>
              <Globe className={styles.buttonIcon} />
              Complete Health Profile
            </button>
            <button className={styles.secondaryButton}>
              <Calendar className={styles.buttonIcon} />
              Schedule Appointment
            </button>
          </div>

          <div className={styles.securityNote}>
            <Lock className={styles.securityIcon} />
            <span>Your information is protected with bank-level security and HIPAA compliance</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* Demo Mode Selector */}
      <div className={styles.demoSelector}>
        <h3>Demo Mode:</h3>
        <div className={styles.demoButtons}>
          <button 
            className={`${styles.demoButton} ${demoMode === 'empty' ? styles.active : ''}`}
            onClick={() => handleDemoModeChange('empty')}
          >
            Empty Form
          </button>
          <button 
            className={`${styles.demoButton} ${demoMode === 'filled' ? styles.active : ''}`}
            onClick={() => handleDemoModeChange('filled')}
          >
            Filled Form
          </button>
          <button 
            className={`${styles.demoButton} ${demoMode === 'error' ? styles.active : ''}`}
            onClick={() => handleDemoModeChange('error')}
          >
            Error State
          </button>
          <button 
            className={`${styles.demoButton} ${demoMode === 'loading' ? styles.active : ''}`}
            onClick={() => handleDemoModeChange('loading')}
          >
            Loading State
          </button>
        </div>
      </div>

      <div className={styles.registrationCard}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <Heart className={styles.logoIcon} />
            <h1 className={styles.logoText}>HealthFirst</h1>
          </div>
          <h2 className={styles.title}>Patient Registration</h2>
          <p className={styles.subtitle}>
            Welcome! We're here to help you access quality healthcare. Your information is secure and protected.
          </p>
          
          <div className={styles.trustIndicators}>
            <div className={styles.trustBadge}>
              <Lock className={styles.badgeIcon} />
              <span>HIPAA Compliant</span>
            </div>
            <div className={styles.trustBadge}>
              <Shield className={styles.badgeIcon} />
              <span>Bank-Level Security</span>
            </div>
            <div className={styles.trustBadge}>
              <Award className={styles.badgeIcon} />
              <span>Accredited Care</span>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>
          <div className={styles.progressSteps}>
            <span className={`${styles.step} ${currentStep >= 1 ? styles.active : ''}`}>
              Personal Info
            </span>
            <span className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`}>
              Address
            </span>
            <span className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
              Emergency Contact
            </span>
            <span className={`${styles.step} ${currentStep >= 4 ? styles.active : ''}`}>
              Medical Info
            </span>
            <span className={`${styles.step} ${currentStep >= 5 ? styles.active : ''}`}>
              Security
            </span>
            <span className={`${styles.step} ${currentStep >= 6 ? styles.active : ''}`}>
              Consent
            </span>
          </div>
        </div>

        {/* Form */}
        <form className={styles.form}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <User className={styles.sectionIcon} />
                Personal Information
              </h3>
              <p className={styles.sectionDescription}>
                Tell us about yourself so we can provide personalized care.
              </p>
              
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="firstName" className={styles.label}>
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className={`${styles.input} ${demoMode === 'error' && !demoData.firstName ? styles.error : ''} ${demoMode === 'filled' ? styles.valid : ''}`}
                    placeholder="Enter your first name"
                    value={demoMode === 'filled' ? demoData.firstName : ''}
                    readOnly={demoMode !== 'empty'}
                  />
                  {demoMode === 'error' && !demoData.firstName && (
                    <span className={styles.errorMessage}>
                      Please enter your first name so we can personalize your care
                    </span>
                  )}
                  {demoMode === 'filled' && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="lastName" className={styles.label}>
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className={`${styles.input} ${demoMode === 'filled' ? styles.valid : ''}`}
                    placeholder="Enter your last name"
                    value={demoMode === 'filled' ? demoData.lastName : ''}
                    readOnly={demoMode !== 'empty'}
                  />
                  {demoMode === 'filled' && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Email Address *
                </label>
                <div className={styles.inputContainer}>
                  <Mail className={styles.inputIcon} />
                  <input
                    id="email"
                    type="email"
                    className={`${styles.input} ${demoMode === 'error' ? styles.error : ''} ${demoMode === 'filled' ? styles.valid : ''}`}
                    placeholder="Enter your email address"
                    value={demoMode === 'filled' ? demoData.email : ''}
                    readOnly={demoMode !== 'empty'}
                  />
                  {demoMode === 'filled' && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>
                {demoMode === 'error' && (
                  <span className={styles.errorMessage}>
                    We need a valid email to send you important health information
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="phoneNumber" className={styles.label}>
                  Phone Number *
                </label>
                <div className={styles.inputContainer}>
                  <Phone className={styles.inputIcon} />
                  <input
                    id="phoneNumber"
                    type="tel"
                    className={`${styles.input} ${demoMode === 'filled' ? styles.valid : ''}`}
                    placeholder="+1 (555) 123-4567"
                    value={demoMode === 'filled' ? demoData.phoneNumber : ''}
                    readOnly={demoMode !== 'empty'}
                  />
                  {demoMode === 'filled' && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>
                <span className={styles.helpText}>
                  Your phone number helps us reach you for appointment confirmations
                </span>
              </div>

              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="dateOfBirth" className={styles.label}>
                    Date of Birth *
                  </label>
                  <div className={styles.inputContainer}>
                    <Calendar className={styles.inputIcon} />
                    <input
                      id="dateOfBirth"
                      type="date"
                      className={`${styles.input} ${demoMode === 'filled' ? styles.valid : ''}`}
                      value={demoMode === 'filled' ? demoData.dateOfBirth : ''}
                      readOnly={demoMode !== 'empty'}
                    />
                    {demoMode === 'filled' && (
                      <CheckCircle className={styles.validIcon} />
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="gender" className={styles.label}>
                    Gender Identity *
                  </label>
                  <select
                    id="gender"
                    className={`${styles.select} ${demoMode === 'filled' ? styles.valid : ''}`}
                    value={demoMode === 'filled' ? demoData.gender : ''}
                    disabled={demoMode !== 'empty'}
                  >
                    <option value="">Select gender identity</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {demoMode === 'filled' && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="preferredLanguage" className={styles.label}>
                    Preferred Language
                  </label>
                  <select
                    id="preferredLanguage"
                    className={styles.select}
                    value={demoMode === 'filled' ? demoData.preferredLanguage : ''}
                    disabled={demoMode !== 'empty'}
                  >
                    <option value="">Select language</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Chinese">Chinese</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="pronouns" className={styles.label}>
                    Pronouns
                  </label>
                  <input
                    id="pronouns"
                    type="text"
                    className={styles.input}
                    placeholder="e.g., she/her, they/them"
                    value={demoMode === 'filled' ? demoData.pronouns : ''}
                    readOnly={demoMode !== 'empty'}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Address Information */}
          {currentStep === 2 && (
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <MapPin className={styles.sectionIcon} />
                Address Information
              </h3>
              <p className={styles.sectionDescription}>
                Your address helps us provide location-specific care and services.
              </p>

              <div className={styles.field}>
                <label htmlFor="streetAddress" className={styles.label}>
                  Street Address *
                </label>
                <input
                  id="streetAddress"
                  type="text"
                  className={`${styles.input} ${demoMode === 'filled' ? styles.valid : ''}`}
                  placeholder="Enter your street address"
                  value={demoMode === 'filled' ? demoData.streetAddress : ''}
                  readOnly={demoMode !== 'empty'}
                />
                {demoMode === 'filled' && (
                  <CheckCircle className={styles.validIcon} />
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="addressLine2" className={styles.label}>
                  Address Line 2
                </label>
                <input
                  id="addressLine2"
                  type="text"
                  className={styles.input}
                  placeholder="Apartment, suite, unit, etc."
                  value={demoMode === 'filled' ? demoData.addressLine2 : ''}
                  readOnly={demoMode !== 'empty'}
                />
              </div>

              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="city" className={styles.label}>
                    City *
                  </label>
                  <input
                    id="city"
                    type="text"
                    className={`${styles.input} ${demoMode === 'filled' ? styles.valid : ''}`}
                    placeholder="Enter your city"
                    value={demoMode === 'filled' ? demoData.city : ''}
                    readOnly={demoMode !== 'empty'}
                  />
                  {demoMode === 'filled' && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="stateProvince" className={styles.label}>
                    State/Province *
                  </label>
                  <select
                    id="stateProvince"
                    className={`${styles.select} ${demoMode === 'filled' ? styles.valid : ''}`}
                    value={demoMode === 'filled' ? demoData.stateProvince : ''}
                    disabled={demoMode !== 'empty'}
                  >
                    <option value="">Select state</option>
                    <option value="IL">Illinois</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                  </select>
                  {demoMode === 'filled' && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="zipPostalCode" className={styles.label}>
                    ZIP/Postal Code *
                  </label>
                  <input
                    id="zipPostalCode"
                    type="text"
                    className={`${styles.input} ${demoMode === 'filled' ? styles.valid : ''}`}
                    placeholder="Enter ZIP code"
                    value={demoMode === 'filled' ? demoData.zipPostalCode : ''}
                    readOnly={demoMode !== 'empty'}
                  />
                  {demoMode === 'filled' && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="country" className={styles.label}>
                    Country *
                  </label>
                  <select
                    id="country"
                    className={`${styles.select} ${demoMode === 'filled' ? styles.valid : ''}`}
                    value={demoMode === 'filled' ? demoData.country : ''}
                    disabled={demoMode !== 'empty'}
                  >
                    <option value="">Select country</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                  </select>
                  {demoMode === 'filled' && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Emergency Contact */}
          {currentStep === 3 && (
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <Users className={styles.sectionIcon} />
                Emergency Contact
              </h3>
              <p className={styles.sectionDescription}>
                This information will only be used in case of emergency. We encourage you to provide this information for your safety.
              </p>

              <div className={styles.field}>
                <label htmlFor="emergencyContactName" className={styles.label}>
                  Emergency Contact Name
                </label>
                <input
                  id="emergencyContactName"
                  type="text"
                  className={`${styles.input} ${demoMode === 'filled' ? styles.valid : ''}`}
                  placeholder="Enter full name"
                  value={demoMode === 'filled' ? demoData.emergencyContactName : ''}
                  readOnly={demoMode !== 'empty'}
                />
                {demoMode === 'filled' && (
                  <CheckCircle className={styles.validIcon} />
                )}
              </div>

              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="emergencyRelationship" className={styles.label}>
                    Relationship
                  </label>
                  <select
                    id="emergencyRelationship"
                    className={styles.select}
                    value={demoMode === 'filled' ? demoData.emergencyRelationship : ''}
                    disabled={demoMode !== 'empty'}
                  >
                    <option value="">Select relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="parent">Parent</option>
                    <option value="child">Child</option>
                    <option value="sibling">Sibling</option>
                    <option value="friend">Friend</option>
                    <option value="caregiver">Caregiver</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="emergencyPhoneNumber" className={styles.label}>
                    Emergency Phone Number
                  </label>
                  <div className={styles.inputContainer}>
                    <Phone className={styles.inputIcon} />
                    <input
                      id="emergencyPhoneNumber"
                      type="tel"
                      className={`${styles.input} ${demoMode === 'filled' ? styles.valid : ''}`}
                      placeholder="+1 (555) 987-6543"
                      value={demoMode === 'filled' ? demoData.emergencyPhoneNumber : ''}
                      readOnly={demoMode !== 'empty'}
                    />
                    {demoMode === 'filled' && (
                      <CheckCircle className={styles.validIcon} />
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="emergencyEmail" className={styles.label}>
                  Emergency Email
                </label>
                <div className={styles.inputContainer}>
                  <Mail className={styles.inputIcon} />
                  <input
                    id="emergencyEmail"
                    type="email"
                    className={styles.input}
                    placeholder="Enter emergency contact email"
                    value={demoMode === 'filled' ? demoData.emergencyEmail : ''}
                    readOnly={demoMode !== 'empty'}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Medical Information */}
          {currentStep === 4 && (
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <FileText className={styles.sectionIcon} />
                Medical Information
              </h3>
              <p className={styles.sectionDescription}>
                This information helps us provide better care. All fields are optional but helpful.
              </p>

              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="primaryInsurance" className={styles.label}>
                    Primary Insurance
                  </label>
                  <input
                    id="primaryInsurance"
                    type="text"
                    className={styles.input}
                    placeholder="Insurance provider name"
                    value={demoMode === 'filled' ? demoData.primaryInsurance : ''}
                    readOnly={demoMode !== 'empty'}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="insuranceMemberID" className={styles.label}>
                    Member ID
                  </label>
                  <input
                    id="insuranceMemberID"
                    type="text"
                    className={styles.input}
                    placeholder="Insurance member ID"
                    value={demoMode === 'filled' ? demoData.insuranceMemberID : ''}
                    readOnly={demoMode !== 'empty'}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="allergies" className={styles.label}>
                  Allergies
                </label>
                <textarea
                  id="allergies"
                  className={styles.textarea}
                  placeholder="List any major allergies (medications, foods, etc.)"
                  value={demoMode === 'filled' ? demoData.allergies : ''}
                  readOnly={demoMode !== 'empty'}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="medications" className={styles.label}>
                  Current Medications
                </label>
                <textarea
                  id="medications"
                  className={styles.textarea}
                  placeholder="List current medications and dosages"
                  value={demoMode === 'filled' ? demoData.medications : ''}
                  readOnly={demoMode !== 'empty'}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="primaryPhysician" className={styles.label}>
                  Primary Physician
                </label>
                <input
                  id="primaryPhysician"
                  type="text"
                  className={styles.input}
                  placeholder="Doctor name and practice"
                  value={demoMode === 'filled' ? demoData.primaryPhysician : ''}
                  readOnly={demoMode !== 'empty'}
                />
              </div>
            </div>
          )}

          {/* Step 5: Account Security */}
          {currentStep === 5 && (
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <Shield className={styles.sectionIcon} />
                Account Security
              </h3>
              <p className={styles.sectionDescription}>
                Create a secure password to protect your health information.
              </p>

              <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>
                  Password *
                </label>
                <div className={styles.inputContainer}>
                  <Shield className={styles.inputIcon} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`${styles.input} ${demoMode === 'filled' ? styles.valid : ''}`}
                    placeholder="Create a strong password"
                    value={demoMode === 'filled' ? demoData.password : ''}
                    readOnly={demoMode !== 'empty'}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={demoMode !== 'empty'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {demoMode === 'filled' && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>
                <span className={styles.helpText}>
                  Must be at least 8 characters with uppercase, lowercase, number, and special character
                </span>
              </div>

              <div className={styles.field}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirm Password *
                </label>
                <div className={styles.inputContainer}>
                  <Shield className={styles.inputIcon} />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`${styles.input} ${demoMode === 'filled' ? styles.valid : ''}`}
                    placeholder="Confirm your password"
                    value={demoMode === 'filled' ? demoData.confirmPassword : ''}
                    readOnly={demoMode !== 'empty'}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={demoMode !== 'empty'}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {demoMode === 'filled' && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="securityQuestion" className={styles.label}>
                    Security Question *
                  </label>
                  <select
                    id="securityQuestion"
                    className={`${styles.select} ${demoMode === 'filled' ? styles.valid : ''}`}
                    value={demoMode === 'filled' ? demoData.securityQuestion : ''}
                    disabled={demoMode !== 'empty'}
                  >
                    <option value="">Select a security question</option>
                    <option value="What was your first pet's name?">What was your first pet's name?</option>
                    <option value="What city were you born in?">What city were you born in?</option>
                    <option value="What was your mother's maiden name?">What was your mother's maiden name?</option>
                    <option value="What was your first car?">What was your first car?</option>
                  </select>
                  {demoMode === 'filled' && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="securityAnswer" className={styles.label}>
                    Security Answer *
                  </label>
                  <input
                    id="securityAnswer"
                    type="text"
                    className={`${styles.input} ${demoMode === 'filled' ? styles.valid : ''}`}
                    placeholder="Enter your answer"
                    value={demoMode === 'filled' ? demoData.securityAnswer : ''}
                    readOnly={demoMode !== 'empty'}
                  />
                  {demoMode === 'filled' && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={demoMode === 'filled' ? demoData.twoFactorAuth : false}
                    disabled={demoMode !== 'empty'}
                  />
                  <span className={styles.checkboxCustom}></span>
                  Enable two-factor authentication (recommended)
                </label>
                <span className={styles.helpText}>
                  Receive a code via SMS or email for additional security
                </span>
              </div>
            </div>
          )}

          {/* Step 6: Privacy & Consent */}
          {currentStep === 6 && (
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <Lock className={styles.sectionIcon} />
                Privacy & Consent
              </h3>
              <p className={styles.sectionDescription}>
                We take your privacy seriously. Please review and accept our terms.
              </p>

              <div className={styles.consentSection}>
                <div className={styles.consentItem}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={demoMode === 'filled' ? demoData.acceptTermsOfService : false}
                      disabled={demoMode !== 'empty'}
                    />
                    <span className={styles.checkboxCustom}></span>
                    I accept the <button type="button" className={styles.linkButton}>Terms of Service</button> *
                  </label>
                </div>

                <div className={styles.consentItem}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={demoMode === 'filled' ? demoData.acceptPrivacyPolicy : false}
                      disabled={demoMode !== 'empty'}
                    />
                    <span className={styles.checkboxCustom}></span>
                    I accept the <button type="button" className={styles.linkButton}>Privacy Policy</button> *
                  </label>
                </div>

                <div className={styles.consentItem}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={demoMode === 'filled' ? demoData.acceptHIPAANotice : false}
                      disabled={demoMode !== 'empty'}
                    />
                    <span className={styles.checkboxCustom}></span>
                    I acknowledge receipt of the <button type="button" className={styles.linkButton}>HIPAA Notice</button> *
                  </label>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Communication Preferences</label>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={demoMode === 'filled' ? demoData.communicationPreferences.includes('email') : false}
                      disabled={demoMode !== 'empty'}
                    />
                    <span className={styles.checkboxCustom}></span>
                    Email notifications
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={demoMode === 'filled' ? demoData.communicationPreferences.includes('sms') : false}
                      disabled={demoMode !== 'empty'}
                    />
                    <span className={styles.checkboxCustom}></span>
                    SMS text messages
                  </label>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={demoMode === 'filled' ? demoData.appointmentReminders : false}
                    disabled={demoMode !== 'empty'}
                  />
                  <span className={styles.checkboxCustom}></span>
                  Send appointment reminders (recommended)
                </label>
              </div>

              <div className={styles.field}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={demoMode === 'filled' ? demoData.marketingOptIn : false}
                    disabled={demoMode !== 'empty'}
                  />
                  <span className={styles.checkboxCustom}></span>
                  Receive health tips and wellness information (optional)
                </label>
              </div>
            </div>
          )}

          {/* Error Display */}
          {demoMode === 'error' && (
            <div className={styles.errorBanner}>
              <div className={styles.errorContent}>
                <AlertCircle className={styles.errorIcon} />
                <div className={styles.errorText}>
                  <strong>Please correct the following errors:</strong>
                  <ul>
                    <li>First name is required</li>
                    <li>Please enter a valid email address</li>
                    <li>Phone number must be in a valid format</li>
                    <li>You must be 13 or older to register</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {demoMode === 'loading' && (
            <div className={styles.loadingBanner}>
              <div className={styles.loadingContent}>
                <Loader2 className={styles.loadingIcon} />
                <div className={styles.loadingText}>
                  <strong>Creating your account...</strong>
                  <p>Please wait while we securely process your information.</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={styles.navigation}>
            {currentStep > 1 && (
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={demoMode === 'loading'}
              >
                Previous
              </button>
            )}
            
            {currentStep < 6 ? (
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={demoMode === 'loading'}
              >
                Next
                <ArrowRight className={styles.buttonIcon} />
              </button>
            ) : (
              <button
                type="button"
                className={`${styles.primaryButton} ${demoMode === 'loading' ? styles.loading : ''}`}
                onClick={handleSubmit}
                disabled={demoMode === 'loading'}
              >
                {demoMode === 'loading' ? (
                  <>
                    <Loader2 className={styles.spinner} />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className={styles.buttonIcon} />
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Already have an account? <button className={styles.linkButton}>Sign In</button>
          </p>
          <p className={styles.securityNote}>
            🔒 Your information is protected with bank-level security and HIPAA compliance
          </p>
        </div>
      </div>
    </div>
  )
}

export default PatientRegistrationUI 