import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Orders from './pages/Orders'
import Admin from './pages/Admin'
import Career from './pages/Career'
import ProductDetail from './pages/ProductDetail'
import { fetchCurrentUser } from './services/api'

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('organicHubCart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('organicHubUser')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('organicHubIsAdmin') === 'true'
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('organicHubUser', JSON.stringify(user))
      const adminFlag = user.role === 'admin'
      setIsAdmin(adminFlag)
      localStorage.setItem('organicHubIsAdmin', String(adminFlag))
    } else {
      localStorage.removeItem('organicHubUser')
      localStorage.removeItem('organicHubIsAdmin')
      setIsAdmin(false)
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('organicHubCart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    const token = localStorage.getItem('organicHubToken')
    if (token && !user) {
      fetchCurrentUser()
        .then((currentUser) => {
          setUser(currentUser)
        })
        .catch(() => {
          localStorage.removeItem('organicHubToken')
          localStorage.removeItem('organicHubUser')
          localStorage.removeItem('organicHubIsAdmin')
        })
    }
  }, [user])

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ))
    }
  }

  const handleLogin = (loginData) => {
    setUser(loginData.user)
    localStorage.setItem('organicHubToken', loginData.token)
    if (loginData.user.role === 'admin') {
      setIsAdmin(true)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setIsAdmin(false)
    localStorage.removeItem('organicHubToken')
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogout} cartCount={cart.length} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products onAddToCart={addToCart} />} />
            <Route path="/products/:id" element={<ProductDetail onAddToCart={addToCart} />} />
            <Route path="/cart" element={
              <Cart 
                cartItems={cart} 
                onRemove={removeFromCart}
                onUpdateQuantity={updateCartQuantity}
              />
            } />
            <Route path="/checkout" element={<Checkout cartItems={cart} user={user} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders user={user} />} />
            <Route path="/careers" element={<Career user={user} />} />
            {isAdmin && <Route path="/admin" element={<Admin />} />}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
