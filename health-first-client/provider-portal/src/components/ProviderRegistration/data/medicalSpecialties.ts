export interface MedicalSpecialty {
  id: string
  name: string
  category: string
  description: string
  icon?: string
}

export const medicalSpecialties: MedicalSpecialty[] = [
  // Primary Care
  {
    id: 'family-medicine',
    name: 'Family Medicine',
    category: 'Primary Care',
    description: 'Comprehensive care for all ages'
  },
  {
    id: 'internal-medicine',
    name: 'Internal Medicine',
    category: 'Primary Care',
    description: 'Adult medicine and preventive care'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    category: 'Primary Care',
    description: 'Medical care for infants, children, and adolescents'
  },
  {
    id: 'geriatrics',
    name: 'Geriatrics',
    category: 'Primary Care',
    description: 'Medical care for elderly patients'
  },

  // Surgical Specialties
  {
    id: 'general-surgery',
    name: 'General Surgery',
    category: 'Surgical',
    description: 'Surgical treatment of various conditions'
  },
  {
    id: 'cardiovascular-surgery',
    name: 'Cardiovascular Surgery',
    category: 'Surgical',
    description: 'Surgery of the heart and blood vessels'
  },
  {
    id: 'orthopedic-surgery',
    name: 'Orthopedic Surgery',
    category: 'Surgical',
    description: 'Surgery of the musculoskeletal system'
  },
  {
    id: 'neurosurgery',
    name: 'Neurosurgery',
    category: 'Surgical',
    description: 'Surgery of the nervous system'
  },
  {
    id: 'plastic-surgery',
    name: 'Plastic Surgery',
    category: 'Surgical',
    description: 'Reconstructive and cosmetic surgery'
  },

  // Medical Specialties
  {
    id: 'cardiology',
    name: 'Cardiology',
    category: 'Medical',
    description: 'Heart and cardiovascular system'
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    category: 'Medical',
    description: 'Skin, hair, and nail conditions'
  },
  {
    id: 'endocrinology',
    name: 'Endocrinology',
    category: 'Medical',
    description: 'Hormone and metabolic disorders'
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology',
    category: 'Medical',
    description: 'Digestive system disorders'
  },
  {
    id: 'hematology',
    name: 'Hematology',
    category: 'Medical',
    description: 'Blood disorders and cancers'
  },
  {
    id: 'infectious-disease',
    name: 'Infectious Disease',
    category: 'Medical',
    description: 'Infectious diseases and conditions'
  },
  {
    id: 'nephrology',
    name: 'Nephrology',
    category: 'Medical',
    description: 'Kidney diseases and disorders'
  },
  {
    id: 'neurology',
    name: 'Neurology',
    category: 'Medical',
    description: 'Nervous system disorders'
  },
  {
    id: 'oncology',
    name: 'Oncology',
    category: 'Medical',
    description: 'Cancer diagnosis and treatment'
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology',
    category: 'Medical',
    description: 'Respiratory system disorders'
  },
  {
    id: 'rheumatology',
    name: 'Rheumatology',
    category: 'Medical',
    description: 'Autoimmune and inflammatory diseases'
  },

  // Diagnostic Specialties
  {
    id: 'radiology',
    name: 'Radiology',
    category: 'Diagnostic',
    description: 'Medical imaging and diagnosis'
  },
  {
    id: 'pathology',
    name: 'Pathology',
    category: 'Diagnostic',
    description: 'Disease diagnosis through laboratory analysis'
  },
  {
    id: 'nuclear-medicine',
    name: 'Nuclear Medicine',
    category: 'Diagnostic',
    description: 'Molecular imaging and therapy'
  },

  // Emergency Medicine
  {
    id: 'emergency-medicine',
    name: 'Emergency Medicine',
    category: 'Emergency',
    description: 'Acute care and emergency treatment'
  },
  {
    id: 'critical-care',
    name: 'Critical Care Medicine',
    category: 'Emergency',
    description: 'Intensive care unit medicine'
  },

  // Mental Health
  {
    id: 'psychiatry',
    name: 'Psychiatry',
    category: 'Mental Health',
    description: 'Mental health and behavioral disorders'
  },
  {
    id: 'child-psychiatry',
    name: 'Child & Adolescent Psychiatry',
    category: 'Mental Health',
    description: 'Mental health care for children and teens'
  },

  // Women's Health
  {
    id: 'obstetrics-gynecology',
    name: 'Obstetrics & Gynecology',
    category: 'Women\'s Health',
    description: 'Women\'s reproductive health and pregnancy'
  },
  {
    id: 'maternal-fetal-medicine',
    name: 'Maternal-Fetal Medicine',
    category: 'Women\'s Health',
    description: 'High-risk pregnancy care'
  },

  // Other Specialties
  {
    id: 'anesthesiology',
    name: 'Anesthesiology',
    category: 'Other',
    description: 'Anesthesia and pain management'
  },
  {
    id: 'physical-medicine',
    name: 'Physical Medicine & Rehabilitation',
    category: 'Other',
    description: 'Physical therapy and rehabilitation'
  },
  {
    id: 'preventive-medicine',
    name: 'Preventive Medicine',
    category: 'Other',
    description: 'Disease prevention and public health'
  },
  {
    id: 'sports-medicine',
    name: 'Sports Medicine',
    category: 'Other',
    description: 'Athletic injuries and performance'
  },
  {
    id: 'sleep-medicine',
    name: 'Sleep Medicine',
    category: 'Other',
    description: 'Sleep disorders and conditions'
  },
  {
    id: 'pain-medicine',
    name: 'Pain Medicine',
    category: 'Other',
    description: 'Chronic pain management'
  },
  {
    id: 'hospice-palliative',
    name: 'Hospice & Palliative Medicine',
    category: 'Other',
    description: 'End-of-life and comfort care'
  }
]

export const specialtyCategories = [
  'Primary Care',
  'Surgical',
  'Medical',
  'Diagnostic',
  'Emergency',
  'Mental Health',
  'Women\'s Health',
  'Other'
]

export const searchSpecialties = (query: string): MedicalSpecialty[] => {
  const lowercaseQuery = query.toLowerCase()
  return medicalSpecialties.filter(specialty =>
    specialty.name.toLowerCase().includes(lowercaseQuery) ||
    specialty.description.toLowerCase().includes(lowercaseQuery) ||
    specialty.category.toLowerCase().includes(lowercaseQuery)
  )
}

export const getSpecialtiesByCategory = (category: string): MedicalSpecialty[] => {
  return medicalSpecialties.filter(specialty => specialty.category === category)
} 