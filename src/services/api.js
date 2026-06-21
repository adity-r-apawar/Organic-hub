import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('organicHubToken')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const normalizeProduct = (product) => {
  if (!product) return null
  const { _id, __v, ...rest } = product
  return { ...rest, id: _id }
}

const normalizeProductList = (products) => products.map(normalizeProduct)

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

export const registerUser = async (registration) => {
  const response = await api.post('/auth/register', registration)
  return response.data.user
}

export const fetchCurrentUser = async () => {
  const response = await api.get('/users/me')
  return response.data
}

export const fetchUsers = async () => {
  const response = await api.get('/users')
  return response.data
}

export const createUser = async (user) => {
  const response = await api.post('/users', user)
  return response.data
}

export const updateUser = async (id, user) => {
  const response = await api.put(`/users/${id}`, user)
  return response.data
}

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`)
  return response.data
}

export const fetchProducts = async () => {
  const response = await api.get('/products')
  return normalizeProductList(response.data)
}

export const fetchProduct = async (id) => {
  const response = await api.get(`/products/${id}`)
  return normalizeProduct(response.data)
}

export const uploadImage = async (formData) => {
  const response = await api.post('/uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const createProduct = async (product) => {
  const response = await api.post('/products', product)
  return normalizeProduct(response.data)
}

export const updateProduct = async (id, product) => {
  const response = await api.put(`/products/${id}`, product)
  return normalizeProduct(response.data)
}

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`)
  return response.data
}

export const fetchOrders = async () => {
  const response = await api.get('/orders')
  return response.data
}

export const fetchUserOrders = async () => {
  const response = await api.get('/orders')
  return response.data
}

export const createOrder = async (order) => {
  const response = await api.post('/orders', order)
  return response.data
}

export const updateOrder = async (id, payload) => {
  const response = await api.put(`/orders/${id}`, payload)
  return response.data
}

export const fetchCareers = async () => {
  const response = await api.get('/careers')
  return response.data
}

export const createCareer = async (career) => {
  const response = await api.post('/careers', career)
  return response.data
}

export const applyCareer = async (careerId, application) => {
  const response = await api.post(`/careers/${careerId}/apply`, application)
  return response.data
}

export const fetchCareerApplications = async (careerId) => {
  const response = await api.get(`/careers/${careerId}/applications`)
  return response.data
}
