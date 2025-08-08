import React from 'react'
import { ConflictType } from '../types'

interface ConflictResolverProps {
  onClose: () => void
  conflicts: ConflictType[]
  onResolve: (resolutions: any[]) => void
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Conflict Resolver</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded transition-colors duration-200"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Conflict Resolver</h3>
            <p className="text-gray-600">Conflict resolver implementation coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConflictResolver 