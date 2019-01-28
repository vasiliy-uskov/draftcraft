import {Vec2} from "../../../../utils/Vec2";
import {IDrawingContext} from "../../drawingcontext/IDrawingContext";

const DOT_RADIUS = 4;

class Dot {
    constructor(position: Vec2) {
        this._position = position;
    }

    public owns(cord: Vec2): boolean {
        cord = cord.clone().reduce(this._position);
        const accuracy = 5;
        return cord.x * cord.x + cord.y * cord.y < accuracy * accuracy;
    }


    public position(): Vec2 {
        return this._position;
    }

    public draw(drawingContext: IDrawingContext): void {
        drawingContext.beginPath();
        drawingContext.arc(this._position, DOT_RADIUS, 0, Math.PI * 2);
        drawingContext.fill();
        drawingContext.closePath();
    }

    private _position: Vec2;
}

export {Dot};