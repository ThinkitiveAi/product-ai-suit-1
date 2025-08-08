import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Shield, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { RegistrationFormData } from '../index'

interface SecurityStepProps {
  errors: any
  isSubmitting: boolean
}

const SecurityStep: React.FC<SecurityStepProps> = ({ errors, isSubmitting }) => {
  const { register, watch, setValue } = useFormContext<RegistrationFormData>()
  const watchedValues = watch()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const password = watchedValues.securityInfo?.password || ''
  const confirmPassword = watchedValues.securityInfo?.confirmPassword || ''

  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: '', color: '' }
    
    let score = 0
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    }
    
    score = Object.values(checks).filter(Boolean).length
    
    if (score <= 2) return { score, label: 'Weak', color: 'red' }
    if (score <= 3) return { score, label: 'Fair', color: 'yellow' }
    if (score <= 4) return { score, label: 'Good', color: 'blue' }
    return { score, label: 'Strong', color: 'green' }
  }

  const passwordStrength = getPasswordStrength(password)

  const getPasswordStrengthColor = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-500'
      case 'yellow': return 'bg-yellow-500'
      case 'blue': return 'bg-blue-500'
      case 'green': return 'bg-green-500'
      default: return 'bg-gray-300'
    }
  }

  const getPasswordStrengthTextColor = (color: string) => {
    switch (color) {
      case 'red': return 'text-red-600'
      case 'yellow': return 'text-yellow-600'
      case 'blue': return 'text-blue-600'
      case 'green': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Security & Compliance</h2>
        <p className="text-gray-600">Set up your account security and review compliance requirements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Password */}
        <div className="md:col-span-2">
          <label htmlFor="securityInfo.password" className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              {...register('securityInfo.password')}
              type={showPassword ? 'text' : 'password'}
              id="securityInfo.password"
              placeholder="Create a strong password"
              className={cn(
                "w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200",
                errors?.securityInfo?.password && "border-red-500 focus:ring-red-500 focus:border-red-500"
              )}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors?.securityInfo?.password && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.securityInfo.password.message}
            </p>
          )}
          
          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">Password strength:</span>
                <span className={cn("text-xs font-medium", getPasswordStrengthTextColor(passwordStrength.color))}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={cn("h-2 rounded-full transition-all duration-300", getPasswordStrengthColor(passwordStrength.color))}
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <div className="grid grid-cols-2 gap-1">
                  <div className={cn("flex items-center", password.length >= 8 ? "text-green-600" : "text-gray-400")}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    At least 8 characters
                  </div>
                  <div className={cn("flex items-center", /[A-Z]/.test(password) ? "text-green-600" : "text-gray-400")}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    One uppercase letter
                  </div>
                  <div className={cn("flex items-center", /[a-z]/.test(password) ? "text-green-600" : "text-gray-400")}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    One lowercase letter
                  </div>
                  <div className={cn("flex items-center", /[0-9]/.test(password) ? "text-green-600" : "text-gray-400")}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    One number
                  </div>
                  <div className={cn("flex items-center", /[^A-Za-z0-9]/.test(password) ? "text-green-600" : "text-gray-400")}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    One special character
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="md:col-span-2">
          <label htmlFor="securityInfo.confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              {...register('securityInfo.confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              id="securityInfo.confirmPassword"
              placeholder="Confirm your password"
              className={cn(
                "w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200",
                errors?.securityInfo?.confirmPassword && "border-red-500 focus:ring-red-500 focus:border-red-500"
              )}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors?.securityInfo?.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.securityInfo.confirmPassword.message}
            </p>
          )}
          
          {/* Password Match Indicator */}
          {confirmPassword && (
            <div className="mt-2">
              {password === confirmPassword ? (
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Passwords match
                </div>
              ) : (
                <div className="flex items-center text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Passwords do not match
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="flex items-start">
          <input
            {...register('securityInfo.acceptTerms')}
            type="checkbox"
            id="securityInfo.acceptTerms"
            className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="securityInfo.acceptTerms" className="ml-3 text-sm text-gray-700">
            I accept the{' '}
            <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
              Terms and Conditions
            </a>
            {' '}and{' '}
            <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
              Privacy Policy
            </a>
            *
          </label>
        </div>
        {errors?.securityInfo?.acceptTerms && (
          <p className="text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.securityInfo.acceptTerms.message}
          </p>
        )}

        {/* HIPAA Compliance */}
        <div className="flex items-start">
          <input
            {...register('securityInfo.acceptHIPAACompliance')}
            type="checkbox"
            id="securityInfo.acceptHIPAACompliance"
            className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="securityInfo.acceptHIPAACompliance" className="ml-3 text-sm text-gray-700">
            I acknowledge and agree to comply with{' '}
            <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
              HIPAA regulations
            </a>
            {' '}and will maintain the confidentiality of patient information*
          </label>
        </div>
        {errors?.securityInfo?.acceptHIPAACompliance && (
          <p className="text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.securityInfo.acceptHIPAACompliance.message}
          </p>
        )}

        {/* Marketing Opt-in */}
        <div className="flex items-start">
          <input
            {...register('securityInfo.marketingOptIn')}
            type="checkbox"
            id="securityInfo.marketingOptIn"
            className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="securityInfo.marketingOptIn" className="ml-3 text-sm text-gray-700">
            I would like to receive updates about new features and healthcare opportunities
            <span className="text-gray-500"> (optional)</span>
          </label>
        </div>
      </div>

      {/* Security Tips */}
      <div className="mt-6 p-4 bg-orange-50 rounded-lg">
        <h3 className="text-sm font-medium text-orange-900 mb-2">Security & Compliance Tips</h3>
        <ul className="text-sm text-orange-800 space-y-1">
          <li>• Use a strong, unique password for your healthcare account</li>
          <li>• Never share your login credentials with others</li>
          <li>• Review HIPAA compliance requirements regularly</li>
          <li>• Keep your contact information up to date for security notifications</li>
        </ul>
      </div>

      {/* Compliance Notice */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Compliance Notice</h3>
        <p className="text-sm text-blue-800">
          As a healthcare provider, you are responsible for maintaining compliance with all applicable 
          federal and state regulations, including HIPAA. Our platform is designed to help you meet 
          these requirements, but ultimate compliance responsibility rests with your practice.
        </p>
      </div>
    </div>
  )
}

export default SecurityStep 