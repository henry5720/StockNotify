import { StockObserver, ObserverSetting } from "../../model/index.js";
export const getStockInfo = async (req, res) => {
    const queryParams = req.query;
    console.log({ queryParams });
    const baseUrl = process.env.MIS_TWSE_API_URL;
    const targetList = [queryParams.targetList];
    const intervalTime = queryParams.intervalTime;
    const setting = new ObserverSetting(baseUrl, targetList, intervalTime);
    const observer = new StockObserver(setting);
    res.json(await observer.handleREsult());
};
