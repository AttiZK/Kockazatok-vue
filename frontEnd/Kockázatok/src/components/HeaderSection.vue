<template>
  <header
    class="fixed top-0 flex justify-between px-4 py-2 border-b-[1px] bg-white border-b-blue-400 w-full h-[72px]"
  >
    <div class="flex gap-4 items-center">
      <RouterLink to="/">
        <img
          src="/img/kockazatok-logo.png"
          alt="Kockázatok.hu Logo"
          width="98"
          height="60"
        />
      </RouterLink>
      <RouterLink to="/start"> Start </RouterLink>
      <RouterLink to="/kereso"> Kereső </RouterLink>
      <RouterLink to="/leltar"> Leltár </RouterLink>
      <RouterLink to="/ertekelo"> Értékelő </RouterLink>
      <RouterLink to="/kezelo"> Kezelő </RouterLink>
      <RouterLink to="/riport"> Riport </RouterLink>
    </div>
    <div class="flex gap-4 items-center">
      <RouterLink v-if="!isLoggedIn" to="/bejelentkezes">
        Bejelentkezés
      </RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/elofizetes">
        Regisztráció
      </RouterLink>
      <RouterLink v-if="isLoggedIn" to="/fiokom"> A fiókom </RouterLink>
      <div>
        <p v-if="isLoggedIn">You are logged in.</p>
        <p v-else>You are not logged in.</p>
      </div>
    </div>
  </header>
</template>

<script>
import { store } from '../store';

export default {
  computed: {
    isLoggedIn() {
      return store.hasLogin;
    }
  }
};
</script>
