import React from 'react'
import { ChevronLeft, ChevronRight, Calendar, Grid, List } from 'lucide-react'
import { ViewMode, ConflictType } from '../types'
import { cn } from '../../../utils/cn'

interface CalendarHeaderProps {
  viewMode: ViewMode
  currentDate: Date
  onViewModeChange: (mode: ViewMode) => void
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
  conflicts: ConflictType[]
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  viewMode,
  currentDate,
  onViewModeChange,
  onPrevious,
  onNext,
  onToday,
  conflicts
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    })
  }

  const formatWeekRange = (date: Date) => {
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    startOfWeek.setDate(startOfWeek.getDate() - day)
    
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 6)
    
    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
  }

  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDateDisplay = () => {
    switch (viewMode) {
      case 'month':
        return formatDate(currentDate)
      case 'week':
        return formatWeekRange(currentDate)
      case 'day':
        return formatDay(currentDate)
      default:
        return formatDate(currentDate)
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onPrevious}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={onNext}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={onToday}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors duration-200"
          >
            Today
          </button>
          
          <h2 className="text-xl font-semibold text-gray-900">
            {getDateDisplay()}
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          {conflicts.length > 0 && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              {conflicts.length} Conflict{conflicts.length !== 1 ? 's' : ''}
            </div>
          )}
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('month')}
              className={cn(
                "px-3 py-1 text-sm font-medium rounded transition-colors duration-200",
                viewMode === 'month' 
                  ? "bg-white text-blue-700 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Calendar className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => onViewModeChange('week')}
              className={cn(
                "px-3 py-1 text-sm font-medium rounded transition-colors duration-200",
                viewMode === 'week' 
                  ? "bg-white text-blue-700 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => onViewModeChange('day')}
              className={cn(
                "px-3 py-1 text-sm font-medium rounded transition-colors duration-200",
                viewMode === 'day' 
                  ? "bg-white text-blue-700 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarHeader 