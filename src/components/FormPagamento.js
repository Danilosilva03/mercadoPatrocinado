"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export default function FormPagamento({ cartTotal, selectedProducts = [] }) {
  const [formData, setFormData] = useState({
    nome: '', telefone: '', cep: '',
    endereco: '', numero: '', bairro: '', cidade: '', estado: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const buscarEnderecoPorCEP = async (cep) => {
    if (!cep || cep.replace(/\D/g, '').length !== 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setFormData(prevData => ({
          ...prevData,
          endereco: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || ''
        }));
      } else {
        alert("CEP não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar o endereço. Tente novamente.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const camposObrigatorios = [
      'nome', 'telefone', 'cep',
      'endereco', 'numero', 'bairro', 'cidade', 'estado'
    ];

    const todosPreenchidos = camposObrigatorios.every(
      campo => formData[campo] && formData[campo].trim() !== ''
    );

    if (!todosPreenchidos || selectedProducts.length === 0) {
      alert('Preencha todos os campos obrigatórios e adicione produtos ao carrinho.');
      setIsSubmitting(false);
      navigate('/compraerrada');
      return;
    }

    const orderData = {
      ...formData,
      total: cartTotal,
      produtos: selectedProducts.map(produto => ({
        id: produto.id,
        name: produto.name,
        price: produto.price,
        quantity: produto.quantity,
      })),
      criadoEm: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, 'orders'), orderData);

      const response = await fetch("http://localhost:5000/api/pagamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produtos: orderData.produtos })
      });

      const data = await response.json();

      if (data.link_pagamento) {
        window.location.href = data.link_pagamento;
      } else {
        alert("Erro ao gerar link de pagamento");
        navigate('/compraerrada');
      }

      setFormData({
        nome: '', telefone: '', cep: '',
        endereco: '', numero: '', bairro: '', cidade: '', estado: ''
      });
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      alert('Erro ao processar o pedido. Tente novamente.');
      navigate('/compraerrada');
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
        <form onSubmit={handleSubmit} noValidate>
          <div className="row">
            <div className="column">
              <h3 className="title">Dados de Entrega</h3>

              {['nome', 'telefone'].map(campo => (
                <div key={campo} className="input-box">
                  <label htmlFor={campo}>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                  <input
                    type="text"
                    id={campo}
                    name={campo}
                    value={formData[campo]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="input-box">
                <label htmlFor="cep">CEP:</label>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  onBlur={() => buscarEnderecoPorCEP(formData.cep)}
                  required
                />
              </div>

              {['endereco', 'numero', 'bairro', 'cidade', 'estado'].map(campo => (
                <div key={campo} className="input-box">
                  <label htmlFor={campo}>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                  <input
                    type="text"
                    id={campo}
                    name={campo}
                    value={formData[campo]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="security-notes">
                <p><FontAwesomeIcon icon={faUserShield} /> Garantindo que sua informação esteja segura.</p>
                <p><FontAwesomeIcon icon={faClipboard} /> Pagamento com <b>BC*MercadoPago</b>.</p>
              </div>

              <button
                type="submit"
                className="btn"
                disabled={isSubmitting}
                style={{ marginTop: '10px', backgroundColor: '#006400', color: '#fff' }}
              >
                {isSubmitting ? 'Processando...' : 'Finalizar Pedido'}
              </button>
            </div>

            <div className="checkout-column">
              <b className="secure-message">
                🔒 Segurança de Dados <br />
                Por favor, preencha suas informações corretamente para garantir a segurança e o sucesso da operação.
              </b>
              <div className="Pagacheckout11">
                      <b>
                         Detalhes do pagamento <br />
                         Cheese Max (x1) <br />
                         R$ 25
                     </b>
                 </div>

              <div className="logo-footer11">
                <h1 className="logoo11">
                  Formulario<span> De Entrega</span>
                </h1>
                <p>Tudo o que você precisa chegará até você.</p>
                <img
                  src={`${process.env.PUBLIC_URL}/imagens/compra-online1.webp`}
                  alt="products"
                  className="headerI"
                />
              </div>

              <div className="download-options11">
                <b>
                  "Tecnologia de segurança certificada para proteger você do início ao fim da compra."<br />
                  "Confie em nossa segurança: usamos criptografia avançada para proteger seus dados."
                </b>
                <div className="app-images">
                  <img
                    src={`${process.env.PUBLIC_URL}/imagens/barra.png`}
                    alt="App Store download"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
