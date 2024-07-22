<template>
  <div>
    <h1>Felhasználói Profil</h1>
    <div v-if="email">
      <p>Email: {{ email }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>
    <button @click="logout">Kijelentkezés</button>
    <button @click="start">start</button>
  </div>
</template>

<script>
import { logout } from '../auth'; // Importáld a logout függvényt

export default {
  data() {
    return {
      email: null,
      error: null,
    };
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await fetch('/fiokom', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        this.email = data.email;
      } catch (error) {
        this.error = error.message;
      }
    },
    logout() {
      logout();
      this.$router.push('/bejelentkezes');
    },
    start() {
      this.$router.push('/start');
    }
  },
};
</script>
