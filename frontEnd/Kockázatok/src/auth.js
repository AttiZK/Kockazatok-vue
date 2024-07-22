// auth.js
import axios from './axios';
import { store } from './store';

export async function is_authenticated() {
  try {
    const response = await axios.get('/fiokom');
    store.updateEmail(response.data.email);
    store.updateHasLogin(true);
    return true;
  } catch (err) {
    store.updateHasLogin(false);
    return false;
  }
}

export function logout() {
  // Töröljük a tokent a localStorage-ból
  localStorage.removeItem('token');
  
  // Frissítjük a store állapotát
  store.updateHasLogin(false);
  store.updateEmail(null);
}
