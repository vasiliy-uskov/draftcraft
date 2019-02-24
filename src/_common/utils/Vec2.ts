import {compareFloat, normalizeAngle} from "./mathutils";
import {verifyNumber, verifyObject} from "./typetools";

class Vec2 {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public angle(): number {
        if (!this._angle) {
            this._angle = Math.atan(this.y / this.x);
            this._angle = normalizeAngle(this.x < 0 ? Math.PI + this._angle : this._angle)
        }
        return this._angle;
    }

    public radius(): number {
        if (!this._radius) {
            this._radius = Math.hypot(this.x, this.y);
        }
        return this._radius;
    }

    public scale(scale: number): Vec2 {
        return new Vec2(this.x * scale, this.y * scale);
    }

    public add(vec: Vec2): Vec2 {
        return new Vec2(this.x + vec.x, this.y + vec.y);
    }

    public reduce(vec: Vec2): Vec2 {
        return this.add(vec.scale(-1));
    }

    public equal(vec: Vec2): boolean {
        return compareFloat(this.x, vec.x)
            && compareFloat(this.y, vec.y)
    }

    public normalize(): Vec2 {
        return this.scale(1 / this.radius());
    }

    public toString(): string {
        return `{x: ${this.x}, y: ${this.y}}`;
    }

    static load(data: any): Vec2 {
        verifyObject(data);
        verifyNumber(data.x);
        verifyNumber(data.y);
        return new Vec2(data.x, data.y)
    }

    public readonly x: number;
    public readonly y: number;

    private _radius: number|null = null;
    private _angle: number|null = null;
}

function createVec2ByPolar(angle: number, radius: number) {
    return new Vec2(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
    )
}

export {Vec2, createVec2ByPolar}