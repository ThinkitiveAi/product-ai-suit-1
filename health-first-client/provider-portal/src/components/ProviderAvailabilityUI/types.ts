export type ViewMode = 'month' | 'week' | 'day' | 'agenda'

export type AppointmentType = 
  | 'consultation' 
  | 'follow_up' 
  | 'emergency' 
  | 'telemedicine' 
  | 'procedure'

export type LocationType = 
  | 'clinic' 
  | 'hospital' 
  | 'telemedicine' 
  | 'home_visit' 
  | 'satellite_office'

export type RecurrencePattern = 'daily' | 'weekly' | 'monthly' | 'custom'

export type ConflictType = {
  id: string
  type: 'overlapping' | 'double_booking' | 'buffer_violation' | 'location_conflict'
  severity: 'low' | 'medium' | 'high'
  description: string
  affectedSlots: string[]
  suggestedResolution?: string
}

export type TimeSlot = {
  id: string
  providerId: string
  date: string // YYYY-MM-DD format
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  timezone: string
  slotDuration: number // minutes
  breakDuration: number // minutes
  maxAppointmentsPerSlot: number
  appointmentType: AppointmentType
  locationType: LocationType
  locationAddress?: string
  roomNumber?: string
  virtualMeetingLink?: string
  specialRequirements: string[]
  baseFee: number
  currency: string
  insuranceAccepted: boolean
  acceptedInsurancePlans: string[]
  copayAmount?: number
  billingCode?: string
  isBooked: boolean
  isRecurring: boolean
  recurrencePattern?: RecurrencePattern
  recurrenceDays?: string[]
  recurrenceEndDate?: string
  recurrenceExceptions: string[]
  templateName?: string
  createdAt: string
  updatedAt: string
}

export type Provider = {
  id: string
  name: string
  specialization: string
  email: string
  phone: string
  timezone: string
  defaultLocation: string
  defaultAppointmentDuration: number
  defaultBreakDuration: number
  maxConcurrentAppointments: number
  workingHours: {
    monday: { start: string; end: string; available: boolean }
    tuesday: { start: string; end: string; available: boolean }
    wednesday: { start: string; end: string; available: boolean }
    thursday: { start: string; end: string; available: boolean }
    friday: { start: string; end: string; available: boolean }
    saturday: { start: string; end: string; available: boolean }
    sunday: { start: string; end: string; available: boolean }
  }
}

export type AvailabilityTemplate = {
  id: string
  name: string
  description: string
  providerId: string
  weeklyPattern: {
    monday: TimeSlot[]
    tuesday: TimeSlot[]
    wednesday: TimeSlot[]
    thursday: TimeSlot[]
    friday: TimeSlot[]
    saturday: TimeSlot[]
    sunday: TimeSlot[]
  }
  defaultSettings: {
    slotDuration: number
    breakDuration: number
    appointmentType: AppointmentType
    locationType: LocationType
    baseFee: number
    currency: string
    insuranceAccepted: boolean
  }
  isFavorite: boolean
  createdAt: string
  updatedAt: string
}

export type BulkOperation = {
  id: string
  type: 'delete' | 'modify' | 'copy' | 'move' | 'duplicate'
  selectedSlots: string[]
  targetDate?: string
  modifications?: Partial<TimeSlot>
}

export type CalendarViewProps = {
  currentDate: Date
  timeSlots: TimeSlot[]
  selectedTimeSlots: TimeSlot[]
  onTimeSlotSelect: (slot: TimeSlot) => void
  onTimeSlotUpdate: (slot: TimeSlot) => void
  conflicts: ConflictType[]
}

export type AvailabilityFormData = {
  providerId: string
  availabilityDate: string
  startTime: string
  endTime: string
  timezone: string
  slotDuration: number
  breakDuration: number
  maxAppointmentsPerSlot: number
  appointmentType: AppointmentType
  locationType: LocationType
  locationAddress?: string
  roomNumber?: string
  virtualMeetingLink?: string
  specialRequirements: string[]
  baseFee: number
  currency: string
  insuranceAccepted: boolean
  acceptedInsurancePlans: string[]
  copayAmount?: number
  billingCode?: string
  isRecurring: boolean
  recurrencePattern?: RecurrencePattern
  recurrenceDays?: string[]
  recurrenceEndDate?: string
  recurrenceExceptions: string[]
  templateName?: string
}

export type ConflictResolution = {
  conflictId: string
  resolution: 'adjust_time' | 'change_location' | 'split_slot' | 'cancel_slot' | 'ignore'
  adjustments?: {
    newStartTime?: string
    newEndTime?: string
    newLocation?: string
    newDate?: string
  }
}

export type CalendarNavigationProps = {
  viewMode: ViewMode
  currentDate: Date
  onViewModeChange: (mode: ViewMode) => void
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
  conflicts: ConflictType[]
}

export type TimeSlotGridProps = {
  timeSlots: TimeSlot[]
  selectedSlots: TimeSlot[]
  onSlotSelect: (slot: TimeSlot) => void
  onSlotUpdate: (slot: TimeSlot) => void
  conflicts: ConflictType[]
  viewMode: ViewMode
  currentDate: Date
}

export type AvailabilityOverlayProps = {
  timeSlot: TimeSlot
  isSelected: boolean
  hasConflict: boolean
  conflictType?: string
  onSelect: (slot: TimeSlot) => void
  onEdit: (slot: TimeSlot) => void
  onDelete: (slotId: string) => void
} 