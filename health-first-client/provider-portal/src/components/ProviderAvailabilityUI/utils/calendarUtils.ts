import { TimeSlot, ConflictType, AvailabilityTemplate, Provider } from '../types'

// Generate time slots for a given date and provider
export const generateTimeSlots = (date: Date, providerId: string): TimeSlot[] => {
  const slots: TimeSlot[] = []
  const dateString = date.toISOString().split('T')[0]
  
  // Mock data - in real app, this would come from API
  const mockSlots: TimeSlot[] = [
    {
      id: `slot-${dateString}-09:00`,
      providerId,
      date: dateString,
      startTime: '09:00',
      endTime: '09:30',
      timezone: 'America/New_York',
      slotDuration: 30,
      breakDuration: 15,
      maxAppointmentsPerSlot: 1,
      appointmentType: 'consultation',
      locationType: 'clinic',
      locationAddress: '123 Main St, City, State',
      specialRequirements: [],
      baseFee: 150,
      currency: 'USD',
      insuranceAccepted: true,
      acceptedInsurancePlans: ['bluecross', 'aetna'],
      isBooked: false,
      isRecurring: false,
      recurrenceExceptions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: `slot-${dateString}-09:45`,
      providerId,
      date: dateString,
      startTime: '09:45',
      endTime: '10:15',
      timezone: 'America/New_York',
      slotDuration: 30,
      breakDuration: 15,
      maxAppointmentsPerSlot: 1,
      appointmentType: 'follow_up',
      locationType: 'clinic',
      locationAddress: '123 Main St, City, State',
      specialRequirements: [],
      baseFee: 120,
      currency: 'USD',
      insuranceAccepted: true,
      acceptedInsurancePlans: ['bluecross', 'aetna'],
      isBooked: true,
      isRecurring: false,
      recurrenceExceptions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: `slot-${dateString}-10:30`,
      providerId,
      date: dateString,
      startTime: '10:30',
      endTime: '11:00',
      timezone: 'America/New_York',
      slotDuration: 30,
      breakDuration: 15,
      maxAppointmentsPerSlot: 1,
      appointmentType: 'consultation',
      locationType: 'clinic',
      locationAddress: '123 Main St, City, State',
      specialRequirements: [],
      baseFee: 150,
      currency: 'USD',
      insuranceAccepted: true,
      acceptedInsurancePlans: ['bluecross', 'aetna'],
      isBooked: false,
      isRecurring: false,
      recurrenceExceptions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
  
  return mockSlots
}

// Detect conflicts in time slots
export const detectConflicts = (timeSlots: TimeSlot[]): ConflictType[] => {
  const conflicts: ConflictType[] = []
  
  // Check for overlapping appointments
  for (let i = 0; i < timeSlots.length; i++) {
    for (let j = i + 1; j < timeSlots.length; j++) {
      const slot1 = timeSlots[i]
      const slot2 = timeSlots[j]
      
      if (slot1.date === slot2.date && slot1.providerId === slot2.providerId) {
        const start1 = new Date(`${slot1.date}T${slot1.startTime}`)
        const end1 = new Date(`${slot1.date}T${slot1.endTime}`)
        const start2 = new Date(`${slot2.date}T${slot2.startTime}`)
        const end2 = new Date(`${slot2.date}T${slot2.endTime}`)
        
        if (start1 < end2 && start2 < end1) {
          conflicts.push({
            id: `conflict-${slot1.id}-${slot2.id}`,
            type: 'overlapping',
            severity: 'high',
            description: `Overlapping appointments: ${slot1.startTime}-${slot1.endTime} and ${slot2.startTime}-${slot2.endTime}`,
            affectedSlots: [slot1.id, slot2.id],
            suggestedResolution: 'Adjust one of the appointment times to avoid overlap'
          })
        }
      }
    }
  }
  
  // Check for buffer time violations
  timeSlots.forEach(slot => {
    if (slot.breakDuration > 0) {
      const slotEnd = new Date(`${slot.date}T${slot.endTime}`)
      const nextSlot = timeSlots.find(s => 
        s.date === slot.date && 
        s.providerId === slot.providerId &&
        s.startTime === slot.endTime
      )
      
      if (nextSlot && slot.breakDuration > 0) {
        conflicts.push({
          id: `buffer-${slot.id}`,
          type: 'buffer_violation',
          severity: 'medium',
          description: `Insufficient buffer time between appointments`,
          affectedSlots: [slot.id, nextSlot.id],
          suggestedResolution: 'Increase buffer time or adjust appointment duration'
        })
      }
    }
  })
  
  return conflicts
}

// Apply template to generate time slots
export const applyTemplate = (template: AvailabilityTemplate, startDate: Date, providerId: string): TimeSlot[] => {
  const slots: TimeSlot[] = []
  const startDateString = startDate.toISOString().split('T')[0]
  
  // Generate slots for the next 4 weeks based on template
  for (let week = 0; week < 4; week++) {
    const weekStart = new Date(startDate)
    weekStart.setDate(weekStart.getDate() + (week * 7))
    
    Object.entries(template.weeklyPattern).forEach(([day, daySlots]) => {
      const dayDate = new Date(weekStart)
      const dayIndex = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day)
      dayDate.setDate(dayDate.getDate() + dayIndex)
      
      daySlots.forEach((templateSlot, index) => {
        const slot: TimeSlot = {
          ...templateSlot,
          id: `template-${dayDate.toISOString().split('T')[0]}-${templateSlot.startTime}-${index}`,
          providerId,
          date: dayDate.toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        slots.push(slot)
      })
    })
  }
  
  return slots
}

// Format time for display
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

// Get week dates for a given date
export const getWeekDates = (date: Date): Date[] => {
  const week: Date[] = []
  const startOfWeek = new Date(date)
  const day = startOfWeek.getDay()
  startOfWeek.setDate(startOfWeek.getDate() - day)
  
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(startOfWeek)
    dayDate.setDate(dayDate.getDate() + i)
    week.push(dayDate)
  }
  
  return week
}

// Get month dates for a given date
export const getMonthDates = (date: Date): Date[] => {
  const dates: Date[] = []
  const year = date.getFullYear()
  const month = date.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const endDate = new Date(lastDay)
  endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()))
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d))
  }
  
  return dates
}

// Check if two time slots overlap
export const doSlotsOverlap = (slot1: TimeSlot, slot2: TimeSlot): boolean => {
  if (slot1.date !== slot2.date || slot1.providerId !== slot2.providerId) {
    return false
  }
  
  const start1 = new Date(`${slot1.date}T${slot1.startTime}`)
  const end1 = new Date(`${slot1.date}T${slot1.endTime}`)
  const start2 = new Date(`${slot2.date}T${slot2.startTime}`)
  const end2 = new Date(`${slot2.date}T${slot2.endTime}`)
  
  return start1 < end2 && start2 < end1
}

// Get time slots for a specific date
export const getTimeSlotsForDate = (timeSlots: TimeSlot[], date: string): TimeSlot[] => {
  return timeSlots.filter(slot => slot.date === date)
}

// Get time slots for a specific provider
export const getTimeSlotsForProvider = (timeSlots: TimeSlot[], providerId: string): TimeSlot[] => {
  return timeSlots.filter(slot => slot.providerId === providerId)
}

// Calculate availability density for a date
export const calculateAvailabilityDensity = (timeSlots: TimeSlot[], date: string): number => {
  const daySlots = getTimeSlotsForDate(timeSlots, date)
  const availableSlots = daySlots.filter(slot => !slot.isBooked)
  return availableSlots.length / Math.max(daySlots.length, 1)
}

// Get working hours for a provider on a specific day
export const getWorkingHours = (provider: Provider, dayOfWeek: string): { start: string; end: string; available: boolean } => {
  const dayKey = dayOfWeek.toLowerCase() as keyof typeof provider.workingHours
  return provider.workingHours[dayKey]
}

// Check if a time slot is within working hours
export const isWithinWorkingHours = (slot: TimeSlot, provider: Provider): boolean => {
  const dayOfWeek = new Date(slot.date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
  const workingHours = getWorkingHours(provider, dayOfWeek)
  
  if (!workingHours.available) return false
  
  const slotStart = slot.startTime
  const slotEnd = slot.endTime
  const workStart = workingHours.start
  const workEnd = workingHours.end
  
  return slotStart >= workStart && slotEnd <= workEnd
} 