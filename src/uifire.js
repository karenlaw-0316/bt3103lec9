import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDyQADEEJtiamvIjvXO98kcwdg09LgaUFE',
  authDomain: 'bt3103-lec6-cpp.firebaseapp.com',
  projectId: 'bt3103-lec6-cpp',
  storageBucket: 'bt3103-lec6-cpp.appspot.com',
  messagingSenderId: '319773502366',
  appId: '1:319773502366:web:24e3e5e04f12cee2bec48f'
}

firebase.initializeApp(firebaseConfig)

export default firebase
