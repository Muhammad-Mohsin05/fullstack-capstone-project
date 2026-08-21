const express = require("express");
const router = express.Router();
const connectToDatabase = require("../models/db");

router.get("/api/search", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const category = req.query.category;

        const filter = category ? { category: category } : {};

        const gifts = await db.collection("gifts").find(filter).toArray();

        res.json(gifts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
