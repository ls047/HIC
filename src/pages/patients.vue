<template>
  <div class="py-6">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold text-gray-900">Patients</h1>
        <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Add New Patient
        </button>
      </div>

      <!-- Search and Filters -->
      <div class="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
        <div class="flex-1 min-w-0 max-w-lg">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input type="search" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Search patients..." />
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <select class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option>All Departments</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Pediatrics</option>
          </select>
        </div>
      </div>

      <!-- Patients Table -->
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Patient</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Age</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Contact</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Visit</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="patient in patients" :key="patient.id">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <img class="h-10 w-10 rounded-full" :src="patient.avatar" :alt="patient.name" />
                        </div>
                        <div class="ml-4">
                          <div class="font-medium text-gray-900">{{ patient.name }}</div>
                          <div class="text-gray-500">{{ patient.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ patient.id }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ patient.age }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ patient.contact }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ patient.lastVisit }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                      <span :class="[
                        patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800',
                        'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                      ]">
                        {{ patient.status }}
                      </span>
                    </td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                      <button class="text-blue-600 hover:text-blue-900">Edit</button>
                      <button class="ml-4 text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between mt-6">
        <div class="flex items-center">
          <p class="text-sm text-gray-700">
            Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of
            <span class="font-medium">97</span> results
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <button class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientsPage',
  data() {
    return {
      patients: [
        {
          id: 'P001',
          name: 'John Smith',
          email: 'john.smith@example.com',
          age: '45',
          contact: '+1 234-567-8901',
          lastVisit: '2024-03-15',
          status: 'Active',
          avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=0D8ABC&color=fff'
        },
        {
          id: 'P002',
          name: 'Emma Wilson',
          email: 'emma.wilson@example.com',
          age: '32',
          contact: '+1 234-567-8902',
          lastVisit: '2024-03-14',
          status: 'Pending',
          avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=0D8ABC&color=fff'
        },
        // Add more patient data as needed
      ]
    }
  }
}
</script> 