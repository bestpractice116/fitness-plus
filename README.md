# Gym Membership Management API

This API is built with NestJS and PostgreSQL to manage gym memberships, including different billing structures and the ability to send email reminders for upcoming payments using Gmail's SMTP service.

## Features

- CRUD operations for managing gym memberships
- Scheduled email reminders for upcoming payments
- Manual trigger for sending reminder emails

## Requirements

- Node.js
- PostgreSQL
- Gmail account for sending emails

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/joshualine/fitness-plus.git
    cd fitness-plus
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following content, replacing placeholder values with your actual configuration:

    ```env
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USERNAME=your_db_username
    DATABASE_PASSWORD=your_db_password
    DATABASE_NAME=your_db_name

    SMTP_HOST=your_smtp_server
    SMTP_PORT=587
    SMTP_USER=your_email@example.com
    SMTP_PASS=your_email_password
    ```

## Running the Application

1. Ensure your PostgreSQL server is running and the database specified in your `.env` file is created.

2. Run the database migrations:

    ```bash
    npm run typeorm migration:run
    ```

3. Start the application:

    ```bash
    npm run start
    ```

    The API will be running at `http://localhost:3000`.

## API Endpoints

### Create a New Membership

- **Endpoint**: `POST /memberships`
- **Description**: Creates a new gym membership.
- **Request Body**:

    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "membershipType": "Annual Basic",
      "startDate": "2023-01-01",
      "dueDate": "2024-01-01",
      "totalAmount": 300.00,
      "monthlyAmount": 0,
      "email": "john.doe@example.com",
      "isFirstMonth": true
    }
    ```

- **Response**:
  - **Status**: `201 Created`
  - **Body**:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "membershipType": "Annual Basic",
      "startDate": "2023-01-01",
      "dueDate": "2024-01-01",
      "totalAmount": 300.00,
      "monthlyAmount": 0,
      "email": "john.doe@example.com",
      "isFirstMonth": true
    }
    ```

### Get All Memberships

- **Endpoint**: `GET /memberships`
- **Description**: Retrieves a list of all gym memberships.
- **Response**:
  - **Status**: `200 OK`
  - **Body**:

    ```json
    [
      {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "membershipType": "Annual Basic",
        "startDate": "2023-01-01",
        "dueDate": "2024-01-01",
        "totalAmount": 300.00,
        "monthlyAmount": 0,
        "email": "john.doe@example.com",
        "isFirstMonth": true
      },
      {
        "id": 2,
        "firstName": "Jane",
        "lastName": "Smith",
        "membershipType": "Monthly Premium",
        "startDate": "2023-02-01",
        "dueDate": null,
        "totalAmount": 0,
        "monthlyAmount": 30.00,
        "email": "jane.smith@example.com",
        "isFirstMonth": false
      }
    ]
    ```

### Get a Single Membership by ID

- **Endpoint**: `GET /memberships/:id`
- **Description**: Retrieves details of a specific gym membership by ID.
- **Response**:
  - **Status**: `200 OK`
  - **Body**:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "membershipType": "Annual Basic",
      "startDate": "2023-01-01",
      "dueDate": "2024-01-01",
      "totalAmount": 300.00,
      "monthlyAmount": 0,
      "email": "john.doe@example.com",
      "isFirstMonth": true
    }
    ```

### Update a Membership

- **Endpoint**: `PUT /memberships/:id`
- **Description**: Updates the details of a specific gym membership by ID.
- **Request Body** (Partial or Full Update):

    ```json
    {
      "lastName": "Doe-Smith",
      "membershipType": "Monthly Basic",
      "monthlyAmount": 20.00,
      "isFirstMonth": false
    }
    ```

- **Response**:
  - **Status**: `200 OK`
  - **Body**:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe-Smith",
      "membershipType": "Monthly Basic",
      "startDate": "2023-01-01",
      "dueDate": "2024-01-01",
      "totalAmount": 300.00,
      "monthlyAmount": 20.00,
      "email": "john.doe@example.com",
      "isFirstMonth": false
    }
    ```

### Delete a Membership

- **Endpoint**: `DELETE /memberships/:id`
- **Description**: Deletes a specific gym membership by ID.
- **Response**:
  - **Status**: `204 No Content`
  - **Body**: None

### Send Reminder Email

- **Endpoint**: `POST /memberships/:id/send-reminder`
- **Description**: Sends a reminder email to the specified membership.
- **Response**:
  - **Status**: `200 OK`
  - **Body**: None
- **Error Response**:
  - **Status**: `404 Not Found`
  - **Body**:

    ```json
    {
      "statusCode": 404,
      "message": "Membership not found",
      "error": "Not Found"
    }
    ```

## Configuration

The application is configured using environment variables defined in a `.env` file. The variables include database connection details and SMTP server details for sending emails.

## Running Tests

To run the tests, use the following command:

```bash
npm run test