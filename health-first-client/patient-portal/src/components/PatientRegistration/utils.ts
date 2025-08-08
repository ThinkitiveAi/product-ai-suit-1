// Phone number formatting
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters except +
  const cleaned = value.replace(/[^\d+]/g, '')
  
  // If it starts with +, keep it
  if (cleaned.startsWith('+')) {
    return cleaned
  }
  
  // Format US numbers
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
  if (match) {
    const parts = match.slice(1).filter(Boolean)
    if (parts.length === 0) return ''
    if (parts.length === 1) return `+1 (${parts[0]}`
    if (parts.length === 2) return `+1 (${parts[0]}) ${parts[1]}`
    return `+1 (${parts[0]}) ${parts[1]}-${parts[2]}`
  }
  
  return cleaned
}

// Date formatting
export const formatDate = (value: string): string => {
  // Ensure the date is in YYYY-MM-DD format
  const date = new Date(value)
  if (isNaN(date.getTime())) {
    return value
  }
  
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

// Password strength calculation
export const getPasswordStrength = (password: string): number => {
  let strength = 0
  
  // Length check
  if (password.length >= 8) strength++
  
  // Character variety checks
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[@$!%*?&]/.test(password)) strength++
  
  return Math.min(strength, 4)
}

// Email domain suggestions
export const getEmailSuggestions = (email: string): string[] => {
  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com']
  const atIndex = email.indexOf('@')
  
  if (atIndex === -1) return []
  
  const localPart = email.substring(0, atIndex)
  const domain = email.substring(atIndex + 1)
  
  if (!domain) {
    return commonDomains.map(d => `${localPart}@${d}`)
  }
  
  return commonDomains
    .filter(d => d.startsWith(domain))
    .map(d => `${localPart}@${d}`)
    .slice(0, 3)
}

// Age calculation
export const calculateAge = (birthDate: string): number => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

// Validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

export const isValidPostalCode = (code: string): boolean => {
  // US ZIP codes and common international formats
  const postalRegex = /^[A-Za-z0-9\s-]{3,10}$/
  return postalRegex.test(code)
} 