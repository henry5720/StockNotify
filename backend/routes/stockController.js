import { Router } from "express";
import Stock from "../model/stockData.js";
const stockInfo = Router();
import testData from "../testData/stockInfo.js";
// GET /stockInfo
stockInfo.get("/stockInfo", (req, res) => {
    const stockInfo0 = new Stock(testData.msgArray[0]);
    const detail = stockInfo0.showDetail();
    res.json(stockInfo0);
});

export default stockInfo;
