import React from 'react';
import './styles.css'; // Certifique-se de importar o CSS para este componente

const Header = () => {
  return (
    <header>
      <div className="header-background">
        <img src="sua-imagem.jpg" alt="Imagem de fundo" className="featured-products-image" />
      </div>

      <div className="inner-content">
        {/* Lado esquerdo do Header */}
        <div className="left-side">
          <h1>Bem-vindo ao Nosso Site</h1>
          <h2>Ofertas e promoções incríveis para você!</h2>
          <p>Confira nossos produtos mais vendidos, promoções e novidades!</p>
          <div className="hero-container">
            <p className="typed">Produtos exclusivos estão esperando por você!</p>
            <a href="#produtos" className="see-more-btn">Ver mais</a>
          </div>
        </div>

        {/* Lado direito do Header com imagem */}
        <div className="right-side">
          <img src="imagem-destaque.jpg" alt="Produto em destaque" />
        </div>
      </div>

      {/* Barra de Pesquisa */}
      <div className="search-container">
        <input type="text" placeholder="Buscar..." />
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 16h6M10 16l2 2M10 16l-2 2M10 10h6" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
