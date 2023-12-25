import { StockInfo } from "../stock/StockInfo.js";
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
