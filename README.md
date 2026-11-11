# 🚀 NextPro - Full-Stack E-Commerce & Admin Dashboard

> **🌐 Live Demo:** [https://next-pro-full-stack.vercel.app](https://next-pro-full-stack.vercel.app)

NextPro is a modern, fast, and secure full-stack web application built with **Next.js (App Router)** and **MongoDB**. It features a responsive e-commerce storefront, user authentication, cart management, and a powerful **Admin Dashboard** with role-based access control (RBAC).

---

## ✨ Features

- 🔐 **Secure Authentication**: JWT-based authentication stored securely in HttpOnly cookies, with password hashing.
- 👥 **Role-Based Access Control (RBAC)**: Dynamic user management allowing admins to promote/demote users between `user` and `admin` roles.
- 🛡️ **Admin Security**: Protected API routes and dashboard layouts ensuring only authorized admins can manage users.
- 🛒 **Shopping Cart Context**: Global state management for handling cart items seamlessly.
- 📱 **Fully Responsive Design**: Optimized for mobile, tablet, and desktop screens using **Tailwind CSS**.
- 🌐 **Internationalization & Modern UI**: Clean component architecture styled with Material-UI and Tailwind.

---

## 🛠️ Tech Stack

- **Frontend & Backend**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database & ODM**: MongoDB, Mongoose
- **Authentication & Security**: `jose` (JWT verification), `bcryptjs`
- **State Management**: React Context API

---

## ⚙️ Getting Started Locally

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/mohamedAtef-dev/NextPro---Full-Stack.git
cd NextPro---Full-Stack
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set up Environment Variables
Create a `.env.local` file in the root directory and add the following variables:
\`\`\`env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_SECRET_KEY=your_secret_admin_bootstrap_key
\`\`\`

### 4. Run the development server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

---

## 👨‍💻 Author
Built with passion by **Mohamed**. Feel free to reach out or contribute!