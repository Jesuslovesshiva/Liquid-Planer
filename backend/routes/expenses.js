const express = require("express");
const authMiddleware = require("../middleware/auth"); // assuming your express routes are one level up from /auth

module.exports = (container) => {
  const router = express.Router();
  router.use(authMiddleware); // use the auth middleware for all routes

  // Create expense -------------------------------------------------------------------

  router.post("/", async (req, res) => {
    try {
      const data = { ...req.body, user: req.user }; // add current user's id to the new expense
      console.log(data);
      const { resource: createdDocument } = await container.items.create(data);
      console.log(createdDocument);
      return res.status(201).json(createdDocument);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Bad request." });
    }
  });

  // Get all expenses -----------------------------------------------------------------

  router.get("/", async (req, res) => {
    try {
      const { resources: expenses } = await container.items
        .query({
          query: "SELECT * from c WHERE c.user = @user",
          parameters: [{ name: "@user", value: req.user }],
        })
        .fetchAll();

      return res.status(200).json(expenses);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to retrieve expenses." });
    }
  });

  // Get single expense by id ---------------------------------------------------------

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { resource: expense } = await container.item(id, id).read();

      if (!expense) {
        return res.status(404).json({ message: "Expense not found." });
      }

      if (expense.user !== req.user) {
        return res.status(403).json({ message: "Unauthorized." });
      }

      return res.status(200).json(expense);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Failed to retrieve the expense." });
    }
  });

  // Delete expense by Id ------------------------------------------------------------

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { resource: expense } = await container.item(id, id).read();

      if (!expense) {
        return res.status(404).json({ message: "Expense not found." });
      }

      if (expense.user !== req.user) {
        return res.status(403).json({ message: "Unauthorized." });
      }

      await container.item(id, id).delete();

      return res.status(204).end();
    } catch (error) {
      console.log(error.message);
      if (error.code === 404) {
        return res.status(404).json({ message: "Expense not found." });
      } else {
        return res
          .status(500)
          .json({ message: "Failed to delete the expense." });
      }
    }
  });

  return router;
};
