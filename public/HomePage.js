// HomePage.js - Página Inicial
import React from 'react';
import './HomePage.css';

function HomePage({ products, addProductToCart }) {
  return (
    <div className="home-page">
      <h1>Bem-vindo ao Mercado Patrocinado</h1>
      <div className="featured-products">
        {products.slice(0, 4).map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">R$ {product.price.toFixed(2)}</p>
            <button onClick={() => addProductToCart(product)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
