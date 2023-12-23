import { Router } from "express";
import { StockObserver } from "../stockHandle/index.js";
const stockInfo = Router();

// GET /stockInfo
stockInfo.get("/stockInfo", async(req, res) => {
    const setting = {
        baseUrl: "https://mis.twse.com.tw/stock/api/getStockInfo.jsp",
        targetList: ["2330", "1101"],
        intervalTime: 5,
    };
    const observer = new StockObserver(setting);
    res.json(await observer.handleREsult());
});

export default stockInfo;
