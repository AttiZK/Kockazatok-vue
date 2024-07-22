// store.js
import { reactive } from 'vue';

export const store = reactive({
  email: null,
  hasLogin: false,
  updateEmail(email) {
    this.email = email;
  },
  updateHasLogin(value) {
    this.hasLogin = value;
  }
});
