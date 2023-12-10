// import testData from "../testData/stockInfo.json" assert { type: "json" };
class Stock {
    constructor(stockInfo) {
        this.code = stockInfo.c;
        this.name = stockInfo.n;
        this.dealPrice = stockInfo.z;
        this.dealNum = stockInfo.tv;
        this.updateTime = stockInfo.tlong;
    }
    showDetail() {
        return `StockInfo: (code: ${this.code}, name: ${this.name}, dealPrice: ${this.dealPrice}, dealNum: ${this.dealNum}), dealNum: ${this.updateTime})`;
    }
}

export default Stock;
