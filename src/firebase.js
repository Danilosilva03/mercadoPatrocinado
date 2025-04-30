import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBMiyhlsVTVAIpurORCEnPBkLprGL3TN7U",
    authDomain: "projeto-mercado-patrocinado.firebaseapp.com",
    projectId: "projeto-mercado-patrocinado",
    storageBucket: "projeto-mercado-patrocinado.firebasestorage.app",
    messagingSenderId: "408578085850",
    appId: "1:408578085850:web:23ba204688c2b53546e6e3"
  };

export const app = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()