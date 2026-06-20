import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🥕</span> Organic Hub
            </h3>
            <p className="text-gray-400">Connecting customers with fresh organic produce and supporting farmers.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-organic-400">About Us</a></li>
              <li><a href="#" className="hover:text-organic-400">Products</a></li>
              <li><a href="#" className="hover:text-organic-400">FAQs</a></li>
              <li><a href="#" className="hover:text-organic-400">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-organic-400">Shipping Info</a></li>
              <li><a href="#" className="hover:text-organic-400">Returns</a></li>
              <li><a href="#" className="hover:text-organic-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-organic-400">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400 mb-2">📧 info@organichub.com</p>
            <p className="text-gray-400 mb-2">📞 1-800-ORGANIC</p>
            <p className="text-gray-400">📍 123 Green Street, Nature City</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            © {currentYear} Organic Hub. All rights reserved. | Promoting Healthy Living Through Organic Products
          </p>
        </div>
      </div>
    </footer>
  )
}
