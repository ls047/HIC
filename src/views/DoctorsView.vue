<template>
  <v-container>
    <h1 class="text-h4 mb-4">Doctors</h1>

    <!-- Search and Filter -->
    <v-card class="mb-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="search"
              label="Search Doctors"
              prepend-icon="mdi-magnify"
              hide-details
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="specializationFilter"
              :items="departments"
              label="Specialization"
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
              Add Doctor
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Doctors Grid -->
    <v-row>
      <v-col
        v-for="doctor in filteredDoctors"
        :key="doctor.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card>
          <v-card-text class="text-center">
            <v-avatar
              size="96"
              class="mb-4"
            >
              <v-img
                :src="doctor.avatar || `https://i.pravatar.cc/150?u=${doctor.id}`"
                :alt="doctor.name"
              ></v-img>
            </v-avatar>
            <h3 class="text-h6 mb-1">{{ doctor.name }}</h3>
            <div class="text-subtitle-2 mb-2">{{ doctor.specialization }}</div>
            <v-chip
              color="primary"
              size="small"
              class="mb-4"
            >
              {{ doctor.patients }} Patients
            </v-chip>

            <v-list density="compact">
              <v-list-item v-if="doctor.email">
                <template v-slot:prepend>
                  <v-icon>mdi-email</v-icon>
                </template>
                <v-list-item-title>{{ doctor.email }}</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="doctor.phone">
                <template v-slot:prepend>
                  <v-icon>mdi-phone</v-icon>
                </template>
                <v-list-item-title>{{ doctor.phone }}</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="doctor.availability">
                <template v-slot:prepend>
                  <v-icon>mdi-calendar</v-icon>
                </template>
                <v-list-item-title>
                  {{ Array.isArray(doctor.availability) 
                    ? doctor.availability.join(', ') 
                    : Object.values(doctor.availability)[0] }}
                </v-list-item-title>
              </v-list-item>
            </v-list>

            <v-card-actions class="justify-center mt-2">
              <v-btn
                color="primary"
                variant="text"
                @click="editDoctor(doctor)"
              >
                Edit
              </v-btn>
              <v-btn
                color="primary"
                variant="text"
                @click="viewSchedule(doctor)"
              >
                Schedule
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add/Edit Doctor Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ editedId ? 'Edit Doctor' : 'New Doctor' }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.name"
                  label="Full Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.specialization"
                  :items="departments"
                  label="Specialization"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                  type="email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.phone"
                  label="Phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.avatar"
                  label="Avatar URL"
                ></v-text-field>
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
            @click="saveDoctor"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Schedule Dialog -->
    <v-dialog v-model="scheduleDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Doctor's Schedule</span>
        </v-card-title>

        <v-card-text>
          <v-list>
            <template v-if="selectedDoctor && !Array.isArray(selectedDoctor.availability)">
              <v-list-item
                v-for="(time, day) in selectedDoctor.availability"
                :key="day"
              >
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-clock</v-icon>
                </template>
                <v-list-item-title class="text-capitalize">
                  {{ day }}: {{ time }}
                </v-list-item-title>
              </v-list-item>
            </template>
            <template v-else-if="selectedDoctor">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-calendar</v-icon>
                </template>
                <v-list-item-title>
                  Available Days: {{ selectedDoctor.availability.join(', ') }}
                </v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="scheduleDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { doctors, departments } from '@/services/mockData';

const search = ref('');
const specializationFilter = ref('');
const dialog = ref(false);
const scheduleDialog = ref(false);
const editedId = ref(null);
const selectedDoctor = ref(null);

const editedItem = ref({
  name: '',
  specialization: '',
  email: '',
  phone: '',
  avatar: '',
  patients: 0
});

const defaultItem = {
  name: '',
  specialization: '',
  email: '',
  phone: '',
  avatar: '',
  patients: 0
};

const filteredDoctors = computed(() => {
  let filtered = [...doctors];
  if (specializationFilter.value) {
    filtered = filtered.filter(doctor => doctor.specialization === specializationFilter.value);
  }
  if (search.value) {
    const searchLower = search.value.toLowerCase();
    filtered = filtered.filter(doctor => 
      doctor.name.toLowerCase().includes(searchLower) ||
      doctor.specialization.toLowerCase().includes(searchLower)
    );
  }
  return filtered;
});

function editDoctor(item) {
  editedId.value = item.id;
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}

function viewSchedule(doctor) {
  selectedDoctor.value = doctor;
  scheduleDialog.value = true;
}

function saveDoctor() {
  if (editedId.value) {
    const index = doctors.findIndex(item => item.id === editedId.value);
    Object.assign(doctors[index], editedItem.value);
  } else {
    doctors.push({
      id: doctors.length + 1,
      ...editedItem.value
    });
  }
  closeDialog();
}

function closeDialog() {
  dialog.value = false;
  editedId.value = null;
  editedItem.value = Object.assign({}, defaultItem);
}
</script> 