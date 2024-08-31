# API Documentation

## Introduction

This project provides an API for accessing leaderboard data.

## Prerequisites

- **Node.js** (Ensure Node.js is installed on your machine)
- **npm** (Node Package Manager)

## Endpoints

- **GET /api/get-users** - Get all users stored in the database.
    - **Responses**:
        - **200 OK**: Successfully retrieved data.
        - **500 Internal Server Error**: Error retrieving data.

## Response Example

```json
[
  {
    "id": 1,
    "username": "John",
    "stepsCompleted": 25,
    "gender": "female",
    "email": "asdasd@asdas.com",
    "lastName": "Doe",
    "city": "New York"

  },
  {
    "id": 2,
    "username": "Jane",
    "stepsCompleted": 30,
    "gender": "Male",
    "email": "aaaaaa@asdasd.com",
    "lastName": "Doe asdasd",
    "city": "Tokyo"
  }
]
```

- **POST /api/save-user** - Add a new user to the database.
    - **Request Body**:
        - **username**: The username of the user.
        - **stepsCompleted**: The number of steps completed by the user

## Response Example

```json
  {
    "id": 2,
    "username": "Jane",
    "stepsCompleted": 30,
    "gender": "Male",
    "email": "aaaaaa@asdasd.com",
    "lastName": "Doe asdasd",
    "city": "Tokyo"
  }
```
## Setup

### Install Dependencies

To install the required npm packages, run:

```bash
npm install
```

To run the server, run:

```bash
npm run dev
```

The server will be running on `http://localhost:3000`.