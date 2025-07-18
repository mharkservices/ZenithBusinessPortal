# Zenith Business Portal

A comprehensive business services platform with separate client and server applications.

## 📁 Project Structure

```
ZenithBusinessPortal/
├── client/                 # React frontend application
│   ├── src/               # Client source code
│   ├── package.json       # Client dependencies
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── postcss.config.js  # PostCSS configuration
│   └── components.json    # UI components configuration
├── server/                # Express.js backend application
│   ├── src/               # Server source code
│   ├── package.json       # Server dependencies
│   └── prisma/            # Database schema and migrations
└── package.json           # Root package.json (orchestration only)
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install root dependencies (concurrently for running both apps)
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 2. Set Up Database

```bash
# Navigate to server directory
cd server

# Run database migrations
npm run db:migrate

# Generate Prisma client
npm run db:generate
```

### 3. Start Development Servers

```bash
# From root directory - starts both client and server
npm run dev

# Or run individually:
npm run dev:server  # Starts server on port 5002
npm run dev:client  # Starts client on port 5173
```

## 📋 Available Scripts

### Root Level
- `npm run dev` - Start both client and server in development mode
- `npm run dev:server` - Start only the server
- `npm run dev:client` - Start only the client
- `npm run build` - Build the client application
- `npm run start` - Start the server in production mode
- `npm run install:all` - Install dependencies for all packages

### Server
- `npm run dev` - Start server in development mode
- `npm start` - Start server in production mode
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔧 Environment Variables

### Server (.env in server directory)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/zenith_portal"
PORT=5002
NODE_ENV=development
```

## 🗄️ Database

The application uses PostgreSQL with Prisma ORM. Database operations are handled in the server directory.

## 📱 Frontend

The client is built with:
- React 18
- Vite
- Tailwind CSS
- Radix UI components
- Wouter for routing

## 🔌 Backend

The server is built with:
- Express.js
- Prisma ORM
- PostgreSQL
- Multer for file uploads

## 📁 File Uploads

Uploaded files are stored in the `server/uploads/` directory and served statically at `/uploads/` endpoint. #   Z e n i t h F i l l i n g s  
 