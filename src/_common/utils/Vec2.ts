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

    public reduce(vec: Vec2): Vec2 {
        this.add(vec.clone().scale(-1));
        return this;
    }

    public toString(): string {
        return `{x: ${this.x}, y: ${this.y}}`;
    }

    public x: number;
    public y: number;
}

function createVec2ByPolar(angle: number, radius: number) {
    return new Vec2(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
    )
}

export {Vec2, createVec2ByPolar}