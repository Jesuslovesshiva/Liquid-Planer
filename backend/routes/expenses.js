const express = require("express");

module.exports = (container) => {
  const router = express.Router();

  // Create expense -------------------------------------------------------------------

  router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const { resource: createdDocument } = await container.items.create(data);

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
        .readAll()
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
