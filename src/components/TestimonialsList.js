import React from 'react'

export default function TestimonialsList() {
  return ( 
  <div className="page-inner-contenttt">
       <div className="imagensMeio">
       <div className="imagensMeio2"> 
             <img src={`${process.env.PUBLIC_URL}/imagens/products/orfetass.jpg`} alt="products" />
           </div>
            <div className="imagensMeio2">
            <img src={`${process.env.PUBLIC_URL}/imagens/promo.jpg`} alt="products"  className="headerI" />
            </div>

           <div className="imagensMeio2">
              <img src={`${process.env.PUBLIC_URL}/imagens/products/orfetas.jpg`} alt="products" className="headerIM" />

           </div>
       </div>
  </div> 
   )
}
