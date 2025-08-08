import { useCallback } from 'react'

export interface ValidationSchema {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any, allValues?: any) => { isValid: boolean; message: string }
  messages: {
    required?: string
    minLength?: string
    maxLength?: string
    pattern?: string
  }
}

export interface ValidationResult {
  isValid: boolean
  message: string
}

export const useFormValidation = (schemas: Record<string, ValidationSchema>) => {
  const validateField = useCallback((fieldName: string, value: any, allValues?: any): ValidationResult => {
    const schema = schemas[fieldName]
    if (!schema) {
      return { isValid: true, message: '' }
    }

    // Required validation
    if (schema.required && (!value || value.trim() === '')) {
      return { isValid: false, message: schema.messages.required || 'This field is required' }
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === '') {
      return { isValid: true, message: '' }
    }

    // Min length validation
    if (schema.minLength && value.length < schema.minLength) {
      return { isValid: false, message: schema.messages.minLength || `Minimum length is ${schema.minLength} characters` }
    }

    // Max length validation
    if (schema.maxLength && value.length > schema.maxLength) {
      return { isValid: false, message: schema.messages.maxLength || `Maximum length is ${schema.maxLength} characters` }
    }

    // Pattern validation
    if (schema.pattern && !schema.pattern.test(value)) {
      return { isValid: false, message: schema.messages.pattern || 'Invalid format' }
    }

    // Custom validation
    if (schema.custom) {
      const customResult = schema.custom(value, allValues)
      if (!customResult.isValid) {
        return customResult
      }
    }

    return { isValid: true, message: '' }
  }, [schemas])

  const validateForm = useCallback((formData: any): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {}
    let isValid = true

    Object.keys(schemas).forEach(fieldName => {
      const result = validateField(fieldName, formData[fieldName], formData)
      if (!result.isValid) {
        errors[fieldName] = result.message
        isValid = false
      }
    })

    return { isValid, errors }
  }, [schemas, validateField])

  return {
    validateField,
    validateForm
  }
} 