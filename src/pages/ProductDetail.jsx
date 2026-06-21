import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProduct, fetchProducts } from '../services/api'

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [imageError, setImageError] = useState(false)
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProduct(id)
        setProduct(data)
        if (data?.category) {
          const items = await fetchProducts()
          const related = items.filter(item => item.category === data.category && item.id !== data.id).slice(0, 3)
          setRelatedProducts(related)
        }
      } catch (err) {
        console.error('Unable to load product', err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Loading product details...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Product not found.</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product)
    }
    alert(`${quantity} ${product.name}(s) added to cart!`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link to="/products" className="text-organic-600 hover:underline">← Back to Products</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center overflow-hidden">
          {!imageError ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="text-9xl">{product.emoji}</div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-4">
            <span className="inline-block bg-organic-100 text-organic-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
              {product.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-6">
            <span className="text-yellow-500 text-xl mr-2">★★★★★</span>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-5xl font-bold text-organic-600">₹{product.price}</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Product Details */}
          <div className="mb-8 bg-organic-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Product Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Category</p>
                <p className="font-medium">{product.category}</p>
              </div>
              <div>
                <p className="text-gray-600">Stock</p>
                <p className="font-medium text-green-600">{product.quantity} In Stock</p>
              </div>
              <div>
                <p className="text-gray-600">Certification</p>
                <p className="font-medium">100% Organic</p>
              </div>
              <div>
                <p className="text-gray-600">Delivery</p>
                <p className="font-medium">24-48 Hours</p>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-smooth"
              >
                −
              </button>
              <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-smooth"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full btn-primary text-lg py-4 mb-4"
          >
            Add to Cart
          </button>

          {/* Benefits */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3">Benefits</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span> No pesticides or chemicals
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Rich in nutrients and vitamins
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Environmentally sustainable
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Supports local farmers
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map(relatedProduct => (
            <div key={relatedProduct.id} className="card">
              <div className="bg-gray-100 h-32 rounded mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = `<div class="text-4xl">${relatedProduct.emoji}</div>`
                  }}
                />
              </div>
              <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
              <p className="text-gray-600 text-sm mb-3">₹{relatedProduct.price}</p>
              <Link 
                to={`/products/${relatedProduct.id}`}
                className="text-organic-600 hover:underline text-sm font-medium"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
