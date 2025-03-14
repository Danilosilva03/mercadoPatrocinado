import React, { useState } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faUserShield, faClipboard } from '@fortawesome/free-solid-svg-icons';

// Função para formatar o valor em moeda brasileira
const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Função para renderizar a quantidade de parcelas e o botão de remoção
const renderProductDetails = (product, onRemove) => (
  <div key={product.id} className="product-item">
    <img
      src={product.image}
      alt={product.name}
      className="product-imagee"
    />
    <div className="product-details">
      <p className="product-namee">{product.name}</p>
      <p className="product-pricee"><b>Preço:</b> {formatCurrency(product.price)}</p>
      <p className="product-installmentss">Parcelas: {product.maxInstallments}x</p>
    </div>
  </div>
);

export default function FormPagamento({ cartTotal, selectedProducts = [], onRemoveProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: '',
    postalCode: '',
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="checkout-container">
      {/* Resumo do Carrinho */}
      <div className="cart-summary">
        <h3>Pedido Selecionado</h3>
        <div className="products-container">
          {selectedProducts.length > 0 ? (
            selectedProducts.map((product) => renderProductDetails(product, onRemoveProduct))
          ) : (
            <p className="empty-cart">Nenhum produto selecionado.</p>
          )}
        </div>
        <div className="cart-total">
          <h3>Valor Total: {formatCurrency(cartTotal)}</h3>
        </div>
      </div>

      {/* Formulário de Pagamento */}
      <div className="payment-form">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="column">
              <h3 className="title">Dados de Entrega</h3>
              {/* Inputs de entrega */}
              <div className="input-box">
                <label htmlFor="name">Seu Nome:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Jacob Aiden"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="exemplo123@dominio.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="address">Endereço:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Rua e Número, Bairro"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="city">Cidade:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Qual sua Cidade"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex">
                <div className="input-box">
                  <label htmlFor="phone">Telefone:</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(99) 99999-9999"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="postalCode">Código Postal:</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    placeholder="99999-999"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="security-notes">
                <p>
                  <FontAwesomeIcon icon={faUserShield} /> Nós protegemos seus Dados de Pagamento e Entrega usando Criptografia para garantir segurança ao nível de bancos.
                </p>
                <br />
                <p>
                  <FontAwesomeIcon icon={faClipboard} /> A cobrança irá aparecer no seu cartão como <b>PG*BANK</b>
                </p>
              </div>
            </div>

            <div className="column">
              <h3 className="title">Pagamento</h3>
              <div className="input-box">
                <label>Cartões Aceitos:</label>
              </div>
              <img src={`${process.env.PUBLIC_URL}/imagens/barra.png`} alt="Cartões Aceitos" />

              <div className="input-box">
                <label htmlFor="cardName">Agencia do Cartão:</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  placeholder="Mr. Jeff Willy"
                  value={formData.cardName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="cardNumber">Número do Cartão:</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="9999 9999 9999 9999"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="expiryMonth">Mês Exp.:</label>
                <input
                  type="number"
                  id="expiryMonth"
                  name="expiryMonth"
                  placeholder="MM"
                  value={formData.expiryMonth}
                  onChange={handleChange}
                  min="01"
                  max="12"
                  required
                />
              </div>
              <div className="flex">
                <div className="input-box">
                  <label htmlFor="expiryYear">Ano Exp.:</label>
                  <input
                    type="number"
                    id="expiryYear"
                    name="expiryYear"
                    placeholder="YYYY"
                    value={formData.expiryYear}
                    onChange={handleChange}
                    min="2024"
                    required
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="cvv">CVV:</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn">
                Pagar Agora <FontAwesomeIcon icon={faMoneyBill} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
