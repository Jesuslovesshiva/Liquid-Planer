const express = require("express");
const CosmosClient = require("@azure/cosmos").CosmosClient;
require("dotenv").config();

// Init app ------------------------------------------------------------------------

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Cosmos DB configuration ---------------------------------------------------------

const cosmosEndpoint = process.env.COSMOS_ENDPOINT;
const cosmosKey = process.env.COSMOS_KEY;
const databaseId = process.env.DATABASE_ID;
const containerId = process.env.CONTAINER_ID;

// Initialize Cosmos DB client -----------------------------------------------------

const client = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
const database = client.database(databaseId);
const container = database.container(containerId);

// API routes ----------------------------------------------------------------------

const expensesRoutes = require("./routes/expenses")(container);
app.use("/expenses", expensesRoutes);

// Start web server ----------------------------------------------------------------

app.listen(port, () => {
  console.log(`Server successfully running on port ${port}!`);
});
