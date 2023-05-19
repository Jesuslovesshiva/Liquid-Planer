const express = require("express");
const CosmosClient = require("@azure/cosmos").CosmosClient;
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Init app ------------------------------------------------------------------------

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Define the origin of your Svelte app
const allowedOrigins = ["http://localhost:8080"];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the request origin is allowed
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());

// Cosmos DB configuration ---------------------------------------------------------

const cosmosEndpoint = process.env.COSMOS_ENDPOINT;
const cosmosKey = process.env.COSMOS_KEY;
const databaseId = process.env.DATABASE_ID;
const containerId = process.env.CONTAINER_ID;
const userContainerId = process.env.USER_CONTAINER_ID;

// Initialize Cosmos DB client -----------------------------------------------------

const client = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
const database = client.database(databaseId);
const container = database.container(containerId);
const userContainer = database.container(userContainerId);

// API routes ----------------------------------------------------------------------

const expensesRoutes = require("./routes/expenses")(container);
const userRoutes = require("./routes/auth")(userContainer);

app.use("/expenses", expensesRoutes);
app.use("/auth", userRoutes);

// Start web server ----------------------------------------------------------------

app.listen(port, () => {
  console.log(`Server successfully running on port ${port}!`);
});
