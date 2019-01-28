import {createVec2ByPolar, Vec2} from "../../../../utils/Vec2";
import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {DrawingParams} from "../DrawingParams";
import {toDegrease, toRadians} from "../../../../utils/mathutils";
import {Transform} from "../../../../utils/Transform";
import {BaseShape} from "../BaseShape";

class Line extends BaseShape {
    constructor(start: Vec2, end: Vec2) {
        super();
        this._start = start;
        this._end = end;
    }

    public owns(cord: Vec2): boolean {
        const translate = Transform.translate(this._start.clone().scale(-1));
        const accuracy = 5;
        cord = translate.transform(cord);
        let start = translate.transform(this._start);
        let end = translate.transform(this._end);
        const rotate = Transform.rotate(-end.angle());
        start = rotate.transform(start);
        end = rotate.transform(end);
        cord = rotate.transform(cord);
        return start.x - accuracy <= cord.x && cord.x <= end.x - accuracy
            && start.y - accuracy <= cord.y && cord.y <= start.y + accuracy
            && end.y - accuracy <= cord.y && cord.y <= end.y + accuracy;
    }

    public setEnd(end: Vec2, reduced: boolean = false) {
        if (!reduced)
        {
            this._end = end;
            return;
        }
        const reduceStep = 15;
        const vec = end.clone().reduce(this._start);
        const angle = toDegrease(vec.angle());
        const reducedAngle = toRadians(Math.round(angle / reduceStep) * reduceStep);
        this._end = this._start.clone().add(createVec2ByPolar(reducedAngle, vec.radius()));
    }

    public end(): Vec2 {
        return this._end.clone();
    }

    public start(): Vec2 {
        return this._start.clone();
    }

    public draw(drawingContext: IDrawingContext): void {
        drawingContext.setStroke(this.selected() ? DrawingParams.selectedLinesColor() : DrawingParams.linesColor());
        drawingContext.setStrokeWidth(DrawingParams.linesWidth());
        drawingContext.beginPath();
        drawingContext.moveTo(this.start());
        drawingContext.lineTo(this.end());
        drawingContext.stroke();
    }

    public serialize(): Object {
        return {
            model: "line",
            data: {
                start: this._start,
                end: this._end,
            }
        };
    }

    private _start: Vec2;
    private _end: Vec2;
}

export {Line};