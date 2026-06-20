import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header({ user, onLogout, cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-organic-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">🥕</span> Organic Hub
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/" className="hover:text-organic-100 transition-smooth">Home</Link>
            <Link to="/products" className="hover:text-organic-100 transition-smooth">Products</Link>
            <Link to="/cart" className="hover:text-organic-100 transition-smooth flex items-center gap-1">
              🛒 Cart {cartCount > 0 && <span className="bg-red-500 px-2 py-1 rounded-full text-xs">{cartCount}</span>}
            </Link>
            {user && <Link to="/orders" className="hover:text-organic-100 transition-smooth">My Orders</Link>}
            {user?.role === 'admin' && <Link to="/admin" className="hover:text-organic-100 transition-smooth">Admin</Link>}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">Welcome, {user.name}</span>
                <button 
                  onClick={onLogout}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-smooth"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="px-4 py-2 bg-white text-organic-600 rounded hover:bg-organic-100 transition-smooth">Login</Link>
                <Link to="/register" className="px-4 py-2 bg-organic-700 rounded hover:bg-organic-800 transition-smooth">Register</Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-organic-500 pt-4">
            <Link to="/" className="hover:text-organic-100">Home</Link>
            <Link to="/products" className="hover:text-organic-100">Products</Link>
            <Link to="/cart" className="hover:text-organic-100">Cart ({cartCount})</Link>
            {user && <Link to="/orders" className="hover:text-organic-100">My Orders</Link>}
            {user?.role === 'admin' && <Link to="/admin" className="hover:text-organic-100">Admin</Link>}
          </nav>
        )}
      </div>
    </header>
  )
}
