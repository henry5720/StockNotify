import { Router } from "express";
import { getStockInfo } from "../../controller/index.js";
const stockInfo = Router();

// GET /stockInfo
stockInfo.get("/stockInfo", getStockInfo);
export { stockInfo };
