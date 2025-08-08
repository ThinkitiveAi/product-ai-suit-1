import React from 'react'
import { CalendarViewProps } from '../types'
import { formatTime, getWeekDates } from '../utils/calendarUtils'
import { cn } from '../../../utils/cn'

const WeekView: React.FC<CalendarViewProps> = ({
  currentDate,
  timeSlots,
  selectedTimeSlots,
  onTimeSlotSelect,
  onTimeSlotUpdate,
  conflicts
}) => {
  const weekDates = getWeekDates(currentDate)
  const timeSlotsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return timeSlots.filter(slot => slot.date === dateString)
  }

  const isSlotSelected = (slotId: string) => {
    return selectedTimeSlots.some(slot => slot.id === slotId)
  }

  const hasConflict = (slotId: string) => {
    return conflicts.some(conflict => conflict.affectedSlots.includes(slotId))
  }

  return (
    <div className="h-full">
      <div className="grid grid-cols-8 gap-1">
        {/* Time column header */}
        <div className="bg-gray-100 p-3 text-center font-medium text-gray-700">
          Time
        </div>
        
        {/* Day headers */}
        {weekDates.map((date, index) => (
          <div key={index} className="bg-gray-100 p-3 text-center font-medium text-gray-700">
            <div className="text-sm font-bold">
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="text-xs text-gray-500">
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
        ))}
        
        {/* Time slots */}
        {Array.from({ length: 24 }, (_, hour) => (
          <React.Fragment key={hour}>
            <div className="bg-gray-50 p-2 text-xs text-gray-500 font-medium border-b border-gray-100">
              {formatTime(`${hour.toString().padStart(2, '0')}:00`)}
            </div>
            
            {weekDates.map((date, dayIndex) => {
              const dateString = date.toISOString().split('T')[0]
              const hourSlots = timeSlots.filter(slot => 
                slot.date === dateString && 
                slot.startTime.startsWith(`${hour.toString().padStart(2, '0')}:`)
              )
              
              return (
                <div key={`${dayIndex}-${hour}`} className="h-12 border-b border-gray-100 relative">
                  {hourSlots.map(slot => (
                    <div
                      key={slot.id}
                      onClick={() => onTimeSlotSelect(slot)}
                      className={cn(
                        "absolute left-1 right-1 top-1 bottom-1 p-1 rounded text-xs font-medium cursor-pointer",
                        "transition-all duration-200",
                        slot.isBooked && "bg-red-100 text-red-800 border border-red-200 cursor-not-allowed",
                        !slot.isBooked && isSlotSelected(slot.id) && "bg-blue-100 text-blue-800 border border-blue-300 ring-2 ring-blue-500",
                        !slot.isBooked && !isSlotSelected(slot.id) && "bg-green-100 text-green-800 border border-green-200 hover:bg-green-200",
                        hasConflict(slot.id) && "bg-orange-100 text-orange-800 border border-orange-200 ring-2 ring-orange-500"
                      )}
                    >
                      <div className="truncate">
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                      </div>
                      <div className="text-xs opacity-75">
                        {slot.appointmentType}
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default WeekView 