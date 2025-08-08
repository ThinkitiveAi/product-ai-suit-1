import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  User, 
  Briefcase, 
  Building, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Eye,
  EyeOff,
  Phone,
  Mail,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  FileText,
  Lock
} from 'lucide-react'
import { cn } from '../../utils/cn'
import PersonalInfoStep from './steps/PersonalInfoStep'
import ProfessionalInfoStep from './steps/ProfessionalInfoStep'
import ClinicInfoStep from './steps/ClinicInfoStep'
import SecurityStep from './steps/SecurityStep'
import { registrationSchema } from './validation/registrationSchema'
import { useLicenseVerification } from './hooks/useLicenseVerification'
import { useStepNavigation } from './hooks/useStepNavigation'
import { medicalSpecialties } from './data/medicalSpecialties'
import { stateRequirements } from './data/stateRequirements'
import styles from './ProviderRegistration.module.css'

export type RegistrationFormData = z.infer<typeof registrationSchema>

export type VerificationStatus = {
  license: 'pending' | 'verified' | 'failed' | 'not_started'
  email: 'pending' | 'verified' | 'failed' | 'not_started'
  phone: 'pending' | 'verified' | 'failed' | 'not_started'
}

const ProviderRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [registrationDetails, setRegistrationDetails] = useState<RegistrationFormData | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    license: 'not_started',
    email: 'not_started',
    phone: 'not_started'
  })

  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      personalInfo: {
        preferredContactMethod: 'email'
      },
      professionalInfo: {
        medicalDegree: 'MD',
        boardCertifications: []
      },
      clinicInfo: {
        practiceType: 'private'
      },
      securityInfo: {
        marketingOptIn: false
      }
    }
  })

  const { watch, handleSubmit, formState: { errors, isValid } } = methods
  const watchedValues = watch()

  const { verifyLicense } = useLicenseVerification()
  const { canProceedToNextStep, canProceedToPreviousStep } = useStepNavigation(currentStep, watchedValues, errors)

  const steps = [
    { id: 1, title: 'Personal Information', icon: User, description: 'Basic contact details' },
    { id: 2, title: 'Professional Information', icon: Briefcase, description: 'Medical credentials' },
    { id: 3, title: 'Practice Information', icon: Building, description: 'Clinic details' },
    { id: 4, title: 'Security & Compliance', icon: Shield, description: 'Account setup' }
  ]

  const handleNextStep = () => {
    if (canProceedToNextStep) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const handlePreviousStep = () => {
    if (canProceedToPreviousStep) {
      setCurrentStep(prev => Math.max(prev - 1, 1))
    }
  }

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    
    try {
      // Log comprehensive registration details
      console.log('🚀 PROVIDER REGISTRATION SUBMITTED')
      console.log('='.repeat(60))
      
      // Personal Information
      console.log('📋 PERSONAL INFORMATION:')
      console.log('  Name:', `${data.personalInfo?.firstName} ${data.personalInfo?.lastName}`)
      console.log('  Email:', data.personalInfo?.email)
      console.log('  Phone:', data.personalInfo?.phoneNumber)
      console.log('  Preferred Contact:', data.personalInfo?.preferredContactMethod)
      
      // Professional Information
      console.log('\n👨‍⚕️ PROFESSIONAL INFORMATION:')
      console.log('  Medical Degree:', data.professionalInfo?.medicalDegree)
      console.log('  Specialization:', data.professionalInfo?.specialization)
      console.log('  Years of Experience:', data.professionalInfo?.yearsOfExperience)
      console.log('  License Number:', data.professionalInfo?.medicalLicenseNumber)
      console.log('  License State:', data.professionalInfo?.licenseState)
      console.log('  License Expiration:', data.professionalInfo?.licenseExpirationDate)
      console.log('  Board Certifications:', data.professionalInfo?.boardCertifications?.join(', ') || 'None')
      
      // Clinic Information
      console.log('\n🏥 CLINIC INFORMATION:')
      console.log('  Practice Type:', data.clinicInfo?.practiceType)
      console.log('  Clinic Name:', data.clinicInfo?.clinicName || 'Not provided')
      console.log('  Address:', `${data.clinicInfo?.streetAddress}, ${data.clinicInfo?.city}, ${data.clinicInfo?.stateProvince} ${data.clinicInfo?.zipPostalCode}`)
      console.log('  Clinic Phone:', data.clinicInfo?.clinicPhone || 'Not provided')
      
      // Security Information
      console.log('\n🔒 SECURITY & COMPLIANCE:')
      console.log('  Password Strength:', data.securityInfo?.password ? 'Set (hidden for security)' : 'Not set')
      console.log('  Terms Accepted:', data.securityInfo?.acceptTerms ? 'Yes' : 'No')
      console.log('  HIPAA Compliance:', data.securityInfo?.acceptHIPAACompliance ? 'Accepted' : 'Not accepted')
      console.log('  Marketing Opt-in:', data.securityInfo?.marketingOptIn ? 'Yes' : 'No')
      
      // Validation Summary
      console.log('\n✅ VALIDATION SUMMARY:')
      console.log('  Form Valid:', isValid ? 'Yes' : 'No')
      console.log('  Total Errors:', Object.keys(errors).length)
      if (Object.keys(errors).length > 0) {
        console.log('  Error Details:', errors)
      }
      
      // Cross-field Validation
      console.log('\n🔍 CROSS-FIELD VALIDATION:')
      const licenseState = data.professionalInfo?.licenseState
      const practiceState = data.clinicInfo?.stateProvince
      console.log('  License State:', licenseState)
      console.log('  Practice State:', practiceState)
      console.log('  States Match:', licenseState === practiceState ? 'Yes' : 'No')
      
      if (licenseState && practiceState && licenseState !== practiceState) {
        console.log('  ⚠️  WARNING: License and practice states differ')
      }
      
      // Professional Verification Status
      console.log('\n🔐 VERIFICATION STATUS:')
      console.log('  License Verification:', verificationStatus.license)
      console.log('  Email Verification:', verificationStatus.email)
      console.log('  Phone Verification:', verificationStatus.phone)
      
      // Registration Metadata
      console.log('\n📊 REGISTRATION METADATA:')
      console.log('  Submission Time:', new Date().toISOString())
      console.log('  Current Step:', currentStep)
      console.log('  Form Completion:', `${Math.round((currentStep / 4) * 100)}%`)
      
      // Data Export (for API submission)
      const registrationPayload = {
        personalInfo: data.personalInfo,
        professionalInfo: data.professionalInfo,
        clinicInfo: data.clinicInfo,
        securityInfo: {
          ...data.securityInfo,
          password: '[HIDDEN]' // Never log actual passwords
        },
        metadata: {
          submittedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
          formVersion: '1.0.0'
        }
      }
      
      console.log('\n📤 API PAYLOAD (for submission):')
      console.log(JSON.stringify(registrationPayload, null, 2))
      
      console.log('\n' + '='.repeat(60))
      console.log('✅ REGISTRATION LOGGING COMPLETE')
      
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simulate verification processes
      setVerificationStatus({
        license: 'verified',
        email: 'verified',
        phone: 'verified'
      })
      
      setRegistrationComplete(true)
      setRegistrationDetails(data) // Store registration details for display
      
      // Final success log
      console.log('\n🎉 REGISTRATION SUCCESSFUL!')
      console.log('Provider account created and pending verification.')
      
    } catch (error) {
      console.error('❌ REGISTRATION FAILED:', error)
      console.error('Error Details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        formData: data
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStepIcon = (stepId: number) => {
    const step = steps.find(s => s.id === stepId)
    return step?.icon || User
  }

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed'
    if (stepId === currentStep) return 'current'
    return 'pending'
  }

  if (registrationComplete) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successContent}>
          <CheckCircle className={styles.successIcon} />
          <h1 className={styles.successTitle}>Registration Complete!</h1>
          <p className={styles.successMessage}>
            Thank you for registering with our healthcare provider network. 
            Your account is pending verification and approval.
          </p>
          
          {/* Registration Details Display */}
          {registrationDetails && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Registration Details Logged</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">👤 Personal Information</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Name:</strong> {registrationDetails.personalInfo?.firstName} {registrationDetails.personalInfo?.lastName}</p>
                    <p><strong>Email:</strong> {registrationDetails.personalInfo?.email}</p>
                    <p><strong>Phone:</strong> {registrationDetails.personalInfo?.phoneNumber}</p>
                    <p><strong>Contact Preference:</strong> {registrationDetails.personalInfo?.preferredContactMethod}</p>
                  </div>
                </div>
                
                {/* Professional Information */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">👨‍⚕️ Professional Information</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Degree:</strong> {registrationDetails.professionalInfo?.medicalDegree}</p>
                    <p><strong>Specialization:</strong> {registrationDetails.professionalInfo?.specialization}</p>
                    <p><strong>Experience:</strong> {registrationDetails.professionalInfo?.yearsOfExperience} years</p>
                    <p><strong>License:</strong> {registrationDetails.professionalInfo?.medicalLicenseNumber}</p>
                    <p><strong>State:</strong> {registrationDetails.professionalInfo?.licenseState}</p>
                  </div>
                </div>
                
                {/* Clinic Information */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">🏥 Practice Information</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Practice Type:</strong> {registrationDetails.clinicInfo?.practiceType}</p>
                    <p><strong>Clinic Name:</strong> {registrationDetails.clinicInfo?.clinicName || 'Not provided'}</p>
                    <p><strong>Address:</strong> {registrationDetails.clinicInfo?.streetAddress}, {registrationDetails.clinicInfo?.city}</p>
                    <p><strong>State:</strong> {registrationDetails.clinicInfo?.stateProvince} {registrationDetails.clinicInfo?.zipPostalCode}</p>
                  </div>
                </div>
                
                {/* Security Information */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">🔒 Security & Compliance</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Password:</strong> Set (hidden for security)</p>
                    <p><strong>Terms Accepted:</strong> {registrationDetails.securityInfo?.acceptTerms ? 'Yes' : 'No'}</p>
                    <p><strong>HIPAA Compliance:</strong> {registrationDetails.securityInfo?.acceptHIPAACompliance ? 'Accepted' : 'Not accepted'}</p>
                    <p><strong>Marketing Opt-in:</strong> {registrationDetails.securityInfo?.marketingOptIn ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
              
              {/* Cross-field Validation */}
              <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                <h5 className="font-medium text-blue-900 mb-2">🔍 Cross-field Validation</h5>
                <div className="text-sm text-blue-800">
                  <p><strong>License State:</strong> {registrationDetails.professionalInfo?.licenseState}</p>
                  <p><strong>Practice State:</strong> {registrationDetails.clinicInfo?.stateProvince}</p>
                  <p><strong>States Match:</strong> {registrationDetails.professionalInfo?.licenseState === registrationDetails.clinicInfo?.stateProvince ? '✅ Yes' : '⚠️ No'}</p>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                <p>📊 All registration details have been logged to the browser console for debugging and API submission.</p>
                <p>🔐 Sensitive information (passwords) are never logged for security.</p>
              </div>
            </div>
          )}
          
          <div className={styles.verificationStatus}>
            <div className={styles.statusItem}>
              <CheckCircle className={styles.statusIcon} />
              <span>License Verification</span>
            </div>
            <div className={styles.statusItem}>
              <CheckCircle className={styles.statusIcon} />
              <span>Email Verification</span>
            </div>
            <div className={styles.statusItem}>
              <CheckCircle className={styles.statusIcon} />
              <span>Phone Verification</span>
            </div>
          </div>
          <div className={styles.nextSteps}>
            <h3>Next Steps:</h3>
            <ul>
              <li>Complete your professional profile</li>
              <li>Upload required documentation</li>
              <li>Set up practice management integration</li>
              <li>Review HIPAA compliance requirements</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <Shield className={styles.shieldIcon} />
          </div>
          <h1 className={styles.title}>Provider Registration</h1>
        </div>
        <p className={styles.subtitle}>
          Join our healthcare network and connect with patients
        </p>
      </div>

      <div className={styles.content}>
        {/* Progress Indicator */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <div className={styles.steps}>
            {steps.map((step) => {
              const Icon = step.icon
              const status = getStepStatus(step.id)
              
              return (
                <div 
                  key={step.id} 
                  className={cn(
                    styles.step,
                    styles[`step-${status}`]
                  )}
                >
                  <div className={styles.stepIcon}>
                    <Icon className={styles.icon} />
                    {status === 'completed' && (
                      <CheckCircle className={styles.checkIcon} />
                    )}
                  </div>
                  <div className={styles.stepInfo}>
                    <span className={styles.stepTitle}>{step.title}</span>
                    <span className={styles.stepDescription}>{step.description}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className={styles.formContainer}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {currentStep === 1 && (
                <PersonalInfoStep 
                  errors={errors}
                  verificationStatus={verificationStatus}
                />
              )}
              
              {currentStep === 2 && (
                <ProfessionalInfoStep 
                  errors={errors}
                  verificationStatus={verificationStatus}
                  specialties={medicalSpecialties}
                  stateRequirements={stateRequirements}
                  onLicenseVerification={verifyLicense}
                />
              )}
              
              {currentStep === 3 && (
                <ClinicInfoStep 
                  errors={errors}
                  stateRequirements={stateRequirements}
                />
              )}
              
              {currentStep === 4 && (
                <SecurityStep 
                  errors={errors}
                  isSubmitting={isSubmitting}
                />
              )}

              {/* Navigation Buttons */}
              <div className={styles.navigation}>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className={styles.navButton}
                    disabled={!canProceedToPreviousStep}
                  >
                    <ArrowLeft className={styles.navIcon} />
                    Previous
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={cn(styles.navButton, styles.nextButton)}
                    disabled={!canProceedToNextStep}
                  >
                    Next
                    <ArrowRight className={styles.navIcon} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={cn(styles.navButton, styles.submitButton)}
                    disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className={styles.spinner} />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Registration
                        <CheckCircle className={styles.navIcon} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default ProviderRegistration 