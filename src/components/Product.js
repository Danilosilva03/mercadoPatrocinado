import { faMoneyBill, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Product({
  id,
  image,
  name,
  rating,
  price,
  originalPrice,
  installmentPrice,
  maxInstallments,
  addProductToCart
}) {
  const navigate = useNavigate();

  // Função para redirecionar ao checkout ao clicar em "Comprar Agora"
  const handleBuyNow = () => {
    // Adiciona o produto ao carrinho
    addProductToCart({ id, name, price: price, image });

    // Rola a página para o topo com uma transição suave
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Transição suave para o topo da página
    });

    // Aguarda a transição antes de redirecionar ao checkout
    setTimeout(() => {
      navigate(`/checkout?id=${id}&name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}&cartTotal=${encodeURIComponent(price)}`);
    }, 500); // 500ms de atraso para dar tempo da rolagem completar
  };

  // Função para adicionar ao carrinho sem redirecionar
  const handleAddToCart = () => {
    addProductToCart({ id, name, price: price, image });
  };

  // Cria as estrelas de avaliação
  const ratingStars = '★'.repeat(rating) + '☆'.repeat(6 - rating);

  // Função para converter preço para string
  const formatPriceToString = (price) => {
    // Garantir que o preço seja uma string antes de aplicar a formatação
    if (price) {
      const priceString = price.toString(); // Converte para string
      return parseFloat(priceString.replace(/[^\d,]/g, '').replace(',', '.'))
        .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    return null;
  };

  // Formatação do preço para o formato de reais (BRL)
  const formattedPrice = formatPriceToString(price);
  const formattedOriginalPrice = originalPrice ? formatPriceToString(originalPrice) : null;
  const formattedInstallmentPrice = installmentPrice ? formatPriceToString(installmentPrice) : null;

  return (
    <div className="product">
      <img src={`${process.env.PUBLIC_URL}/${image}`} alt={name} className="product-image" />
      <p className="product-name">{name}</p>
      <p className="product-rating">{ratingStars}</p>
      
      <div className="product-price-container">
        {formattedOriginalPrice && formattedOriginalPrice !== formattedPrice ? (
          <>
            <p className="product-price original-price" style={{ textDecoration: 'line-through', color: 'red' }}>
              {formattedOriginalPrice}
            </p>
            <p className="product-price promotion-price" style={{ fontWeight: 'bold' }}>
              {formattedPrice}
            </p>
          </>
        ) : (
          <p className="product-price">{formattedPrice}</p>
        )}
        
        {formattedInstallmentPrice && maxInstallments && (
          <p className="product-installments">
            {`Ou ${maxInstallments}x de ${formattedInstallmentPrice} sem juros`}
          </p>
        )}
      </div>

      <div className="buttons">
        <button onClick={handleBuyNow} className="btn-icon buy-now-btn">
          <span>Comprar Agora</span>
          <FontAwesomeIcon icon={faMoneyBill} />
        </button>

        <button onClick={handleAddToCart} className="btn-icon add-to-cart-btn">
          <span>Adicionar ao Carrinho</span>
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </div>
  );
}
