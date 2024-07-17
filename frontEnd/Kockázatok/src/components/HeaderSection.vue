<template>
  <header class="fixed top-0 flex gap-4 items-center px-4 py-2 border-b-[1px] bg-white border-b-blue-400 w-full  h-[72px]">
    <RouterLink to="/">
      <img src="/img/kockazatok-logo.png" alt="Kockázatok.hu Logo" width="98" height="60">
    </RouterLink>
    <RouterLink to="/start">
      Start
    </RouterLink>
    <RouterLink to="/kereso">
      Kereső
    </RouterLink>
    <RouterLink to="/leltar">
      Leltár
    </RouterLink>
    <RouterLink to="/ertekelo">
      Értékelő
    </RouterLink>
    <RouterLink to="/kezelo">
      Kezelő
    </RouterLink>
    <RouterLink to="/riport">
      Riport
    </RouterLink>
  </header>
</template>