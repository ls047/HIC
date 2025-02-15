<template>
  <div class="py-6">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold text-gray-900">Appointments</h1>
        <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Schedule Appointment
        </button>
      </div>

      <!-- Calendar and Appointments List -->
      <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Calendar -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow">
            <div class="p-4">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-900">March 2024</h2>
                <div class="flex space-x-2">
                  <button class="p-2 text-gray-400 hover:text-gray-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button class="p-2 text-gray-400 hover:text-gray-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <!-- Calendar Grid -->
              <div class="mt-6 grid grid-cols-7 gap-1">
                <template v-for="day in calendarDays" :key="day.date">
                  <div 
                    :class="[
                      'p-2 text-center text-sm',
                      day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
                      day.isToday ? 'bg-blue-50' : '',
                      day.hasAppointments ? 'font-bold' : ''
                    ]"
                  >
                    {{ day.dayOfMonth }}
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- Today's Appointments -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-4">
            <h2 class="text-lg font-medium text-gray-900">Today's Appointments</h2>
            <div class="mt-4 space-y-4">
              <div v-for="appointment in todayAppointments" :key="appointment.id" 
                   class="p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-900">{{ appointment.time }}</p>
                    <p class="text-sm text-gray-500">{{ appointment.patientName }}</p>
                  </div>
                  <span :class="[
                    appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800',
                    'inline-flex rounded-full px-2 py-1 text-xs font-semibold'
                  ]">
                    {{ appointment.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppointmentsPage',
  data() {
    return {
      calendarDays: Array.from({ length: 35 }, (_, i) => ({
        date: new Date(2024, 2, i - 5),
        dayOfMonth: new Date(2024, 2, i - 5).getDate(),
        isCurrentMonth: new Date(2024, 2, i - 5).getMonth() === 2,
        isToday: i === 15,
        hasAppointments: [10, 15, 20].includes(i)
      })),
      todayAppointments: [
        {
          id: 1,
          time: '09:00 AM',
          patientName: 'John Smith',
          status: 'Confirmed'
        },
        {
          id: 2,
          time: '10:30 AM',
          patientName: 'Emma Wilson',
          status: 'Pending'
        },
        {
          id: 3,
          time: '02:00 PM',
          patientName: 'Michael Brown',
          status: 'Confirmed'
        }
      ]
    }
  }
}
</script> 