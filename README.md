
# Next.js Prisma PostgreSQL Boilerplate

## Project Overview

This project is a web application built with Next.js, using Prisma ORM to manage the database and PostgreSQL as the data storage.
It runs inside Docker, which makes it easy to set up and run in any environment.
The project also includes testing with Jest.


For practical purposes of this exam, the .env file is included in the repository. It does not contain any sensitive credentials.

## Tech Stack

- **Next.js** – React framework for server-side rendering and static site generation.
- **Prisma** – Type-safe ORM for database access and migrations.
- **PostgreSQL** – Reliable, open-source relational database.
- **Docker** – Containerization for consistent development and deployment environments.
- **Jest** – JavaScript testing framework for unit and integration tests.

## Project Structure

```
├── app/                # Next.js application (pages, layouts, API routes, UI components)
│   ├── api/            # API route handlers
│   ├── UI/             # UI components
│   └── ...
├── components/         # Shared React components
├── constants/          # Application constants
├── lib/                # Library utilities (e.g., Prisma client)
├── prisma/             # Prisma schema and migrations
│   ├── schema.prisma   # Database schema
│   └── migrations/     # Migration files
├── public/             # Static assets
├── repositories/       # Data access layer (repository pattern)
├── services/           # Business logic and service layer
├── types/              # TypeScript type definitions
├── __tests__/          # Test files (unit/integration)
├── Dockerfile          # Docker build instructions
├── docker-compose.yml  # Multi-service orchestration
├── package.json        # Project metadata and scripts
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**
	https://github.com/chooo01/test-nextjs.git

2. **Install dependencies:**
	npm install

## Running the Application

## Note: Only the PostgreSQL database runs in Docker. The Next.js application itself runs locally using Node.js and npm.

### Important: Start Database with Docker

Before running the application, you must start the database using Docker Compose. This will create and run the PostgreSQL database required by the app.

1. **Start Docker Compose:**
	docker-compose up --build

2. **Migrate Schemas to Database**
	## To apply existing migrations
	npx prisma migrate dev

	## To create a new migration after updating your Prisma schema
	npx prisma migrate dev --name <migration-name>

3. **Start the Application:**
	npm run dev

## Testing

Run all tests with Jest:
	npm test

## Scripts

Key scripts from `package.json`:

| Script            | Description                        |
|-------------------|------------------------------------|
| `dev`             | Start development server           |
| `build`           | Build for production               |
| `start`           | Start production server            |
| `test`            | Run all Jest tests                 |

