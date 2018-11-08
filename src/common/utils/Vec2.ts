import {verifyNumber} from "./typetools";

class Vec2 {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public angle(): number { // return slope angle in radians
        return Math.atan(this.y / this.x);
    }

    public radius(): number {
        return Math.hypot(this.x, this.y);
    }

    public toString(): string {
        return JSON.stringify({
            x: this.x,
            y: this.y
        })
    }

    public clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    static load(json: string): Vec2 {
        const data = JSON.parse(json) as {x: number, y: number};
        verifyNumber(data.x);
        verifyNumber(data.y);
        return  new Vec2(data.x, data.y)
    }

    public x: number;
    public y: number;
}

export {Vec2}