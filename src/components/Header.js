import React, { useEffect } from 'react'; 
import Typed from 'typed.js';

export default function Header() {
  useEffect(() => {
    const typedOptions = {
      strings: [
        '<span class="color1">Atendimento</span> <span class="color2">Exclusivo!</span>',
        '<span class="color1">Ofertas e Sem </span> <span class="color2"> Juros !</span>',
        '<span class="color1">Para Todos os</span> <span class="color2">Clientes !</span>',
        '<span class="color1">Venha conferir</span> <span class="color2">!!!</span>',
      ],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
    };

    const typed = new Typed('.typed', typedOptions);

    return () => {
      typed.destroy(); // Limpa o efeito ao desmontar o componente
    };
  }, []); 

  return (
    <header>
      {/* Imagem principal de fundo */}
      <div className="header-background">
        <img src={`${process.env.PUBLIC_URL}/imagens/IMAGEM334.avif`} alt="featured-products-image" />
      </div>

      <div className="inner-content">
        {/* Conteúdo à esquerda */}
        <div className="left-side">
          <div className="hero-container" data-aos="fade-in">
            <h1>Alcance Todas as suas Metas em um só Lugar</h1>

            {/* Barra de Pesquisa */}
            <div className="search-container">
              <input type="text" placeholder="Buscar produtos..."/>
              <button type="submit">Enviar</button>           
            </div>
          </div>
             <h2>Agende seu Atendimento</h2>

          {/* Efeito de Digitação abaixo de "Agende seu Atendimento" */}
          <p>
            <span className="typed"></span>
          </p>
        {/* Imagem do lado direito */}
        
        <p> 
          </p> 
        </div>

         {/* Imagem do lado direito */}
        <div className="right-side">
        <img src={`${process.env.PUBLIC_URL}/imagens/plano3.png`} alt="Product" />
        </div>
      </div>
    </header>
  );
}
