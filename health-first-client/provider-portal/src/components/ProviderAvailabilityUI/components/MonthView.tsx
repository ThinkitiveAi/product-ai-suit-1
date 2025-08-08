import React from 'react'
import { CalendarViewProps } from '../types'

const MonthView: React.FC<CalendarViewProps> = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Month View</h3>
        <p className="text-gray-600">Month view implementation coming soon...</p>
      </div>
    </div>
  )
}

export default MonthView 