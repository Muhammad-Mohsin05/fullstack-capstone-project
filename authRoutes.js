const express = require("express");
const router = express.Router();
const connectToDatabase = require("./models/db");

// Login
router.post("/login", async (req, res) => {
    try {
        const db = await connectToDatabase();

        const user = await db.collection("users").findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(401).json({
                error: "User not found"
            });
        }

        res.json({
            message: "Login successful",
            user: user
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Register
router.post("/register", async (req, res) => {
    try {
        const db = await connectToDatabase();

        const existingUser = await db.collection("users").findOne({
            email: req.body.email
        });

        if (existingUser) {
            return res.status(409).json({
                error: "User already exists"
            });
        }

        const result = await db.collection("users").insertOne({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        res.status(201).json({
            message: "Registration successful",
            userId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Update user information
router.put("/update/:id", async (req, res) => {
    try {
        const db = await connectToDatabase();

        const result = await db.collection("users").updateOne(
            { _id: req.params.id },
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email
                }
            }
        );

        res.json({
            message: "User updated successfully",
            result: result
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;
