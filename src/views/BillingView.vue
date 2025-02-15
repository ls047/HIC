<template>
  <v-container>
    <h1 class="text-h4 mb-4">Billing</h1>

    <!-- Search and Filter -->
    <v-card class="mb-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="search"
              label="Search Bills"
              prepend-icon="mdi-magnify"
              hide-details
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="statusFilter"
              :items="['All', 'Pending', 'Paid', 'Overdue']"
              label="Payment Status"
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
              New Invoice
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Bills Table -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="filteredBills"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:item.total="{ item }">
          ${{ (item.total || 0).toFixed(2) }}
        </template>
        <template v-slot:item.patientResponsibility="{ item }">
          ${{ (item.patientResponsibility || 0).toFixed(2) }}
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            size="small"
          >
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            variant="text"
            size="small"
            @click="viewBill(item)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="text"
            size="small"
            @click="editBill(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="text"
            size="small"
            color="success"
            @click="markAsPaid(item)"
            v-if="item.status === 'Pending'"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add/Edit Bill Dialog -->
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ editedId ? 'Edit Invoice' : 'New Invoice' }}</span>
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
                <v-text-field
                  v-model="editedItem.date"
                  label="Bill Date"
                  type="date"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <h3 class="text-h6 mb-2">Items</h3>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in editedItem.items"
                    :key="index"
                  >
                    <v-row align="center">
                      <v-col cols="6">
                        <v-text-field
                          v-model="item.description"
                          label="Description"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model.number="item.amount"
                          label="Amount"
                          type="number"
                          prefix="$"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-btn
                          icon
                          color="error"
                          size="small"
                          @click="removeItem(index)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list>
                <v-btn
                  color="primary"
                  variant="text"
                  prepend-icon="mdi-plus"
                  @click="addItem"
                  class="mt-2"
                >
                  Add Item
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="editedItem.insurance.coverage"
                  label="Insurance Coverage (%)"
                  type="number"
                  min="0"
                  max="100"
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
            @click="saveBill"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- View Bill Dialog -->
    <v-dialog v-model="viewDialog" max-width="800px">
      <v-card>
        <v-card-title class="text-h5">
          Invoice Details
          <v-btn
            icon
            variant="text"
            @click="printBill"
            class="float-right"
          >
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-container>
            <div class="text-subtitle-1 mb-2">
              Patient: {{ selectedPatient?.name }}
            </div>
            <div class="text-subtitle-2 mb-4">
              Date: {{ selectedBill?.date }}
            </div>

            <v-table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in selectedBill?.items" :key="index">
                  <td>{{ item.description }}</td>
                  <td class="text-right">${{ item.amount.toFixed(2) }}</td>
                </tr>
                <tr class="font-weight-bold">
                  <td>Total</td>
                  <td class="text-right">${{ selectedBill?.total.toFixed(2) }}</td>
                </tr>
                <tr>
                  <td>Insurance Coverage ({{ selectedBill?.insurance.coverage }}%)</td>
                  <td class="text-right">${{ selectedBill?.insurance.amount.toFixed(2) }}</td>
                </tr>
                <tr class="font-weight-bold">
                  <td>Patient Responsibility</td>
                  <td class="text-right">${{ selectedBill?.patientResponsibility.toFixed(2) }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="viewDialog = false"
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
import { bills, patients } from '@/services/mockData';

const search = ref('');
const statusFilter = ref('All');
const dialog = ref(false);
const viewDialog = ref(false);
const editedId = ref(null);
const selectedBill = ref(null);

const headers = [
  { title: 'Date', key: 'date', sortable: true },
  { title: 'Patient', key: 'patientName', sortable: true },
  { title: 'Total', key: 'total', sortable: true },
  { title: 'Patient Responsibility', key: 'patientResponsibility', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false }
];

const editedItem = ref({
  patientId: '',
  date: new Date().toISOString().substr(0, 10),
  items: [{ description: '', amount: 0 }],
  insurance: {
    coverage: 80,
    amount: 0
  },
  status: 'Pending'
});

const defaultItem = {
  patientId: '',
  date: new Date().toISOString().substr(0, 10),
  items: [{ description: '', amount: 0 }],
  insurance: {
    coverage: 80,
    amount: 0
  },
  status: 'Pending'
};

const filteredBills = computed(() => {
  let filtered = bills.map(bill => ({
    ...bill,
    total: bill.total || calculateTotal(bill.items || []),
    patientResponsibility: bill.patientResponsibility || calculatePatientResponsibility(bill),
    status: bill.status || 'Pending'
  }));
  
  if (statusFilter.value !== 'All') {
    filtered = filtered.filter(bill => bill.status === statusFilter.value);
  }
  return filtered;
});

const selectedPatient = computed(() => {
  if (!selectedBill.value) return null;
  return patients.find(p => p.id === selectedBill.value.patientId);
});

function getStatusColor(status) {
  switch (status) {
    case 'Paid': return 'success';
    case 'Pending': return 'warning';
    case 'Overdue': return 'error';
    default: return 'grey';
  }
}

function addItem() {
  editedItem.value.items.push({ description: '', amount: 0 });
}

function removeItem(index) {
  editedItem.value.items.splice(index, 1);
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + (item.amount || 0), 0);
}

function calculatePatientResponsibility(bill) {
  const total = bill.total || calculateTotal(bill.items || []);
  const coverage = bill.insurance?.coverage || 0;
  const insuranceAmount = (total * coverage) / 100;
  return total - insuranceAmount;
}

function editBill(item) {
  editedId.value = item.id;
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}

function viewBill(item) {
  selectedBill.value = item;
  viewDialog.value = true;
}

function markAsPaid(item) {
  const index = bills.findIndex(bill => bill.id === item.id);
  bills[index].status = 'Paid';
}

function saveBill() {
  const totals = calculateTotals(editedItem.value);
  const billData = {
    ...editedItem.value,
    ...totals,
    patientName: patients.find(p => p.id === editedItem.value.patientId)?.name
  };

  if (editedId.value) {
    const index = bills.findIndex(item => item.id === editedId.value);
    Object.assign(bills[index], billData);
  } else {
    bills.push({
      id: bills.length + 1,
      ...billData
    });
  }
  closeDialog();
}

function closeDialog() {
  dialog.value = false;
  editedId.value = null;
  editedItem.value = Object.assign({}, defaultItem);
}

function printBill() {
  window.print();
}
</script>

<style scoped>
@media print {
  .v-btn:not(.print-button) {
    display: none;
  }
}

.v-table {
  width: 100%;
}
</style> 