import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      patients: [
        {
          id: 'P001',
          name: 'John Doe',
          age: 45,
          gender: 'Male',
          bloodType: 'A+',
          phone: '+1 234-567-8901',
          email: 'john.doe@email.com',
          address: '123 Main St, New York, NY',
          history: [
            { date: '2024-03-15', type: 'Checkup', doctor: 'Dr. Smith', notes: 'Regular checkup, blood pressure normal' },
            { date: '2024-02-01', type: 'Lab Test', doctor: 'Dr. Wilson', notes: 'Blood work completed' }
          ],
          appointments: [
            { date: '2024-03-20', time: '10:00 AM', doctor: 'Dr. Smith', type: 'Follow-up' }
          ],
          medications: [
            { name: 'Aspirin', dosage: '100mg', frequency: 'Daily' }
          ],
          avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0062FF&color=fff'
        },
        {
          id: 'P002',
          name: 'Emma Wilson',
          age: 32,
          gender: 'Female',
          bloodType: 'O-',
          phone: '+1 234-567-8902',
          email: 'emma.wilson@email.com',
          address: '456 Oak Ave, Boston, MA',
          history: [
            { date: '2024-03-14', type: 'Emergency', doctor: 'Dr. Brown', notes: 'Severe allergic reaction' }
          ],
          appointments: [
            { date: '2024-03-21', time: '2:00 PM', doctor: 'Dr. Brown', type: 'Allergy Test' }
          ],
          medications: [
            { name: 'Antihistamine', dosage: '10mg', frequency: 'As needed' }
          ],
          avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=0062FF&color=fff'
        }
      ],
      doctors: [
        {
          id: 'D001',
          name: 'Dr. Sarah Smith',
          specialty: 'Cardiology',
          phone: '+1 234-567-8903',
          email: 'dr.smith@hospital.com',
          schedule: [
            { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
            { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
            { day: 'Friday', hours: '9:00 AM - 3:00 PM' }
          ],
          avatar: 'https://ui-avatars.com/api/?name=Dr+Smith&background=0062FF&color=fff'
        }
      ],
      appointments: [
        {
          id: 'A001',
          patientId: 'P001',
          doctorId: 'D001',
          date: '2024-03-20',
          time: '10:00 AM',
          type: 'Follow-up',
          status: 'Scheduled',
          notes: 'Regular checkup'
        }
      ]
    }
  },
  mutations: {
    ADD_PATIENT(state, patient) {
      state.patients.push(patient)
    },
    UPDATE_PATIENT(state, updatedPatient) {
      const index = state.patients.findIndex(p => p.id === updatedPatient.id)
      if (index !== -1) {
        state.patients[index] = updatedPatient
      }
    },
    ADD_APPOINTMENT(state, appointment) {
      state.appointments.push(appointment)
    }
  },
  actions: {
    addPatient({ commit }, patient) {
      commit('ADD_PATIENT', patient)
    },
    updatePatient({ commit }, patient) {
      commit('UPDATE_PATIENT', patient)
    },
    addAppointment({ commit }, appointment) {
      commit('ADD_APPOINTMENT', appointment)
    }
  },
  getters: {
    getPatientById: (state) => (id) => {
      return state.patients.find(patient => patient.id === id)
    },
    getDoctorById: (state) => (id) => {
      return state.doctors.find(doctor => doctor.id === id)
    },
    getPatientAppointments: (state) => (patientId) => {
      return state.appointments.filter(apt => apt.patientId === patientId)
    },
    getAllPatients: (state) => {
      return state.patients
    },
    getAllDoctors: (state) => {
      return state.doctors
    }
  }
})

export default store 