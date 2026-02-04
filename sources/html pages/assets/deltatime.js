export default class DeltaTime {
    constructor(){
        this.startTime = performance.now();
        this.timestamp = this.startTime;
    }
    update(){
        let now = performance.now();
        this.delta = now - this.timestamp;
        this.timestamp = now;
        return this.delta;
    }
}