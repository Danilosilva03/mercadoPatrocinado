// FormPagamento.js - Formulário de Pagamento
import React, { useState } from 'react';
import './FormPagamento.css';

function FormPagamento({ cartTotal, selectedProducts, onRemoveProduct }) {
  const [paymentMethod, setPaymentMethod] = useState('cartao');

  const handlePayment = (e) => {
    e.preventDefault();
    alert('Pagamento realizado com sucesso!');
  };

  return (
    <div className="form-pagamento">
      <h1>Finalizar Compra</h1>
      <form onSubmit={handlePayment}>
        <label>
          Método de Pagamento:
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="cartao">Cartão de Crédito</option>
            <option value="boleto">Boleto Bancário</option>
            <option value="pix">PIX</option>
          </select>
        </label>
        
        <h2>Resumo do Pedido</h2>
        <ul>
          {selectedProducts.map(product => (
            <li key={product.id}>
              {product.name} - {product.quantity}x R$ {product.price.toFixed(2)}
              <button type="button" onClick={() => onRemoveProduct(product.id)}>Remover</button>
            </li>
          ))}
        </ul>
        
        <h3>Total: R$ {cartTotal.toFixed(2)}</h3>
        <button type="submit">Pagar</button>
      </form>
    </div>
  );
}

export default FormPagamento;