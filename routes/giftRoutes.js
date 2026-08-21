const express = require("express");
const router = express.Router();
const connectToDatabase = require("../models/db");

router.get("/api/gifts", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const gifts = await db.collection("gifts").find({}).toArray();
        res.json(gifts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/api/gifts/:id", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const gift = await db.collection("gifts").findOne({
            _id: req.params.id
        });
        res.json(gift);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
