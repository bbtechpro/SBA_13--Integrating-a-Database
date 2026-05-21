Scenario
You are a backend developer for “Zenith,” a rapidly growing e-commerce company. The company needs a robust and scalable API to manage its product inventory. This API will be the backbone of their new online store, used by internal tools for inventory management and by the public-facing website to display products to customers.

Your task is to design and build this RESTful API from the ground up using Node.js, Express, and Mongoose. The API must handle all fundamental CRUD operations and include advanced features like filtering, sorting, and pagination to manage a large and complex product catalog.

Instructions
Task 1: Project Setup
Initialize Project: Create a new project directory, initialize it with npm, and install express, mongoose, and dotenv.
Environment: Create a .env file to store your MONGO_URI connection string and a PORT for the server.
Security: Create a .gitignore file and ensure node_modules/ and .env are listed.
Project Structure: Your application must be well-structured with separate directories for your database connection logic, Mongoose models, and Express routes.
server.js (main entry point)
config/ (or db/) for connection.js
models/ for Product.js
routes/ for productRoutes.js
Task 2: Schema and Model
In models/Product.js, define a productSchema with the following fields and validation rules:
name: String, required.
description: String, required.
price: Number, required, must be greater than 0.
category: String, required.
inStock: Boolean, defaults to true.
tags: An Array of Strings.
createdAt: Date, defaults to the current date and time.
Compile this schema into a model named Product and export it.
Task 3: Database Connection
In your config/connection.js file, establish a connection to your MongoDB Atlas database using Mongoose.
Handle both successful connections and connection errors gracefully by logging appropriate messages to the console.
Execute this connection logic from server.js.
Task 4: API Routes and Logic
In routes/productRoutes.js, use express.Router() to define your API endpoints. The logic for each route should be handled directly within the route file for this assessment.

Implement the following endpoints. All endpoints must handle potential errors with try...catch blocks and return appropriate status codes and JSON responses.

POST /api/products (Create a Product)

Creates a new product based on the req.body.
Responds with the newly created product and a 201 status code.
If validation fails, it should return a 400 status code with a descriptive error message.
GET /api/products/:id (Read a Single Product)

Retrieves a single product by its _id.
If the product is found, responds with the product object.
If no product is found, responds with a 404 status code.
PUT /api/products/:id (Update a Product)

Updates a product by its _id with the data from req.body.
Responds with the updated product data (use the { new: true } option).
If no product is found to update, responds with a 404 status code.
DELETE /api/products/:id (Delete a Product)

Deletes a product by its _id.
If successful, responds with a success message.
If no product is found to delete, responds with a 404 status code.
GET /api/products (Read All Products with Advanced Querying)

This is the most complex endpoint. It should retrieve all products but also support the following optional query parameters:
category: Filter products by a specific category.
minPrice: Filter products with a price greater than or equal to this value.
maxPrice: Filter products with a price less than or equal to this value.
sortBy: Sort results. For example, price_asc for ascending price or price_desc for descending price.
page & limit: For pagination (defaulting to page 1, limit 10).
Dynamically build the Mongoose query based on which query parameters are provided.
Respond with an array of the resulting products.
Submission Instructions
Ensure your application is fully functional and structured as described.
Test all your endpoints thoroughly using an API client like Postman or Insomnia. Pay special attention to the advanced query endpoint, testing various combinations of filters, sorting, and pagination.
Submit a link to your completed GitHub repository. Ensure your .env file and node_modules directory are not included.

Test route examples

Use the API at `http://localhost:3000/api/products` once the server is running.

1. Create a product

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"High-performance laptop","price":1299.99,"category":"Electronics","inStock":true,"tags":["computer","office"]}'
```

2. Get all products

```bash
curl http://localhost:3000/api/products
```

3. Get a product by ID

```bash
curl http://localhost:3000/api/products/<PRODUCT_ID>
```

4. Update a product by ID

```bash
curl -X PUT http://localhost:3000/api/products/<PRODUCT_ID> \
  -H "Content-Type: application/json" \
  -d '{"price":1199.99,"inStock":false}'
```

5. Delete a product by ID

```bash
curl -X DELETE http://localhost:3000/api/products/<PRODUCT_ID>
```

6. Advanced querying

```bash
curl "http://localhost:3000/api/products?category=Electronics&minPrice=500&maxPrice=1500&sortBy=price_desc&page=1&limit=10"
```
