### Setting up Tailwind CSS v4 (the standard in 2026) with a Vite-based React project is streamlined via a dedicated Vite plugin.


## 1. Create your React project

#### If you haven't already, create a new react project using vite

```bash
cd client
npm create vite@latest .
npm install
```
## 2. Install Tailwind CSS

#### Install the core Tailwind package and the official Vite plugin as developer dependencies. 

```bash
npm install tailwindcss @tailwindcss/vite
```

## 3. Configure the Vite plugin

#### Open vite.config.js (or .ts) and add the @tailwindcss/vite plugin to your configuration.

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

## 4. Import Tailwind in your CSS 

#### Open your main CSS entry point (usually src/index.css) and import Tailwind CSS at the very top.

**Note:** In v4, you no longer need the three @tailwind directives; a single import handles everything. 

```css
@import "tailwindcss";
```
## 5. Start the development server

#### Run your project to see the changes in action. 
```bash
npm run dev
```

## 6. Verify the installation

#### Add Tailwind utility classes to a component (e.g., src/App.jsx) to confirm it's working. 

```jsx
export default function App() {
  return (
    <h1 className="text-3xl font-bold underline text-blue-600">
      Hello world!
    </h1>
  )
}
```

## Key Changes for 2026 (Tailwind v4)

- **No** `tailwind.config.js` required: Most configurations (like content paths) are now automatically detected by the Vite plugin.
- **CSS-First Configuration:** You can now customize your theme directly in your CSS file using standard CSS variables.
- **Vite Plugin:** The `@tailwindcss/vite` plugin is the recommended way to integrate, replacing the older PostCSS manual setup. 