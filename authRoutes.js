const express = require("express");
const router = express.Router();
const connectToDatabase = require("./models/db");

router.post("/login", async (req, res) => {
    const db = await connectToDatabase();

    const user = await db.collection("users").findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(401).json({ error: "User not found" });
    }

    res.json(user);
});

router.post("/register", async (req, res) => {
    const db = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({
        email: req.body.email
    });

    if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
    }

    const result = await db.collection("users").insertOne(req.body);

    res.json(result);
});

module.exports = router;
