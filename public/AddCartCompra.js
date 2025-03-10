// AddCartCompra.js - Gerenciamento do Carrinho
import React from 'react';
import './AddCartCompra.css';

function AddCartCompra({ cartItems, updateCartQuantity, addProductToCart }) {
  return (
    <div className="add-cart-compra">
      <h2>Produtos no Carrinho</h2>
      {cartItems.length > 0 ? (
        cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div>
              <h3>{item.name}</h3>
              <p>Preço: R$ {item.price.toFixed(2)}</p>
              <div className="cart-item-actions">
                <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>O carrinho está vazio.</p>
      )}
    </div>
  );
}

export default AddCartCompra;