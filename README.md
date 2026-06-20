# 🥕 Organic Hub - Organic Fruit Selling Website

A modern, responsive React-based e-commerce platform for buying and selling fresh organic fruits and vegetables online.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.5-06B6D4)
![React Router](https://img.shields.io/badge/React%20Router-6.16.0-white)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Modules](#modules)
- [Demo Credentials](#demo-credentials)
- [Technology Stack](#technology-stack)
- [System Requirements](#system-requirements)
- [Future Enhancements](#future-enhancements)

## ✨ Features

✅ **User Registration & Authentication** - Secure sign-up and login system
✅ **Product Catalog** - Browse organic fruits and vegetables by category
✅ **Product Search & Filter** - Find products easily with search and category filters
✅ **Shopping Cart** - Add/remove items and manage quantities
✅ **Secure Checkout** - Multiple payment options (Card & Cash on Delivery)
✅ **Order Tracking** - View order status and delivery information
✅ **Admin Dashboard** - Manage products, orders, and inventory
✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
✅ **Modern UI** - Clean, attractive interface with Tailwind CSS

## 📁 Project Structure

```
organic-hub/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Footer.jsx          # Footer component
│   │   └── ProductCard.jsx     # Reusable product card
│   ├── pages/
│   │   ├── Home.jsx            # Home page with featured products
│   │   ├── Products.jsx        # Products catalog page
│   │   ├── ProductDetail.jsx   # Single product details
│   │   ├── Cart.jsx            # Shopping cart page
│   │   ├── Checkout.jsx        # Checkout and payment
│   │   ├── Login.jsx           # User login
│   │   ├── Register.jsx        # User registration
│   │   ├── Orders.jsx          # Order history and tracking
│   │   └── Admin.jsx           # Admin dashboard
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite configuration
├── index.html                  # HTML template
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🚀 Installation

### Prerequisites

- Node.js (v16 or above)
- npm or yarn package manager

### Steps

1. **Clone the repository** (if using git)
```bash
git clone https://github.com/yourusername/organic-hub.git
cd organic-hub
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

The application will open automatically at `http://localhost:3000`

## 💻 Getting Started

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
http://localhost:3000
```

### Building for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 📖 Usage

### For Customers

1. **Browse Products** - Visit the Products page to see all available organic items
2. **Search & Filter** - Use search and category filters to find products
3. **Add to Cart** - Click "Add to Cart" on any product
4. **View Cart** - Click the cart icon to review your items
5. **Checkout** - Proceed to checkout and fill in shipping details
6. **Payment** - Choose between card payment or cash on delivery
7. **Track Orders** - View your orders and track delivery status

### For Admins

1. **Access Admin Panel** - Login with admin credentials
2. **Manage Products** - Add, edit, or delete products
3. **View Orders** - Monitor all customer orders
4. **Track Revenue** - View sales statistics
5. **Manage Users** - User management features

## 📦 Modules

### 1. **Home Module**
- Welcome page with featured products
- Promotional banners
- Customer testimonials
- Feature highlights

### 2. **Registration Module**
- New user registration form
- Email verification
- User profile creation
- Password validation

### 3. **Login Module**
- Secure authentication
- Remember me option
- Password recovery
- Session management

### 4. **Product Module**
- Browse all products
- View product details
- Search functionality
- Category-based filtering
- Product ratings and reviews

### 5. **Cart Module**
- Add/remove items
- Update quantities
- View subtotal and totals
- Free shipping threshold
- Persistent cart

### 6. **Order Module**
- Place orders
- View order summary
- Track order status
- Order history
- Reorder functionality

### 7. **Payment Module**
- Credit/Debit card payment
- Cash on Delivery option
- Order confirmation
- Invoice generation

### 8. **Admin Module**
- Product management
- Order management
- Sales dashboard
- Revenue tracking
- User management

## 🔐 Demo Credentials

### Admin Account
- **Email**: admin@organic.com
- **Password**: admin123

### Customer Account
- Use any email and password combination to create a test account

## 🛠 Technology Stack

| Technology | Purpose | Version |
|---|---|---|
| **React** | Frontend Framework | 18.2.0 |
| **React Router** | Client-side Routing | 6.16.0 |
| **Tailwind CSS** | Styling & Design | 3.3.5 |
| **Vite** | Build Tool & Dev Server | 5.0.0 |
| **JavaScript (ES6)** | Programming Language | ES6+ |
| **HTML5** | Page Structure | HTML5 |
| **CSS3** | Styling | CSS3 |

## 💻 System Requirements

### Hardware
- **Processor**: Intel i3 or above
- **RAM**: 4 GB or above
- **Storage**: 20 GB free space

### Software
- **OS**: Windows / Linux / macOS
- **Node.js**: v16 or above
- **npm**: v8 or above
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## 🌱 Future Enhancements

- 🤖 AI-based product recommendations
- 💬 Real-time online chat support
- 💳 Multiple payment gateways (PayPal, Stripe, etc.)
- 📱 Mobile application (iOS & Android)
- 📦 Subscription plans for regular customers
- 🚚 Real-time delivery tracking with GPS
- ⭐ Advanced review and rating system
- 🎁 Loyalty rewards program
- 🌍 Multi-language support
- 📊 Advanced analytics dashboard

## 📄 Database Schema

### User Table
| Field | Type | Notes |
|-------|------|-------|
| UserID | INT | Primary Key |
| Name | VARCHAR | User's full name |
| Email | VARCHAR | Unique email |
| Password | VARCHAR | Hashed password |
| Mobile | VARCHAR | Contact number |

### Product Table
| Field | Type | Notes |
|-------|------|-------|
| ProductID | INT | Primary Key |
| ProductName | VARCHAR | Product name |
| Category | VARCHAR | Fruit/Vegetable |
| Price | DECIMAL | Product price |
| Quantity | INT | Stock quantity |
| Image | VARCHAR | Product image URL |

### Order Table
| Field | Type | Notes |
|-------|------|-------|
| OrderID | INT | Primary Key |
| UserID | INT | Foreign Key |
| TotalAmount | DECIMAL | Order total |
| OrderDate | DATE | Order date |
| Status | VARCHAR | Delivery status |

## 👥 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## 📞 Support

For support or questions, please contact:
- **Email**: support@organichub.com
- **Phone**: 1-800-ORGANIC
- **Address**: 123 Green Street, Nature City

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Objectives

✅ Provide fresh organic fruits and vegetables online
✅ Simplify the fruit purchasing process
✅ Offer secure and convenient online shopping
✅ Promote healthy and chemical-free food consumption
✅ Support organic farmers and businesses

## ✅ Advantages

- ✨ Easy online shopping experience
- 🥗 Fresh organic products
- ⏱️ Time saving
- 👤 User-friendly interface
- 📱 Mobile responsive design
- 🔒 Secure transactions
- 🚚 Fast delivery
- 🌱 Sustainable practices

## ⚠️ Limitations

- 🌐 Requires internet connection
- 🗺️ Delivery depends on location
- 📦 Product availability may vary seasonally

---

**Organic Hub** © 2024. All rights reserved.

*Promoting Healthy Living Through Organic Products*

Thank you 

