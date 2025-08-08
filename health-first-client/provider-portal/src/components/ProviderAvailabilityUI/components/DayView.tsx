import React from 'react'
import { CalendarViewProps } from '../types'

const DayView: React.FC<CalendarViewProps> = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Day View</h3>
        <p className="text-gray-600">Day view implementation coming soon...</p>
      </div>
    </div>
  )
}

export default DayView 