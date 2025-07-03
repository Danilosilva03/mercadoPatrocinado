import React from 'react'

export default function TestimonialsList() {
  return ( 
  <div className="page-inner-contenttt">
       <div className="imagensMeio">
       <div className="imagensMeio2"> 
             <img src={`${process.env.PUBLIC_URL}/imagens/products/ofertas22.jpg`} alt="products" />
           </div>
            <div className="imagensMeio2">
            <img src={`${process.env.PUBLIC_URL}/imagens/products/ofertas7.webp`} alt="products"  className="headerI" />
            </div>

           <div className="imagensMeio2">
              <img src={`${process.env.PUBLIC_URL}/imagens/products/orfetas.jpg`} alt="products" className="headerIM" />

           </div>
       </div>
  </div> 
   )
}
