<script setup>
import { shallowRef, computed } from "vue";
import { useRouter } from "vue-router";
import {
  useFetch,
  hasErrorOccured,
  errorMessage,
  emailError,
  passwordError,
  turnOffError,
  passwordErrorMessge,
} from "../fetch";
import { store } from "../store";

const props = defineProps({
  authName: String,
});

const user = shallowRef({
  email: null,
  password: null,
});

const router = useRouter();
const showPassword = shallowRef(false);

const hideAllErrors = () => {
  turnOffError();
};

const handleAuth = async () => {
  try {
    await useFetch(`auth/${props?.authName}/`, user.value);
    if (store.hasLogin) router.push("/");
  } catch (err) {
    console.log(err);
  }
};

const goTo = () => {
  if (props.authName == "login") router.push("/elofizetes");
  else router.push("/bejelentkezes");
};
</script>

<template>
  <div
    className="lg:min-h-screen lg:h-max flex items-center justify-center w-full px-4 lg:px-0"
  >
    <div
      className="hidden lg:block flex-1 flex-grow bg-login-pattern bg-50 bg-repeat h-screen border-r-2 border-r-blue-500"
    ></div>
    <div className="flex-1 flex-grow bg-white">
      <div className="max-w-lg lg:mx-44 mt-32 lg:mt-0">
        <form class="form" @submit.prevent="handleAuth" @click="hideAllErrors">
          <p :class="{ Gerror: hasErrorOccured }" v-show="hasErrorOccured">
            {{ errorMessage }}
          </p>
          <h2 class="title">
            {{ props?.authName || "Authentication" }}
          </h2>
          <div class="input-group">
            <label for="email" class="input-label"
              >Email
              <span v-show="emailError" :class="{ error: emailError }"
                >required</span
              ></label
            >
            <input
              type="email"
              id="email"
              name="email"
              v-model="user.email"
              class="input-field"
              autocomplete="email"
              :class="{ inpError: emailError }"
            />
          </div>
          <div class="input-group">
            <label for="password" class="input-label"
              >Jelszó
              <span v-show="passwordError" :class="{ error: passwordError }">{{
                passwordErrorMessge ? passwordErrorMessge : "required"
              }}</span></label
            >
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              name="password"
              v-model="user.password"
              class="input-field"
              autocomplete="current-password"
              :class="{ inpError: passwordError }"
            />
            <span class="password-toggle" @click="showPassword = !showPassword">
              <svg
                width="32"
                height="32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 7C6 7 2 16 2 16s4 9 14 9 14-9 14-9-4-9-14-9Z"
                  stroke="#000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 21a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                  stroke="#000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
          <button type="submit" class="auth-button">
            {{ props.authName == "register" ? "Register" : "Login" }}
          </button>
          <p class="auth-link">
            Click <a @click="goTo">here</a> to
            {{ props?.authName == "register" ? "login" : "register" }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
