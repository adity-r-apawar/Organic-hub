import React, { useState } from 'react'

export default function ProductImageGallery({ product }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [imageError, setImageError] = useState(false)

  // Get images array (multiple angles/views)
  const images = product.images && Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : [product.image]
  
  const currentImage = images[selectedImageIndex]

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setImageError(false)
  }

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setImageError(false)
  }

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index)
    setImageError(false)
  }

  return (
    <div className="w-full">
      {/* Main Image Display */}
      <div className="relative bg-gradient-to-br from-organic-50 to-gray-100 rounded-lg overflow-hidden mb-4 aspect-square flex items-center justify-center">
        {!imageError ? (
          <img
            src={currentImage}
            alt={`${product.name} - View ${selectedImageIndex + 1}`}
            className="w-full h-full object-contain p-4"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <div className="text-8xl mb-4">{product.emoji || '🥬'}</div>
            <p className="text-lg">Product Image</p>
          </div>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
          {selectedImageIndex + 1} / {images.length}
        </div>

        {/* Navigation Arrows - Only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-organic-600 rounded-full w-10 h-10 flex items-center justify-center transition-all shadow-md"
              title="Previous image"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-organic-600 rounded-full w-10 h-10 flex items-center justify-center transition-all shadow-md"
              title="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Images - Only show if multiple images */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedImageIndex
                  ? 'border-organic-600 shadow-md'
                  : 'border-gray-200 opacity-70 hover:opacity-100'
              }`}
              title={`View ${index + 1}`}
            >
              <img
                src={img}
                alt={`${product.name} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = `<div class="w-full h-full bg-organic-100 flex items-center justify-center text-2xl">${product.emoji || '🥬'}</div>`
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Info */}
      {images.length > 1 && (
        <div className="mt-3 p-2 bg-organic-50 rounded text-center text-xs text-gray-600">
          <p>Click arrows or thumbnails to view different angles</p>
        </div>
      )}
    </div>
  )
}
