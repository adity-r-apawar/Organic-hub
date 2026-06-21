import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createProduct, deleteProduct, fetchOrders, fetchProducts, fetchUsers, createUser, updateUser, deleteUser, uploadImage, updateProduct } from '../services/api'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [error, setError] = useState('')
  const [editingProductId, setEditingProductId] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    unit: 'kg',
    quantity: '',
    category: 'Fruits',
    image: '',
    imageFile: null,
    description: ''
  })
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'customer'
  })

  useEffect(() => {
    const loadProducts = async () => {
      setLoadingProducts(true)
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (err) {
        setError('Unable to load products from the backend.')
      } finally {
        setLoadingProducts(false)
      }
    }

    const loadOrders = async () => {
      setLoadingOrders(true)
      try {
        const data = await fetchOrders()
        setOrders(data)
      } catch (err) {
        setError('Unable to load orders from the backend.')
      } finally {
        setLoadingOrders(false)
      }
    }

    loadProducts()
    loadOrders()
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoadingUsers(true)
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (err) {
      setError('Unable to load users from the backend.')
    } finally {
      setLoadingUsers(false)
    }
  }

  const resetProductForm = () => {
    setEditingProductId(null)
    setNewProduct({
      name: '',
      price: '',
      unit: 'kg',
      quantity: '',
      category: 'Fruits',
      image: '',
      imageFile: null,
      description: ''
    })
    setShowAddProduct(false)
  }

  const handleEditProduct = (product) => {
    setEditingProductId(product.id)
    setNewProduct({
      name: product.name || '',
      price: product.price || '',
      unit: product.unit || 'kg',
      quantity: product.quantity || '',
      category: product.category || 'Fruits',
      image: product.image || '',
      imageFile: null,
      description: product.description || ''
    })
    setShowAddProduct(true)
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.price || !newProduct.quantity || !newProduct.unit) return

    try {
      let imageUrl = newProduct.image
      if (newProduct.imageFile) {
        const formData = new FormData()
        formData.append('image', newProduct.imageFile)
        const uploadResult = await uploadImage(formData)
        imageUrl = uploadResult.imageUrl
      }

      if (editingProductId) {
        const updated = await updateProduct(editingProductId, {
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          quantity: parseInt(newProduct.quantity, 10),
          category: newProduct.category,
          unit: newProduct.unit,
          image: imageUrl,
          description: newProduct.description
        })
        setProducts(products.map((product) => (product.id === editingProductId ? updated : product)))
      } else {
        const saved = await createProduct({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          quantity: parseInt(newProduct.quantity, 10),
          category: newProduct.category,
          unit: newProduct.unit,
          image: imageUrl,
          description: newProduct.description
        })
        setProducts([saved, ...products])
      }

      resetProductForm()
    } catch (err) {
      setError('Could not save product. Please try again.')
    }
  }

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id)
      setProducts(products.filter(p => p.id !== id))
    } catch (err) {
      setError('Could not delete product. Please try again.')
    }
  }

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)
  const totalOrders = orders.length
  const totalProducts = products.length

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Link to="/" className="text-organic-600 hover:underline">← Back to Site</Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-8">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-organic-600">
          <p className="text-gray-600 text-sm font-medium">Total Orders</p>
          <p className="text-4xl font-bold text-organic-600 mt-2">{totalOrders}</p>
          <p className="text-gray-500 text-xs mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
          <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
          <p className="text-4xl font-bold text-green-600 mt-2">₹{totalRevenue.toFixed(2)}</p>
          <p className="text-gray-500 text-xs mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm font-medium">Total Products</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">{totalProducts}</p>
          <p className="text-gray-500 text-xs mt-2">Active listings</p>
        </div>
      </div>

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

      {activeTab === 'products' && (
        <div>
          <button
            onClick={() => {
              if (!showAddProduct) resetProductForm()
              setShowAddProduct(!showAddProduct)
            }}
            className="btn-primary mb-6"
          >
            + Add New Product
          </button>

          {showAddProduct && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">{editingProductId ? 'Edit Product' : 'Add New Product'}</h3>
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
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
                    required
                  />
                  <select
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="liter">liter</option>
                  </select>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
                  >
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
                  />
                  <label className="block">
                    <span className="text-sm text-gray-700 font-medium">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewProduct({ ...newProduct, imageFile: e.target.files[0] })}
                      className="mt-2 w-full text-sm text-gray-600"
                    />
                  </label>
                </div>
                <textarea
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
                  rows="3"
                />
                <div className="flex gap-2">
                  <button type="submit" className="btn-primary">Save Product</button>
                  <button
                    type="button"
                    onClick={() => resetProductForm()}
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
                  <th className="px-6 py-3 text-left font-semibold">Unit</th>
                  <th className="px-6 py-3 text-left font-semibold">Quantity</th>
                  <th className="px-6 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingProducts ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      Loading products...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No products available
                    </td>
                  </tr>
                ) : (
                  products.map(product => (
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
                      <td className="px-6 py-4">₹{product.price}</td>
                      <td className="px-6 py-4">{product.unit || 'kg'}</td>
                      <td className="px-6 py-4">{product.quantity}</td>
                      <td className="px-6 py-4">
                        <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
              {loadingOrders ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No orders yet
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{order._id}</td>
                    <td className="px-6 py-4">{order.userName || order.user || 'Guest'}</td>
                    <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">₹{order.total?.toFixed(2)}</td>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">User Management</h2>
              <p className="text-gray-600">Create new admins, employees, or customers and manage access.</p>
            </div>
            <button
              onClick={() => setShowAddUser(!showAddUser)}
              className="btn-primary"
            >
              {showAddUser ? 'Close Form' : 'Add User'}
            </button>
          </div>

          {showAddUser && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={async (e) => {
                e.preventDefault()
                if (!newUser.name || !newUser.email || !newUser.password) {
                  setError('Name, email, and password are required for new users.')
                  return
                }

                try {
                  const saved = await createUser(newUser)
                  setUsers([saved, ...users])
                  setNewUser({ name: '', email: '', phone: '', password: '', role: 'customer' })
                  setShowAddUser(false)
                } catch (err) {
                  setError('Could not add user. Please try again.')
                }
              }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
                  required
                />
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-organic-500"
                >
                  <option value="customer">Customer</option>
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit" className="btn-primary col-span-full">Create User</button>
              </form>
            </div>
          )}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Email</th>
                  <th className="px-6 py-3 text-left font-semibold">Role</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingUsers ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4 capitalize">{user.role}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {user.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-3">
                        <button
                          onClick={async () => {
                            try {
                              const updated = await updateUser(user._id, { active: !user.active })
                              setUsers(users.map(item => item._id === user._id ? updated : item))
                            } catch (err) {
                              setError('Unable to update user status')
                            }
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          {user.active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              await deleteUser(user._id)
                              setUsers(users.filter(item => item._id !== user._id))
                            } catch (err) {
                              setError('Unable to delete user')
                            }
                          }}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
