import {verifyNumber} from "./typetools";
import {normalizeAngle} from "./mathutils";

class Vec2 {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public angle(): number {
        const angle = Math.atan(this.y / this.x);
        return normalizeAngle(this.x < 0 ? Math.PI + angle : angle);
    }

    public radius(): number {
        return Math.hypot(this.x, this.y);
    }

    public clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    public scale(scale: number): Vec2 {
        this.x *= scale;
        this.y *= scale;
        return this;
    }

    public add(vec: Vec2): Vec2 {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    public toString(): string {
        return `{x: ${this.x}, y: ${this.y}}`;
    }

    public x: number;
    public y: number;
}

export {Vec2}