import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Heart, Shield, User } from 'lucide-react'
import './PatientLogin.css'

interface LoginFormData {
  identifier: string
  password: string
  rememberMe: boolean
}

interface ValidationError {
  type: 'password' | 'account' | 'network'
  message: string
}

const PatientLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ValidationError | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      identifier: '',
      password: '',
      rememberMe: false
    }
  })

  const identifier = watch('identifier')

  // Validation functions
  const validateIdentifier = (value: string) => {
    if (!value) return 'Email or phone number is required'
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    
    if (emailRegex.test(value) || phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
      return true
    }
    
    return 'Please enter a valid email address or phone number'
  }

  const validatePassword = (value: string) => {
    if (!value) return 'Password is required'
    if (value.length < 6) return 'Password must be at least 6 characters'
    return true
  }

  // Format detection for identifier field
  const getIdentifierType = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(value)) return 'email'
    if (value.replace(/[\s\-\(\)]/g, '').match(/^[\+]?[1-9][\d]{0,15}$/)) return 'phone'
    return 'unknown'
  }

  const identifierType = getIdentifierType(identifier)

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate different error scenarios for demonstration
      if (data.identifier === 'wrong@example.com') {
        throw new Error('Invalid credentials')
      }
      
      if (data.identifier === 'notfound@example.com') {
        throw new Error('Account not found')
      }

      // Success case
      setIsSuccess(true)
      setTimeout(() => {
        // Redirect to dashboard (in real app)
        console.log('Redirecting to dashboard...')
      }, 2000)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      
      if (errorMessage.includes('Invalid credentials')) {
        setError({
          type: 'password',
          message: 'Incorrect password. Please try again or reset your password.'
        })
      } else if (errorMessage.includes('Account not found')) {
        setError({
          type: 'account',
          message: 'No account found with this email/phone. Please check your details or contact support.'
        })
      } else {
        setError({
          type: 'network',
          message: 'Connection error. Please check your internet connection and try again.'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    // In real app, this would navigate to password reset page
    console.log('Navigate to password reset page')
  }

  const handleAccountRecovery = () => {
    // In real app, this would navigate to account recovery page
    console.log('Navigate to account recovery page')
  }

  if (isSuccess) {
    return (
      <div className="login-container success-state">
        <div className="login-card">
          <div className="success-icon">
            <Heart className="heart-icon" />
          </div>
          <h2 className="success-title">Welcome Back!</h2>
          <p className="success-message">
            You've successfully logged into your patient portal. Redirecting to your dashboard...
          </p>
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="login-container">
      <div className="login-card fade-in">
        {/* Header */}
        <div className="login-header">
          <div className="logo-container">
            <Heart className="logo-icon" />
            <h1 className="logo-text">HealthFirst</h1>
          </div>
          <p className="welcome-text">
            Welcome to your patient portal
          </p>
          <p className="subtitle">
            Sign in to access your healthcare information
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          {/* Identifier Field */}
          <div className="form-group">
            <label htmlFor="identifier" className="form-label">
              Email or Phone Number
            </label>
            <div className="input-container">
              <User className="input-icon" />
              <input
                id="identifier"
                type="text"
                className={`form-input ${errors.identifier ? 'error' : ''} ${identifierType !== 'unknown' && identifier ? 'valid' : ''}`}
                placeholder="Enter your email or phone number"
                {...register('identifier', {
                  validate: validateIdentifier
                })}
                autoComplete="username"
              />
              {identifierType !== 'unknown' && identifier && (
                <span className="input-type-indicator">
                  {identifierType === 'email' ? '📧' : '📱'}
                </span>
              )}
            </div>
            {errors.identifier && (
              <span className="error-message">{errors.identifier.message}</span>
            )}
            {identifier && identifierType === 'unknown' && (
              <span className="warning-message">
                Please enter a valid email address or phone number
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-container">
              <Shield className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                {...register('password', {
                  validate: validatePassword
                })}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          {/* Remember Me */}
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                {...register('rememberMe')}
              />
              <span className="checkbox-custom"></span>
              Remember me
            </label>
          </div>

          {/* Error Display */}
          {error && (
            <div className={`error-banner ${error.type}`}>
              <div className="error-content">
                <span className="error-icon">
                  {error.type === 'password' ? '🔐' : error.type === 'account' ? '👤' : '🌐'}
                </span>
                <div className="error-text">
                  <strong>{error.type === 'password' ? 'Authentication Error' : 
                          error.type === 'account' ? 'Account Not Found' : 'Connection Error'}</strong>
                  <p>{error.message}</p>
                </div>
              </div>
              <div className="error-actions">
                {error.type === 'password' && (
                  <button
                    type="button"
                    className="error-action-btn"
                    onClick={handleForgotPassword}
                  >
                    Reset Password
                  </button>
                )}
                {error.type === 'account' && (
                  <button
                    type="button"
                    className="error-action-btn"
                    onClick={handleAccountRecovery}
                  >
                    Account Recovery
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={!isValid || isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner-small"></div>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Forgot Password Link */}
          <div className="forgot-password">
            <button
              type="button"
              className="forgot-password-link"
              onClick={handleForgotPassword}
            >
              Forgot your password?
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p className="footer-text">
            Need help? <button className="help-link">Contact Support</button>
          </p>
          <p className="security-note">
            🔒 Your information is protected with bank-level security
          </p>
        </div>
      </div>
    </div>
  )
}

export default PatientLogin 