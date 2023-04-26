export class ScaleConverter {
    constructor(inMin, inMax, outMin, outMax) {
        this.inMin = inMin;
        this.inMax = inMax;
        this.outMin = outMin;
        this.outMax = outMax;
    }

    scale(value) {
        const result = (value - this.inMin) * (this.outMax - this.outMin) / (this.inMax - this.inMin) + this.outMin;

        if (result < this.outMin) {
            return this.outMin;
        } else if (result > this.outMax) {
            return this.outMax;
        }

        return result;
    }
}
