<template>
  <v-container>
    <h1 class="text-h4 mb-4">Dashboard</h1>
    
    <!-- Stats Overview -->
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text>
            <div class="text-overline mb-1">Total Patients</div>
            <div class="text-h4 mb-2">{{ stats.totalPatients }}</div>
            <v-progress-linear
              model-value="70"
              color="primary"
              height="4"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text>
            <div class="text-overline mb-1">Active Patients</div>
            <div class="text-h4 mb-2">{{ stats.activePatients }}</div>
            <v-progress-linear
              model-value="45"
              color="success"
              height="4"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text>
            <div class="text-overline mb-1">Doctors</div>
            <div class="text-h4 mb-2">{{ stats.totalDoctors }}</div>
            <v-progress-linear
              model-value="85"
              color="info"
              height="4"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text>
            <div class="text-overline mb-1">Today's Appointments</div>
            <div class="text-h4 mb-2">{{ stats.totalAppointments }}</div>
            <v-progress-linear
              model-value="60"
              color="warning"
              height="4"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quick Actions and Recent Activities -->
    <v-row class="mt-4">
      <!-- Quick Actions -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Quick Actions</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" sm="4">
                <v-btn
                  block
                  color="primary"
                  variant="tonal"
                  prepend-icon="mdi-account-plus"
                  to="/patients"
                >
                  New Patient
                </v-btn>
              </v-col>
              <v-col cols="6" sm="4">
                <v-btn
                  block
                  color="primary"
                  variant="tonal"
                  prepend-icon="mdi-calendar-plus"
                  to="/appointments"
                >
                  New Appointment
                </v-btn>
              </v-col>
              <v-col cols="6" sm="4">
                <v-btn
                  block
                  color="primary"
                  variant="tonal"
                  prepend-icon="mdi-file-document"
                  to="/billing"
                >
                  Create Invoice
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Hospital Stats -->
        <v-card class="mt-4">
          <v-card-title>Hospital Statistics</v-card-title>
          <v-card-text>
            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-bed</v-icon>
                </template>
                <v-list-item-title>Occupancy Rate</v-list-item-title>
                <template v-slot:append>
                  {{ stats.occupancyRate }}%
                </template>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-clock</v-icon>
                </template>
                <v-list-item-title>Average Wait Time</v-list-item-title>
                <template v-slot:append>
                  {{ stats.averageWaitTime }}
                </template>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-currency-usd</v-icon>
                </template>
                <v-list-item-title>Monthly Revenue</v-list-item-title>
                <template v-slot:append>
                  ${{ stats.monthlyRevenue.toLocaleString() }}
                </template>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-file-document</v-icon>
                </template>
                <v-list-item-title>Pending Bills</v-list-item-title>
                <template v-slot:append>
                  {{ stats.pendingBills }}
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Recent Appointments -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Recent Appointments</v-card-title>
          <v-card-text>
            <v-list lines="two">
              <v-list-item
                v-for="appointment in recentAppointments"
                :key="appointment.id"
                :title="appointment.patientName"
                :subtitle="`${appointment.date} ${appointment.time}${appointment.purpose ? ' - ' + appointment.purpose : ''}`"
              >
                <template v-slot:prepend>
                  <v-avatar color="primary">
                    {{ appointment.patientName ? appointment.patientName.charAt(0) : 'P' }}
                  </v-avatar>
                </template>
                <template v-slot:append>
                  <v-chip
                    :color="getStatusColor(appointment.status)"
                    size="small"
                  >
                    {{ appointment.status }}
                  </v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Department Overview -->
        <v-card class="mt-4">
          <v-card-title>Department Overview</v-card-title>
          <v-card-text>
            <v-list density="compact">
              <v-list-item
                v-for="dept in departments"
                :key="dept.id"
              >
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-hospital-building</v-icon>
                </template>
                <v-list-item-title>{{ dept.name }}</v-list-item-title>
                <template v-slot:append>
                  {{ dept.staffCount }} Staff
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { hospitalStats, appointments, departments } from '@/services/mockData';

const stats = ref(hospitalStats);
const recentAppointments = ref([]);

onMounted(() => {
  // Get the 5 most recent appointments and ensure they have all required fields
  recentAppointments.value = appointments
    .slice(0, 5)
    .map(appointment => ({
      ...appointment,
      patientName: appointment.patientName || 'Unknown Patient',
      status: appointment.status || 'Pending'
    }));
});

function getStatusColor(status) {
  switch (status) {
    case 'Scheduled': return 'primary';
    case 'Completed': return 'success';
    case 'Cancelled': return 'error';
    case 'Pending': return 'warning';
    default: return 'grey';
  }
}
</script> 