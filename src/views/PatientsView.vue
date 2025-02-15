<template>
  <v-container>
    <h1 class="text-h4 mb-4">Patients</h1>

    <!-- Search and Filter -->
    <v-card class="mb-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="search"
              label="Search Patients"
              prepend-icon="mdi-magnify"
              hide-details
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="statusFilter"
              :items="['All', 'Active', 'Discharged', 'Pending']"
              label="Status"
              hide-details
              density="compact"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4" class="d-flex align-center">
            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              @click="dialog = true"
            >
              Add Patient
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Patients Table -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="filteredPatients"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            size="small"
          >
            {{ item.status || 'Unknown' }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            variant="text"
            size="small"
            :to="`/patients/${item.id}`"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="text"
            size="small"
            @click="editPatient(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add/Edit Patient Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ editedId ? 'Edit Patient' : 'New Patient' }}</span>
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
                <v-text-field
                  v-model="editedItem.age"
                  label="Age"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.gender"
                  :items="['Male', 'Female', 'Other']"
                  label="Gender"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.phone"
                  label="Phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.address"
                  label="Address"
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
            @click="savePatient"
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
import { patients } from '@/services/mockData';

const search = ref('');
const statusFilter = ref('All');
const dialog = ref(false);
const editedId = ref(null);

const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Name', key: 'name', sortable: true },
  { title: 'Age', key: 'age', sortable: true },
  { title: 'Gender', key: 'gender', sortable: true },
  { title: 'Phone', key: 'phone' },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false }
];

const editedItem = ref({
  name: '',
  age: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  status: 'Active'
});

const defaultItem = {
  name: '',
  age: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  status: 'Active'
};

const filteredPatients = computed(() => {
  let filtered = patients.map(patient => ({
    ...patient,
    status: patient.status || 'Unknown'
  }));
  
  if (statusFilter.value !== 'All') {
    filtered = filtered.filter(patient => patient.status === statusFilter.value);
  }
  return filtered;
});

function getStatusColor(status) {
  switch (status) {
    case 'Active': return 'success';
    case 'Discharged': return 'grey';
    case 'Pending': return 'warning';
    default: return 'grey';
  }
}

function editPatient(item) {
  editedId.value = item.id;
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}

function savePatient() {
  if (editedId.value) {
    const index = patients.findIndex(item => item.id === editedId.value);
    Object.assign(patients[index], editedItem.value);
  } else {
    patients.push({
      id: patients.length + 1,
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