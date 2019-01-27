import {Vec2} from "../../../../utils/Vec2";
import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {IShape} from "../IShape";
import {BoundingRect} from "../../../../utils/BoundingRect";
import {Size} from "../../../../utils/Size";
import {DrawingParams} from "../DrawingParams";

class CleanArea implements IShape {
    constructor(center: Vec2) {
        const size = new Size(DrawingParams.eraserSize(), DrawingParams.eraserSize());
        this._rect = new BoundingRect(center, size)
    }

    public draw(drawingContext: IDrawingContext) {
        drawingContext.clean(this._rect);
    }

    public serialize(): Object {
        return {
            model: "eraser",
            data: this._rect,
        }
    }

    private _rect: BoundingRect;
}

export {CleanArea};