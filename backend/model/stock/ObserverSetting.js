export class ObserverSetting {
    constructor(baseUrl, targetList, intervalTime = 5) {
        this.baseUrl = baseUrl;
        this.targetList = targetList;
        this.intervalTime = intervalTime;
    }
}
