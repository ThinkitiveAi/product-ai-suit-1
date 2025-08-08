import { z } from 'zod'

// Personal Information Schema
const personalInfoSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .max(100, 'Email must be less than 100 characters'),
  
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  
  preferredContactMethod: z.enum(['email', 'phone', 'both'], {
    required_error: 'Please select a preferred contact method'
  })
})

// Professional Information Schema
const professionalInfoSchema = z.object({
  specialization: z.string()
    .min(3, 'Specialization must be at least 3 characters')
    .max(100, 'Specialization must be less than 100 characters'),
  
  medicalLicenseNumber: z.string()
    .min(5, 'License number must be at least 5 characters')
    .max(20, 'License number must be less than 20 characters')
    .regex(/^[A-Z0-9]+$/, 'License number can only contain uppercase letters and numbers'),
  
  licenseState: z.string()
    .min(2, 'Please select a state')
    .max(2, 'State must be 2 characters'),
  
  licenseExpirationDate: z.string()
    .min(1, 'License expiration date is required')
    .refine((date) => {
      const expirationDate = new Date(date)
      const sixMonthsFromNow = new Date()
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6)
      return expirationDate > sixMonthsFromNow
    }, 'License must be valid for at least 6 months from today'),
  
  yearsOfExperience: z.number()
    .min(0, 'Years of experience cannot be negative')
    .max(50, 'Years of experience cannot exceed 50'),
  
  medicalDegree: z.enum(['MD', 'DO', 'NP', 'PA', 'RN', 'Other'], {
    required_error: 'Please select your medical degree'
  }),
  
  boardCertifications: z.array(z.string())
    .optional()
    .default([])
})

// Clinic Information Schema
const clinicInfoSchema = z.object({
  clinicName: z.string()
    .max(100, 'Clinic name must be less than 100 characters')
    .optional(),
  
  streetAddress: z.string()
    .min(5, 'Street address must be at least 5 characters')
    .max(200, 'Street address must be less than 200 characters'),
  
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'City can only contain letters and spaces'),
  
  stateProvince: z.string()
    .min(2, 'Please select a state')
    .max(50, 'State must be less than 50 characters'),
  
  zipPostalCode: z.string()
    .min(5, 'ZIP code must be at least 5 characters')
    .max(10, 'ZIP code must be less than 10 characters')
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  
  clinicPhone: z.string()
    .min(10, 'Clinic phone must be at least 10 digits')
    .max(15, 'Clinic phone must be less than 15 digits')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .optional(),
  
  practiceType: z.enum(['private', 'hospital', 'clinic', 'telehealth', 'other'], {
    required_error: 'Please select a practice type'
  })
})

// Security Information Schema
const securityInfoSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  
  confirmPassword: z.string()
    .min(1, 'Please confirm your password'),
  
  acceptTerms: z.boolean()
    .refine((val) => val === true, 'You must accept the terms and conditions'),
  
  acceptHIPAACompliance: z.boolean()
    .refine((val) => val === true, 'You must accept HIPAA compliance requirements'),
  
  marketingOptIn: z.boolean()
    .optional()
    .default(false)
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

// Main Registration Schema
export const registrationSchema = z.object({
  personalInfo: personalInfoSchema,
  professionalInfo: professionalInfoSchema,
  clinicInfo: clinicInfoSchema,
  securityInfo: securityInfoSchema
})

// Cross-field validation
export const validateRegistration = (data: z.infer<typeof registrationSchema>) => {
  const errors: Record<string, string> = {}

  // Validate license state matches practice state
  if (data.professionalInfo.licenseState !== data.clinicInfo.stateProvince) {
    errors.licenseState = 'License state must match practice state'
  }

  // Validate professional email domain when possible
  const email = data.personalInfo.email.toLowerCase()
  const professionalDomains = [
    'medicalpractice.com',
    'hospital.org',
    'clinic.com',
    'healthcare.com',
    'medical.com'
  ]
  
  const isProfessionalDomain = professionalDomains.some(domain => 
    email.includes(domain)
  )
  
  if (!isProfessionalDomain) {
    // Warning, not error
    console.warn('Consider using a professional email domain')
  }

  // Validate clinic phone differs from personal phone if both provided
  if (data.clinicInfo.clinicPhone && 
      data.clinicInfo.clinicPhone === data.personalInfo.phoneNumber) {
    errors.clinicPhone = 'Clinic phone should differ from personal phone'
  }

  return errors
}

export type RegistrationFormData = z.infer<typeof registrationSchema> 