import React from 'react'
import { useFormContext } from 'react-hook-form'
import { User, Mail, Phone, AlertCircle } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { RegistrationFormData, VerificationStatus } from '../index'

interface PersonalInfoStepProps {
  errors: any
  verificationStatus: VerificationStatus
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ errors, verificationStatus }) => {
  const { register, watch } = useFormContext<RegistrationFormData>()
  const watchedValues = watch()

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Please provide your basic contact information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="personalInfo.firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            {...register('personalInfo.firstName')}
            type="text"
            id="personalInfo.firstName"
            placeholder="Enter your first name"
            className={cn(
              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200",
              errors?.personalInfo?.firstName && "border-red-500 focus:ring-red-500 focus:border-red-500"
            )}
          />
          {errors?.personalInfo?.firstName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.personalInfo.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="personalInfo.lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            {...register('personalInfo.lastName')}
            type="text"
            id="personalInfo.lastName"
            placeholder="Enter your last name"
            className={cn(
              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200",
              errors?.personalInfo?.lastName && "border-red-500 focus:ring-red-500 focus:border-red-500"
            )}
          />
          {errors?.personalInfo?.lastName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.personalInfo.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <label htmlFor="personalInfo.email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <input
              {...register('personalInfo.email')}
              type="email"
              id="personalInfo.email"
              placeholder="Enter your professional email address"
              className={cn(
                "w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200",
                errors?.personalInfo?.email && "border-red-500 focus:ring-red-500 focus:border-red-500"
              )}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          {errors?.personalInfo?.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.personalInfo.email.message}
            </p>
          )}
          {watchedValues.personalInfo?.email && !errors?.personalInfo?.email && (
            <p className="mt-1 text-sm text-blue-600">
              Professional email domain recommended (e.g., @medicalpractice.com)
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="md:col-span-2">
          <label htmlFor="personalInfo.phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <input
              {...register('personalInfo.phoneNumber')}
              type="tel"
              id="personalInfo.phoneNumber"
              placeholder="Enter your phone number"
              className={cn(
                "w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200",
                errors?.personalInfo?.phoneNumber && "border-red-500 focus:ring-red-500 focus:border-red-500"
              )}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          {errors?.personalInfo?.phoneNumber && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.personalInfo.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Preferred Contact Method */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Contact Method *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { value: 'email', label: 'Email', icon: Mail },
              { value: 'phone', label: 'Phone', icon: Phone },
              { value: 'both', label: 'Both', icon: User }
            ].map((option) => {
              const Icon = option.icon
              return (
                <label
                  key={option.value}
                  className={cn(
                    "flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200",
                    watchedValues.personalInfo?.preferredContactMethod === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  )}
                >
                  <input
                    {...register('personalInfo.preferredContactMethod')}
                    type="radio"
                    value={option.value}
                    className="sr-only"
                  />
                  <Icon className="w-5 h-5 mr-3 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{option.label}</span>
                </label>
              )
            })}
          </div>
          {errors?.personalInfo?.preferredContactMethod && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.personalInfo.preferredContactMethod.message}
            </p>
          )}
        </div>
      </div>

      {/* Verification Status */}
      {(verificationStatus.email !== 'not_started' || verificationStatus.phone !== 'not_started') && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Verification Status</h3>
          <div className="space-y-2">
            {verificationStatus.email !== 'not_started' && (
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-600">Email Verification:</span>
                <span className={cn(
                  "ml-2 px-2 py-1 rounded-full text-xs font-medium",
                  verificationStatus.email === 'verified' && "bg-green-100 text-green-800",
                  verificationStatus.email === 'pending' && "bg-yellow-100 text-yellow-800",
                  verificationStatus.email === 'failed' && "bg-red-100 text-red-800"
                )}>
                  {verificationStatus.email === 'verified' && 'Verified'}
                  {verificationStatus.email === 'pending' && 'Pending'}
                  {verificationStatus.email === 'failed' && 'Failed'}
                </span>
              </div>
            )}
            {verificationStatus.phone !== 'not_started' && (
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-600">Phone Verification:</span>
                <span className={cn(
                  "ml-2 px-2 py-1 rounded-full text-xs font-medium",
                  verificationStatus.phone === 'verified' && "bg-green-100 text-green-800",
                  verificationStatus.phone === 'pending' && "bg-yellow-100 text-yellow-800",
                  verificationStatus.phone === 'failed' && "bg-red-100 text-red-800"
                )}>
                  {verificationStatus.phone === 'verified' && 'Verified'}
                  {verificationStatus.phone === 'pending' && 'Pending'}
                  {verificationStatus.phone === 'failed' && 'Failed'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Professional Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Professional Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use your professional email address for better credibility</li>
          <li>• Ensure your phone number is current and accessible</li>
          <li>• Choose a contact method that works best for your practice</li>
        </ul>
      </div>
    </div>
  )
}

export default PersonalInfoStep 