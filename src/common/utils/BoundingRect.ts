import {Vec2} from "./Vec2";
import {Size} from "./Size";

class BoundingRect {
    constructor(pos: Vec2, size: Size) {
        this.x = pos.x;
        this.y = pos.y;
        this.width = size.width;
        this.height = size.height;
    }

    clone(): BoundingRect {
        return new BoundingRect(new Vec2(this.x, this.y), new Size(this.width, this.height));
    }

    public toString(): string {
        return `{
            x: ${this.x},
            y: ${this.y},
            width: ${this.width},
            height: ${this.height}
        }`;
    }

    public x: number;
    public y: number;
    public width: number;
    public height: number;
}

export {BoundingRect};