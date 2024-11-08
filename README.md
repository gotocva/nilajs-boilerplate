# Nilajs

Nilajs is a Node.js application framework powered by the **Express.js** designed for building scalable and maintainable RESTful APIs. This project follows a modular architecture, where each feature (or module) has its own set of files, making the application easy to extend and maintain.

## Table of Contents

- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Features](#features)
- [Usage](#usage)
- [License](#license)

---

## Installation

To get started with Nilajs, follow these steps:

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/nilajs.git
```

### 2. Install dependencies:
Make sure you have **Node.js** and **npm** installed. Then, navigate to the project directory and run:

```bash
cd nilajs
npm install
```

### 3. Set up environment variables:
Create a `.env` file at the root of the project directory with the necessary environment variables (e.g., for database connections, API keys).

### 4. Start the development server:
```bash
npm run dev
```

---

## Folder Structure

Nilajs follows a modular folder structure to help organize code logically. Below is an explanation of each folder and its purpose.

```
nilajs/
│
├── src/
│   ├── app/
│   │   ├── <module_name>/
│   │   │   ├── controllers/
│   │   │   │   └── <module_name>Controller.js
│   │   │   ├── messages/
│   │   │   │   └── <module_name>Messages.js
│   │   │   ├── middlewares/
│   │   │   │   └── <module_name>Middleware.js
│   │   │   ├── models/
│   │   │   │   └── <module_name>Model.js
│   │   │   ├── routes/
│   │   │   │   └── <module_name>Router.js
│   │   │   ├── services/
│   │   │   │   └── <module_name>Service.js
│   │   │   └── <module_name>Service.js (optional, generic)
│   │   ├── config/
│   │   │   └── config.js
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js
│   │   ├── routes/
│   │   │   └── index.js
│   │   ├── utils/
│   │   │   └── HttpUtil.js
│   │   │   └── ResponseUtil.js
│   ├── server.js
│   ├── app.js
│   └── package.json
├── .env
└── README.md
```

### `src/app/` Directory

This directory holds the application's business logic, broken down into modules. Each module consists of the following parts:

#### 1. `<module_name>/controllers/`
- **Purpose**: Controllers handle incoming requests, process them (often using services), and send back a response.
- **Example**: `<module_name>Controller.js` contains methods like `create`, `list`, `update`, `delete`, and `get`, typically interacting with the service layer to perform the business logic.

#### 2. `<module_name>/messages/`
- **Purpose**: Contains message constants for the module. It’s used for API responses and error messages.
- **Example**: `<module_name>Messages.js` might contain success and error messages like:
    ```js
    export const <ModuleName>Messages = {
        OK: 'Success',
        <MODULE_NAME>_CREATED: '<ModuleName> created successfully',
        BAD_REQUEST: 'Bad request',
    };
    ```

#### 3. `<module_name>/middlewares/`
- **Purpose**: Middlewares are used to perform pre-processing on requests, such as validation, authentication, or logging.
- **Example**: `<module_name>Middleware.js` could have authentication middleware that checks the JWT token before allowing access to certain routes.

#### 4. `<module_name>/models/`
- **Purpose**: Defines the Mongoose schema for MongoDB collections.
- **Example**: `<module_name>Model.js` contains the schema definition:
    ```js
    import mongoose from 'mongoose';
    
    const <module_name>Schema = new mongoose.Schema({
        name: String,
        description: String,
    });
    
    export const <ModuleName> = mongoose.model('<ModuleName>', <module_name>Schema);
    ```

#### 5. `<module_name>/routes/`
- **Purpose**: Defines the API routes for the module.
- **Example**: `<module_name>Router.js` could define the routes like `GET`, `POST`, `PUT`, `DELETE` for handling various requests for that module.

#### 6. `<module_name>/services/`
- **Purpose**: Services contain the core business logic of the module, including interacting with the database models.
- **Example**: `<module_name>Service.js` contains methods like `create`, `list`, `update`, etc., for interacting with the database.

### `src/config/` Directory

Contains the application’s configuration files.

- **config.js**: Holds general configuration settings (e.g., database URL, JWT secret).

### `src/middlewares/` Directory

Global middlewares that can be applied across the application.

- **authMiddleware.js**: Middleware for handling authentication, usually checking for a valid JWT token.

### `src/routes/` Directory

Contains the main routing logic for the entire application.

- **index.js**: Central file where you combine all the module routes and apply them to the Express app.

### `src/utils/` Directory

Contains utility functions that can be shared across the app.

- **HttpUtil.js**: Utility for HTTP status codes.
- **ResponseUtil.js**: Utility for formatting consistent API responses.

### `src/server.js`

This file initializes the server and connects to the database.

```js
import express from 'express';
import mongoose from 'mongoose';
import routes from './app/routes';

const app = express();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Database connection error:', err));

app.use(express.json());
app.use('/api', routes); // Load the API routes

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
```

### `src/app.js`

Sets up the Express app and middleware configurations.

```js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './utils/ResponseUtil';

const app = express();

app.use(cors());      // Enable Cross-Origin Resource Sharing
app.use(helmet());    // Set security headers
app.use(express.json());

app.use(errorHandler); // Global error handler middleware

export default app;
```

---

## Features

- **Modular Architecture**: Each module has its own controller, model, service, and routes, making the codebase easy to maintain and extend.
- **Middlewares**: Pre-configured for handling authentication, logging, and validation.
- **RESTful API**: Organized API routes with standard HTTP methods.
- **MongoDB Integration**: Built-in support for MongoDB with Mongoose for schema management.
- **Scalability**: Easily extend the application by adding new modules with minimal changes to existing code.
- **Error Handling**: Centralized error handling to provide consistent responses and logging.

---

## Usage

Once the application is set up, you can start building your own modules by following this structure. For example, to create a new module:

1. Create a new directory for the module inside the `src/app/` directory.
2. Inside the module directory, create the necessary files (`controllers`, `models`, `routes`, etc.) following the structure.

---

## License

Nilajs is released under the MIT License. See the [LICENSE](LICENSE) file for more details.
