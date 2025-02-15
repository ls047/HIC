<template>
  <div class="py-6">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold text-gray-900">Staff</h1>
        <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Add Staff Member
        </button>
      </div>

      <!-- Staff Grid -->
      <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="member in staffMembers" :key="member.id" class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-6">
            <div class="flex items-center">
              <div class="h-16 w-16 rounded-full overflow-hidden">
                <img :src="member.avatar" :alt="member.name" class="h-full w-full object-cover" />
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">{{ member.name }}</h3>
                <p class="text-sm text-gray-500">{{ member.role }}</p>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex items-center text-sm text-gray-500">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {{ member.department }}
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {{ member.contact }}
              </div>
            </div>
            <div class="mt-4 flex space-x-3">
              <button class="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                View Profile
              </button>
              <button class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
                Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StaffPage',
  data() {
    return {
      staffMembers: [
        {
          id: 1,
          name: 'Dr. Sarah Wilson',
          role: 'Cardiologist',
          department: 'Cardiology',
          contact: '+1 234-567-8901',
          avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=0D8ABC&color=fff'
        },
        {
          id: 2,
          name: 'Dr. James Moore',
          role: 'Neurologist',
          department: 'Neurology',
          contact: '+1 234-567-8902',
          avatar: 'https://ui-avatars.com/api/?name=James+Moore&background=0D8ABC&color=fff'
        },
        {
          id: 3,
          name: 'Dr. Emily Brown',
          role: 'Pediatrician',
          department: 'Pediatrics',
          contact: '+1 234-567-8903',
          avatar: 'https://ui-avatars.com/api/?name=Emily+Brown&background=0D8ABC&color=fff'
        }
      ]
    }
  }
}
</script> 