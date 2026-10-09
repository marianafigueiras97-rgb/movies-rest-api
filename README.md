# Movies REST API

A RESTful API for managing a movie collection, built with **Node.js, Express, MongoDB, and Mongoose**.

This project demonstrates backend development fundamentals, including CRUD operations, database integration, HTTP request handling, data validation, API key authentication, and interactive API documentation using Swagger.

## Live Demo

**[Explore the API with Swagger UI](https://movies-api-mariana.onrender.com/api-docs)**

The API is deployed on Render and connected to a MongoDB Atlas database.

Public GET endpoints can be tested directly through Swagger UI. Write operations require an API key.

> **Note:** The free hosting service may take a short time to respond after a period of inactivity.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB Atlas | Cloud-hosted NoSQL database |
| Mongoose | Data modeling and database operations |
| Swagger / OpenAPI 3.0 | Interactive API documentation |
| Render | Cloud deployment |
| dotenv | Environment variable management |

## Features

- Create, retrieve, update, and delete movies.
- Search movies by title or genre.
- Filter movies by release year.
- Separate PUT and PATCH operations for complete and partial updates.
- Validate incoming movie data.
- Handle invalid requests and missing resources with appropriate HTTP status codes.
- Protect write operations using API key authentication.
- Explore and test endpoints through Swagger UI.

## API Endpoints

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/movies` | Retrieve all movies | Public |
| GET | `/movies/:id` | Retrieve a movie by ID | Public |
| GET | `/movies/title/:title` | Find a movie by title | Public |
| GET | `/movies/genre/:genre` | Find movies by genre | Public |
| GET | `/movies/released/from/:year` | Find movies released from a given year | Public |
| POST | `/movies` | Create a new movie | API key |
| PUT | `/movies/:id` | Replace a movie's editable data | API key |
| PATCH | `/movies/:id` | Update selected movie fields | API key |
| DELETE | `/movies/:id` | Delete a movie | API key |

For detailed request and response schemas, visit the [Swagger documentation](https://movies-api-mariana.onrender.com/api-docs).

## Movie Data Model

A movie contains the following fields:

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | MongoDB-generated identifier |
| `title` | String | Movie title |
| `director` | String | Movie director |
| `year` | Number | Release year |
| `genre` | String | Movie genre |

Example:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "The Matrix",
  "director": "The Wachowskis",
  "year": 1999,
  "genre": "Science Fiction"
}
```

## Authentication

All GET endpoints are publicly accessible.

POST, PUT, PATCH, and DELETE requests require an API key provided through the `x-api-key` HTTP header.

```http
x-api-key: YOUR_API_KEY
```

The API key is stored as an environment variable and is not included in the repository.

Unauthorized requests are rejected before reaching the protected route controllers.

## Running Locally

**1. Clone the repository**

```bash
git clone https://github.com/marianafigueiras97-rgb/02-BD-noSQL.git
cd 02-BD-noSQL
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_atlas_connection_string
API_KEY=your_secret_api_key
PORT=3000
```

You will need a MongoDB database connection string and an API key for write operations.

**4. Start the development server**

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000/movies
```

Swagger UI will be available at:

```text
http://localhost:3000/api-docs
```

## API Documentation

This project uses **Swagger UI** and **OpenAPI 3.0** to provide interactive documentation.

Swagger includes endpoint descriptions, request parameters, JSON schemas, HTTP response codes, and API key authentication support.

**[View API Documentation](https://movies-api-mariana.onrender.com/api-docs)**

## Project Purpose

This project was developed as part of my backend development learning journey.

Its main goal is to apply REST API design principles, work with a NoSQL database, structure an Express application using routes and controllers, and deploy a functional backend service to the cloud.

## Author

**Mariana Figueiras**

[GitHub](https://github.com/marianafigueiras97-rgb)
