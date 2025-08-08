import React, { useState } from 'react'
import { 
  ArrowLeft, 
  ChevronDown, 
  Calendar, 
  Clock, 
  Trash2, 
  Plus,
  User,
  LogOut
} from 'lucide-react'
import { cn } from '../../utils/cn'
import styles from './ProviderAvailabilityModule.module.css'

interface WeeklySchedule {
  id: string
  day: string
  fromTime: string
  tillTime: string
}

interface BlockDay {
  id: string
  date: string
  fromTime: string
  tillTime: string
}

interface ProviderAvailabilityModuleProps {
  onLogout?: () => void
}

const ProviderAvailabilityModule: React.FC<ProviderAvailabilityModuleProps> = ({ onLogout }) => {
  // Tab state
  const [activeTab, setActiveTab] = useState('availability')
  
  // Clinician selection
  const [selectedClinician, setSelectedClinician] = useState('john-doe')
  const [showClinicianDropdown, setShowClinicianDropdown] = useState(false)
  
  // Date range
  const [startDate, setStartDate] = useState('2025-06-19')
  const [endDate, setEndDate] = useState('2025-06-25')
  const [showDateRangePicker, setShowDateRangePicker] = useState(false)
  
  // Weekly schedule
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule[]>([
    { id: '1', day: 'monday', fromTime: '09:00', tillTime: '18:00' },
    { id: '2', day: 'tuesday', fromTime: '09:00', tillTime: '18:00' },
    { id: '3', day: 'wednesday', fromTime: '09:00', tillTime: '18:00' },
    { id: '4', day: 'thursday', fromTime: '09:00', tillTime: '18:00' },
    { id: '5', day: 'friday', fromTime: '09:00', tillTime: '18:00' },
    { id: '6', day: 'saturday', fromTime: '09:00', tillTime: '18:00' }
  ])
  
  // Block days
  const [blockDays, setBlockDays] = useState<BlockDay[]>([
    { id: '1', date: '', fromTime: '', tillTime: '' },
    { id: '2', date: '', fromTime: '', tillTime: '' }
  ])
  
  // Time zone
  const [timezone, setTimezone] = useState('')
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false)
  
  // Dropdown options
  const clinicians = [
    { id: 'john-doe', name: 'John Doe' },
    { id: 'jane-smith', name: 'Jane Smith' },
    { id: 'mike-johnson', name: 'Mike Johnson' }
  ]
  
  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ]
  
  const timezones = [
    { value: 'america/new_york', label: 'Eastern Time (ET)' },
    { value: 'america/chicago', label: 'Central Time (CT)' },
    { value: 'america/denver', label: 'Mountain Time (MT)' },
    { value: 'america/los_angeles', label: 'Pacific Time (PT)' }
  ]
  
  const tabs = [
    { id: 'availability', label: 'Availability' },
    { id: 'profile', label: 'Profile' },
    { id: 'forms', label: 'Forms' },
    { id: 'fee-schedule', label: 'Fee Schedule' },
    { id: 'group-settings', label: 'Group Settings' },
    { id: 'agreements', label: 'Agreements' },
    { id: 'audit-logs', label: 'Audit Logs' }
  ]
  
  // Helper functions
  const formatTime = (time: string) => {
    if (!time) return ''
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }
  
  const formatDate = (date: string) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit'
    })
  }
  
  // Event handlers
  const handleAddWeeklySchedule = () => {
    const newSchedule: WeeklySchedule = {
      id: Date.now().toString(),
      day: 'monday',
      fromTime: '09:00',
      tillTime: '18:00'
    }
    setWeeklySchedule([...weeklySchedule, newSchedule])
  }
  
  const handleRemoveWeeklySchedule = (id: string) => {
    setWeeklySchedule(weeklySchedule.filter(schedule => schedule.id !== id))
  }
  
  const handleUpdateWeeklySchedule = (id: string, field: keyof WeeklySchedule, value: string) => {
    setWeeklySchedule(weeklySchedule.map(schedule => 
      schedule.id === id ? { ...schedule, [field]: value } : schedule
    ))
  }
  
  const handleAddBlockDay = () => {
    const newBlockDay: BlockDay = {
      id: Date.now().toString(),
      date: '',
      fromTime: '',
      tillTime: ''
    }
    setBlockDays([...blockDays, newBlockDay])
  }
  
  const handleRemoveBlockDay = (id: string) => {
    setBlockDays(blockDays.filter(blockDay => blockDay.id !== id))
  }
  
  const handleUpdateBlockDay = (id: string, field: keyof BlockDay, value: string) => {
    setBlockDays(blockDays.map(blockDay => 
      blockDay.id === id ? { ...blockDay, [field]: value } : blockDay
    ))
  }
  
  const handleSave = () => {
    console.log('Saving availability settings:', {
      clinician: selectedClinician,
      dateRange: { startDate, endDate },
      weeklySchedule,
      blockDays,
      timezone
    })
    // Here you would typically make an API call to save the data
  }
  
  return (
    <div className={styles.container}>
      {/* Back Navigation */}
      <div className={styles.backNavigation}>
        <div className="flex items-center justify-between">
          <button className={styles.backButton}>
            <ArrowLeft className={styles.backIcon} />
            <span>Other Settings</span>
          </button>
          
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
      
      {/* Header Tabs */}
      <div className={styles.tabContainer}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              styles.tab,
              activeTab === tab.id && styles.activeTab
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Column - Day Wise Availability */}
        <div className={styles.leftColumn}>
          <h2 className={styles.sectionTitle}>Day Wise Availability</h2>
          
          {/* Clinician Selection */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Clinician</label>
            <div className={styles.dropdownContainer}>
              <button
                className={styles.dropdownButton}
                onClick={() => setShowClinicianDropdown(!showClinicianDropdown)}
              >
                <User className={styles.dropdownIcon} />
                <span>
                  {clinicians.find(c => c.id === selectedClinician)?.name || 'Select Clinician'}
                </span>
                <ChevronDown className={styles.chevronIcon} />
              </button>
              {showClinicianDropdown && (
                <div className={styles.dropdownMenu}>
                  {clinicians.map(clinician => (
                    <button
                      key={clinician.id}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setSelectedClinician(clinician.id)
                        setShowClinicianDropdown(false)
                      }}
                    >
                      {clinician.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Date Range Selector */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Select Date Range</label>
            <div className={styles.dateRangeContainer}>
              <div className={styles.dateInputGroup}>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={styles.dateInput}
                />
                <Calendar className={styles.calendarIcon} />
              </div>
              <span className={styles.dateRangeSeparator}>to</span>
              <div className={styles.dateInputGroup}>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={styles.dateInput}
                />
                <Calendar className={styles.calendarIcon} />
              </div>
              <button className={styles.expandButton}>
                <ChevronDown className={styles.chevronIcon} />
              </button>
              <button className={styles.deleteButton}>
                <Trash2 className={styles.deleteIcon} />
              </button>
            </div>
          </div>
          
          {/* Weekly Schedule Grid */}
          <div className={styles.scheduleContainer}>
            <div className={styles.scheduleHeader}>
              <div className={styles.scheduleColumn}>Day</div>
              <div className={styles.scheduleColumn}>From</div>
              <div className={styles.scheduleColumn}>Till</div>
              <div className={styles.scheduleColumn}></div>
            </div>
            
            <div className={styles.scheduleRows}>
              {weeklySchedule.map((schedule) => (
                <div key={schedule.id} className={styles.scheduleRow}>
                  <div className={styles.scheduleColumn}>
                    <select
                      value={schedule.day}
                      onChange={(e) => handleUpdateWeeklySchedule(schedule.id, 'day', e.target.value)}
                      className={styles.daySelect}
                    >
                      {daysOfWeek.map(day => (
                        <option key={day.value} value={day.value}>
                          {day.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.scheduleColumn}>
                    <div className={styles.timeInputGroup}>
                      <input
                        type="time"
                        value={schedule.fromTime}
                        onChange={(e) => handleUpdateWeeklySchedule(schedule.id, 'fromTime', e.target.value)}
                        className={styles.timeInput}
                      />
                      <Clock className={styles.clockIcon} />
                    </div>
                  </div>
                  <div className={styles.scheduleColumn}>
                    <div className={styles.timeInputGroup}>
                      <input
                        type="time"
                        value={schedule.tillTime}
                        onChange={(e) => handleUpdateWeeklySchedule(schedule.id, 'tillTime', e.target.value)}
                        className={styles.timeInput}
                      />
                      <Clock className={styles.clockIcon} />
                    </div>
                  </div>
                  <div className={styles.scheduleColumn}>
                    <button
                      onClick={() => handleRemoveWeeklySchedule(schedule.id)}
                      className={styles.deleteRowButton}
                    >
                      <Trash2 className={styles.deleteIcon} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Add Buttons */}
          <div className={styles.buttonGroup}>
            <button className={styles.addButton}>
              <Plus className={styles.addIcon} />
              Add Availability
            </button>
            <button className={styles.addMoreButton} onClick={handleAddWeeklySchedule}>
              <Plus className={styles.addIcon} />
              Add More
            </button>
          </div>
        </div>
        
        {/* Right Column - Settings */}
        <div className={styles.rightColumn}>
          {/* Slot Creation Setting */}
          <div className={styles.settingsSection}>
            <h3 className={styles.settingsTitle}>Slot Creation Setting</h3>
            <div className={styles.formGroup}>
              <label className={styles.label}>Time Zone</label>
              <div className={styles.dropdownContainer}>
                <button
                  className={styles.dropdownButton}
                  onClick={() => setShowTimezoneDropdown(!showTimezoneDropdown)}
                >
                  <span>
                    {timezones.find(tz => tz.value === timezone)?.label || 'Select Time Zone'}
                  </span>
                  <ChevronDown className={styles.chevronIcon} />
                </button>
                {showTimezoneDropdown && (
                  <div className={styles.dropdownMenu}>
                    {timezones.map(tz => (
                      <button
                        key={tz.value}
                        className={styles.dropdownItem}
                        onClick={() => {
                          setTimezone(tz.value)
                          setShowTimezoneDropdown(false)
                        }}
                      >
                        {tz.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Block Days */}
          <div className={styles.settingsSection}>
            <h3 className={styles.settingsTitle}>Block Days</h3>
            <div className={styles.blockDaysContainer}>
              {blockDays.map((blockDay) => (
                <div key={blockDay.id} className={styles.blockDayRow}>
                  <div className={styles.blockDayColumn}>
                    <div className={styles.dateInputGroup}>
                      <input
                        type="date"
                        value={blockDay.date}
                        onChange={(e) => handleUpdateBlockDay(blockDay.id, 'date', e.target.value)}
                        className={styles.dateInput}
                        placeholder="Select Date"
                      />
                      <Calendar className={styles.calendarIcon} />
                    </div>
                  </div>
                  <div className={styles.blockDayColumn}>
                    <div className={styles.timeInputGroup}>
                      <input
                        type="time"
                        value={blockDay.fromTime}
                        onChange={(e) => handleUpdateBlockDay(blockDay.id, 'fromTime', e.target.value)}
                        className={styles.timeInput}
                        placeholder="Select Start Time"
                      />
                      <Clock className={styles.clockIcon} />
                    </div>
                  </div>
                  <div className={styles.blockDayColumn}>
                    <div className={styles.timeInputGroup}>
                      <input
                        type="time"
                        value={blockDay.tillTime}
                        onChange={(e) => handleUpdateBlockDay(blockDay.id, 'tillTime', e.target.value)}
                        className={styles.timeInput}
                        placeholder="Select End Time"
                      />
                      <Clock className={styles.clockIcon} />
                    </div>
                  </div>
                  <div className={styles.blockDayColumn}>
                    <button
                      onClick={() => handleRemoveBlockDay(blockDay.id)}
                      className={styles.deleteRowButton}
                    >
                      <Trash2 className={styles.deleteIcon} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.addBlockDaysButton} onClick={handleAddBlockDay}>
              <Plus className={styles.addIcon} />
              Add Block Days
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Action Buttons */}
      <div className={styles.actionButtons}>
        <button className={styles.cancelButton}>
          Cancel
        </button>
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default ProviderAvailabilityModule 