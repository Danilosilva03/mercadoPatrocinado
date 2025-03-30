import React from 'react'

export default function TestimonialsList() {
  return ( <div className="page-inner-content">
       <div className="imagensMeio">
       <div className="imagensMeio2"> 
             <img src={`${process.env.PUBLIC_URL}/imagens/promoo.webp`} alt="products"  className="headerI" />
           </div>
            <div className="imagensMeio2">
            <img src={`${process.env.PUBLIC_URL}/imagens/promo.jpeg`} alt="products" className="headerIM" />
            </div>

           <div className="imagensMeio2">
              <img src={`${process.env.PUBLIC_URL}/imagens/comprar-online.jpg`} alt="products" />
           </div>
       </div>
  </div> 
   )
}
