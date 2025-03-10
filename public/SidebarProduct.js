// SidebarProduct.js - Componente para exibir um produto dentro do carrinho
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './SidebarProduct.css';

function SidebarProduct({ product, removeProductFromCart }) {
  return (
    <div className="sidebar-product">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h4>{product.name}</h4>
        <p>R$ {product.price.toFixed(2)}</p>
        <p>Qtd: {product.quantity}</p>
      </div>
      <button className="remove-btn" onClick={() => removeProductFromCart(product.id)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

export default SidebarProduct;