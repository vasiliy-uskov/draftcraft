import {Vec2} from "../../../common/utils/Vec2";
import {IDrawingContext} from "../../workplace/IDrawingContext";
import {IShape} from "../IShape";
import {BoundingRect} from "../../../common/utils/BoundingRect";
import {Size} from "../../../common/utils/Size";
import {ToolsViewParams} from "../ToolsViewParams";

class CleanArea implements IShape {
    constructor(center: Vec2) {
        const size = new Size(ToolsViewParams.eraserSize(), ToolsViewParams.eraserSize());
        this._rect = new BoundingRect(center, size)
    }

    draw(drawingContext: IDrawingContext) {
        drawingContext.clean(this._rect);
    }

    toString(): string {
        return JSON.stringify({
            model: "eraser",
            data: this._rect,
        })
    }

    private _rect: BoundingRect;
}

export {CleanArea};