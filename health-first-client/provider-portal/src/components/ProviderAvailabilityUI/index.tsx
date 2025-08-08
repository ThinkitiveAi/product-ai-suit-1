import React, { useState, useCallback, useMemo } from 'react'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Move,
  AlertTriangle,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Grid,
  List,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Users,
  DollarSign,
  Shield,
  Video,
  Home,
  Building,
  Car,
  LogOut
} from 'lucide-react'
import { cn } from '../../utils/cn'
import CalendarHeader from './components/CalendarHeader'
import MonthView from './components/MonthView'
import WeekView from './components/WeekView'
import DayView from './components/DayView'
import TimeSlotGrid from './components/TimeSlotGrid'
import AvailabilityOverlay from './components/AvailabilityOverlay'
import AvailabilityForm from './components/AvailabilityForm'
import TemplateManager from './components/TemplateManager'
import ConflictResolver from './components/ConflictResolver'
import BulkOperations from './components/BulkOperations'
import { 
  ViewMode, 
  TimeSlot, 
  AvailabilityTemplate, 
  AppointmentType, 
  LocationType,
  ConflictType,
  Provider
} from './types'
import { generateTimeSlots, detectConflicts, applyTemplate } from './utils/calendarUtils'
import { providers, appointmentTypes, locationTypes, insurancePlans } from './data/mockData'
import styles from './ProviderAvailabilityUI.module.css'

interface ProviderAvailabilityUIProps {
  onAddAvailability?: () => void
  onLogout?: () => void
}

const ProviderAvailabilityUI: React.FC<ProviderAvailabilityUIProps> = ({ 
  onAddAvailability, 
  onLogout 
}) => {
  // Core state management
  const [viewMode, setViewMode] = useState<ViewMode>('week')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(providers[0])
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([])
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false)
  const [showTemplateManager, setShowTemplateManager] = useState(false)
  const [showConflictResolver, setShowConflictResolver] = useState(false)
  const [showBulkOperations, setShowBulkOperations] = useState(false)
  const [conflicts, setConflicts] = useState<ConflictType[]>([])
  const [templates, setTemplates] = useState<AvailabilityTemplate[]>([])

  // Calendar data
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(() => 
    generateTimeSlots(currentDate, selectedProvider?.id || '')
  )

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    const newDate = new Date(currentDate)
    switch (viewMode) {
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1)
        break
      case 'week':
        newDate.setDate(newDate.getDate() - 7)
        break
      case 'day':
        newDate.setDate(newDate.getDate() - 1)
        break
    }
    setCurrentDate(newDate)
  }, [currentDate, viewMode])

  const handleNext = useCallback(() => {
    const newDate = new Date(currentDate)
    switch (viewMode) {
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1)
        break
      case 'week':
        newDate.setDate(newDate.getDate() + 7)
        break
      case 'day':
        newDate.setDate(newDate.getDate() + 1)
        break
    }
    setCurrentDate(newDate)
  }, [currentDate, viewMode])

  const handleToday = useCallback(() => {
    setCurrentDate(new Date())
  }, [])

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode)
  }, [])

  // Time slot management
  const handleTimeSlotSelect = useCallback((slot: TimeSlot) => {
    setSelectedTimeSlots(prev => {
      const exists = prev.find(s => s.id === slot.id)
      if (exists) {
        return prev.filter(s => s.id !== slot.id)
      } else {
        return [...prev, slot]
      }
    })
  }, [])

  const handleTimeSlotUpdate = useCallback((updatedSlot: TimeSlot) => {
    setTimeSlots(prev => 
      prev.map(slot => slot.id === updatedSlot.id ? updatedSlot : slot)
    )
  }, [])

  const handleTimeSlotDelete = useCallback((slotId: string) => {
    setTimeSlots(prev => prev.filter(slot => slot.id !== slotId))
    setSelectedTimeSlots(prev => prev.filter(slot => slot.id !== slotId))
  }, [])

  // Conflict detection
  const detectedConflicts = useMemo(() => {
    return detectConflicts(timeSlots)
  }, [timeSlots])

  // Calendar view components
  const renderCalendarView = () => {
    const commonProps = {
      currentDate,
      timeSlots,
      selectedTimeSlots,
      onTimeSlotSelect: handleTimeSlotSelect,
      onTimeSlotUpdate: handleTimeSlotUpdate,
      conflicts: detectedConflicts
    }

    switch (viewMode) {
      case 'month':
        return <MonthView {...commonProps} />
      case 'week':
        return <WeekView {...commonProps} />
      case 'day':
        return <DayView {...commonProps} />
      default:
        return <WeekView {...commonProps} />
    }
  }

  // Bulk operations
  const handleBulkAction = useCallback((action: string) => {
    if (selectedTimeSlots.length === 0) return

    switch (action) {
      case 'delete':
        selectedTimeSlots.forEach(slot => handleTimeSlotDelete(slot.id))
        setSelectedTimeSlots([])
        break
      case 'copy':
        // Implement copy functionality
        break
      case 'move':
        // Implement move functionality
        break
    }
  }, [selectedTimeSlots, handleTimeSlotDelete])

  // Handle add availability button click
  const handleAddAvailabilityClick = useCallback(() => {
    if (onAddAvailability) {
      onAddAvailability()
    } else {
      setShowAvailabilityForm(true)
    }
  }, [onAddAvailability])

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Provider Availability</h1>
          <div className={styles.providerSelector}>
            <User className={styles.providerIcon} />
            <select
              value={selectedProvider?.id || ''}
              onChange={(e) => {
                const provider = providers.find(p => p.id === e.target.value)
                setSelectedProvider(provider || null)
              }}
              className={styles.providerSelect}
            >
              {providers.map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} - {provider.specialization}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.headerRight}>
          <button
            onClick={handleAddAvailabilityClick}
            className={styles.addButton}
          >
            <Plus className={styles.addIcon} />
            Add Availability
          </button>
          
          <button
            onClick={() => setShowTemplateManager(true)}
            className={styles.templateButton}
          >
            <Settings className={styles.templateIcon} />
            Templates
          </button>

          {selectedTimeSlots.length > 0 && (
            <button
              onClick={() => setShowBulkOperations(true)}
              className={styles.bulkButton}
            >
              Bulk Actions ({selectedTimeSlots.length})
            </button>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Calendar Header */}
      <CalendarHeader
        viewMode={viewMode}
        currentDate={currentDate}
        onViewModeChange={handleViewModeChange}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        conflicts={detectedConflicts}
      />

      {/* Main Calendar Area */}
      <div className={styles.calendarContainer}>
        <div className={styles.calendarContent}>
          {renderCalendarView()}
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>Quick Stats</h3>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <Clock className={styles.statIcon} />
                <div>
                  <span className={styles.statValue}>{timeSlots.length}</span>
                  <span className={styles.statLabel}>Available Slots</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <AlertTriangle className={styles.statIcon} />
                <div>
                  <span className={styles.statValue}>{detectedConflicts.length}</span>
                  <span className={styles.statLabel}>Conflicts</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <CheckCircle className={styles.statIcon} />
                <div>
                  <span className={styles.statValue}>
                    {timeSlots.filter(slot => slot.isBooked).length}
                  </span>
                  <span className={styles.statLabel}>Booked</span>
                </div>
              </div>
            </div>
          </div>

          {detectedConflicts.length > 0 && (
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Conflicts</h3>
              <button
                onClick={() => setShowConflictResolver(true)}
                className={styles.resolveButton}
              >
                Resolve Conflicts
              </button>
            </div>
          )}

          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>Selected Slots</h3>
            {selectedTimeSlots.length === 0 ? (
              <p className={styles.noSelection}>No slots selected</p>
            ) : (
              <div className={styles.selectedSlots}>
                {selectedTimeSlots.map(slot => (
                  <div key={slot.id} className={styles.selectedSlot}>
                    <span className={styles.slotTime}>
                      {slot.startTime} - {slot.endTime}
                    </span>
                    <button
                      onClick={() => handleTimeSlotSelect(slot)}
                      className={styles.removeSlot}
                    >
                      <X className={styles.removeIcon} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAvailabilityForm && (
        <AvailabilityForm
          onClose={() => setShowAvailabilityForm(false)}
          onSubmit={(data) => {
            // Handle form submission
            setShowAvailabilityForm(false)
          }}
          provider={selectedProvider}
          currentDate={currentDate}
        />
      )}

      {showTemplateManager && (
        <TemplateManager
          onClose={() => setShowTemplateManager(false)}
          templates={templates}
          onTemplateApply={(template) => {
            const updatedSlots = applyTemplate(template, currentDate, selectedProvider?.id || '')
            setTimeSlots(prev => [...prev, ...updatedSlots])
            setShowTemplateManager(false)
          }}
        />
      )}

      {showConflictResolver && (
        <ConflictResolver
          onClose={() => setShowConflictResolver(false)}
          conflicts={detectedConflicts}
          onResolve={(resolutions) => {
            // Handle conflict resolution
            setShowConflictResolver(false)
          }}
        />
      )}

      {showBulkOperations && (
        <BulkOperations
          onClose={() => setShowBulkOperations(false)}
          selectedSlots={selectedTimeSlots}
          onAction={handleBulkAction}
        />
      )}
    </div>
  )
}

export default ProviderAvailabilityUI 