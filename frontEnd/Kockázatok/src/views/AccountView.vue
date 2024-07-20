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
  </div>
</template>

<script>
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
        const response = await fetch('/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the JWT token in localStorage
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
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
