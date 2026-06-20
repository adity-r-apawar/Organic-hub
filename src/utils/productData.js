// Product catalog with proper image URLs from free sources
export const PRODUCTS = [
  {
    id: 1,
    name: 'Organic Apples',
    category: 'Fruits',
    price: 4.99,
    quantity: 50,
    emoji: '🍎',
    image: 'https://images.unsplash.com/photo-1560806887-1295db8edd8e?w=500&h=500&fit=crop',
    reviews: 120,
    description: 'Fresh, crispy, and sweet organic apples grown without pesticides.',
    benefits: ['Rich in fiber', 'Boosts immunity', 'Supports heart health']
  },
  {
    id: 2,
    name: 'Fresh Carrots',
    category: 'Vegetables',
    price: 2.99,
    quantity: 100,
    emoji: '🥕',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd0a495?w=500&h=500&fit=crop',
    reviews: 85,
    description: 'Nutrient-rich organic carrots perfect for salads and cooking.',
    benefits: ['Improves eyesight', 'High in beta-carotene', 'Great for digestion']
  },
  {
    id: 3,
    name: 'Organic Bananas',
    category: 'Fruits',
    price: 3.99,
    quantity: 60,
    emoji: '🍌',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop',
    reviews: 95,
    description: 'Naturally ripened organic bananas rich in potassium.',
    benefits: ['Energy boost', 'Rich in potassium', 'Natural sweetness']
  },
  {
    id: 4,
    name: 'Fresh Broccoli',
    category: 'Vegetables',
    price: 5.99,
    quantity: 40,
    emoji: '🥦',
    image: 'https://images.unsplash.com/photo-1584868877997-b0ec3e8e5a48?w=500&h=500&fit=crop',
    reviews: 70,
    description: 'Tender green organic broccoli packed with nutrients.',
    benefits: ['Cancer prevention', 'Bone strength', 'Immune support']
  },
  {
    id: 5,
    name: 'Organic Strawberries',
    category: 'Fruits',
    price: 5.49,
    quantity: 35,
    emoji: '🍓',
    image: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=500&h=500&fit=crop',
    reviews: 110,
    description: 'Sweet and juicy organic strawberries bursting with flavor.',
    benefits: ['Antioxidant rich', 'Heart health', 'Vitamin C boost']
  },
  {
    id: 6,
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    price: 3.49,
    quantity: 80,
    emoji: '🍅',
    image: 'https://images.unsplash.com/photo-1592841494993-a1e9a2e84fd2?w=500&h=500&fit=crop',
    reviews: 92,
    description: 'Ripe organic tomatoes perfect for cooking and salads.',
    benefits: ['Rich in lycopene', 'Antioxidants', 'Low calorie']
  },
  {
    id: 7,
    name: 'Organic Oranges',
    category: 'Fruits',
    price: 4.49,
    quantity: 55,
    emoji: '🍊',
    image: 'https://images.unsplash.com/photo-1584868877997-b0ec3e8e5a48?w=500&h=500&fit=crop',
    reviews: 88,
    description: 'Citrus-fresh organic oranges loaded with vitamin C.',
    benefits: ['Vitamin C rich', 'Boosts immunity', 'Improves skin health']
  },
  {
    id: 8,
    name: 'Fresh Lettuce',
    category: 'Vegetables',
    price: 2.49,
    quantity: 90,
    emoji: '🥬',
    image: 'https://images.unsplash.com/photo-1622778712214-97174a1e4e65?w=500&h=500&fit=crop',
    reviews: 75,
    description: 'Crisp, fresh organic lettuce for healthy salads.',
    benefits: ['Low calorie', 'Hydrating', 'Mineral rich']
  },
  {
    id: 9,
    name: 'Organic Grapes',
    category: 'Fruits',
    price: 6.99,
    quantity: 45,
    emoji: '🍇',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd0a495?w=500&h=500&fit=crop',
    reviews: 105,
    description: 'Sweet purple organic grapes packed with antioxidants.',
    benefits: ['Antioxidant powerhouse', 'Heart protective', 'Brain health']
  },
  {
    id: 10,
    name: 'Fresh Peppers',
    category: 'Vegetables',
    price: 4.99,
    quantity: 65,
    emoji: '🫑',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd0a495?w=500&h=500&fit=crop',
    reviews: 82,
    description: 'Colorful organic peppers fresh from the farm.',
    benefits: ['Vitamin A rich', 'Supports digestion', 'Anti-inflammatory']
  },
  {
    id: 11,
    name: 'Organic Mangoes',
    category: 'Fruits',
    price: 5.99,
    quantity: 30,
    emoji: '🥭',
    image: 'https://images.unsplash.com/photo-1553072085-d0031874bf60?w=500&h=500&fit=crop',
    reviews: 115,
    description: 'Tropical organic mangoes that are perfectly ripe.',
    benefits: ['Summer favorite', 'Fiber rich', 'Natural sweetness']
  },
  {
    id: 12,
    name: 'Fresh Cucumbers',
    category: 'Vegetables',
    price: 2.99,
    quantity: 75,
    emoji: '🥒',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd0a495?w=500&h=500&fit=crop',
    reviews: 78,
    description: 'Refreshing organic cucumbers perfect for summer.',
    benefits: ['Hydrating', 'Low calorie', 'Cooling effect']
  }
]

export const getProductById = (id) => {
  return PRODUCTS.find(product => product.id === parseInt(id))
}

export const getProductsByCategory = (category) => {
  if (category === 'All') return PRODUCTS
  return PRODUCTS.filter(product => product.category === category)
}

export const searchProducts = (searchTerm) => {
  return PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
}
