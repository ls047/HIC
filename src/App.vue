<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>HIC System</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="Admin User"
          subtitle="admin@hic.com"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.path"
          :active="route.path === item.path"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const drawer = ref(true);

const menuItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    path: '/'
  },
  {
    title: 'Patients',
    icon: 'mdi-account-multiple',
    path: '/patients'
  },
  {
    title: 'Doctors',
    icon: 'mdi-doctor',
    path: '/doctors'
  },
  {
    title: 'Appointments',
    icon: 'mdi-calendar-clock',
    path: '/appointments'
  },
  {
    title: 'Billing',
    icon: 'mdi-currency-usd',
    path: '/billing'
  },
  {
    title: 'Settings',
    icon: 'mdi-cog',
    path: '/settings'
  }
];
</script>

<style scoped>
.v-navigation-drawer {
  transition: 0.2s ease-in-out;
}

.v-list-item--active {
  background: rgb(var(--v-theme-primary));
  color: white;
}

.v-list-item--active:hover {
  background: rgb(var(--v-theme-primary));
}
</style>
