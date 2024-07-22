<template>
  <div>
    <h1>Felhasználói Profil</h1>
    <div v-if="email">
      <p>Email: {{ email }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <button @click="logout">Kijelentkezés</button>
  </div>
</template>

<script>
import { logout } from '../auth';

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
        const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/fiokom`, {
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
    }
  },
};
</script>
