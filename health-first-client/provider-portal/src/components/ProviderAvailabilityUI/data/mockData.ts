import { Provider, AppointmentType, LocationType } from '../types'

export const providers: Provider[] = [
  {
    id: 'provider-1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Family Medicine',
    email: 'sarah.johnson@healthcare.com',
    phone: '(555) 123-4567',
    timezone: 'America/New_York',
    defaultLocation: 'Main Clinic',
    defaultAppointmentDuration: 30,
    defaultBreakDuration: 15,
    maxConcurrentAppointments: 1,
    workingHours: {
      monday: { start: '09:00', end: '17:00', available: true },
      tuesday: { start: '09:00', end: '17:00', available: true },
      wednesday: { start: '09:00', end: '17:00', available: true },
      thursday: { start: '09:00', end: '17:00', available: true },
      friday: { start: '09:00', end: '17:00', available: true },
      saturday: { start: '09:00', end: '13:00', available: true },
      sunday: { start: '00:00', end: '00:00', available: false }
    }
  },
  {
    id: 'provider-2',
    name: 'Dr. Michael Chen',
    specialization: 'Cardiology',
    email: 'michael.chen@healthcare.com',
    phone: '(555) 234-5678',
    timezone: 'America/New_York',
    defaultLocation: 'Cardiology Department',
    defaultAppointmentDuration: 45,
    defaultBreakDuration: 20,
    maxConcurrentAppointments: 1,
    workingHours: {
      monday: { start: '08:00', end: '16:00', available: true },
      tuesday: { start: '08:00', end: '16:00', available: true },
      wednesday: { start: '08:00', end: '16:00', available: true },
      thursday: { start: '08:00', end: '16:00', available: true },
      friday: { start: '08:00', end: '16:00', available: true },
      saturday: { start: '00:00', end: '00:00', available: false },
      sunday: { start: '00:00', end: '00:00', available: false }
    }
  },
  {
    id: 'provider-3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrics',
    email: 'emily.rodriguez@healthcare.com',
    phone: '(555) 345-6789',
    timezone: 'America/New_York',
    defaultLocation: 'Pediatric Clinic',
    defaultAppointmentDuration: 30,
    defaultBreakDuration: 15,
    maxConcurrentAppointments: 2,
    workingHours: {
      monday: { start: '08:30', end: '16:30', available: true },
      tuesday: { start: '08:30', end: '16:30', available: true },
      wednesday: { start: '08:30', end: '16:30', available: true },
      thursday: { start: '08:30', end: '16:30', available: true },
      friday: { start: '08:30', end: '16:30', available: true },
      saturday: { start: '09:00', end: '14:00', available: true },
      sunday: { start: '00:00', end: '00:00', available: false }
    }
  },
  {
    id: 'provider-4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    email: 'james.wilson@healthcare.com',
    phone: '(555) 456-7890',
    timezone: 'America/New_York',
    defaultLocation: 'Orthopedic Center',
    defaultAppointmentDuration: 60,
    defaultBreakDuration: 30,
    maxConcurrentAppointments: 1,
    workingHours: {
      monday: { start: '07:00', end: '15:00', available: true },
      tuesday: { start: '07:00', end: '15:00', available: true },
      wednesday: { start: '07:00', end: '15:00', available: true },
      thursday: { start: '07:00', end: '15:00', available: true },
      friday: { start: '07:00', end: '15:00', available: true },
      saturday: { start: '00:00', end: '00:00', available: false },
      sunday: { start: '00:00', end: '00:00', available: false }
    }
  }
]

export const appointmentTypes: { value: AppointmentType; label: string; icon: string; duration: number }[] = [
  {
    value: 'consultation',
    label: 'Initial Consultation',
    icon: '👨‍⚕️',
    duration: 30
  },
  {
    value: 'follow_up',
    label: 'Follow-up Visit',
    icon: '📋',
    duration: 20
  },
  {
    value: 'emergency',
    label: 'Emergency Visit',
    icon: '🚨',
    duration: 45
  },
  {
    value: 'telemedicine',
    label: 'Telemedicine',
    icon: '📹',
    duration: 25
  },
  {
    value: 'procedure',
    label: 'Medical Procedure',
    icon: '🔬',
    duration: 60
  }
]

export const locationTypes: { value: LocationType; label: string; icon: string }[] = [
  {
    value: 'clinic',
    label: 'Main Clinic',
    icon: '🏥'
  },
  {
    value: 'hospital',
    label: 'Hospital',
    icon: '🏨'
  },
  {
    value: 'telemedicine',
    label: 'Telemedicine',
    icon: '📹'
  },
  {
    value: 'home_visit',
    label: 'Home Visit',
    icon: '🏠'
  },
  {
    value: 'satellite_office',
    label: 'Satellite Office',
    icon: '📍'
  }
]

export const insurancePlans = [
  { id: 'bluecross', name: 'Blue Cross Blue Shield', type: 'PPO' },
  { id: 'aetna', name: 'Aetna', type: 'PPO' },
  { id: 'cigna', name: 'Cigna', type: 'PPO' },
  { id: 'unitedhealth', name: 'UnitedHealthcare', type: 'PPO' },
  { id: 'humana', name: 'Humana', type: 'PPO' },
  { id: 'kaiser', name: 'Kaiser Permanente', type: 'HMO' },
  { id: 'medicare', name: 'Medicare', type: 'Government' },
  { id: 'medicaid', name: 'Medicaid', type: 'Government' },
  { id: 'tricare', name: 'TRICARE', type: 'Military' },
  { id: 'va', name: 'VA Health Care', type: 'Veterans' }
]

export const timezones = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HST)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' }
]

export const slotDurations = [
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' }
]

export const currencies = [
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' },
  { value: 'CAD', label: 'Canadian Dollar (C$)' },
  { value: 'AUD', label: 'Australian Dollar (A$)' },
  { value: 'JPY', label: 'Japanese Yen (¥)' }
]

export const specialRequirements = [
  { id: 'wheelchair', label: 'Wheelchair Accessible', icon: '♿' },
  { id: 'interpreter', label: 'Interpreter Required', icon: '🗣️' },
  { id: 'equipment', label: 'Special Equipment', icon: '🔧' },
  { id: 'privacy', label: 'Private Room', icon: '🔒' },
  { id: 'parking', label: 'Parking Available', icon: '🅿️' },
  { id: 'childcare', label: 'Childcare Available', icon: '👶' },
  { id: 'transportation', label: 'Transportation Provided', icon: '🚗' },
  { id: 'dietary', label: 'Dietary Accommodations', icon: '🍽️' }
]

export const recurrenceDays = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' }
]

export const recurrencePatterns = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'custom', label: 'Custom Pattern' }
] 