<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Patient Header -->
      <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 mb-6">
        <div class="flex items-center gap-6">
          <img :src="patient.avatar" :alt="patient.name" class="w-24 h-24 rounded-xl" />
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ patient.name }}</h1>
            <div class="flex items-center gap-4 mt-2">
              <span class="text-sm text-gray-500">ID: {{ patient.id }}</span>
              <span class="text-sm text-gray-500">Age: {{ patient.age }}</span>
              <span class="text-sm text-gray-500">Blood Type: {{ patient.bloodType }}</span>
            </div>
          </div>
          <button class="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>

      <!-- Patient Information Tabs -->
      <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
        <div class="border-b border-gray-200">
          <nav class="flex gap-4 px-6">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="currentTab = tab.id"
              :class="[
                'py-4 px-2 text-sm font-medium border-b-2 -mb-px',
                currentTab === tab.id 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <div class="p-6">
          <!-- Personal Information -->
          <div v-if="currentTab === 'personal'" class="space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div>
                <h3 class="text-sm font-medium text-gray-500">Contact Information</h3>
                <div class="mt-2 space-y-2">
                  <p class="text-sm text-gray-900">Phone: {{ patient.phone }}</p>
                  <p class="text-sm text-gray-900">Email: {{ patient.email }}</p>
                  <p class="text-sm text-gray-900">Address: {{ patient.address }}</p>
                </div>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Emergency Contact</h3>
                <div class="mt-2 space-y-2">
                  <p class="text-sm text-gray-900">Name: Jane Doe</p>
                  <p class="text-sm text-gray-900">Relationship: Spouse</p>
                  <p class="text-sm text-gray-900">Phone: +1 234-567-8904</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Medical History -->
          <div v-if="currentTab === 'history'" class="space-y-6">
            <div v-for="record in patient.history" :key="record.date" 
                 class="bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ record.type }}</p>
                  <p class="text-sm text-gray-500">{{ record.doctor }}</p>
                </div>
                <span class="text-sm text-gray-500">{{ record.date }}</span>
              </div>
              <p class="mt-2 text-sm text-gray-700">{{ record.notes }}</p>
            </div>
          </div>

          <!-- Appointments -->
          <div v-if="currentTab === 'appointments'" class="space-y-6">
            <div v-for="apt in patient.appointments" :key="apt.date" 
                 class="bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ apt.type }}</p>
                  <p class="text-sm text-gray-500">{{ apt.doctor }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">{{ apt.date }}</p>
                  <p class="text-sm text-gray-500">{{ apt.time }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Medications -->
          <div v-if="currentTab === 'medications'" class="space-y-6">
            <div v-for="med in patient.medications" :key="med.name" 
                 class="bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ med.name }}</p>
                  <p class="text-sm text-gray-500">{{ med.dosage }}</p>
                </div>
                <p class="text-sm text-gray-700">{{ med.frequency }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'PatientProfile',
  setup() {
    const store = useStore()
    const route = useRoute()
    const currentTab = ref('personal')

    const patient = computed(() => 
      store.getters.getPatientById(route.params.id)
    )

    const tabs = [
      { id: 'personal', name: 'Personal Information' },
      { id: 'history', name: 'Medical History' },
      { id: 'appointments', name: 'Appointments' },
      { id: 'medications', name: 'Medications' }
    ]

    return {
      patient,
      currentTab,
      tabs
    }
  }
}
</script> 