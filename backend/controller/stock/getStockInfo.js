import { StockObserver, ObserverSetting } from "../../model/index.js";
export const getStockInfo = async (req, res) => {
    const queryParams = req.query;
    const baseUrl = process.env.MIS_TWSE_API_URL;
    const target = queryParams.target;
    const intervalTime = queryParams.intervalTime;
    // console.log({ queryParams, baseUrl, targetList, intervalTime });
    const setting = new ObserverSetting(baseUrl, target, intervalTime);
    const observer = new StockObserver(setting);
    const result = await observer.handleREsult();
    console.log({ result });
    res.json(result);
};
