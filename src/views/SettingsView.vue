<template>
  <v-container>
    <h1 class="text-h4 mb-4">Settings</h1>

    <v-row>
      <!-- System Settings -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>System Settings</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-switch
                  v-model="settings.darkMode"
                  label="Dark Mode"
                  @change="updateTheme"
                ></v-switch>
              </v-list-item>
              <v-list-item>
                <v-switch
                  v-model="settings.notifications"
                  label="Enable Notifications"
                ></v-switch>
              </v-list-item>
              <v-list-item>
                <v-select
                  v-model="settings.language"
                  :items="languages"
                  label="Language"
                  density="compact"
                ></v-select>
              </v-list-item>
              <v-list-item>
                <v-select
                  v-model="settings.timeZone"
                  :items="timeZones"
                  label="Time Zone"
                  density="compact"
                ></v-select>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Hospital Information -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Hospital Information</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="saveHospitalInfo">
              <v-text-field
                v-model="hospitalInfo.name"
                label="Hospital Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="hospitalInfo.address"
                label="Address"
                required
              ></v-text-field>
              <v-text-field
                v-model="hospitalInfo.phone"
                label="Phone Number"
                required
              ></v-text-field>
              <v-text-field
                v-model="hospitalInfo.email"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="hospitalInfo.website"
                label="Website"
              ></v-text-field>
              <v-btn
                color="primary"
                type="submit"
                class="mt-4"
              >
                Save Changes
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Department Management -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            Departments
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              @click="addDepartment"
            >
              Add Department
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>Department Name</th>
                  <th>Head Doctor</th>
                  <th>Staff Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dept in departments" :key="dept.id">
                  <td>{{ dept.name }}</td>
                  <td>{{ dept.headDoctor }}</td>
                  <td>{{ dept.staffCount }}</td>
                  <td>
                    <v-btn
                      icon
                      variant="text"
                      size="small"
                      @click="editDepartment(dept)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      variant="text"
                      size="small"
                      color="error"
                      @click="deleteDepartment(dept)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Department Dialog -->
    <v-dialog v-model="departmentDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ editedDepartmentId ? 'Edit' : 'New' }} Department</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedDepartment.name"
                  label="Department Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedDepartment.headDoctor"
                  :items="doctors"
                  item-title="name"
                  item-value="name"
                  label="Head Doctor"
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
            @click="departmentDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="text"
            @click="saveDepartment"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { doctors } from '@/services/mockData';

const settings = ref({
  darkMode: false,
  notifications: true,
  language: 'English',
  timeZone: 'UTC'
});

const hospitalInfo = ref({
  name: 'HIC Hospital',
  address: '123 Healthcare Ave, Medical City',
  phone: '(555) 123-4567',
  email: 'info@hichospital.com',
  website: 'www.hichospital.com'
});

const departments = ref([
  {
    id: 1,
    name: 'Cardiology',
    headDoctor: 'Dr. Sarah Wilson',
    staffCount: 15
  },
  {
    id: 2,
    name: 'Pediatrics',
    headDoctor: 'Dr. Maria Garcia',
    staffCount: 12
  },
  // Add more departments as needed
]);

const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Chinese',
  'Japanese'
];

const timeZones = [
  'UTC',
  'UTC+1',
  'UTC+2',
  'UTC-5',
  'UTC-8'
];

const departmentDialog = ref(false);
const editedDepartmentId = ref(null);
const editedDepartment = ref({
  name: '',
  headDoctor: '',
  staffCount: 0
});

function updateTheme(value) {
  // Implement theme switching logic
  console.log('Theme updated:', value);
}

function saveHospitalInfo() {
  // Implement save logic
  console.log('Hospital info saved:', hospitalInfo.value);
}

function addDepartment() {
  editedDepartmentId.value = null;
  editedDepartment.value = {
    name: '',
    headDoctor: '',
    staffCount: 0
  };
  departmentDialog.value = true;
}

function editDepartment(dept) {
  editedDepartmentId.value = dept.id;
  editedDepartment.value = { ...dept };
  departmentDialog.value = true;
}

function deleteDepartment(dept) {
  const index = departments.value.findIndex(d => d.id === dept.id);
  departments.value.splice(index, 1);
}

function saveDepartment() {
  if (editedDepartmentId.value) {
    const index = departments.value.findIndex(d => d.id === editedDepartmentId.value);
    departments.value[index] = { ...editedDepartment.value };
  } else {
    departments.value.push({
      id: departments.value.length + 1,
      ...editedDepartment.value,
      staffCount: 0
    });
  }
  departmentDialog.value = false;
}
</script> 