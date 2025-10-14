# PijBlog Frontend

A modern, responsive blog frontend built with React, TypeScript, and Tailwind CSS. This application connects to the PijBlog API backend and provides a full-featured blogging platform with user authentication, markdown support, and commenting functionality.

## 🎨 Design System

The application uses a unified design system with centralized styling. For complete documentation, see:

- **[Design System Documentation](./DESIGN_SYSTEM.md)** - Comprehensive guide to the design system
- **[Styling Changes Summary](./STYLING_CHANGES.md)** - Details on recent styling updates

### Color Palette

The application uses a carefully selected color scheme with full dark mode support:

- **Primary (Dark Blue)**: `#223843` - Headers, navigation, primary text
- **Accent (Coral)**: `#d77a61` - CTAs, links, highlights
- **Secondary (Slate Blue)**: `#8797b2` - Secondary elements, borders
- **Background (Cream)**: `#FFF8EF` - Page backgrounds, cards

Colors automatically adapt to dark mode for optimal readability.

## ✨ Features

### Authentication

- User registration and login
- JWT token-based authentication
- Automatic token refresh
- Protected routes for authenticated users
- Logout functionality

### Blog Management

- View paginated list of blog posts
- Read full blog posts with markdown rendering
- Create new blog posts (authenticated users)
- Edit existing posts (authors only)
- Delete posts (authors only)
- Post status control (PUBLIC/UNLISTED/PRIVATE)
- Tag system for categorization

### Comments

- View comments on blog posts
- Add comments (authenticated users)
- Edit own comments
- Delete own comments
- Paginated comment display

### Markdown Support

- Full GitHub-flavored markdown
- Syntax highlighting for code blocks
- Tables, lists, blockquotes
- Live preview while editing
- Custom styling matching theme colors

### UI/UX

- Responsive design (mobile, tablet, desktop)
- Clean, modern interface
- Smooth transitions and animations
- Loading states and error handling
- Accessible components

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PijBlog API backend running

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your API base URL:

   ```
   VITE_API_BASE_URL=http://localhost:8000
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── blog/           # Blog-related components
│   ├── comment/        # Comment components
│   ├── common/         # Common UI components (Button, Input, Card, etc.)
│   └── layout/         # Layout components (Header, Footer, Layout)
├── context/            # React Context providers (AuthContext)
├── hooks/              # Custom React hooks (useAuth, usePagination)
├── pages/              # Page components (HomePage, BlogDetailPage, etc.)
├── services/           # API service layer (api, authService, blogService, commentService)
├── styles/             # CSS styles (markdown.css)
├── types/              # TypeScript type definitions
└── utils/              # Utility functions (formatDate, validators)
```

## 🔧 Technology Stack

- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **React Router v6**: Client-side routing
- **Axios**: HTTP client with interceptors
- **Tailwind CSS**: Utility-first CSS framework
- **react-markdown**: Markdown rendering
- **remark-gfm**: GitHub-flavored markdown support
- **rehype-highlight**: Code syntax highlighting
- **highlight.js**: Syntax highlighting themes

## 🔌 API Configuration

The frontend connects to the PijBlog API. Configure the base URL in `.env`:

```
VITE_API_BASE_URL=http://localhost:8000
```

### Main API Endpoints

- **Authentication**: `/api/account/login/`, `/api/account/register/`, `/api/account/refresh/`
- **Blog entries**: `/api/blog/`, `/api/blog/slug/{slug}/`
- **Comments**: `/api/blog/slug/{slug}/comments/`

## 🎨 Customization

### Colors

Colors are defined in `tailwind.config.js`. To customize the color palette:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#223843',
        dark: '#1a2d35',
        light: '#2d4754',
      },
      accent: {
        DEFAULT: '#d77a61',
        dark: '#c5644d',
        light: '#e39b86',
      },
      secondary: {
        DEFAULT: '#8797b2',
        dark: '#6d7f9a',
        light: '#a3b0c5',
      },
      background: {
        DEFAULT: '#ffefd9',
        dark: '#f5e5cf',
        light: '#fff8ed',
      },
    },
  },
}
```

### Markdown Styles

Customize markdown rendering in `src/styles/markdown.css`. The `.markdown-content` class controls the appearance of rendered markdown.

## 📝 Development

### Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` with hot module replacement (HMR).

### Building for Production

```bash
npm run build
```

### Previewing Production Build

```bash
npm run preview
```

### Code Style

- Use functional components with hooks
- Type all props and state with TypeScript
- Use `type` imports for TypeScript types
- Follow ESLint rules
- Keep components small and focused

## 🐛 Troubleshooting

### API Connection Issues

- Verify the backend is running on the configured URL
- Check `VITE_API_BASE_URL` in `.env` file
- Check browser console for CORS errors
- Ensure backend allows requests from frontend origin

### Authentication Issues

- Clear localStorage and try logging in again
- Check that JWT tokens are being stored correctly
- Verify backend authentication endpoints are working
- Check token expiration and refresh logic

### Build Issues

- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Ensure Node.js version is compatible (v16+)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Components

### Pages

- **HomePage**: Displays paginated list of blog posts
- **BlogDetailPage**: Shows full blog post with markdown rendering and comments
- **CreateBlogPage**: Form for creating new blog posts with markdown editor
- **EditBlogPage**: Edit existing blog posts
- **LoginPage**: User login form
- **RegisterPage**: User registration form
- **ProfilePage**: User profile with their blog posts

### Components

- **Layout**: Main layout wrapper with header and footer
- **ProtectedRoute**: Route wrapper requiring authentication
- **BlogCard**: Blog post preview card
- **MarkdownRenderer**: Renders markdown content with styling
- **CommentForm**: Form for posting comments
- **CommentItem**: Single comment display with edit/delete
- **Button, Input, Card, Loading, Pagination**: Reusable UI components

## 📄 License

MIT License

## 👨‍💻 Author

Built for the PijBlog platform
