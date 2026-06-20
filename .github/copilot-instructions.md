# Copilot Instructions for Organic Hub

This file provides custom instructions for GitHub Copilot when working with the Organic Hub project.

## Project Overview

**Organic Hub** is a React-based e-commerce platform for selling organic fruits and vegetables online.

## Key Technologies

- **Frontend**: React 18.2.0, React Router 6.16.0
- **Styling**: Tailwind CSS 3.3.5
- **Build Tool**: Vite 5.0.0
- **Language**: JavaScript (ES6+)

## Code Style Guidelines

1. **Component Structure**
   - Use functional components with React hooks
   - Place components in the `src/components/` folder
   - Pages go in `src/pages/` folder

2. **Naming Conventions**
   - Components: PascalCase (e.g., `ProductCard.jsx`)
   - Functions: camelCase (e.g., `handleAddToCart`)
   - Constants: UPPER_SNAKE_CASE
   - CSS Classes: kebab-case (Tailwind classes)

3. **Imports**
   - React imports first
   - External libraries second
   - Internal imports last
   - Alphabetically organize imports

4. **Styling**
   - Use Tailwind CSS utility classes
   - Create custom components using `@layer components` in `index.css`
   - Avoid inline styles
   - Use the custom color scheme: `organic-*` colors

## File Organization

```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── utils/          # Utility functions (future)
├── services/       # API services (future)
├── App.jsx         # Main app component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Component Structure Template

```jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ComponentName() {
  const [state, setState] = useState('')

  const handleEvent = () => {
    // Logic here
  }

  return (
    <div className="...">
      {/* JSX here */}
    </div>
  )
}
```

## Best Practices

1. Always use functional components
2. Keep components focused and single-purpose
3. Use React hooks for state management
4. Use React Router for navigation
5. Use Tailwind CSS for styling
6. Add PropTypes for component props (when applicable)
7. Include comments for complex logic
8. Handle errors gracefully
9. Make components responsive
10. Test on multiple screen sizes

## Common Tasks

### Adding a New Page
1. Create a new file in `src/pages/`
2. Import necessary dependencies
3. Add the route in `App.jsx`
4. Add navigation link in `Header.jsx`

### Adding a New Component
1. Create a file in `src/components/`
2. Use functional component structure
3. Export as default
4. Import and use in pages/components

### Styling Guidelines
- Use Tailwind utility classes
- Use custom organic colors (organic-50 to organic-900)
- Use responsive prefixes: `md:`, `lg:`, `xl:`
- Use hover and focus states
- Use transition utilities for smooth animations

## Database Integration (Future)

When implementing backend:
- Use RESTful API structure
- Create `src/services/` folder for API calls
- Use axios for HTTP requests
- Handle loading and error states
- Store data in context or state management solution

## Environment Variables

Create a `.env.local` file for local development:
```
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=Organic Hub
```

## Running the Project

```bash
npm install      # Install dependencies
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Debugging Tips

1. Use React DevTools browser extension
2. Check browser console for errors
3. Use `console.log()` for debugging (remove before production)
4. Use Tailwind's `box-border` for debugging layout issues
5. Check Responsive Design Mode in DevTools

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Styles not applying | Clear cache, rebuild, check class names |
| Routes not working | Check React Router setup in App.jsx |
| Cart not updating | Ensure state management is correct |
| Mobile layout broken | Test with DevTools responsive mode |

## Documentation

- Component documentation: JSDoc comments
- Page documentation: Comments at the top of file
- Complex logic: Inline comments explaining purpose

## Future Improvements

- [ ] Add context API for global state
- [ ] Implement API integration
- [ ] Add authentication with JWT
- [ ] Add unit and integration tests
- [ ] Implement error boundaries
- [ ] Add loading skeletons
- [ ] Implement infinite scroll
- [ ] Add favorites/wishlist
- [ ] Implement product filters with persistence
- [ ] Add analytics tracking

---

For questions or clarifications, refer to the main README.md file.
