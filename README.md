# Task Management API

## Overview
This is the accompanying code for the Blog article [Building a Task Management API with NestJS, Prisma, and Docker](blog.abdulqudus.com).

A scalable and robust task management REST API built with NestJS, Prisma, Docker, and Swagger. This application allows users to create, manage, and organize tasks with features like priority levels, due dates, and status tracking.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 📝 **Task Management** - Full CRUD operations for tasks
- 🏷️ **Task Organization** - Categorization, labels, priorities, and statuses
- 📚 **API Documentation** - Interactive Swagger documentation
- 🐳 **Containerization** - Docker support for easy deployment
- 🔄 **Database Migrations** - Prisma migrations for version control of the database schema
- ✅ **Data Validation** - Request validation using class-validator
- 📊 **TypeScript Support** - Type-safe development experience

## Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **API Documentation**: [Swagger/OpenAPI](https://swagger.io/)
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: [Docker](https://www.docker.com/)
- **Validation**: class-validator and class-transformer

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (v8 or later)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (for containerized setup)
- [PostgreSQL](https://www.postgresql.org/) (if running without Docker)

## Installation and Setup

### Option 1: Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/jideabdqudus/task-manager-api.git
   cd task-manager-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tasksdb?schema=public"

   # JWT
   JWT_SECRET="your-secret-key"
   JWT_EXPIRES_IN="1d"

   # Server
   PORT=3000
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # Seed the database (optional)
   npx prisma db seed
   ```

5. **Start the development server**

   ```bash
   npm run start:dev
   ```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api-docs
```

This provides an interactive interface to explore and test all API endpoints.

## Project Structure

```
├── prisma/                 # Prisma schema and migrations
├── src/
│   ├── auth/               # Authentication module
│   ├── tasks/              # Task management module
│   ├── users/              # User management module
│   ├── database/           # Database module with Prisma service
│   ├── app.module.ts       # Main application module
│   └── main.ts             # Application entry point
├── test/                   # End-to-end tests
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── .env                    # Environment variables
└── package.json            # Project dependencies
```

## API Endpoints

Here are the main API endpoints:

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Tasks

- `GET /api/tasks` - Get all tasks for the authenticated user
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Example Usage

### Register a New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create a Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Complete NestJS project","description":"Finish the task management API","priority":"HIGH","dueDate":"2025-05-01T00:00:00.000Z"}'
```


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [NestJS](https://nestjs.com/) - The framework used
- [Prisma](https://www.prisma.io/) - ORM
- [Swagger](https://swagger.io/) - API documentation
- [Docker](https://www.docker.com/) - Containerization
