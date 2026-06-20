import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../utils/productData'

export default function Home() {
  // Featured products - get first 4 from product data
  const featuredProducts = PRODUCTS.slice(0, 4)

  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart!`)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-organic-600 to-organic-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Organic Hub</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover fresh, chemical-free organic fruits and vegetables. Support local farmers while promoting healthy living.
          </p>
          <Link 
            to="/products"
            className="bg-white text-organic-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-organic-100 transition-smooth inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Organic Hub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold mb-2">100% Organic</h3>
              <p className="text-gray-600">All products are certified organic with zero chemical pesticides or fertilizers.</p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Fresh products delivered to your doorstep within 24-48 hours.</p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center">
              <div className="text-5xl mb-4">👨‍🌾</div>
              <h3 className="text-xl font-semibold mb-2">Support Farmers</h3>
              <p className="text-gray-600">Fair prices for farmers and sustainable agricultural practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-organic-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', text: 'Best organic products I\'ve found online!' },
              { name: 'Mike Chen', text: 'Fresh, healthy, and delivered on time. Highly recommended!' },
              { name: 'Emma Wilson', text: 'Love supporting local farmers while eating healthy food.' },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <p className="text-yellow-500 mb-2">★★★★★</p>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-organic-600">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-organic-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Eat Healthy?</h2>
          <p className="text-lg mb-8">Join thousands of customers enjoying fresh organic produce</p>
          <Link 
            to="/products"
            className="bg-white text-organic-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-organic-100 transition-smooth inline-block"
          >
            Explore All Products
          </Link>
        </div>
      </section>
    </div>
  )
}
