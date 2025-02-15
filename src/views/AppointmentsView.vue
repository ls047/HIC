<template>
  <v-container>
    <h1 class="text-h4 mb-4">Appointments</h1>

    <!-- Search and Filter -->
    <v-card class="mb-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="search"
              label="Search Appointments"
              prepend-icon="mdi-magnify"
              hide-details
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="statusFilter"
              :items="statuses"
              label="Status"
              hide-details
              density="compact"
              prepend-inner-icon="mdi-filter"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4" class="d-flex align-center">
            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              @click="dialog = true"
            >
              New Appointment
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Calendar/List Toggle -->
    <v-btn-toggle
      v-model="viewMode"
      mandatory
      class="mb-4"
    >
      <v-btn value="calendar" prepend-icon="mdi-calendar">
        Calendar
      </v-btn>
      <v-btn value="list" prepend-icon="mdi-format-list-bulleted">
        List
      </v-btn>
    </v-btn-toggle>

    <!-- List View -->
    <v-card v-if="viewMode === 'list'">
      <v-data-table
        :headers="headers"
        :items="filteredAppointments"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.raw.status)"
            size="small"
          >
            {{ item.raw.status }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            variant="text"
            size="small"
            @click="editAppointment(item.raw)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="text"
            size="small"
            color="error"
            @click="cancelAppointment(item.raw)"
          >
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Calendar View -->
    <v-card v-else>
      <v-card-text>
        <v-row class="mb-4">
          <v-col cols="12" class="d-flex align-center">
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click="previousMonth"
            ></v-btn>
            <h2 class="text-h6 mx-4">{{ currentMonthYear }}</h2>
            <v-btn
              icon="mdi-chevron-right"
              variant="text"
              @click="nextMonth"
            ></v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
            :key="day"
            cols="12"
            sm="1.7"
            class="text-center font-weight-bold"
          >
            {{ day }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="date in calendarDays"
            :key="date.day"
            cols="12"
            sm="1.7"
          >
            <v-card
              :class="{ 'current-day': isCurrentDay(date.day) }"
              variant="outlined"
              class="calendar-day"
              height="120"
            >
              <div class="text-caption pa-2">{{ date.day }}</div>
              <v-list density="compact" class="pa-0">
                <v-list-item
                  v-for="apt in getAppointmentsForDay(date.day)"
                  :key="apt.id"
                  :title="apt.patientName"
                  :subtitle="apt.time"
                  density="compact"
                  class="calendar-appointment"
                  @click="editAppointment(apt)"
                >
                  <template v-slot:prepend>
                    <v-avatar size="24" :color="getStatusColor(apt.status)"></v-avatar>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Add/Edit Appointment Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ editedId ? 'Edit Appointment' : 'New Appointment' }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.patientId"
                  :items="patients"
                  item-title="name"
                  item-value="id"
                  label="Patient"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.doctorId"
                  :items="doctors"
                  item-title="name"
                  item-value="id"
                  label="Doctor"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.date"
                  label="Date"
                  type="date"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.time"
                  label="Time"
                  type="time"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.purpose"
                  label="Purpose"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedItem.status"
                  :items="statuses"
                  label="Status"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="text"
            @click="saveAppointment"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { appointments, patients, doctors, statuses } from '@/services/mockData';

const search = ref('');
const statusFilter = ref('');
const dialog = ref(false);
const editedId = ref(null);
const viewMode = ref('calendar');
const currentMonth = ref(new Date());

const headers = [
  { title: 'Date', key: 'date', sortable: true },
  { title: 'Time', key: 'time', sortable: true },
  { title: 'Patient', key: 'patientName', sortable: true },
  { title: 'Doctor', key: 'doctorName', sortable: true },
  { title: 'Purpose', key: 'purpose' },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false }
];

const editedItem = ref({
  patientId: '',
  doctorId: '',
  date: '',
  time: '',
  purpose: '',
  status: 'Scheduled'
});

const defaultItem = {
  patientId: '',
  doctorId: '',
  date: '',
  time: '',
  purpose: '',
  status: 'Scheduled'
};

const filteredAppointments = computed(() => {
  let filtered = [...appointments];
  if (statusFilter.value) {
    filtered = filtered.filter(apt => apt.status === statusFilter.value);
  }
  return filtered;
});

const currentMonthYear = computed(() => {
  return currentMonth.value.toLocaleString('default', { month: 'long', year: 'numeric' });
});

const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear();
  const month = currentMonth.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({ day: i });
  }

  return days;
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

function editAppointment(item) {
  editedId.value = item.id;
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}

function cancelAppointment(item) {
  const index = appointments.findIndex(apt => apt.id === item.id);
  appointments[index].status = 'Cancelled';
}

function saveAppointment() {
  if (editedId.value) {
    const index = appointments.findIndex(item => item.id === editedId.value);
    Object.assign(appointments[index], editedItem.value);
  } else {
    appointments.push({
      id: appointments.length + 1,
      ...editedItem.value,
      patientName: patients.find(p => p.id === editedItem.value.patientId)?.name,
      doctorName: doctors.find(d => d.id === editedItem.value.doctorId)?.name
    });
  }
  closeDialog();
}

function closeDialog() {
  dialog.value = false;
  editedId.value = null;
  editedItem.value = Object.assign({}, defaultItem);
}

function previousMonth() {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1);
}

function nextMonth() {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1);
}

function isCurrentDay(day) {
  const today = new Date();
  return today.getDate() === day &&
         today.getMonth() === currentMonth.value.getMonth() &&
         today.getFullYear() === currentMonth.value.getFullYear();
}

function getAppointmentsForDay(day) {
  const year = currentMonth.value.getFullYear();
  const month = currentMonth.value.getMonth() + 1;
  const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return appointments.filter(apt => apt.date === dateStr);
}
</script>

<style scoped>
.calendar-day {
  position: relative;
  cursor: pointer;
}

.current-day {
  border: 2px solid var(--v-primary-base) !important;
}

.calendar-appointment {
  font-size: 0.75rem;
  padding: 2px 8px;
  margin: 2px;
  border-radius: 4px;
  cursor: pointer;
}

.calendar-appointment:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
}
</style> 