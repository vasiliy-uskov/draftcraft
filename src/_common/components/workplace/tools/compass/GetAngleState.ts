import {createVec2ByPolar, Vec2} from "../../../../utils/Vec2";
import {IDrawingContext} from "../../../../drawingcontext/IDrawingContext";
import {ShapesDrawer} from "../../../../shapes/drawers/ShapesDrawer";
import {DrawingParams} from "../../../../shapes/drawers/DrawingParams";
import {Line} from "../../../../shapes/Line";
import {Arc} from "../../../../shapes/Arc";
import {ICompassState} from "./ICompassState";
import {GetCenterState} from "./GetCenterState";
import {vecInCorner} from "../../../../utils/mathutils";

class GetAngleState implements ICompassState {
    constructor(line: Line, drawingContext: IDrawingContext) {
        this._drawingContext = drawingContext;
        this._line = line;
        const startAngle = line.end.reduce(line.start).angle();
        this._arc = new Arc(line.start, line.length(), startAngle, 0);
    }

    public result(): Arc {
        return this._arc;
    }

    public getNextState(): ICompassState {
        return new GetCenterState(this._drawingContext);
    }

    public addPoint(cord: Vec2): void {
        const arcCenter = this._arc.center;
        const newPoint = cord.reduce(arcCenter);
        this._line = new Line(
            this._line.start,
            newPoint
                .normalize()
                .scale(this._arc.radius)
                .add(arcCenter)
        );
        const getDelta = (start: number, end: number) => (end + Math.PI * 2 - start) % (Math.PI * 2);
        const arcEndAngle = this._arc.startAngle + this._arc.angle;
        const arcStart = createVec2ByPolar(this._arc.startAngle, this._arc.radius);
        const arcEnd = createVec2ByPolar(arcEndAngle, this._arc.radius);
        if (this._arc.angle < 2 * Math.PI && !vecInCorner(newPoint, arcStart, arcEnd)) {
            const startAngleDelta = getDelta(newPoint.angle(), this._arc.startAngle);
            const endAngleDelta = getDelta(this._arc.startAngle + this._arc.angle, newPoint.angle());
            let startAngle;
            let angle = this._arc.angle;
            if (startAngleDelta < endAngleDelta) {
                startAngle = newPoint.angle();
                angle += startAngleDelta;
            }
            else {
                startAngle = this._arc.startAngle;
                angle += endAngleDelta;
            }
            angle = Math.min(Math.PI * 2, angle);
            this._arc = new Arc(arcCenter, this._arc.radius, startAngle, angle);
        }
        this._redrawState();
    }

    private _redrawState() {
        this._drawingContext.clean();
        ShapesDrawer.drawLine(this._drawingContext, this._line, DrawingParams.linesColor());
        ShapesDrawer.drawArc(this._drawingContext, this._arc, DrawingParams.linesColor());
    }

    private readonly _drawingContext: IDrawingContext;
    private _line: Line;
    private _arc: Arc;
}

export {GetAngleState}