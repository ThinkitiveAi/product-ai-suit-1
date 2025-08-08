import { useState, useCallback } from 'react'
import { getStateRequirement, validateLicenseFormat } from '../data/stateRequirements'

export type VerificationResult = {
  isValid: boolean
  message: string
  status: 'pending' | 'verified' | 'failed' | 'not_started'
}

export const useLicenseVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState<VerificationResult>({
    isValid: false,
    message: '',
    status: 'not_started'
  })

  const verifyLicense = useCallback(async (
    licenseNumber: string,
    stateCode: string,
    expirationDate: string
  ): Promise<VerificationResult> => {
    setVerificationStatus({
      isValid: false,
      message: 'Verifying license...',
      status: 'pending'
    })

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Basic validation
      if (!licenseNumber || !stateCode) {
        setVerificationStatus({
          isValid: false,
          message: 'License number and state are required',
          status: 'failed'
        })
        return {
          isValid: false,
          message: 'License number and state are required',
          status: 'failed'
        }
      }

      // Validate license format
      if (!validateLicenseFormat(licenseNumber, stateCode)) {
        setVerificationStatus({
          isValid: false,
          message: 'Invalid license number format for this state',
          status: 'failed'
        })
        return {
          isValid: false,
          message: 'Invalid license number format for this state',
          status: 'failed'
        }
      }

      // Check expiration date
      const expiration = new Date(expirationDate)
      const sixMonthsFromNow = new Date()
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6)

      if (expiration <= sixMonthsFromNow) {
        setVerificationStatus({
          isValid: false,
          message: 'License must be valid for at least 6 months',
          status: 'failed'
        })
        return {
          isValid: false,
          message: 'License must be valid for at least 6 months',
          status: 'failed'
        }
      }

      // Simulate random verification results (for demo)
      const random = Math.random()
      if (random < 0.8) {
        // Success case
        const stateInfo = getStateRequirement(stateCode)
        setVerificationStatus({
          isValid: true,
          message: `License verified successfully. Valid in ${stateInfo?.name || stateCode}`,
          status: 'verified'
        })
        return {
          isValid: true,
          message: `License verified successfully. Valid in ${stateInfo?.name || stateCode}`,
          status: 'verified'
        }
      } else {
        // Failure case
        setVerificationStatus({
          isValid: false,
          message: 'License not found or inactive in state database',
          status: 'failed'
        })
        return {
          isValid: false,
          message: 'License not found or inactive in state database',
          status: 'failed'
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Verification failed'
      setVerificationStatus({
        isValid: false,
        message: errorMessage,
        status: 'failed'
      })
      return {
        isValid: false,
        message: errorMessage,
        status: 'failed'
      }
    }
  }, [])

  const resetVerification = useCallback(() => {
    setVerificationStatus({
      isValid: false,
      message: '',
      status: 'not_started'
    })
  }, [])

  return {
    verifyLicense,
    resetVerification,
    verificationStatus
  }
} 