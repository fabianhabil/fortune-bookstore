# fortune-bookstore

This program is created because for my final project database and learning for Research & Development BNCC @Bandung purpose!
Seperti pepatah mengatakan, "satu kali dayung, dua pulai terlampaui" :D

## Backend

This backend is using BNCC Bandung Backend boilerplate and was made by former RnD 33 BNCC Bandung Manager, [Alvian](https://github.com/Alviannn/express-ts-boilerplate). Shout out to him! 

## Quick Start for Backend

1. Make sure you have installed [PostgreSQL](https://www.postgresql.org/download/).
2. Install the dependencies
    ```sh
    npm run install
    ```
3. Duplicate the `.env.example` file to `.env` and fill the database credentials
4. Generate JWT secrets
    ```sh
    npm run jwt:generate
    ```
5. (_Optional_) If you want, you can seed data
    ```sh
    npm run seed
    ```
6. Run the dev server
    ```sh
    npm run dev
    ```

## Commands

Running:

```sh
# compiles the project to `build` directory
yarn compile

# diagnose the TS compiler
yarn compile:debug

# starts the program (must be compiled first)
yarn start

# Runs the server in Development environment (no compiled files)
yarn dev
```

Data seeding:

```sh
# Add a bunch of prepared data in `seeder.ts` file
yarn seed
```

Cleans the compiled files (in `build` directory):

```sh
yarn clean
```

Linting:

```sh
# runs ESLint to `src` directory
yarn lint

# fixes ESLint errors (for fixable errors only)
yarn lint:fix
```

TypeORM:

```sh
# shows TypeORM commands
yarn typeorm -h

# shows migration status
yarn migration:show

# generates a migration based recent schema changes
yarn migration:generate <migration-name>

# creates a new migration
yarn migration:create <migration-name>

# runs all pending migrations
yarn migration:run

# reverts all migrations
yarn migration:revert
```

JSONWebToken:

```sh
# generate JWT secrets (both access and refresh secrets)
yarn jwt:generate
```

## Environment Variables

Found in the `.env` file

```sh
# the JWT secrets
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

# access token expire time
JWT_ACCESS_EXPIRE=15m
# refresh token expire time
JWT_REFRESH_EXPIRE=30d

# the postgres database credentials
DB_HOST=
DB_PORT=5432
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

## Frontend

For learning purpose, i used Next.js version 13 because i need to update all my current project to next 13 :D

## Quick Start for Frontend

1. Install the dependencies
    ```sh
    npm run install
    ```
2. Duplicate the `.env.example` file to `.env` and fill the backend url.
3. Run the dev server
    ```sh
    npm run dev