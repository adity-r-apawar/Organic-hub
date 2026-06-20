import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../utils/productData'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState(PRODUCTS)

  const [orders] = useState([
    { id: 'ORG-001', user: 'John Doe', total: 45.99, status: 'Delivered', date: '2024-06-15' },
    { id: 'ORG-002', user: 'Jane Smith', total: 62.50, status: 'In Transit', date: '2024-06-18' },
    { id: 'ORG-003', user: 'Mike Johnson', total: 35.75, status: 'Processing', date: '2024-06-20' },
  ])

  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    category: 'Fruits'
  })

  const handleAddProduct = (e) => {
    e.preventDefault()
    if (newProduct.name && newProduct.price && newProduct.quantity) {
      setProducts([...products, {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...newProduct,
        price: parseFloat(newProduct.price),
        quantity: parseInt(newProduct.quantity)
      }])
      setNewProduct({ name: '', price: '', quantity: '', category: 'Fruits' })
      setShowAddProduct(false)
    }
  }

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

  // Dashboard Stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const totalProducts = products.length

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Link to="/" className="text-organic-600 hover:underline">← Back to Site</Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-organic-600">
          <p className="text-gray-600 text-sm font-medium">Total Orders</p>
          <p className="text-4xl font-bold text-organic-600 mt-2">{totalOrders}</p>
          <p className="text-gray-500 text-xs mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
          <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
          <p className="text-4xl font-bold text-green-600 mt-2">${totalRevenue.toFixed(2)}</p>
          <p className="text-gray-500 text-xs mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm font-medium">Total Products</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">{totalProducts}</p>
          <p className="text-gray-500 text-xs mt-2">Active listings</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 font-medium border-b-2 transition-smooth ${
            activeTab === 'products'
              ? 'border-organic-600 text-organic-600'
              : 'border-transparent text-gray-600 hover:text-organic-600'
          }`}
        >
          Products Management
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 font-medium border-b-2 transition-smooth ${
            activeTab === 'orders'
              ? 'border-organic-600 text-organic-600'
              : 'border-transparent text-gray-600 hover:text-organic-600'
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 font-medium border-b-2 transition-smooth ${
            activeTab === 'users'
              ? 'border-organic-600 text-organic-600'
              : 'border-transparent text-gray-600 hover:text-organic-600'
          }`}
        >
          Users
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <button
            onClick={() => setShowAddProduct(!showAddProduct)}
            className="btn-primary mb-6"
          >
            + Add New Product
          </button>

          {showAddProduct && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Add New Product</h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
                    required
                  />
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
                  >
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="btn-primary">Save Product</button>
                  <button
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Image</th>
                  <th className="px-6 py-3 text-left font-semibold">Product Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Category</th>
                  <th className="px-6 py-3 text-left font-semibold">Price</th>
                  <th className="px-6 py-3 text-left font-semibold">Quantity</th>
                  <th className="px-6 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">{product.quantity}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:underline mr-4">Edit</button>
                      <button
                        onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Order ID</th>
                <th className="px-6 py-3 text-left font-semibold">Customer</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-left font-semibold">Amount</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.user}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">${order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 mb-4">User management features coming soon</p>
          <button className="btn-primary">Manage Users</button>
        </div>
      )}
    </div>
  )
}
