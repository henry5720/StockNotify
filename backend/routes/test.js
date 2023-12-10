import { Router } from "express";
const test = Router();

// GET /test
test.get("/test", (req, res) => {
    res.json({ message: "[get] test sucess" });
});

// POST /test
test.post("/test", (req, res) => {
    const { test } = req.body;
    res.json({ message: `[post] test sucess : ${test}` });
});

export default test;
