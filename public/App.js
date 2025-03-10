import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Remover importação redundante do BrowserRouter
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import ProductsPage from './components/pages/ProductsPage';
import SidebarCart from './components/SidebarCart';
import FormPagamento from './components/FormPagamento';
import AddCartCompra from './components/AddCartCompra'; 
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [showSidebarCart, setShowSidebarCart] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Função para atualizar o total do carrinho
  const addToCartTotal = (value) => {
    setCartTotal(prevTotal => parseFloat((prevTotal + value).toFixed(2))); // Garantir que o total seja arredondado para 2 casas decimais
  };

  // Função para adicionar produto ao carrinho
  const addProductToCart = (product) => {
    const productPrice = parsePrice(product.price);

    const existingProduct = selectedProducts.find((p) => p.id === product.id);

    if (existingProduct) {
      // Atualiza a quantidade e o total
      const updatedProducts = selectedProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setSelectedProducts(updatedProducts);
      addToCartTotal(productPrice); // Adiciona o preço do produto ao total
    } else {
      // Adiciona um novo produto
      setSelectedProducts(prevProducts => [...prevProducts, { ...product, quantity: 1 }]);
      addToCartTotal(productPrice); // Adiciona o preço do produto ao total
    }
  };

  // Função para atualizar a quantidade de um produto no carrinho
  const updateCartQuantity = (productId, newQuantity) => {
    setSelectedProducts(prevProducts =>
      prevProducts.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Função para remover produto do carrinho
  const removeProductFromCart = (productId) => {
    const productToRemove = selectedProducts.find((p) => p.id === productId);
    if (!productToRemove) return;

    // Remove o produto do carrinho
    const updatedProducts = selectedProducts.filter((p) => p.id !== productId);
    setSelectedProducts(updatedProducts);

    // Subtrai o preço do produto removido do total do carrinho
    const productPrice = parsePrice(productToRemove.price);
    const totalToSubtract = productPrice * productToRemove.quantity;
    addToCartTotal(-totalToSubtract);  // Subtrai do total
  };

  // Função para converter o preço para número
  const parsePrice = (priceString) => {
    if (typeof priceString !== 'string') {
      console.warn('O preço não é uma string:', priceString);
      priceString = String(priceString); // Converte para string se não for
    }
    // Limpa caracteres não numéricos e converte para float
    return parseFloat(priceString.replace('R$', '').replace(/\./g, '').replace(',', '.')) || 0;
  };

  // Carrega produtos de 'db.json'
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/db.json`)
    .then((res) => {
        if (!res.ok) {
          throw new Error('Erro ao carregar o JSON');
        }
        return res.json();
      })
      .then((data) => {
        if (data.products) setProducts(data.products);
      })
      .catch((error) => console.error('Erro ao buscar produtos:', error));
  }, []);

  return (
    <Router>  {/* Definindo o basename aqui */}
      <div className="App">
        <Navbar 
          selectedProducts={selectedProducts}
          setShowSidebarCart={setShowSidebarCart} 
        />

        <SidebarCart 
          addToCartTotal={addToCartTotal}
          removeProductFromCart={removeProductFromCart}
          cartTotal={cartTotal}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          setShowSidebarCart={setShowSidebarCart}
          showSidebarCart={showSidebarCart}
          setCartTotal={setCartTotal} 
        />

        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage
                  addToCartTotal={addToCartTotal}
                  removeProductFromCart={removeProductFromCart}
                  selectedProducts={selectedProducts}
                  addProductToCart={addProductToCart}
                  products={products}
                  setShowSidebarCart={setShowSidebarCart}
                  showSidebarCart={showSidebarCart}
                  cartTotal={cartTotal}
                />
              } 
            />
            <Route 
              path="/products" 
              element={
                <ProductsPage
                  products={products}
                  addProductToCart={addProductToCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <FormPagamento 
                cartTotal={cartTotal}
                selectedProducts={selectedProducts}
                onRemoveProduct={removeProductFromCart} 
                />
              }
            />
          </Routes>

          <AddCartCompra  
            addProductToCart={addProductToCart} 
            cartItems={selectedProducts} 
            updateCartQuantity={updateCartQuantity}
          />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
