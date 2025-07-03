import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ExclusiveSection.css';

export default function ExclusiveSection( addProductToCart) {
  return (
  <div>
    <div className="exclusive-section">
      <div className="page-inner-contentt">
        <div className="content">
          <div className="left-side">
            <h2>Rolex OceanMaster</h2> 
            <p>
              Explore o desconhecido com o novo OceanMaster.
               Um relógio elegante, resistente à água e perfeito para aventuras subaquáticas ou dias chuvosos.
               Estilo e resistência em um só tempo.
            </p>
            <Link to="products" className="see-more-btnn">
              <span>Ver Agora</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
           </div>
           <div className="right-sideee">
           <img src={`${process.env.PUBLIC_URL}/imagens/products/rolex13.jpg`} alt="Smart Band" />
           </div>
        </div>
      </div>
    </div>
</div>
  );
}