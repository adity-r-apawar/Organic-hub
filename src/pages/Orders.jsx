import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Orders({ user }) {
  // Sample orders data
  const [orders] = useState([
    {
      id: 'ORG-001',
      date: '2024-06-15',
      status: 'Delivered',
      total: 45.99,
      items: ['Organic Apples', 'Fresh Carrots'],
      trackingNumber: 'TRK-123456789'
    },
    {
      id: 'ORG-002',
      date: '2024-06-18',
      status: 'In Transit',
      total: 62.50,
      items: ['Organic Bananas', 'Fresh Broccoli', 'Organic Strawberries'],
      trackingNumber: 'TRK-987654321'
    },
    {
      id: 'ORG-003',
      date: '2024-06-20',
      status: 'Processing',
      total: 35.75,
      items: ['Fresh Tomatoes', 'Fresh Lettuce'],
      trackingNumber: 'TRK-555666777'
    }
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'In Transit':
        return 'bg-blue-100 text-blue-800'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return '✓'
      case 'In Transit':
        return '→'
      case 'Processing':
        return '⏳'
      case 'Cancelled':
        return '✗'
      default:
        return '•'
    }
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-xl text-gray-600 mb-6">Please log in to view your orders</p>
          <Link 
            to="/login"
            className="btn-primary inline-block"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-xl text-gray-600 mb-6">You haven't placed any orders yet</p>
          <Link 
            to="/products"
            className="btn-primary inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Order {order.id}</h3>
                  <p className="text-gray-600 text-sm">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <p className={`px-4 py-2 rounded-lg font-semibold text-sm ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </p>
                </div>
              </div>

              {/* Order Details */}
              <div className="px-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  {/* Items */}
                  <div>
                    <h4 className="font-semibold mb-3">Items</h4>
                    <ul className="space-y-2">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="text-gray-600">
                          <span className="text-organic-600">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tracking Info */}
                  <div>
                    <h4 className="font-semibold mb-3">Tracking Information</h4>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Tracking #:</span> {order.trackingNumber}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Total Amount:</span> ${order.total}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                {order.status === 'In Transit' && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
                    <h4 className="font-semibold mb-3 text-blue-900">Delivery Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <div>
                          <p className="font-medium text-blue-900">Order Shipped</p>
                          <p className="text-sm text-blue-700">2024-06-19</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-600">In Transit</p>
                          <p className="text-sm text-gray-500">Expected arrival: 2024-06-21</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-600">Delivery</p>
                          <p className="text-sm text-gray-500">Pending</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-organic-600 text-white rounded-lg hover:bg-organic-700 transition-smooth">
                    View Details
                  </button>
                  <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-smooth">
                    Reorder
                  </button>
                  {order.status === 'Delivered' && (
                    <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-smooth">
                      Leave Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Continue Shopping */}
      <div className="mt-12 text-center">
        <Link 
          to="/products"
          className="text-organic-600 hover:underline font-medium"
        >
          Continue Shopping →
        </Link>
      </div>
    </div>
  )
}
