// Product catalog with proper image URLs from free sources
export const PRODUCTS = [
  {
    id: 1,
    name: 'Organic Apples',
    category: 'Fruits',
    price: 189,
    quantity: 50,
    emoji: '🍎',
    image: 'https://images.unsplash.com/photo-1560806887-1295db8edd8e?w=500&h=500&fit=crop',
    images: [
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ4AZ1_sjjeHfR352t7yqVjJwrTra4MC3dHoIBEKQTY0NPOjyaaNEVrKNAGgneAPTl3rkNxN948YwF1UdS9aVHHfYP_MUOEnhoX2dj7tU9HptPl1tVpuU4f-A',
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR7sr1YBLG6Xj92fAA9PQS_XwA41fFeuQSl_7a2CZJmEN08NlPfUqWOd2XD7wzBZ9lyd9OXvqPdQMzgCwMwPxPTXi547MGEtg',
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTQMiLqsQyQjNlXXQVorUB4XxMqwRGMl28bbupiKHWMfR8Viqva-pbzKb_MkNJH5onb-nA6v9vYCIDjFhvBR8aWuRaD2rFU4A',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo2Erp5kaIBU4T-G4A9dMR7VbB2qTsIyDRaGUzyL87BQ&s=10'
    ],
    reviews: 120,
    description: 'Fresh, crispy, and sweet organic apples grown without pesticides.',
    benefits: ['Rich in fiber', 'Boosts immunity', 'Supports heart health']
  },
  {
    id: 2,
    name: 'Fresh Carrots',
    category: 'Vegetables',
    price: 70,
    quantity: 100,
    emoji: '🥕',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd0a495?w=500&h=500&fit=crop',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpMb_rNs_NQcNcYeUMgcrauIa06m1zJDG9h3oVEiZX8g&s=10',
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQcGfC4z-Nd5HZEaTNJfFrXoBsrNygc_Xe8XlZaIFNajb7Gul-FzXPaK6iOABB-29EiwmBVGSpvdvWBmM9JFONXTJVt0aMgW3PZdTj13KhxdHRA4jdp4J9S',
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRTiP85bA6FLhZTUI6VqjKxAL6pIUnTvoxWhqQ8awo14dd1udwqzQ63Q19WwcBOA67Zd9KwD6jS_Nq_9XILeXwMZ0vdAaC-cmjB082VNIg',
      'https://www.bbassets.com/media/uploads/p/xxl/10000015_19-fresho-baby-carrot.jpg',
    ],
    reviews: 85,
    description: 'Nutrient-rich organic carrots perfect for salads and cooking.',
    benefits: ['Improves eyesight', 'High in beta-carotene', 'Great for digestion']
  },
  {
    id: 3,
    name: 'Organic Bananas',
    category: 'Fruits',
    price: 70,
    quantity: 60,
    emoji: '🍌',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Xl0wHxLRfpCBTrwojXi9dz-nX025X0TdXG_p1iAnOg&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ15FulQhouWiI4eO5agAwz0UWnMkq_2o78gUxK6NaltA&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBULwjodNJzqbrOv7vysmR04PL_OfRAiwp4Ewzx9U3xA&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCwnsSRPRkTWxOxtuhkjA71qNjvfGVemv4y-NiMl6QLA&s=10',
    ],
    reviews: 95,
    description: 'Naturally ripened organic bananas rich in potassium.',
    benefits: ['Energy boost', 'Rich in potassium', 'Natural sweetness']
  },
  {
    id: 4,
    name: 'Fresh Broccoli',
    category: 'Vegetables',
    price: 120,
    quantity: 40,
    emoji: '🥦',
    image: 'https://images.unsplash.com/photo-1584868877997-b0ec3e8e5a48?w=500&h=500&fit=crop',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAJ2TpARDEJSQFrTZIPVNyXFK4_ibGwYPp_J5W3FzQfQ&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyBVa8yQrxvOqhxP2N2paeiIlgxdOXWYglEFB8XjWMlg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4te221VeBOZ5t3bzzVi6sfZ2pxoQasnNbXBXm1agwyZz-4fUDRhXxUtFU&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8XKbYJjf9tFjPqDeGaEDDhQf63sXWB70xVgFmZU6Ypw&s',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1382712056477-2eae82d3d1e9?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=500&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1592841494993-a1e9a2e84fd2?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1627873649417-af48de53d74b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1595521419326-05800d00a200?w=500&h=500&fit=crop',
    ],
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
    image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1581080328064-f16af6c44e7b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669714d2e9d8?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1599599810694-b5ac4dd0a495?w=500&h=500&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1622778712214-97174a1e4e65?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1597355326537-9c21e3365527?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1511477882397-e6f5166d5e13?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1509599810228-434a0b7cc4b7?w=500&h=500&fit=crop',
    ],
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
    image: 'https://images.unsplash.com/photo-1584183530878-f4fcc239eefb?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584183530878-f4fcc239eefb?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1577003833154-a92bbd5c7e6d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1599599810694-b5ac4dd0a495?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1619983081563-430f63602af0?w=500&h=500&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1599599810694-b5ac4dd0a495?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1581622261290-991b38693d1b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1584868877997-b0ec3e8e5a48?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1508737763605-fdbf4ac37f67?w=500&h=500&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1553072085-d0031874bf60?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1585518419759-57ba63e91e41?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1599599810694-b5ac4dd0a495?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1599599810694-b5ac4dd0a495?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1585518419759-57ba63e91e41?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1585074033192-b0ba3c7b0c7e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1584868877997-b0ec3e8e5a48?w=500&h=500&fit=crop',
    ],
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
