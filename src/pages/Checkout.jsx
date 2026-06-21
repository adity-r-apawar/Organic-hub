import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createOrder } from '../services/api'

export default function Checkout({ cartItems, user }) {
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  })

  const [orderPlaced, setOrderPlaced] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1
  const shipping = subtotal > 50 ? 0 : 5
  const total = subtotal + tax + shipping

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setOrderPlaced(false)

    const orderPayload = {
      userId: user?.id || 'guest',
      userName: user?.name || `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      total,
      items: cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    }

    try {
      await createOrder(orderPayload)
      setOrderPlaced(true)
    } catch (error) {
      console.error('Order creation failed', error)
      alert('Failed to place order. Please try again.')
    }
  }

  if (orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-12">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold mb-4 text-green-700">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll send you a confirmation email shortly with tracking information.
          </p>
          <p className="text-gray-600 mb-8">
            Order ID: <span className="font-mono font-bold">ORG-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </p>
          <div className="space-y-2 mb-8 text-left max-w-md mx-auto bg-white p-6 rounded-lg">
            <p><span className="font-medium">Total Amount:</span> ₹{total.toFixed(2)}</p>
            <p><span className="font-medium">Delivery Time:</span> 24-48 Hours</p>
            <p><span className="font-medium">Delivery Address:</span> {formData.address}, {formData.city}</p>
          </div>
          <Link 
            to="/orders"
            className="btn-primary inline-block"
          >
            View My Orders
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      {!user && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-blue-800">
          <p>Please <Link to="/login" className="underline font-semibold">login</Link> to continue with checkout.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500 mb-4"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500 mb-4"
              />

              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500 mb-4"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-organic-600 rounded-lg cursor-pointer bg-organic-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">Credit/Debit Card</span>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">Cash on Delivery</span>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="mt-6 pt-6 border-t">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500 mb-4"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              className="w-full btn-primary text-lg py-3 font-semibold"
            >
              Place Order - ₹{total.toFixed(2)}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Items */}
            <div className="space-y-3 mb-6 pb-6 border-b max-h-64 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">₹{shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold text-organic-600">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Estimated delivery: 24-48 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
