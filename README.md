<div align="center">
  <h3 align="center">A Subscription Management System API</h3>
  <div>
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" alt="node.js" />
    <img src="https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express.js" />
    <img src="https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb" />
  </div>
   
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🚀 [API Endpoints](#api-endpoints)
6. 🕸️ [Snippets (Code to Copy)](#snippets)
7. 🔗 [Assets](#links)
8. 🚀 [More](#more)

## <a name="introduction">🤖 Introduction</a>

Build a _production-ready Subscription Management System API_ that handles _real users, real money, and real business logic_.

Authenticate users using JWTs, connect a database, create models and schemas, and integrate it with ORMs. Structure the architecture of your API to ensure scalability and seamless communication with the frontend.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Node.js** - JavaScript runtime for building server-side applications
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database for storing application data
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for secure authentication
- **Bcrypt** - Library for password hashing
- **Nodemailer** - Module for sending emails
- **Arcjet** - Advanced rate limiting and bot protection
- **Upstash Workflow** - Automating email reminders and scheduled tasks
- **Dayjs/Moment** - Date manipulation libraries

## <a name="features">🔋 Features</a>

👉 **Advanced Rate Limiting and Bot Protection**: with Arcjet that helps you secure the whole app.

👉 **Database Modeling**: Models and relationships using MongoDB & Mongoose.

👉 **JWT Authentication**: User CRUD operations and subscription management.

👉 **Global Error Handling**: Input validation and middleware integration.

👉 **Logging Mechanisms**: For better debugging and monitoring.

👉 **Email Reminders**: Automating smart email reminders with workflows using Upstash.

👉 **Subscription Management**: Create, read, update, and delete subscription records.

👉 **User Management**: Complete user lifecycle management with authentication.

👉 **RESTful API Design**: Well-structured endpoints following REST principles.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

### _Prerequisites_

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### _Cloning the Repository_

```bash
git clone https://github.com/shaik-gafoor/subscription-tracker.git
cd subscription-tracker
```

### _Installation_

Install the project dependencies using npm:

```bash
npm install
```

### _Set Up Environment Variables_

Create a new file named `.env` in the root of your project and add the following content:

```env
# PORT
PORT=5500
SERVER_URL="http://localhost:5500"

# ENVIRONMENT
NODE_ENV=development

# DATABASE
DB_URI=

# JWT AUTH
JWT_SECRET=
JWT_EXPIRES_IN="1d"

# ARCJET
ARCJET_KEY=
ARCJET_ENV="development"

# UPSTASH
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=

# NODEMAILER
EMAIL_PASSWORD=
```

Fill in the empty fields with your own values:

- `DB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secret key for JWT token generation
- `ARCJET_KEY`: Your Arcjet API key
- `QSTASH_TOKEN`: Your Upstash QStash token
- `EMAIL_PASSWORD`: Password for your email service

### _Running the Project_

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Open [http://localhost:5500](http://localhost:5500) in your browser or any HTTP client to test the project.

## <a name="api-endpoints">🚀 API Endpoints</a>

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login an existing user
- `POST /api/v1/auth/logout` - Logout current user

### User Management

- `GET /api/v1/user/profile` - Get current user profile
- `PUT /api/v1/user/profile` - Update user profile
- `DELETE /api/v1/user/profile` - Delete user account

### Subscription Management

- `GET /api/v1/subscription` - Get all subscriptions for current user
- `POST /api/v1/subscription` - Create a new subscription
- `GET /api/v1/subscription/:id` - Get a specific subscription
- `PUT /api/v1/subscription/:id` - Update a subscription
- `DELETE /api/v1/subscription/:id` - Delete a subscription

### Workflow Management

- `POST /api/v1/workflow/create-reminder` - Create a new email reminder

### _Project Structure_

```
subscription-tracker-api/
├── config/             # Configuration files
├── controllers/        # Request handlers
├── database/           # Database connection and models
├── middlewares/        # Express middlewares
├── routes/             # API routes
├── utils/              # Utility functions
├── .env                # Environment variables
├── app.js              # Main application file
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

### _Contributing_

Contributions are welcome! Please feel free to submit a Pull Request.

### _License_

This project is licensed under the MIT License.
