import { ref, computed } from 'vue'
import type { ApiSection, ApiEndpoint } from '@/types/api'

export function useApiState() {
  const currentEndpoint = ref<ApiEndpoint | null>(null)
  const showModal = ref(false)
  const apiResponse = ref<any>(null)
  const requestData = ref<Record<string, any>>({})

  const baseUrl = computed(() => import.meta.env.VITE_API_BASE_URL)

  const resetState = () => {
    currentEndpoint.value = null
    apiResponse.value = null
    requestData.value = {}
  }

  return {
    currentEndpoint,
    showModal,
    apiResponse,
    requestData,
    baseUrl,
    resetState
  }
} 