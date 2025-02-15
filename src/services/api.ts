import axios from 'axios'
import type { ApiSection } from '@/types/api'
import { apiStructure, commonResponses } from '@/data/apiStructure'
const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const apiService = {
  getApiStructure() {
    return Promise.resolve(apiStructure)
  },
  
  getCommonResponses() {
    return Promise.resolve(commonResponses)
  },

  async fetchApiStructure(): Promise<ApiSection[] | null> {
    try {
      const response = await apiClient.get('/api-structure')
      return response.data
    } catch (error) {
      console.error('Error fetching API structure:', error)
      return null
    }
  },

  async fetchCommonResponses(): Promise<Record<string, string> | null> {
    try {
      const response = await apiClient.get('/common-responses')
      return response.data
    } catch (error) {
      console.error('Error fetching common responses:', error)
      return null
    }
  }
} 