import React, { useState, useRef, useEffect } from 'react'

export default function Product3DViewer({ product }) {
  const [rotation, setRotation] = useState(0)
  const [isRotating, setIsRotating] = useState(false)
  const containerRef = useRef(null)
  const [imageError, setImageError] = useState(false)

  // Get images array (360 degree view or multiple angles)
  const images = product.images && Array.isArray(product.images) ? product.images : [product.image]
  const totalImages = images.length
  
  // Calculate which image to show based on rotation
  const imageIndex = Math.round((rotation / 360) * totalImages) % totalImages

  const handleMouseDown = (e) => {
    setIsRotating(true)
  }

  const handleMouseMove = (e) => {
    if (!isRotating || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const deltaX = e.clientX - (rect.left + rect.width / 2)
    
    // Update rotation based on mouse movement
    setRotation((prev) => (prev + deltaX * 0.5) % 360)
  }

  const handleMouseUp = () => {
    setIsRotating(false)
  }

  const handleTouchStart = (e) => {
    setIsRotating(true)
  }

  const handleTouchMove = (e) => {
    if (!isRotating || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const deltaX = touch.clientX - (rect.left + rect.width / 2)
    
    setRotation((prev) => (prev + deltaX * 0.5) % 360)
  }

  const handleTouchEnd = () => {
    setIsRotating(false)
  }

  // Auto-rotate functionality
  useEffect(() => {
    if (!isRotating) {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 2) % 360)
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isRotating])

  return (
    <div className="relative w-full h-full">
      {/* 3D Viewer Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full bg-gradient-to-br from-organic-50 to-organic-100 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center perspective"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          perspective: '1000px',
          minHeight: '400px',
        }}
      >
        {/* 3D Image with rotation effect */}
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-75"
          style={{
            transform: `rotateY(${rotation}deg) rotateX(${isRotating ? 5 : 0}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {!imageError ? (
            <img
              src={images[imageIndex]}
              alt={`${product.name} - ${imageIndex + 1}`}
              className="w-full h-full object-contain max-w-xs md:max-w-md"
              onError={() => setImageError(true)}
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))',
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <div className="text-9xl mb-4">{product.emoji || '🥬'}</div>
              <p className="text-lg">Product Image</p>
            </div>
          )}
        </div>

        {/* Light reflection effect */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Info and Controls */}
      <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded-lg p-3 text-center text-sm text-gray-700">
        <p className="font-medium">Drag to rotate • {imageIndex + 1} / {totalImages}</p>
        <div className="flex gap-1 mt-2 justify-center flex-wrap">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === imageIndex ? 'bg-organic-600 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Rotation indicator */}
      {isRotating && (
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg px-3 py-2 text-sm font-medium text-organic-600">
          ↻ Rotating
        </div>
      )}
    </div>
  )
}
