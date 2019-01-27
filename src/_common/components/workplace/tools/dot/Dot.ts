import {Vec2} from "../../../../utils/Vec2";
import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {DrawingParams} from "../DrawingParams";

const DOT_RADIUS = 4;

class Dot {
    constructor(position: Vec2) {
        this._position = position;
    }

    public position(): Vec2 {
        return this._position;
    }

    public draw(drawingContext: IDrawingContext): void {
        drawingContext.beginPath();
        drawingContext.setFill(DrawingParams.linesColor());
        drawingContext.arc(this._position, DOT_RADIUS, 0, Math.PI * 2);
        drawingContext.fill();
        drawingContext.closePath();
    }

    private _position: Vec2;
}

export {Dot};