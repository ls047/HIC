<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- Top Bar -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span class="text-white font-bold text-xl">H</span>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">HealthHub Pro</span>
          </div>

          <!-- Search with Dropdown -->
          <div class="flex-1 max-w-lg mx-8 relative group">
            <div class="relative">
              <input type="search" 
                     class="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm" 
                     placeholder="Search patients, doctors, appointments..." />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <!-- Quick Search Results -->
            <div class="hidden group-focus-within:block absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
              <div class="px-4 py-2 text-xs font-semibold text-gray-500">Recent Searches</div>
              <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50">
                <svg class="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm text-gray-700">John Doe - Patient #12345</span>
              </a>
              <!-- Add more search results -->
            </div>
          </div>

          <!-- User Menu -->
          <div class="flex items-center gap-6">
            <button class="p-2 text-gray-400 hover:text-gray-500 relative">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            
            <!-- Profile Dropdown -->
            <div class="relative">
              <button class="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-xl transition-colors">
                <img class="w-10 h-10 rounded-xl object-cover" 
                     src="https://ui-avatars.com/api/?name=Dr.+Smith&background=0062FF&color=fff" 
                     alt="User" />
                <div class="text-left hidden sm:block">
                  <div class="text-sm font-medium text-gray-900">Dr. Smith</div>
                  <div class="text-xs text-gray-500">Cardiologist</div>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Quick Actions -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button class="flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div class="text-left">
            <span class="font-medium text-gray-900 block">New Patient</span>
            <span class="text-xs text-gray-500">Register patient</span>
          </div>
        </button>

        <button class="flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="text-left">
            <span class="font-medium text-gray-900 block">Schedule</span>
            <span class="text-xs text-gray-500">Book appointment</span>
          </div>
        </button>

        <button class="flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div class="text-left">
            <span class="font-medium text-gray-900 block">Reports</span>
            <span class="text-xs text-gray-500">View analytics</span>
          </div>
        </button>

        <button class="flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="text-left">
            <span class="font-medium text-gray-900 block">Payments</span>
            <span class="text-xs text-gray-500">Process bills</span>
          </div>
        </button>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-500">Total Patients</h3>
            <div class="flex items-center gap-1 text-green-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span class="text-sm font-medium">4.5%</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-2xl font-semibold text-gray-900">2,543</p>
              <p class="text-sm text-gray-500 mt-1">+123 this month</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Similar improvements for other stat cards -->
      </div>

      <!-- Recent Activity with Tabs -->
      <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex gap-4">
            <button class="text-blue-600 border-b-2 border-blue-600 pb-2 font-medium">Recent Activity</button>
            <button class="text-gray-500 hover:text-gray-700 pb-2 font-medium">Appointments</button>
            <button class="text-gray-500 hover:text-gray-700 pb-2 font-medium">Tasks</button>
          </div>
          <button class="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
            View All
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" 
               class="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <img :src="activity.avatar" :alt="activity.name" class="w-10 h-10 rounded-xl" />
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-xs text-gray-500">{{ activity.time }}</span>
                <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span class="text-xs text-gray-500">{{ activity.department }}</span>
              </div>
            </div>
            <span :class="[
              activity.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800',
              'px-2.5 py-0.5 rounded-full text-xs font-medium'
            ]">
              {{ activity.status }}
            </span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      recentActivity: [
        {
          id: 1,
          title: 'New patient registration - John Doe',
          time: '5 minutes ago',
          department: 'General Medicine',
          status: 'Completed',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0062FF&color=fff'
        },
        {
          id: 2,
          title: 'Lab results updated - Emma Wilson',
          time: '10 minutes ago',
          department: 'Laboratory',
          status: 'Pending',
          avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=0062FF&color=fff'
        },
        {
          id: 3,
          title: 'Appointment scheduled - Michael Brown',
          time: '1 hour ago',
          department: 'Cardiology',
          status: 'Completed',
          avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=0062FF&color=fff'
        }
      ]
    }
  }
}
</script>
