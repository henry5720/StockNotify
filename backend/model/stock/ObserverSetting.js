export class ObserverSetting {
    constructor(baseUrl, target, intervalTime = 5) {
        this.baseUrl = baseUrl;
        this.targetList = typeof(target)==="string"?[target]:target;
        this.intervalTime = intervalTime;
    }
}
