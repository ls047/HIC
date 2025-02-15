<template>
  <v-container>
    <!-- Header with Back Button -->
    <v-row>
      <v-col cols="12" class="d-flex align-center">
        <v-btn
          prepend-icon="mdi-arrow-left"
          variant="text"
          to="/patients"
          class="mr-4"
        >
          Back to Patients
        </v-btn>
        <h1 class="text-h4">Patient Profile</h1>
      </v-col>
    </v-row>

    <v-row>
      <!-- Patient Basic Info Card -->
      <v-col cols="12" md="4">
        <v-card>
          <v-card-text class="text-center">
            <v-avatar
              color="primary"
              size="120"
              class="mb-4"
            >
              <span class="text-h3">{{ patient?.name?.charAt(0) }}</span>
            </v-avatar>
            <h2 class="text-h5 mb-2">{{ patient?.name }}</h2>
            <v-chip
              :color="getStatusColor(patient?.status)"
              class="mb-4"
            >
              {{ patient?.status }}
            </v-chip>

            <!-- Patient Details List -->
            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-identifier</v-icon>
                </template>
                <v-list-item-title class="font-weight-bold">Patient ID</v-list-item-title>
                <template v-slot:append>
                  {{ patient?.id }}
                </template>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-calendar</v-icon>
                </template>
                <v-list-item-title class="font-weight-bold">Age</v-list-item-title>
                <template v-slot:append>
                  {{ patient?.age }} years
                </template>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-gender-male-female</v-icon>
                </template>
                <v-list-item-title class="font-weight-bold">Gender</v-list-item-title>
                <template v-slot:append>
                  {{ patient?.gender }}
                </template>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-water</v-icon>
                </template>
                <v-list-item-title class="font-weight-bold">Blood Type</v-list-item-title>
                <template v-slot:append>
                  {{ patient?.bloodType || 'Not recorded' }}
                </template>
              </v-list-item>

              <v-divider class="my-2"></v-divider>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-phone</v-icon>
                </template>
                <v-list-item-title class="font-weight-bold">Phone</v-list-item-title>
                <template v-slot:append>
                  {{ patient?.phone }}
                </template>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-email</v-icon>
                </template>
                <v-list-item-title class="font-weight-bold">Email</v-list-item-title>
                <template v-slot:append>
                  {{ patient?.email }}
                </template>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-map-marker</v-icon>
                </template>
                <v-list-item-title class="font-weight-bold">Address</v-list-item-title>
                <v-list-item-subtitle>
                  {{ patient?.address }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <!-- Quick Action Buttons -->
            <div class="d-flex gap-2 mt-4">
              <v-btn
                color="primary"
                prepend-icon="mdi-calendar-plus"
                block
                @click="scheduleAppointment"
              >
                Schedule Appointment
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <!-- Emergency Contact Card -->
        <v-card class="mt-4">
          <v-card-title class="d-flex align-center">
            Emergency Contact
            <v-spacer></v-spacer>
            <v-btn
              icon="mdi-pencil"
              variant="text"
              size="small"
              @click="editEmergencyContact"
            ></v-btn>
          </v-card-title>
          <v-card-text>
            <v-list density="compact">
              <v-list-item>
                <v-list-item-title class="font-weight-bold">Name</v-list-item-title>
                <template v-slot:append>
                  {{ patient?.emergencyContact?.name || 'Not provided' }}
                </template>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">Relationship</v-list-item-title>
                <template v-slot:append>
                  {{ patient?.emergencyContact?.relationship || 'Not provided' }}
                </template>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">Phone</v-list-item-title>
                <template v-slot:append>
                  {{ patient?.emergencyContact?.phone || 'Not provided' }}
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Medical Information Tabs -->
      <v-col cols="12" md="8">
        <v-card>
          <v-tabs v-model="activeTab">
            <v-tab value="history">Medical History</v-tab>
            <v-tab value="appointments">Appointments</v-tab>
            <v-tab value="medications">Medications</v-tab>
            <v-tab value="bills">Bills</v-tab>
            <v-tab value="documents">Documents</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="activeTab">
              <!-- Medical History Tab -->
              <v-window-item value="history">
                <div class="d-flex justify-space-between align-center mb-4">
                  <h3 class="text-h6">Medical History</h3>
                  <v-btn
                    color="primary"
                    prepend-icon="mdi-plus"
                    @click="addMedicalRecord"
                  >
                    Add Record
                  </v-btn>
                </div>
                <v-timeline>
                  <v-timeline-item
                    v-for="record in patient?.medicalHistory"
                    :key="record.date"
                    :dot-color="'primary'"
                    size="small"
                  >
                    <template v-slot:opposite>
                      {{ formatDate(record.date) }}
                    </template>
                    <v-card>
                      <v-card-title class="text-h6">
                        {{ record.diagnosis }}
                      </v-card-title>
                      <v-card-text>
                        <p><strong>Treatment:</strong> {{ record.treatment }}</p>
                        <p><strong>Doctor:</strong> {{ record.doctor }}</p>
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-window-item>

              <!-- Appointments Tab -->
              <v-window-item value="appointments">
                <div class="d-flex justify-space-between align-center mb-4">
                  <h3 class="text-h6">Appointments</h3>
                  <v-btn
                    color="primary"
                    prepend-icon="mdi-calendar-plus"
                    @click="scheduleAppointment"
                  >
                    New Appointment
                  </v-btn>
                </div>
                <v-list>
                  <v-list-item
                    v-for="appointment in patient?.upcomingAppointments"
                    :key="appointment.id"
                    :title="appointment.purpose"
                    :subtitle="`${formatDate(appointment.date)} at ${appointment.time}`"
                  >
                    <template v-slot:prepend>
                      <v-avatar color="primary">
                        <v-icon color="white">mdi-calendar-clock</v-icon>
                      </v-avatar>
                    </template>
                    <template v-slot:append>
                      <v-chip color="primary">
                        {{ appointment.doctor }}
                      </v-chip>
                    </template>
                  </v-list-item>
                </v-list>
              </v-window-item>

              <!-- Medications Tab -->
              <v-window-item value="medications">
                <div class="d-flex justify-space-between align-center mb-4">
                  <h3 class="text-h6">Current Medications</h3>
                  <v-btn
                    color="primary"
                    prepend-icon="mdi-plus"
                    @click="addMedication"
                  >
                    Add Medication
                  </v-btn>
                </div>
                <v-table>
                  <thead>
                    <tr>
                      <th>Medication</th>
                      <th>Dosage</th>
                      <th>Frequency</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="med in patient?.medications" :key="med.id">
                      <td>{{ med.name }}</td>
                      <td>{{ med.dosage }}</td>
                      <td>{{ med.frequency }}</td>
                      <td>{{ formatDate(med.startDate) }}</td>
                      <td>{{ formatDate(med.endDate) }}</td>
                      <td>
                        <v-btn
                          icon="mdi-pencil"
                          variant="text"
                          size="small"
                          @click="editMedication(med)"
                        ></v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-window-item>

              <!-- Bills Tab -->
              <v-window-item value="bills">
                <div class="d-flex justify-space-between align-center mb-4">
                  <h3 class="text-h6">Billing History</h3>
                  <v-btn
                    color="primary"
                    prepend-icon="mdi-plus"
                    @click="createBill"
                  >
                    Create Bill
                  </v-btn>
                </div>
                <v-list>
                  <v-list-item
                    v-for="bill in patient?.bills"
                    :key="bill.id"
                    :title="`$${bill.amount} - ${bill.description}`"
                    :subtitle="formatDate(bill.date)"
                  >
                    <template v-slot:prepend>
                      <v-icon :color="bill.status === 'Paid' ? 'success' : 'warning'">
                        {{ bill.status === 'Paid' ? 'mdi-check-circle' : 'mdi-clock' }}
                      </v-icon>
                    </template>
                    <template v-slot:append>
                      <v-chip :color="bill.status === 'Paid' ? 'success' : 'warning'">
                        {{ bill.status }}
                      </v-chip>
                    </template>
                  </v-list-item>
                </v-list>
              </v-window-item>

              <!-- Documents Tab -->
              <v-window-item value="documents">
                <div class="d-flex justify-space-between align-center mb-4">
                  <h3 class="text-h6">Medical Documents</h3>
                  <v-btn
                    color="primary"
                    prepend-icon="mdi-upload"
                    @click="uploadDocument"
                  >
                    Upload Document
                  </v-btn>
                </div>
                <v-list>
                  <v-list-item
                    v-for="doc in patient?.documents"
                    :key="doc.id"
                    :title="doc.name"
                    :subtitle="formatDate(doc.date)"
                  >
                    <template v-slot:prepend>
                      <v-icon>mdi-file-document</v-icon>
                    </template>
                    <template v-slot:append>
                      <v-btn
                        icon="mdi-download"
                        variant="text"
                        size="small"
                        @click="downloadDocument(doc)"
                      ></v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add/Edit Record Dialog -->
    <v-dialog v-model="recordDialog" max-width="600px">
      <!-- Dialog content here -->
    </v-dialog>

    <!-- Schedule Appointment Dialog -->
    <v-dialog v-model="appointmentDialog" max-width="600px">
      <!-- Dialog content here -->
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { patients } from '@/services/mockData';

const route = useRoute();
const patient = ref(null);
const activeTab = ref('history');
const recordDialog = ref(false);
const appointmentDialog = ref(false);

onMounted(() => {
  const patientId = parseInt(route.params.id);
  patient.value = patients.find(p => p.id === patientId);
});

function getStatusColor(status) {
  switch (status) {
    case 'Active': return 'success';
    case 'Discharged': return 'grey';
    case 'Pending': return 'warning';
    default: return 'grey';
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

function scheduleAppointment() {
  appointmentDialog.value = true;
}

function addMedicalRecord() {
  recordDialog.value = true;
}

function editEmergencyContact() {
  // Implement emergency contact editing
}

function addMedication() {
  // Implement medication adding
}

function editMedication(medication) {
  // Implement medication editing
}

function createBill() {
  // Implement bill creation
}

function uploadDocument() {
  // Implement document upload
}

function downloadDocument(document) {
  // Implement document download
}
</script>

<style scoped>
.v-timeline-item__body {
  max-width: 100%;
}
</style> 