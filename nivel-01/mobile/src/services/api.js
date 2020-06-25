import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

/**
 * iOS com Emulador: localhost
 * iOS com físico: IP da máquina
 * 
 * Android com Emulador: localhost (adb reverse) --usando
 * Android com Emulador Android Studio: 10.0.2.2
 * Android com Emulador Genymotion: 10.0.3.2
 * Android com físico: IP da máquina
 */
