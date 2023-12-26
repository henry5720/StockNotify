import { Router } from "express";
import { getStockInfo } from "../controller/index.js";
const setObserver = Router();

// GET /stockInfo
setObserver.post("/setObserver", getStockInfo);
export { setObserver }