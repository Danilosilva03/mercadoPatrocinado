import React from 'react';
import './ProductsPage.css';

function ProductsPage({ products, addProductToCart }) {
  return (
    <div className="products-page">
      <h1>Lista de Produtos</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>

            {/* Exibição do preço com promoção, se houver */}
            {parsePrice(product.originalPrice) > parsePrice(product.price) ? (
              <p className="product-price">
                <span className="old-price">R$ {formatPrice(product.originalPrice)}</span>
                <span className="promo-price">R$ {formatPrice(product.price)}</span>
              </p>
            ) : (
              <p className="product-price">R$ {formatPrice(product.price)}</p>
            )}

            {/* Exibição do preço de parcela */}
            <p className="installment-price">
              ou em até {product.maxInstallments}x de {formatPrice(product.installmentPrice)} sem juros
            </p>

            {/* Avaliação do produto */}
            <div className="product-rating">
              {"★".repeat(product.rating)}
            </div>

            <button onClick={() => addProductToCart(product)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Função para formatar o preço com vírgula como separador de decimais
const formatPrice = (price) => {
  return price.replace(".", ",");
}

// Função para converter o preço para número, removendo caracteres indesejados
const parsePrice = (priceString) => {
  // Remove "R$", e transforma o valor em número
  return parseFloat(priceString.replace('R$', '').replace(/\./g, '').replace(',', '.')) || 0;
};

export default ProductsPage;
