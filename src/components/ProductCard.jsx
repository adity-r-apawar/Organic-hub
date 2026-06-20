import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAddToCart }) {
  const [imageError, setImageError] = React.useState(false)

  return (
    <div className="card overflow-hidden">
      {/* Product Image */}
      <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center text-5xl bg-organic-100 w-full h-full">
            {product.emoji || '🥬'}
          </div>
        )}
      </div>

      {/* Product Info */}
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.category}</p>
      <p className="text-gray-700 text-sm mb-3 line-clamp-2">{product.description}</p>

      {/* Price and Rating */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-organic-600">${product.price}</span>
        <span className="text-yellow-500">★★★★★ ({product.reviews || 0})</span>
      </div>

      {/* Stock Status */}
      <div className="mb-4">
        <p className={`text-sm font-medium ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.quantity > 0 ? `${product.quantity} In Stock` : 'Out of Stock'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link 
          to={`/products/${product.id}`}
          className="flex-1 px-3 py-2 bg-gray-200 text-center rounded hover:bg-gray-300 transition-smooth"
        >
          View Details
        </Link>
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.quantity === 0}
          className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
