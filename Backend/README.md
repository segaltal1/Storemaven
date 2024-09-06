# API Documentation

## Introduction

This project provides an API for accessing leaderboard data.

## Prerequisites

- **Node.js** (Ensure Node.js is installed on your machine)
- **npm** (Node Package Manager)
- mongodb & mongoose (Ensure mongodb is installed on your machine)

## Endpoints

- **GET /api/get-users** - Get all users scores.
    - **Responses**:
        - **200 OK**: Successfully retrieved data.
        - **500 Internal Server Error**: Error retrieving data.

## Response Example

```json
[
  {
    "_id": "66db8012c962e1847b3a2834",
    "username": "Jane2",
    "stepsCompleted": 111
  },
  {
    "_id": "66db2215dcebfdc7f99165bb",
    "username": "Jane",
    "stepsCompleted": 20
  },
  {
    "_id": "66db2215dcebfdc7f99165ba",
    "username": "John",
    "stepsCompleted": 10
  }
]
```

- **POST /api/create-user** - Add a new user to the database.
    - **Request Body**:
        - **username**: The username of the user.

## Response Example

```json
  {
    "id": 2,
    "username": "Jane",
    "gender": "Male",
    "email": "aaaaaa@asdasd.com",
    "lastName": "Doe asdasd",
    "city": "Tokyo"
  }
```

- **POST /api/update-score** - Update a user's score.
    - **Request Body**:
        - **userId**:  The id of the user.
        - **stepsCompleted**: The number of steps completed by the user.

## Response Example
    
```json
    {
      "message": "Score updated successfully",
      "stepsCompleted": "20"
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