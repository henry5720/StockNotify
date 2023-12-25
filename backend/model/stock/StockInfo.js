export class StockInfo {
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
