import { useMemo } from 'react'
import { FieldErrors } from 'react-hook-form'
import { RegistrationFormData } from '../index'

export const useStepNavigation = (
  currentStep: number,
  watchedValues: Partial<RegistrationFormData>,
  errors: FieldErrors<RegistrationFormData>
) => {
  const canProceedToNextStep = useMemo(() => {
    switch (currentStep) {
      case 1:
        // Personal Information validation
        const personalInfo = watchedValues.personalInfo
        return (
          personalInfo?.firstName &&
          personalInfo?.lastName &&
          personalInfo?.email &&
          personalInfo?.phoneNumber &&
          personalInfo?.preferredContactMethod &&
          !errors.personalInfo?.firstName &&
          !errors.personalInfo?.lastName &&
          !errors.personalInfo?.email &&
          !errors.personalInfo?.phoneNumber &&
          !errors.personalInfo?.preferredContactMethod
        )

      case 2:
        // Professional Information validation
        const professionalInfo = watchedValues.professionalInfo
        return (
          professionalInfo?.specialization &&
          professionalInfo?.medicalLicenseNumber &&
          professionalInfo?.licenseState &&
          professionalInfo?.licenseExpirationDate &&
          professionalInfo?.yearsOfExperience !== undefined &&
          professionalInfo?.medicalDegree &&
          !errors.professionalInfo?.specialization &&
          !errors.professionalInfo?.medicalLicenseNumber &&
          !errors.professionalInfo?.licenseState &&
          !errors.professionalInfo?.licenseExpirationDate &&
          !errors.professionalInfo?.yearsOfExperience &&
          !errors.professionalInfo?.medicalDegree
        )

      case 3:
        // Clinic Information validation
        const clinicInfo = watchedValues.clinicInfo
        return (
          clinicInfo?.streetAddress &&
          clinicInfo?.city &&
          clinicInfo?.stateProvince &&
          clinicInfo?.zipPostalCode &&
          clinicInfo?.practiceType &&
          !errors.clinicInfo?.streetAddress &&
          !errors.clinicInfo?.city &&
          !errors.clinicInfo?.stateProvince &&
          !errors.clinicInfo?.zipPostalCode &&
          !errors.clinicInfo?.practiceType
        )

      case 4:
        // Security Information validation
        const securityInfo = watchedValues.securityInfo
        return (
          securityInfo?.password &&
          securityInfo?.confirmPassword &&
          securityInfo?.acceptTerms &&
          securityInfo?.acceptHIPAACompliance &&
          !errors.securityInfo?.password &&
          !errors.securityInfo?.confirmPassword &&
          !errors.securityInfo?.acceptTerms &&
          !errors.securityInfo?.acceptHIPAACompliance
        )

      default:
        return false
    }
  }, [currentStep, watchedValues, errors])

  const canProceedToPreviousStep = useMemo(() => {
    return currentStep > 1
  }, [currentStep])

  const getStepValidationStatus = useMemo(() => {
    const status = {
      personalInfo: false,
      professionalInfo: false,
      clinicInfo: false,
      securityInfo: false
    }

    // Check if each step has required data
    if (watchedValues.personalInfo) {
      const personal = watchedValues.personalInfo
      status.personalInfo = !!(
        personal.firstName &&
        personal.lastName &&
        personal.email &&
        personal.phoneNumber &&
        personal.preferredContactMethod
      )
    }

    if (watchedValues.professionalInfo) {
      const professional = watchedValues.professionalInfo
      status.professionalInfo = !!(
        professional.specialization &&
        professional.medicalLicenseNumber &&
        professional.licenseState &&
        professional.licenseExpirationDate &&
        professional.yearsOfExperience !== undefined &&
        professional.medicalDegree
      )
    }

    if (watchedValues.clinicInfo) {
      const clinic = watchedValues.clinicInfo
      status.clinicInfo = !!(
        clinic.streetAddress &&
        clinic.city &&
        clinic.stateProvince &&
        clinic.zipPostalCode &&
        clinic.practiceType
      )
    }

    if (watchedValues.securityInfo) {
      const security = watchedValues.securityInfo
      status.securityInfo = !!(
        security.password &&
        security.confirmPassword &&
        security.acceptTerms &&
        security.acceptHIPAACompliance
      )
    }

    return status
  }, [watchedValues])

  const getStepErrorCount = useMemo(() => {
    const errorCounts = {
      personalInfo: 0,
      professionalInfo: 0,
      clinicInfo: 0,
      securityInfo: 0
    }

    // Count errors for each section
    if (errors.personalInfo) {
      errorCounts.personalInfo = Object.keys(errors.personalInfo).length
    }

    if (errors.professionalInfo) {
      errorCounts.professionalInfo = Object.keys(errors.professionalInfo).length
    }

    if (errors.clinicInfo) {
      errorCounts.clinicInfo = Object.keys(errors.clinicInfo).length
    }

    if (errors.securityInfo) {
      errorCounts.securityInfo = Object.keys(errors.securityInfo).length
    }

    return errorCounts
  }, [errors])

  return {
    canProceedToNextStep,
    canProceedToPreviousStep,
    getStepValidationStatus,
    getStepErrorCount
  }
} 