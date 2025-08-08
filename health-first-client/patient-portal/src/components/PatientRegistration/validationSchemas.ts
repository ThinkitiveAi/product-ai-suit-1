import { ValidationSchema } from './hooks/useFormValidation'

export const validationSchemas: Record<string, ValidationSchema> = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[A-Za-z\s]+$/,
    messages: {
      required: 'First name is required',
      minLength: 'First name must be at least 2 characters',
      maxLength: 'First name must be less than 50 characters',
      pattern: 'First name can only contain letters'
    }
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[A-Za-z\s]+$/,
    messages: {
      required: 'Last name is required',
      minLength: 'Last name must be at least 2 characters',
      maxLength: 'Last name must be less than 50 characters',
      pattern: 'Last name can only contain letters'
    }
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      required: 'Email is required',
      pattern: 'Please enter a valid email address'
    }
  },
  phoneNumber: {
    required: true,
    pattern: /^\+?[1-9]\d{1,14}$/,
    messages: {
      required: 'Phone number is required',
      pattern: 'Please enter a valid phone number'
    }
  },
  dateOfBirth: {
    required: true,
    custom: (value: string) => {
      const today = new Date()
      const birthDate = new Date(value)
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return { isValid: false, message: 'You must be at least 13 years old to register' }
      }
      
      if (birthDate > today) {
        return { isValid: false, message: 'Date of birth cannot be in the future' }
      }
      
      if (age < 13) {
        return { isValid: false, message: 'You must be at least 13 years old to register' }
      }
      
      return { isValid: true, message: '' }
    },
    messages: {
      required: 'Date of birth is required'
    }
  },
  gender: {
    required: true,
    messages: {
      required: 'Gender is required'
    }
  },
  streetAddress: {
    required: true,
    maxLength: 200,
    messages: {
      required: 'Street address is required',
      maxLength: 'Address must be less than 200 characters'
    }
  },
  city: {
    required: true,
    maxLength: 100,
    pattern: /^[A-Za-z\s]+$/,
    messages: {
      required: 'City is required',
      maxLength: 'City must be less than 100 characters',
      pattern: 'City can only contain letters and spaces'
    }
  },
  stateProvince: {
    required: true,
    maxLength: 50,
    messages: {
      required: 'State/Province is required',
      maxLength: 'State/Province must be less than 50 characters'
    }
  },
  zipPostalCode: {
    required: true,
    pattern: /^[A-Za-z0-9\s-]+$/,
    messages: {
      required: 'ZIP/Postal code is required',
      pattern: 'Please enter a valid ZIP or postal code'
    }
  },
  emergencyContactName: {
    required: false,
    maxLength: 100,
    messages: {
      maxLength: 'Name must be less than 100 characters'
    }
  },
  emergencyRelationship: {
    required: false,
    maxLength: 50,
    messages: {
      maxLength: 'Relationship must be less than 50 characters'
    }
  },
  emergencyPhoneNumber: {
    required: false,
    pattern: /^\+?[1-9]\d{1,14}$/,
    custom: (value: string, allValues: any) => {
      if (value && value === allValues.phoneNumber) {
        return { isValid: false, message: 'Emergency contact phone must be different from your phone number' }
      }
      return { isValid: true, message: '' }
    },
    messages: {
      pattern: 'Please enter a valid phone number'
    }
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    messages: {
      required: 'Password is required',
      minLength: 'Password must be at least 8 characters',
      pattern: 'Password must include uppercase, lowercase, number, and special character'
    }
  },
  confirmPassword: {
    required: true,
    custom: (value: string, allValues: any) => {
      if (value !== allValues.password) {
        return { isValid: false, message: 'Passwords do not match' }
      }
      return { isValid: true, message: '' }
    },
    messages: {
      required: 'Please confirm your password'
    }
  }
} 