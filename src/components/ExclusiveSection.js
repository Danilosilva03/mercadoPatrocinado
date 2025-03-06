import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ExclusiveSection.css';

export default function ExclusiveSection( addProductToCart) {
  return (
  <div>
    <div className="exclusive-section">
      <div className="page-inner-content">
        <div className="content">
          <div className="left-side">
            <h2>Relogio Smart </h2> 
            <p>
              Relógio Inteligente original com tela grande Touch Screen digital ou analógico,
              com um design moderno e elegante. Este relógio inteligente é perfeito para quem
              busca praticidade e tecnologia.
            </p>
            <Link to="products" className="see-more-btnn">
              <span>Ver Agora</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
           </div>
           <div className="right-sidee">
           <img src={`${process.env.PUBLIC_URL}/imagens/exclusive.png`} alt="Smart Band" />
           </div>
        </div>
      </div>
    </div>
</div>
  );
}