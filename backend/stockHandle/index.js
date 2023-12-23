const sourceDataExample = {
    msgArray: [
        {
            tv: "2580",
            ps: "2580",
            pz: "577.0000",
            bp: "0",
            fv: "91",
            oa: "579.0000",
            ob: "578.0000",
            a: "578.0000_579.0000_580.0000_581.0000_582.0000_",
            b: "577.0000_576.0000_575.0000_574.0000_573.0000_",
            c: "2330",
            d: "20231221",
            ch: "2330.tw",
            ot: "14:30:00",
            tlong: "1703140200000",
            f: "471_490_551_347_299_",
            ip: "0",
            g: "190_417_1697_752_571_",
            mt: "000000",
            ov: "17414",
            h: "579.0000",
            i: "24",
            it: "12",
            oz: "578.0000",
            l: "575.0000",
            n: "台積電",
            o: "577.0000",
            p: "0",
            ex: "tse",
            s: "2580",
            t: "13:30:00",
            u: "643.0000",
            v: "24815",
            w: "527.0000",
            nf: "台灣積體電路製造股份有限公司",
            y: "585.0000",
            z: "577.0000",
            ts: "0",
        },
    ],
    referer: "",
    userDelay: 5000,
    rtcode: "0000",
    queryTime: {
        sysDate: "20231221",
        stockInfoItem: 3257,
        stockInfo: 259528,
        sessionStr: "UserSession",
        sysTime: "21:26:55",
        showChart: false,
        sessionFromTime: -1,
        sessionLatestTime: -1,
    },
    rtmessage: "OK",
    exKey: "if_tse_2330.tw_zh-tw.null",
    cachedAlive: 28809,
};

class StockInfo {
    constructor(sourceData) {
        this.sourceData = sourceData;
    }
    getEachStock() {
        let resultData = [];
        this.sourceData["msgArray"].forEach((element) => {
            const eachStock = {
                code: element["c"],
                name: element["n"],
                sellPrice: element["z"],
                sellNumber: element["tv"],
            };
            resultData.push(eachStock);
        });
        console.log({ resultData });
        return resultData;
    }
}

const settingExample = {
    baseUrl: "https://mis.twse.com.tw/stock/api/getStockInfo.jsp",
    targetList: ["2330", "1101"],
    intervalTime: 1,
};

export class StockObserver {
    constructor(searchInfo) {
        this.searchInfo = searchInfo;
        this.timer = null;
    }
    getApiUrl() {
        const baseUrl = new URL(this.searchInfo.baseUrl);
        const result = this.handleTargetList();
        // console.log({result});
        const params = baseUrl.searchParams;
        params.set("ex_ch", result);
        return baseUrl;
    }
    handleTargetList() {
        const result = this.searchInfo.targetList.map((element) => {
            // console.log({element});
            return this.getParams(element);
        });
        return result.join("|");
    }
    getParams(source) {
        return source[0] === "6" ? `otc_${source}.tw` : `tse_${source}.tw`;
    }
    /** [計時器]: 設定秒數 > 取得資料 > 處理資料
     * @param {int} interval
     * @returns {object}
     */
    startTimer(interval = 5) {
        this.handleREsult();
        this.timer = setInterval(() => this.handleREsult(), interval * 1000);
    }
    async callApi() {
        try {
            const apiUrl = this.getApiUrl();
            const res = await fetch(apiUrl, {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error(`API request failed with status ${res.status}`);
            }
            const result = await res.json();
            // console.log({result});
            return result;
        } catch (error) {
            console.error("Error while calling API:", error);
        }
    }
    async handleREsult() {
        const result = await this.callApi();
        // console.log(result.msgArray);
        const stockInfo = new StockInfo(result);
        return stockInfo.getEachStock();
    }
}

// const test1=new StockObserver(settingExample);
// test1.startTimer(10);
