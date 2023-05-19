const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (userContainer) => {
  const router = express.Router();

  // SignUp
  router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
      // Checking if the user already exists
      const { resources } = await userContainer.items
        .query({
          query: "SELECT * from c WHERE c.email = @email",
          parameters: [{ name: "@email", value: email }],
        })
        .fetchAll();

      if (resources.length > 0) {
        return res.status(400).json({ message: "User already exists." });
      }

      // Creating new user
      const { resource } = await userContainer.items.create({
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ id: resource.id }, process.env.SECRET_KEY, {
        expiresIn: 86400,
      }); // Expires in 24 hours

      res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({ message: "User was registered successfully!" });
    } catch (error) {
      console.error("Failed to register user", error);
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  // Login
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      // Finding the user
      const { resources } = await userContainer.items
        .query({
          query: "SELECT * from c WHERE c.email = @email",
          parameters: [{ name: "@email", value: email }],
        })
        .fetchAll();

      const user = resources[0];

      if (!user) {
        return res.status(404).json({ message: "No user found." });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 86400,
      }); // Expires in 24 hours

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Set 'secure' flag in production
          sameSite: "strict", // Set 'sameSite' attribute to 'strict'
        })
        .status(200)
        .send("Logged in successfully");
    } catch (error) {
      console.error("Failed to log in", error);
      res.status(500).send("Failed to log in");
    }
  });

  // Current User
  router.get("/user", async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      // Perform any additional checks or database queries to fetch the current user
      // For example, you can query the user data from the database based on the decoded token

      // Return the current user
      res.status(200).json({ user: { id: decoded.id } });
    } catch (error) {
      console.error("Failed to verify token:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  });

  return router;
};
