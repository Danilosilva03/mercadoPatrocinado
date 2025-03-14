// Importação das funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "meu-projeto.firebaseapp.com",
  projectId: "meu-projeto",
  storageBucket: "meu-projeto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxxxxxxx",
  measurementId: "G-XXXXXXXXXX",
};


// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

// Exporta o Firestore para ser usado em outros arquivos
export { db };
