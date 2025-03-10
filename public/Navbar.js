import React from 'react';
import './styles.css'; // Certifique-se de importar o CSS

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="inner-content">
        {/* Logo */}
        <div className="logo">
          <span>Meu</span>Site
        </div>

        {/* Botão de Menu (visível em telas menores) */}
        <div className="menu-button">
          <img src="menu-icon.svg" alt="Menu" />
        </div>

        {/* Links do Menu */}
        <ul>
          <li>Início</li>
          <li>Produtos</li>
          <li>Sobre</li>
          <li>Contato</li>
        </ul>

        {/* Contêiner de ícones (Carrinho de Compras e Pesquisa) */}
        <div className="navs-icon-container">
          {/* Ícone de Carrinho de Compras */}
          <div className="shopping-cart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M3 3l2 18h12l2-18M7 10h10" />
            </svg>
            <div className="products-count">3</div>
          </div>

          {/* Barra de Pesquisa */}
          <div className="search-input-container">
            <input type="text" placeholder="Buscar..." />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 16h6M10 16l2 2M10 16l-2 2M10 10h6" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
