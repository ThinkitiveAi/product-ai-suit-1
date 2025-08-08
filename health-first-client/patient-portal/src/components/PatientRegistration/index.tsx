import React, { useState, useEffect, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Shield, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  Heart,
  ArrowRight,
  Loader2
} from 'lucide-react'
import { validationSchemas } from './validationSchemas'
import { useFormValidation } from './hooks/useFormValidation'
import { useFormPersistence } from './hooks/useFormPersistence'
import { formatPhoneNumber, formatDate, getPasswordStrength } from './utils'
import styles from './PatientRegistration.module.css'

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say'
  
  // Address Information
  streetAddress: string
  city: string
  stateProvince: string
  zipPostalCode: string
  
  // Emergency Contact
  emergencyContactName: string
  emergencyRelationship: string
  emergencyPhoneNumber: string
  
  // Account Security
  password: string
  confirmPassword: string
}

interface ValidationError {
  type: 'field' | 'form' | 'network'
  message: string
  field?: string
}

const PatientRegistration: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formError, setFormError] = useState<ValidationError | null>(null)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
    trigger,
    reset
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: 'prefer-not-to-say',
      streetAddress: '',
      city: '',
      stateProvince: '',
      zipPostalCode: '',
      emergencyContactName: '',
      emergencyRelationship: '',
      emergencyPhoneNumber: '',
      password: '',
      confirmPassword: ''
    }
  })

  const watchedValues = watch()
  const { validateField, validateForm } = useFormValidation(validationSchemas)
  const { saveFormData, loadFormData, clearFormData } = useFormPersistence('patient-registration')

  // Auto-save form data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDirty) {
        saveFormData(watchedValues)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [watchedValues, isDirty, saveFormData])

  // Load saved form data on mount
  useEffect(() => {
    const savedData = loadFormData()
    if (savedData) {
      Object.keys(savedData).forEach(key => {
        setValue(key as keyof FormData, savedData[key])
      })
    }
  }, [loadFormData, setValue])

  // Password strength calculation
  useEffect(() => {
    const password = watchedValues.password
    if (password) {
      setPasswordStrength(getPasswordStrength(password))
    }
  }, [watchedValues.password])

  // Phone number formatting
  const handlePhoneChange = useCallback((value: string, field: 'phoneNumber' | 'emergencyPhoneNumber') => {
    const formatted = formatPhoneNumber(value)
    setValue(field, formatted)
  }, [setValue])

  // Date formatting
  const handleDateChange = useCallback((value: string) => {
    const formatted = formatDate(value)
    setValue('dateOfBirth', formatted)
  }, [setValue])

  // Form submission
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setFormError(null)

    try {
      // Validate form before submission
      const formValidation = await validateForm(data)
      if (!formValidation.isValid) {
        setFormError({
          type: 'form',
          message: 'Please correct the errors above before submitting.'
        })
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate different error scenarios
      if (data.email === 'existing@example.com') {
        throw new Error('Email already registered')
      }

      if (data.phoneNumber === '+1234567890') {
        throw new Error('Phone number already in use')
      }

      // Success case
      setSubmitSuccess(true)
      clearFormData()
      
      // Redirect after success animation
      setTimeout(() => {
        console.log('Redirecting to dashboard...')
      }, 3000)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      
      if (errorMessage.includes('Email already registered')) {
        setFormError({
          type: 'field',
          message: 'This email is already registered. Please use a different email or try logging in.',
          field: 'email'
        })
      } else if (errorMessage.includes('Phone number already in use')) {
        setFormError({
          type: 'field',
          message: 'This phone number is already registered. Please use a different number.',
          field: 'phoneNumber'
        })
      } else {
        setFormError({
          type: 'network',
          message: 'Connection error. Please check your internet connection and try again.'
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (submitSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <CheckCircle className={styles.checkIcon} />
          </div>
          <h2 className={styles.successTitle}>Registration Successful!</h2>
          <p className={styles.successMessage}>
            Welcome to HealthFirst! Your account has been created successfully.
          </p>
          <div className={styles.successSteps}>
            <div className={styles.step}>
              <CheckCircle className={styles.stepIcon} />
              <span>Account created</span>
            </div>
            <div className={styles.step}>
              <Mail className={styles.stepIcon} />
              <span>Verification email sent</span>
            </div>
            <div className={styles.step}>
              <ArrowRight className={styles.stepIcon} />
              <span>Redirecting to dashboard...</span>
            </div>
          </div>
          <div className={styles.loadingSpinner}>
            <Loader2 className={styles.spinner} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.registrationCard}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <Heart className={styles.logoIcon} />
            <h1 className={styles.logoText}>HealthFirst</h1>
          </div>
          <h2 className={styles.title}>Patient Registration</h2>
          <p className={styles.subtitle}>
            Create your account to access your healthcare information
          </p>
        </div>

        {/* Progress Indicator */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(currentStep / 4) * 100}%` }}
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
              Security
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <User className={styles.sectionIcon} />
                Personal Information
              </h3>
              
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="firstName" className={styles.label}>
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className={`${styles.input} ${errors.firstName ? styles.error : ''} ${!errors.firstName && watchedValues.firstName ? styles.valid : ''}`}
                    placeholder="Enter your first name"
                    {...register('firstName', {
                      required: 'First name is required',
                      minLength: { value: 2, message: 'First name must be at least 2 characters' },
                      maxLength: { value: 50, message: 'First name must be less than 50 characters' },
                      pattern: { value: /^[A-Za-z\s]+$/, message: 'First name can only contain letters' }
                    })}
                  />
                  {errors.firstName && (
                    <span className={styles.errorMessage}>{errors.firstName.message}</span>
                  )}
                  {!errors.firstName && watchedValues.firstName && (
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
                    className={`${styles.input} ${errors.lastName ? styles.error : ''} ${!errors.lastName && watchedValues.lastName ? styles.valid : ''}`}
                    placeholder="Enter your last name"
                    {...register('lastName', {
                      required: 'Last name is required',
                      minLength: { value: 2, message: 'Last name must be at least 2 characters' },
                      maxLength: { value: 50, message: 'Last name must be less than 50 characters' },
                      pattern: { value: /^[A-Za-z\s]+$/, message: 'Last name can only contain letters' }
                    })}
                  />
                  {errors.lastName && (
                    <span className={styles.errorMessage}>{errors.lastName.message}</span>
                  )}
                  {!errors.lastName && watchedValues.lastName && (
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
                    className={`${styles.input} ${errors.email ? styles.error : ''} ${!errors.email && watchedValues.email ? styles.valid : ''}`}
                    placeholder="Enter your email address"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address'
                      }
                    })}
                  />
                  {!errors.email && watchedValues.email && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>
                {errors.email && (
                  <span className={styles.errorMessage}>{errors.email.message}</span>
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
                    className={`${styles.input} ${errors.phoneNumber ? styles.error : ''} ${!errors.phoneNumber && watchedValues.phoneNumber ? styles.valid : ''}`}
                    placeholder="+1 (555) 123-4567"
                    value={watchedValues.phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value, 'phoneNumber')}
                    {...register('phoneNumber', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^\+?[1-9]\d{1,14}$/,
                        message: 'Please enter a valid phone number'
                      }
                    })}
                  />
                  {!errors.phoneNumber && watchedValues.phoneNumber && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>
                {errors.phoneNumber && (
                  <span className={styles.errorMessage}>{errors.phoneNumber.message}</span>
                )}
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
                      className={`${styles.input} ${errors.dateOfBirth ? styles.error : ''} ${!errors.dateOfBirth && watchedValues.dateOfBirth ? styles.valid : ''}`}
                      {...register('dateOfBirth', {
                        required: 'Date of birth is required',
                        validate: (value) => {
                          const today = new Date()
                          const birthDate = new Date(value)
                          const age = today.getFullYear() - birthDate.getFullYear()
                          const monthDiff = today.getMonth() - birthDate.getMonth()
                          
                          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                            age--
                          }
                          
                          if (age < 13) {
                            return 'You must be at least 13 years old to register'
                          }
                          
                          if (birthDate > today) {
                            return 'Date of birth cannot be in the future'
                          }
                          
                          return true
                        }
                      })}
                    />
                    {!errors.dateOfBirth && watchedValues.dateOfBirth && (
                      <CheckCircle className={styles.validIcon} />
                    )}
                  </div>
                  {errors.dateOfBirth && (
                    <span className={styles.errorMessage}>{errors.dateOfBirth.message}</span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="gender" className={styles.label}>
                    Gender *
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: 'Gender is required' }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`${styles.select} ${errors.gender ? styles.error : ''} ${!errors.gender && watchedValues.gender ? styles.valid : ''}`}
                      >
                        <option value="prefer-not-to-say">Prefer not to say</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    )}
                  />
                  {errors.gender && (
                    <span className={styles.errorMessage}>{errors.gender.message}</span>
                  )}
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

              <div className={styles.field}>
                <label htmlFor="streetAddress" className={styles.label}>
                  Street Address *
                </label>
                <input
                  id="streetAddress"
                  type="text"
                  className={`${styles.input} ${errors.streetAddress ? styles.error : ''} ${!errors.streetAddress && watchedValues.streetAddress ? styles.valid : ''}`}
                  placeholder="Enter your street address"
                  {...register('streetAddress', {
                    required: 'Street address is required',
                    maxLength: { value: 200, message: 'Address must be less than 200 characters' }
                  })}
                />
                {errors.streetAddress && (
                  <span className={styles.errorMessage}>{errors.streetAddress.message}</span>
                )}
                {!errors.streetAddress && watchedValues.streetAddress && (
                  <CheckCircle className={styles.validIcon} />
                )}
              </div>

              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="city" className={styles.label}>
                    City *
                  </label>
                  <input
                    id="city"
                    type="text"
                    className={`${styles.input} ${errors.city ? styles.error : ''} ${!errors.city && watchedValues.city ? styles.valid : ''}`}
                    placeholder="Enter your city"
                    {...register('city', {
                      required: 'City is required',
                      maxLength: { value: 100, message: 'City must be less than 100 characters' },
                      pattern: { value: /^[A-Za-z\s]+$/, message: 'City can only contain letters and spaces' }
                    })}
                  />
                  {errors.city && (
                    <span className={styles.errorMessage}>{errors.city.message}</span>
                  )}
                  {!errors.city && watchedValues.city && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="stateProvince" className={styles.label}>
                    State/Province *
                  </label>
                  <input
                    id="stateProvince"
                    type="text"
                    className={`${styles.input} ${errors.stateProvince ? styles.error : ''} ${!errors.stateProvince && watchedValues.stateProvince ? styles.valid : ''}`}
                    placeholder="Enter your state or province"
                    {...register('stateProvince', {
                      required: 'State/Province is required',
                      maxLength: { value: 50, message: 'State/Province must be less than 50 characters' }
                    })}
                  />
                  {errors.stateProvince && (
                    <span className={styles.errorMessage}>{errors.stateProvince.message}</span>
                  )}
                  {!errors.stateProvince && watchedValues.stateProvince && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="zipPostalCode" className={styles.label}>
                  ZIP/Postal Code *
                </label>
                <input
                  id="zipPostalCode"
                  type="text"
                  className={`${styles.input} ${errors.zipPostalCode ? styles.error : ''} ${!errors.zipPostalCode && watchedValues.zipPostalCode ? styles.valid : ''}`}
                  placeholder="Enter your ZIP or postal code"
                  {...register('zipPostalCode', {
                    required: 'ZIP/Postal code is required',
                    pattern: {
                      value: /^[A-Za-z0-9\s-]+$/,
                      message: 'Please enter a valid ZIP or postal code'
                    }
                  })}
                />
                {errors.zipPostalCode && (
                  <span className={styles.errorMessage}>{errors.zipPostalCode.message}</span>
                )}
                {!errors.zipPostalCode && watchedValues.zipPostalCode && (
                  <CheckCircle className={styles.validIcon} />
                )}
              </div>
            </div>
          )}

          {/* Step 3: Emergency Contact */}
          {currentStep === 3 && (
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <Phone className={styles.sectionIcon} />
                Emergency Contact (Optional)
              </h3>
              <p className={styles.sectionDescription}>
                This information will only be used in case of emergency.
              </p>

              <div className={styles.field}>
                <label htmlFor="emergencyContactName" className={styles.label}>
                  Emergency Contact Name
                </label>
                <input
                  id="emergencyContactName"
                  type="text"
                  className={`${styles.input} ${errors.emergencyContactName ? styles.error : ''} ${!errors.emergencyContactName && watchedValues.emergencyContactName ? styles.valid : ''}`}
                  placeholder="Enter emergency contact name"
                  {...register('emergencyContactName', {
                    maxLength: { value: 100, message: 'Name must be less than 100 characters' }
                  })}
                />
                {errors.emergencyContactName && (
                  <span className={styles.errorMessage}>{errors.emergencyContactName.message}</span>
                )}
                {!errors.emergencyContactName && watchedValues.emergencyContactName && (
                  <CheckCircle className={styles.validIcon} />
                )}
              </div>

              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="emergencyRelationship" className={styles.label}>
                    Relationship
                  </label>
                  <input
                    id="emergencyRelationship"
                    type="text"
                    className={`${styles.input} ${errors.emergencyRelationship ? styles.error : ''} ${!errors.emergencyRelationship && watchedValues.emergencyRelationship ? styles.valid : ''}`}
                    placeholder="e.g., Spouse, Parent, Friend"
                    {...register('emergencyRelationship', {
                      maxLength: { value: 50, message: 'Relationship must be less than 50 characters' }
                    })}
                  />
                  {errors.emergencyRelationship && (
                    <span className={styles.errorMessage}>{errors.emergencyRelationship.message}</span>
                  )}
                  {!errors.emergencyRelationship && watchedValues.emergencyRelationship && (
                    <CheckCircle className={styles.validIcon} />
                  )}
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
                      className={`${styles.input} ${errors.emergencyPhoneNumber ? styles.error : ''} ${!errors.emergencyPhoneNumber && watchedValues.emergencyPhoneNumber ? styles.valid : ''}`}
                      placeholder="+1 (555) 123-4567"
                      value={watchedValues.emergencyPhoneNumber}
                      onChange={(e) => handlePhoneChange(e.target.value, 'emergencyPhoneNumber')}
                      {...register('emergencyPhoneNumber', {
                        pattern: {
                          value: /^\+?[1-9]\d{1,14}$/,
                          message: 'Please enter a valid phone number'
                        },
                        validate: (value) => {
                          if (value && value === watchedValues.phoneNumber) {
                            return 'Emergency contact phone must be different from your phone number'
                          }
                          return true
                        }
                      })}
                    />
                    {!errors.emergencyPhoneNumber && watchedValues.emergencyPhoneNumber && (
                      <CheckCircle className={styles.validIcon} />
                    )}
                  </div>
                  {errors.emergencyPhoneNumber && (
                    <span className={styles.errorMessage}>{errors.emergencyPhoneNumber.message}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Account Security */}
          {currentStep === 4 && (
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <Shield className={styles.sectionIcon} />
                Account Security
              </h3>

              <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>
                  Password *
                </label>
                <div className={styles.inputContainer}>
                  <Shield className={styles.inputIcon} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`${styles.input} ${errors.password ? styles.error : ''} ${!errors.password && watchedValues.password ? styles.valid : ''}`}
                    placeholder="Create a strong password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                        message: 'Password must include uppercase, lowercase, number, and special character'
                      }
                    })}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {!errors.password && watchedValues.password && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>
                {errors.password && (
                  <span className={styles.errorMessage}>{errors.password.message}</span>
                )}
                
                {/* Password Strength Indicator */}
                {watchedValues.password && (
                  <div className={styles.passwordStrength}>
                    <div className={styles.strengthBar}>
                      <div 
                        className={`${styles.strengthFill} ${styles[`strength${passwordStrength}`]}`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      />
                    </div>
                    <span className={styles.strengthText}>
                      {passwordStrength === 1 && 'Weak'}
                      {passwordStrength === 2 && 'Fair'}
                      {passwordStrength === 3 && 'Good'}
                      {passwordStrength === 4 && 'Strong'}
                    </span>
                  </div>
                )}
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
                    className={`${styles.input} ${errors.confirmPassword ? styles.error : ''} ${!errors.confirmPassword && watchedValues.confirmPassword ? styles.valid : ''}`}
                    placeholder="Confirm your password"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) => value === watchedValues.password || 'Passwords do not match'
                    })}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {!errors.confirmPassword && watchedValues.confirmPassword && (
                    <CheckCircle className={styles.validIcon} />
                  )}
                </div>
                {errors.confirmPassword && (
                  <span className={styles.errorMessage}>{errors.confirmPassword.message}</span>
                )}
              </div>
            </div>
          )}

          {/* Form Error Display */}
          {formError && (
            <div className={`${styles.errorBanner} ${formError.type}`}>
              <div className={styles.errorContent}>
                <AlertCircle className={styles.errorIcon} />
                <div className={styles.errorText}>
                  <strong>
                    {formError.type === 'field' ? 'Field Error' : 
                     formError.type === 'form' ? 'Form Error' : 'Connection Error'}
                  </strong>
                  <p>{formError.message}</p>
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
                disabled={isSubmitting}
              >
                Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                className={styles.primaryButton}
                onClick={async () => {
                  const fields = getFieldsForStep(currentStep)
                  const isValid = await trigger(fields)
                  if (isValid) {
                    setCurrentStep(currentStep + 1)
                  }
                }}
                disabled={isSubmitting}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className={`${styles.primaryButton} ${isSubmitting ? styles.loading : ''}`}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className={styles.spinner} />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
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
            🔒 Your information is protected with bank-level security
          </p>
        </div>
      </div>
    </div>
  )
}

// Helper function to get fields for each step
const getFieldsForStep = (step: number): (keyof FormData)[] => {
  switch (step) {
    case 1:
      return ['firstName', 'lastName', 'email', 'phoneNumber', 'dateOfBirth', 'gender']
    case 2:
      return ['streetAddress', 'city', 'stateProvince', 'zipPostalCode']
    case 3:
      return ['emergencyContactName', 'emergencyRelationship', 'emergencyPhoneNumber']
    case 4:
      return ['password', 'confirmPassword']
    default:
      return []
  }
}

export default PatientRegistration 