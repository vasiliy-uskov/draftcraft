import {Vec2} from "../../../../utils/Vec2";
import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {BoundingRect} from "../../../../utils/BoundingRect";
import {Size} from "../../../../utils/Size";
import {DrawingParams} from "../DrawingParams";
import {BaseShape} from "../BaseShape";

class CleanArea extends BaseShape {
    constructor(center: Vec2) {
        super();
        const size = new Size(DrawingParams.eraserSize(), DrawingParams.eraserSize());
        this._rect = new BoundingRect(center, size)
    }

    public owns(cord: Vec2): boolean {
        return false
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