// Importa as funções do Firestore do SDK modular
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// Função para salvar um pedido no Firestore
export const saveOrder = async (pedido) => {
  try {
    // Adiciona um novo pedido à coleção "pedidos"
    const docRef = await addDoc(collection(db, "pedidos"), pedido);
    console.log("Pedido salvo com ID:", docRef.id);
    return docRef.id; // Retorna o ID do pedido salvo
  } catch (error) {
    // Captura e exibe erros
    console.error("Erro ao salvar pedido:", error);
    throw error;
  }
};
