const testLsit = [
    "03912T",
    "03913C",
    "03913T",
    "03914C",
    "03914T",
    "03915C",
    "03915T",
    "03916C",
    "03916T",
    "03917C",
    "03917T",
    "03918C",
    "03918T",
    "039190",
    "03919C",
    "03919T",
    "039203",
    "03920C",
    "03920T",
    "039212",
    "03921C",
    "03921T",
    "03921U",
    "03922T",
    "039238",
    "03923T",
    "03924T",
    "03925T",
    "039260",
    "03926T",
    "03927T",
    "03928T",
    "03929T",
    "039303",
    "03930T",
    "03931T",
    "03932T",
    "03933T",
    "03934T",
    "03935T",
    "03936T",
    "03937T",
    "03938T",
    "03939T",
    "03940T",
    "039418",
    "03941T",
    "03942T",
    "039433",
    "03943T",
    "03944T",
    "03945T",
    "039461",
    "03946T",
    "03947T",
    "03948T",
    "03949T",
    "03950T",
    "039515",
    "03951T",
    "03952T",
    "03953T",
    "03954T",
    "03955T",
    "039561",
    "039567",
    "03956T",
    "039570",
    "03957T",
    "03958T",
    "039597",
    "039598",
    "039599",
    "03959T",
    "039600",
    "039601",
    "03960T",
    "039619",
    "03961T",
    "03962T",
    "03963T",
    "039649",
    "03964T",
    "03965T",
    "03966T",
    "03967T",
    "03968T",
    "03969T",
    "03970T",
    "039712",
    "039713",
    "039714",
    "03971T",
    "039725",
    "039726",
    "03972T",
    "03973T",
    "039747",
    "039748",
    "03974T",
];

import { StockObserver } from "../../model/index.js";
export const getStockInfo = async (req, res) => {
    // const queryParams = req.query;
    const config = {
        userID: "test",
        baseUrl: process.env.MIS_TWSE_API_URL,
        // target: queryParams.target,
        target: testLsit,
    };
    const setting = checkConfig(config);
    const observer = new StockObserver(setting);
    const result = await observer.handleREsult();
    console.log({ result });
    res.json(result);
};

const checkConfig = (config) => {
    // 在這裡進行參數的驗證
    if (!config.userID || !config.baseUrl || !config.target) {
        throw new Error("Invalid configuration: Missing required parameters");
    }

    // 在這裡進行參數的初始化
    const userID = config.userID;
    const baseUrl = config.baseUrl;
    const targetList =
        typeof config.target === "string" ? [config.target] : config.target;
    const intervalTime = config.intervalTime || 5;

    // 返回初始化後的物件
    return {
        userID,
        baseUrl,
        targetList,
        intervalTime,
    };
};
