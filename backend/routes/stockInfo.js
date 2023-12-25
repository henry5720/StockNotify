import { Router } from "express";
import { getStockInfo } from "../controller/index.js";
export const stockInfo = Router();

// GET /stockInfo
stockInfo.get("/stockInfo", getStockInfo);
