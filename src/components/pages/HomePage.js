import React from 'react';
import Header from '../Header';
import ProductsList from '../ProductsList';
import ExclusiveSection from '../ExclusiveSection';
import TestimonialsList from '../TestimonialsList';

export default function HomePage({ products, addProductToCart }) {
  return (
    <>
      <Header/>

      <div className="right-sidee">
         <h1>Compromisso com a Sua Entrega!</h1>
         <p className='comercial'>
            Monitoramos cada etapa da Entrega para Garantir que seu Produto chegue com Rapidez e Segurança ao Destino !
         </p>
         <img src={`${process.env.PUBLIC_URL}/imagens/comprar-online.jpg`} alt="Product" />

        </div>

        <div className="page-inner-content">
           <div className="section-title">
                <h3>Produto Pratrocinado Ofertas</h3>
                <div className="underline"></div>
          </div>
          <div className="main-content">
                <ProductsList 
                addProductToCart={addProductToCart}
                products={products} 
                />
          </div>
      </div>

      <ExclusiveSection />
      <TestimonialsList />
    </>
  );
}