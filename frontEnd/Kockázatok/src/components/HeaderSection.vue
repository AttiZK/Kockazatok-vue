<template>
  <header
    class="fixed top-0 left-0 flex justify-between py-2 border-b-[1px] bg-white border-b-blue-400 w-full h-[72px] px-4 xl:px-8 3xl:px-16"
  >
    <div class="flex gap-[24px_40px] items-center">
      <RouterLink to="/">
        <img
          src="/img/kockazatok-logo.png"
          alt="Kockázatok.hu Logo"
          width="98"
          height="60"
        />
      </RouterLink>
      <RouterLink to="/start"><div class="nav-item">Start</div></RouterLink>
      <RouterLink to="/kereso"><div class="nav-item">Kereső</div></RouterLink>
      <RouterLink to="/leltar"><div class="nav-item">Leltár</div></RouterLink>
      <RouterLink to="/ertekelo"><div class="nav-item">Értékelő</div></RouterLink>
      <RouterLink to="/kezelo"><div class="nav-item">Kezelő</div></RouterLink>
      <RouterLink to="/riport"><div class="nav-item">Riport</div></RouterLink>
    </div>
    <div class="flex gap-4 items-center">
      <RouterLink v-if="!isLoggedIn" to="/bejelentkezes">
        <div class="nav-item">Bejelentkezés</div>
      </RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/elofizetes">
        <div class="nav-item">Regisztráció</div>
      </RouterLink>
      <RouterLink v-if="isLoggedIn" to="/fiokom"> 
        <div class="nav-item">A fiókom</div>
      </RouterLink>
      <div >
        <p class="text-sm font-sans" v-if="isLoggedIn">Bejelentkezve</p>
        <p class="text-sm font-sans" v-else>Kijelentkezve</p>
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
