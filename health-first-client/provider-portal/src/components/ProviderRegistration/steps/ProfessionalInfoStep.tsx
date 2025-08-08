import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Briefcase, GraduationCap, Award, Calendar, MapPin, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { RegistrationFormData, VerificationStatus } from '../index'
import { MedicalSpecialty } from '../data/medicalSpecialties'
import { StateRequirement } from '../data/stateRequirements'

interface ProfessionalInfoStepProps {
  errors: any
  verificationStatus: VerificationStatus
  specialties: MedicalSpecialty[]
  stateRequirements: StateRequirement[]
  onLicenseVerification: (license: string, state: string, expiration: string) => Promise<any>
}

const ProfessionalInfoStep: React.FC<ProfessionalInfoStepProps> = ({
  errors,
  verificationStatus,
  specialties,
  stateRequirements,
  onLicenseVerification
}) => {
  const { register, watch, setValue } = useFormContext<RegistrationFormData>()
  const watchedValues = watch()
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [showSpecialtySearch, setShowSpecialtySearch] = useState(false)
  const [specialtySearch, setSpecialtySearch] = useState('')

  const medicalDegrees = [
    { value: 'MD', label: 'MD - Doctor of Medicine' },
    { value: 'DO', label: 'DO - Doctor of Osteopathic Medicine' },
    { value: 'NP', label: 'NP - Nurse Practitioner' },
    { value: 'PA', label: 'PA - Physician Assistant' },
    { value: 'RN', label: 'RN - Registered Nurse' },
    { value: 'Other', label: 'Other' }
  ]

  const practiceTypes = [
    { value: 'private', label: 'Private Practice' },
    { value: 'hospital', label: 'Hospital' },
    { value: 'clinic', label: 'Clinic' },
    { value: 'telehealth', label: 'Telehealth' },
    { value: 'other', label: 'Other' }
  ]

  const handleLicenseVerification = async () => {
    const licenseNumber = watchedValues.professionalInfo?.medicalLicenseNumber
    const state = watchedValues.professionalInfo?.licenseState
    const expiration = watchedValues.professionalInfo?.licenseExpirationDate

    if (!licenseNumber || !state || !expiration) {
      return
    }

    setIsVerifying(true)
    try {
      const result = await onLicenseVerification(licenseNumber, state, expiration)
      setVerificationResult(result)
    } catch (error) {
      setVerificationResult({
        isValid: false,
        message: 'Verification failed. Please try again.',
        status: 'failed'
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const filteredSpecialties = specialties.filter(specialty =>
    specialty.name.toLowerCase().includes(specialtySearch.toLowerCase()) ||
    specialty.description.toLowerCase().includes(specialtySearch.toLowerCase())
  )

  const selectedSpecialty = specialties.find(s => s.name === watchedValues.professionalInfo?.specialization)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Briefcase className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Information</h2>
        <p className="text-gray-600">Please provide your medical credentials and experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medical Degree */}
        <div>
          <label htmlFor="professionalInfo.medicalDegree" className="block text-sm font-medium text-gray-700 mb-2">
            Medical Degree *
          </label>
          <select
            {...register('professionalInfo.medicalDegree')}
            id="professionalInfo.medicalDegree"
            className={cn(
              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200",
              errors?.professionalInfo?.medicalDegree && "border-red-500 focus:ring-red-500 focus:border-red-500"
            )}
          >
            <option value="">Select your medical degree</option>
            {medicalDegrees.map((degree) => (
              <option key={degree.value} value={degree.value}>
                {degree.label}
              </option>
            ))}
          </select>
          {errors?.professionalInfo?.medicalDegree && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.professionalInfo.medicalDegree.message}
            </p>
          )}
        </div>

        {/* Years of Experience */}
        <div>
          <label htmlFor="professionalInfo.yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience *
          </label>
          <input
            {...register('professionalInfo.yearsOfExperience', { valueAsNumber: true })}
            type="number"
            id="professionalInfo.yearsOfExperience"
            min="0"
            max="50"
            placeholder="Enter years of experience"
            className={cn(
              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200",
              errors?.professionalInfo?.yearsOfExperience && "border-red-500 focus:ring-red-500 focus:border-red-500"
            )}
          />
          {errors?.professionalInfo?.yearsOfExperience && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.professionalInfo.yearsOfExperience.message}
            </p>
          )}
        </div>

        {/* Specialization */}
        <div className="md:col-span-2">
          <label htmlFor="professionalInfo.specialization" className="block text-sm font-medium text-gray-700 mb-2">
            Medical Specialization *
          </label>
          <div className="relative">
            <input
              {...register('professionalInfo.specialization')}
              type="text"
              id="professionalInfo.specialization"
              placeholder="Search for your medical specialization"
              value={watchedValues.professionalInfo?.specialization || ''}
              onChange={(e) => {
                setValue('professionalInfo.specialization', e.target.value)
                setShowSpecialtySearch(true)
                setSpecialtySearch(e.target.value)
              }}
              onFocus={() => setShowSpecialtySearch(true)}
              className={cn(
                "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200",
                errors?.professionalInfo?.specialization && "border-red-500 focus:ring-red-500 focus:border-red-500"
              )}
            />
            {showSpecialtySearch && specialtySearch && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredSpecialties.map((specialty) => (
                  <button
                    key={specialty.id}
                    type="button"
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    onClick={() => {
                      setValue('professionalInfo.specialization', specialty.name)
                      setShowSpecialtySearch(false)
                      setSpecialtySearch('')
                    }}
                  >
                    <div className="font-medium text-gray-900">{specialty.name}</div>
                    <div className="text-sm text-gray-600">{specialty.description}</div>
                    <div className="text-xs text-gray-500">{specialty.category}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors?.professionalInfo?.specialization && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.professionalInfo.specialization.message}
            </p>
          )}
          {selectedSpecialty && (
            <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Award className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-green-800">
                  {selectedSpecialty.category}: {selectedSpecialty.description}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* License State */}
        <div>
          <label htmlFor="professionalInfo.licenseState" className="block text-sm font-medium text-gray-700 mb-2">
            License State *
          </label>
          <select
            {...register('professionalInfo.licenseState')}
            id="professionalInfo.licenseState"
            className={cn(
              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200",
              errors?.professionalInfo?.licenseState && "border-red-500 focus:ring-red-500 focus:border-red-500"
            )}
          >
            <option value="">Select state</option>
            {stateRequirements.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
          {errors?.professionalInfo?.licenseState && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.professionalInfo.licenseState.message}
            </p>
          )}
        </div>

        {/* License Number */}
        <div>
          <label htmlFor="professionalInfo.medicalLicenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Medical License Number *
          </label>
          <div className="relative">
            <input
              {...register('professionalInfo.medicalLicenseNumber')}
              type="text"
              id="professionalInfo.medicalLicenseNumber"
              placeholder="Enter your license number"
              className={cn(
                "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200",
                errors?.professionalInfo?.medicalLicenseNumber && "border-red-500 focus:ring-red-500 focus:border-red-500"
              )}
            />
            <button
              type="button"
              onClick={handleLicenseVerification}
              disabled={isVerifying || !watchedValues.professionalInfo?.medicalLicenseNumber}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Verify'
              )}
            </button>
          </div>
          {errors?.professionalInfo?.medicalLicenseNumber && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.professionalInfo.medicalLicenseNumber.message}
            </p>
          )}
        </div>

        {/* License Expiration Date */}
        <div className="md:col-span-2">
          <label htmlFor="professionalInfo.licenseExpirationDate" className="block text-sm font-medium text-gray-700 mb-2">
            License Expiration Date *
          </label>
          <div className="relative">
            <input
              {...register('professionalInfo.licenseExpirationDate')}
              type="date"
              id="professionalInfo.licenseExpirationDate"
              className={cn(
                "w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200",
                errors?.professionalInfo?.licenseExpirationDate && "border-red-500 focus:ring-red-500 focus:border-red-500"
              )}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          {errors?.professionalInfo?.licenseExpirationDate && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.professionalInfo.licenseExpirationDate.message}
            </p>
          )}
        </div>
      </div>

      {/* License Verification Status */}
      {verificationResult && (
        <div className={cn(
          "mt-4 p-4 rounded-lg border",
          verificationResult.status === 'verified' && "bg-green-50 border-green-200",
          verificationResult.status === 'failed' && "bg-red-50 border-red-200",
          verificationResult.status === 'pending' && "bg-yellow-50 border-yellow-200"
        )}>
          <div className="flex items-center">
            {verificationResult.status === 'verified' && <CheckCircle className="w-5 h-5 text-green-600 mr-2" />}
            {verificationResult.status === 'failed' && <AlertCircle className="w-5 h-5 text-red-600 mr-2" />}
            {verificationResult.status === 'pending' && <Loader2 className="w-5 h-5 text-yellow-600 mr-2 animate-spin" />}
            <span className={cn(
              "text-sm font-medium",
              verificationResult.status === 'verified' && "text-green-800",
              verificationResult.status === 'failed' && "text-red-800",
              verificationResult.status === 'pending' && "text-yellow-800"
            )}>
              {verificationResult.message}
            </span>
          </div>
        </div>
      )}

      {/* Professional Tips */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h3 className="text-sm font-medium text-green-900 mb-2">Professional Tips</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Ensure your license is valid for at least 6 months from today</li>
          <li>• License state must match your practice location</li>
          <li>• Choose a specialization that accurately reflects your practice</li>
          <li>• Keep your credentials up to date for verification</li>
        </ul>
      </div>
    </div>
  )
}

export default ProfessionalInfoStep 