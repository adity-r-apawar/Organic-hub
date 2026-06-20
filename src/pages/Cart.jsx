import React from 'react'
import { Link } from 'react-router-dom'

export default function Cart({ cartItems, onRemove, onUpdateQuantity }) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1
  const shipping = subtotal > 50 ? 0 : 5
  const total = subtotal + tax + shipping

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
          <Link 
            to="/products"
            className="btn-primary inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {cartItems.map((item) => (
              <div key={item.id} className="border-b p-6 flex gap-6 items-start">
                {/* Product Image */}
                <div className="bg-gray-100 w-24 h-24 rounded flex items-center justify-center text-4xl flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = `<span>${item.emoji || '🥬'}</span>`
                      }}
                    />
                  ) : (
                    item.emoji || '🥬'
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                  <p className="text-organic-600 font-semibold">${item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-gray-100 p-2 rounded">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="text-gray-600 hover:text-gray-900 w-6 h-6 flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-600 hover:text-gray-900 w-6 h-6 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="font-semibold text-lg mb-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-6">
            <Link 
              to="/products"
              className="text-organic-600 hover:underline font-medium"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Summary Items */}
            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-organic-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <input 
                type="text"
                placeholder="Enter promo code"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
              />
            </div>

            {/* Checkout Button */}
            <Link 
              to="/checkout"
              className="w-full btn-primary block text-center py-3 font-semibold"
            >
              Proceed to Checkout
            </Link>

            {/* Shipping Info */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              {subtotal > 50 
                ? '✓ Free shipping on this order'
                : `Free shipping on orders over $50`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
