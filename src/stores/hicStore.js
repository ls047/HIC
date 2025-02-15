import { defineStore } from 'pinia';
import { patients, appointments, doctors, departments, statuses } from '@/services/mockData';

export const useHICStore = defineStore('hic', {
  state: () => ({
    patients: patients,
    appointments: appointments,
    doctors: doctors,
    departments: departments,
    statuses: statuses,
    loading: false,
    error: null,
    selectedPatient: null,
    selectedDoctor: null,
    selectedAppointment: null
  }),

  getters: {
    getTodayAppointments: (state) => {
      const today = new Date().toISOString().split('T')[0];
      return state.appointments.filter(apt => apt.date === today);
    },
    
    getActivePatients: (state) => {
      return state.patients.filter(patient => patient.status === 'Active');
    },

    getAvailableDoctors: (state) => {
      const today = new Date().toLocaleString('en-us', {weekday: 'short'});
      return state.doctors.filter(doctor => doctor.availability.includes(today));
    }
  },

  actions: {
    // Patient actions
    addPatient(patient) {
      const newId = Math.max(...this.patients.map(p => p.id)) + 1;
      const newPatient = { ...patient, id: newId };
      this.patients.push(newPatient);
      return newPatient;
    },

    updatePatient(patient) {
      const index = this.patients.findIndex(p => p.id === patient.id);
      if (index !== -1) {
        this.patients[index] = { ...this.patients[index], ...patient };
        return true;
      }
      return false;
    },

    deletePatient(id) {
      const index = this.patients.findIndex(p => p.id === id);
      if (index !== -1) {
        this.patients.splice(index, 1);
        // Also delete related appointments
        this.appointments = this.appointments.filter(apt => apt.patientId !== id);
        return true;
      }
      return false;
    },

    // Doctor actions
    addDoctor(doctor) {
      const newId = Math.max(...this.doctors.map(d => d.id)) + 1;
      const newDoctor = { ...doctor, id: newId };
      this.doctors.push(newDoctor);
      return newDoctor;
    },

    updateDoctor(doctor) {
      const index = this.doctors.findIndex(d => d.id === doctor.id);
      if (index !== -1) {
        this.doctors[index] = { ...this.doctors[index], ...doctor };
        return true;
      }
      return false;
    },

    deleteDoctor(id) {
      const index = this.doctors.findIndex(d => d.id === id);
      if (index !== -1) {
        this.doctors.splice(index, 1);
        // Update related appointments
        this.appointments = this.appointments.filter(apt => apt.doctor !== id);
        return true;
      }
      return false;
    },

    // Appointment actions
    addAppointment(appointment) {
      const newId = Math.max(...this.appointments.map(a => a.id)) + 1;
      const newAppointment = { ...appointment, id: newId };
      this.appointments.push(newAppointment);
      return newAppointment;
    },

    updateAppointment(appointment) {
      const index = this.appointments.findIndex(a => a.id === appointment.id);
      if (index !== -1) {
        this.appointments[index] = { ...this.appointments[index], ...appointment };
        return true;
      }
      return false;
    },

    deleteAppointment(id) {
      const index = this.appointments.findIndex(a => a.id === id);
      if (index !== -1) {
        this.appointments.splice(index, 1);
        return true;
      }
      return false;
    },

    // Utility actions
    setSelectedPatient(patient) {
      this.selectedPatient = patient;
    },

    setSelectedDoctor(doctor) {
      this.selectedDoctor = doctor;
    },

    setSelectedAppointment(appointment) {
      this.selectedAppointment = appointment;
    },

    clearSelections() {
      this.selectedPatient = null;
      this.selectedDoctor = null;
      this.selectedAppointment = null;
    }
  }
}); 