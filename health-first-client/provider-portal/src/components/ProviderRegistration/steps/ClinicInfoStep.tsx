import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Building, MapPin, Phone, AlertCircle } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { RegistrationFormData } from '../index'
import { StateRequirement } from '../data/stateRequirements'

interface ClinicInfoStepProps {
  errors: any
  stateRequirements: StateRequirement[]
}

const ClinicInfoStep: React.FC<ClinicInfoStepProps> = ({ errors, stateRequirements }) => {
  const { register, watch } = useFormContext<RegistrationFormData>()
  const watchedValues = watch()

  const practiceTypes = [
    { value: 'private', label: 'Private Practice' },
    { value: 'hospital', label: 'Hospital' },
    { value: 'clinic', label: 'Clinic' },
    { value: 'telehealth', label: 'Telehealth' },
    { value: 'other', label: 'Other' }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <Building className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Practice Information</h2>
        <p className="text-gray-600">Please provide your practice or clinic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Practice Type */}
        <div className="md:col-span-2">
          <label htmlFor="clinicInfo.practiceType" className="block text-sm font-medium text-gray-700 mb-2">
            Practice Type *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {practiceTypes.map((type) => (
              <label
                key={type.value}
                className={cn(
                  "flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200",
                  watchedValues.clinicInfo?.practiceType === type.value
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-300 hover:border-gray-400"
                )}
              >
                <input
                  {...register('clinicInfo.practiceType')}
                  type="radio"
                  value={type.value}
                  className="sr-only"
                />
                <Building className="w-5 h-5 mr-3 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
          {errors?.clinicInfo?.practiceType && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.clinicInfo.practiceType.message}
            </p>
          )}
        </div>

        {/* Clinic Name */}
        <div className="md:col-span-2">
          <label htmlFor="clinicInfo.clinicName" className="block text-sm font-medium text-gray-700 mb-2">
            Clinic Name (Optional)
          </label>
          <input
            {...register('clinicInfo.clinicName')}
            type="text"
            id="clinicInfo.clinicName"
            placeholder="Enter your clinic or practice name"
            className={cn(
              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200",
              errors?.clinicInfo?.clinicName && "border-red-500 focus:ring-red-500 focus:border-red-500"
            )}
          />
          {errors?.clinicInfo?.clinicName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.clinicInfo.clinicName.message}
            </p>
          )}
        </div>

        {/* Street Address */}
        <div className="md:col-span-2">
          <label htmlFor="clinicInfo.streetAddress" className="block text-sm font-medium text-gray-700 mb-2">
            Street Address *
          </label>
          <div className="relative">
            <input
              {...register('clinicInfo.streetAddress')}
              type="text"
              id="clinicInfo.streetAddress"
              placeholder="Enter your practice street address"
              className={cn(
                "w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200",
                errors?.clinicInfo?.streetAddress && "border-red-500 focus:ring-red-500 focus:border-red-500"
              )}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          {errors?.clinicInfo?.streetAddress && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.clinicInfo.streetAddress.message}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label htmlFor="clinicInfo.city" className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            {...register('clinicInfo.city')}
            type="text"
            id="clinicInfo.city"
            placeholder="Enter city"
            className={cn(
              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200",
              errors?.clinicInfo?.city && "border-red-500 focus:ring-red-500 focus:border-red-500"
            )}
          />
          {errors?.clinicInfo?.city && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.clinicInfo.city.message}
            </p>
          )}
        </div>

        {/* State */}
        <div>
          <label htmlFor="clinicInfo.stateProvince" className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <select
            {...register('clinicInfo.stateProvince')}
            id="clinicInfo.stateProvince"
            className={cn(
              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200",
              errors?.clinicInfo?.stateProvince && "border-red-500 focus:ring-red-500 focus:border-red-500"
            )}
          >
            <option value="">Select state</option>
            {stateRequirements.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
          {errors?.clinicInfo?.stateProvince && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.clinicInfo.stateProvince.message}
            </p>
          )}
        </div>

        {/* ZIP Code */}
        <div>
          <label htmlFor="clinicInfo.zipPostalCode" className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code *
          </label>
          <input
            {...register('clinicInfo.zipPostalCode')}
            type="text"
            id="clinicInfo.zipPostalCode"
            placeholder="Enter ZIP code"
            className={cn(
              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200",
              errors?.clinicInfo?.zipPostalCode && "border-red-500 focus:ring-red-500 focus:border-red-500"
            )}
          />
          {errors?.clinicInfo?.zipPostalCode && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.clinicInfo.zipPostalCode.message}
            </p>
          )}
        </div>

        {/* Clinic Phone */}
        <div>
          <label htmlFor="clinicInfo.clinicPhone" className="block text-sm font-medium text-gray-700 mb-2">
            Clinic Phone (Optional)
          </label>
          <div className="relative">
            <input
              {...register('clinicInfo.clinicPhone')}
              type="tel"
              id="clinicInfo.clinicPhone"
              placeholder="Enter clinic phone number"
              className={cn(
                "w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200",
                errors?.clinicInfo?.clinicPhone && "border-red-500 focus:ring-red-500 focus:border-red-500"
              )}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          {errors?.clinicInfo?.clinicPhone && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.clinicInfo.clinicPhone.message}
            </p>
          )}
        </div>
      </div>

      {/* State/License Validation */}
      {watchedValues.professionalInfo?.licenseState && 
       watchedValues.clinicInfo?.stateProvince &&
       watchedValues.professionalInfo.licenseState !== watchedValues.clinicInfo.stateProvince && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="text-sm text-yellow-800">
              <strong>Note:</strong> Your license state ({watchedValues.professionalInfo.licenseState}) 
              differs from your practice state ({watchedValues.clinicInfo.stateProvince}). 
              Please ensure this is correct for your practice.
            </span>
          </div>
        </div>
      )}

      {/* Professional Tips */}
      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <h3 className="text-sm font-medium text-purple-900 mb-2">Practice Information Tips</h3>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Ensure your practice address is current and accurate</li>
          <li>• Practice state should match your license state when possible</li>
          <li>• Include clinic phone if different from personal phone</li>
          <li>• Choose the practice type that best describes your setting</li>
        </ul>
      </div>
    </div>
  )
}

export default ClinicInfoStep 