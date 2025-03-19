import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './ExclusiveSection.css';

export default function AddCartCompra({ addProductToCart, cartItems = [] }) {
  const [exclusiveProducts, setExclusiveProducts] = useState([]);
  const navigate = useNavigate();

  // Buscar produtos do arquivo db2.json
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/db2.json`)
      .then(response => response.json())
      .then(data => {
        if (data.additionalImages) {
          setExclusiveProducts(data.additionalImages);
        } else {
          console.error('Estrutura de dados inesperada:', data);
        }
      })
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  // Função para garantir que o preço é um número
  const parsePrice = (price) => {
    if (!price) return 0; // Retorna 0 se o preço estiver vazio ou inválido
    if (typeof price !== 'string') {
      price = price.toString(); // Converte o preço para string
    }
    return parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  };

  // Função para formatar o valor como moeda BRL
  const formatPrice = (value) => {
    if (isNaN(value) || value === 0) return 'R$ 0,00'; // Verifica se o valor é inválido ou zero
    return `R$ ${value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  // Verificar se o produto já está no carrinho
  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // Função para adicionar produto ao carrinho
  const handleAddToCart = (product) => {
    if (!isProductInCart(product.id)) {
      const productToAdd = {
        ...product,
        price: parsePrice(product.price),  
        quantity: 1, 
      };
      addProductToCart(productToAdd);
    } else {
      console.error('Produto já está no carrinho');
    }
  };

  // Função para "Comprar Agora" e navegar para o checkout
  const handleComprarAgora = (product) => {
    const productToCheckout = {
      ...product,
      price: parsePrice(product.price),  
      quantity: 1, 
    };

    if (!isProductInCart(product.id)) {
      addProductToCart(productToCheckout);
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    setTimeout(() => {
      navigate('/checkout', { state: { product: productToCheckout, cartTotal: productToCheckout.price } });
    }, 100);
  };

  return (
    <div className="additional-images-section">
      <div className="section-header">
        <h3>Produtos Patrocinados</h3>
        <div className="bar"></div>
      </div>
      <div className="additionalImages">
        {exclusiveProducts.map(product => (
          <div key={product.id} className="sponsored-product">
            <img 
              src={`${process.env.PUBLIC_URL}/${product.image}`} 
              alt={product.name} 
              className="sponsored-product-image" 
            />
            <p className="sponsored-product-name">{product.name}</p>
            <p className="sponsored-product-rating">
              {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
            </p>
            <p className="sponsored-product-price">
              {product.originalPrice && (
                <span className="linha-sobre-texto">
                  DE {formatPrice(parsePrice(product.originalPrice))}
                </span>
              )}
              <br />
              <span>Por {formatPrice(parsePrice(product.price))}</span>
              <br />
              {product.installmentPrice && (
                <span>
                  Em até {product.maxInstallments}x de {formatPrice(parsePrice(product.installmentPrice))}
                </span>
              )}
            </p>
            <div className="sponsored-product-buttons">
              <button 
                onClick={() => handleComprarAgora(product)} 
                className="sponsored-btn-icon"
              >
                <span>Comprar Agora</span>
                <FontAwesomeIcon icon={faMoneyBill} />
              </button>
              <button 
                onClick={() => handleAddToCart(product)} 
                className="sponsored-add-to-cart-btn"
              >
                <span>Adicionar ao Carrinho</span>
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
