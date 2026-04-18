
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

	```bash
	git clone https://github.com/your-username/your-repo.git
	cd your-repo
	```

2. **Install dependencies:**

	```bash
	npm install
	```

3. **Set up environment variables:**

	Copy the example file and update values as needed:

	```bash
	cp .env.example .env
	```

## Environment Variables

Create a `.env` file in the root directory. Example:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

- `DATABASE_URL`: Connection string for PostgreSQL (used by Prisma)
- `NEXT_PUBLIC_API_URL`: Base URL for API routes

## Running the Application

### Development

```bash
npm run dev
```

- Starts the Next.js app in development mode at [http://localhost:3000](http://localhost:3000)

### Production

Build and start the app:

```bash
npm run build
npm start
```

## Database Setup (Prisma)

### Run Migrations

```bash
npx prisma migrate dev
```

### Generate Prisma Client

```bash
npx prisma generate
```

## Running with Docker

Start all services (Next.js app, PostgreSQL) using Docker Compose:

```bash
docker-compose up --build
```

- **nextjs**: Runs the Next.js application
- **db**: PostgreSQL database service

Stop services:

```bash
docker-compose down
```

## Testing

Run all tests with Jest:

```bash
npm test
```
## Scripts

Key scripts from `package.json`:

| Script            | Description                        |
|-------------------|------------------------------------|
| `dev`             | Start development server           |
| `build`           | Build for production               |
| `start`           | Start production server            |
| `test`            | Run all Jest tests                 |

## Best Practices

- Use feature branches and pull requests for all changes.
- Follow consistent code style (see ESLint/Prettier configs).
- Keep environment variables and secrets out of version control.
- Write unit and integration tests for new features.
- Use the repository pattern for data access.
- Document new modules and APIs.
