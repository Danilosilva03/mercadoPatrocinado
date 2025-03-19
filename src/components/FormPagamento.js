"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faUserShield, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../App.css';

const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export default function FormPagamento({ cartTotal, selectedProducts = [] }) {
  const [formData, setFormData] = useState({
    nome: '', email: '', endereco: '', cidade: '', telefone: '', cep: '',
    nomeCartao: '', numeroCartao: '', mesExpiracao: '', anoExpiracao: '', cvv: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (Object.values(formData).includes('') || selectedProducts.length === 0) {
      alert('Preencha todos os campos e adicione produtos ao carrinho.');
      setIsSubmitting(false);
      return;
    }

    const orderData = {
      ...formData,
      total: cartTotal,
      produtos: selectedProducts.map(produto => ({
        id: produto.id,
        nome: produto.name,
        preco: produto.price,
        quantidade: produto.quantity,
      }))
    };

    try {
      await addDoc(collection(db, 'orders'), orderData);
      alert('Pedido realizado com sucesso!');
      setFormData({ 
        nome: '',
        email: '',
        endereco: '',
        cidade: '',
        telefone: '',
        cep: '', 
        nomeCartao: '', 
        numeroCartao: '', 
        mesExpiracao: '', 
        anoExpiracao: '', 
        cvv: '' });
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
      alert('Erro ao processar o pedido. Tente novamente.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="checkout-container">
      <div className="cart-summary">
        <h3>Pedido Selecionado</h3>
        <div className="products-container">
          {selectedProducts.length > 0 ? (
            selectedProducts.map(produto => (
              <div key={produto.id} className="product-item">
                <img src={produto.image} alt={produto.name} className="product-imagee" />
                <div className="product-details">
                  <p className="product-namee">{produto.name}</p>
                  <p className="product-pricee"><b>Preço:</b> {formatCurrency(produto.price)}</p>
                  <p className="product-installmentss">Parcelas: {produto.maxInstallments}x</p>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-cart">Nenhum produto selecionado.</p>
          )}
        </div>
        <div className="cart-total">
          <h3>Valor Total: {formatCurrency(cartTotal)}</h3>
        </div>
      </div>
      <div className="payment-form">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="column">
              <h3 className="title">Dados de Entrega</h3>
              {[ 'nome', 'email', 'endereco', 'cidade', 'telefone', 'cep'].map(campo => (
                <div key={campo} className="input-box">
                  <label htmlFor={campo}>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                  <input type="text" id={campo} name={campo} value={formData[campo]} onChange={handleChange} required />
                </div>
              ))}
              <div className="security-notes">
                <p><FontAwesomeIcon icon={faUserShield} /> Segurança garantida.</p>
                <p><FontAwesomeIcon icon={faClipboard} /> Cobrança como <b>PG*BANK</b>.</p>
              </div>
            </div>
            <div className="column">
              <h3 className="title">Pagamento</h3>
              <img src={`${process.env.PUBLIC_URL}/imagens/barra.png`} alt="Cartões Aceitos" />
              {[ 'nomeCartao', 'numeroCartao', 'mesExpiracao', 'anoExpiracao', 'cvv'].map(campo => (
                <div key={campo} className="input-box">
                  <label htmlFor={campo}>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                  <input type="text" id={campo} name={campo} value={formData[campo]} onChange={handleChange} required />
                </div>
              ))}
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? 'Processando...' : 'Pagar Agora'} <FontAwesomeIcon icon={faMoneyBill} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
