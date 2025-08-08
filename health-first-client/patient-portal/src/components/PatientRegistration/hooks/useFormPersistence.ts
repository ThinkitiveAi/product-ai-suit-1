import { useCallback } from 'react'

export const useFormPersistence = (storageKey: string) => {
  const saveFormData = useCallback((data: any) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data))
    } catch (error) {
      console.warn('Failed to save form data to localStorage:', error)
    }
  }, [storageKey])

  const loadFormData = useCallback(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.warn('Failed to load form data from localStorage:', error)
      return null
    }
  }, [storageKey])

  const clearFormData = useCallback(() => {
    try {
      localStorage.removeItem(storageKey)
    } catch (error) {
      console.warn('Failed to clear form data from localStorage:', error)
    }
  }, [storageKey])

  return {
    saveFormData,
    loadFormData,
    clearFormData
  }
} 