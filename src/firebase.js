// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDyQADEEJtiamvIjvXO98kcwdg09LgaUFE',
  authDomain: 'bt3103-lec6-cpp.firebaseapp.com',
  projectId: 'bt3103-lec6-cpp',
  storageBucket: 'bt3103-lec6-cpp.appspot.com',
  messagingSenderId: '319773502366',
  appId: '1:319773502366:web:24e3e5e04f12cee2bec48f'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
