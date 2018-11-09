import {Vec2} from "../../../common/utils/Vec2";
import {IDrawingContext} from "../../workplace/IDrawingContext";
import {IShape} from "../IShape";

const CLEAN_AREA_SIZE = 40;
class CleanArea implements IShape {
    constructor(center: Vec2) {
        const startX = center.x - CLEAN_AREA_SIZE / 2;
        const startY = center.y - CLEAN_AREA_SIZE / 2;
        const currPoint =  new Vec2(0, 0);
        for (let i = 0; i < CLEAN_AREA_SIZE * CLEAN_AREA_SIZE; ++i) {
            currPoint.x = startX + i % CLEAN_AREA_SIZE;
            currPoint.y = startY + Math.floor(i / CLEAN_AREA_SIZE);
            this._area.push(currPoint.clone());
        }
    }

    draw(drawingContext: IDrawingContext) {
        drawingContext.clean(this._area);
    }

    toString(): string {
        return JSON.stringify({
            model: "eraser",
            data: JSON.stringify(this._area),
        })
    }

    _area: Array<Vec2> = [];
}

export {CleanArea};