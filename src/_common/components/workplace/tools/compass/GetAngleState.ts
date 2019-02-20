import {createVec2ByPolar, Vec2} from "../../../../utils/Vec2";
import {IDrawingContext} from "../../../../drawingcontext/IDrawingContext";
import {ShapesDrawer} from "../../../../shapes/drawers/ShapesDrawer";
import {DrawingParams} from "../../../../shapes/drawers/DrawingParams";
import {Line} from "../../../../shapes/Line";
import {Arc} from "../../../../shapes/Arc";
import {ICompassState} from "./ICompassState";
import {GetCenterState} from "./GetCenterState";

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
        const arcStart = createVec2ByPolar(this._arc.startAngle, this._arc.radius);
        const oldArcEnd = this._line.end.reduce(arcCenter);
        const newArcEnd = cord.reduce(arcCenter);
        const angleDelta1 = Math.abs(newArcEnd.angle() - oldArcEnd.angle());
        const angleDelta2 = Math.abs(newArcEnd.angle() - arcStart.angle());
        const startAngle = angleDelta1 > angleDelta2
            ? arcStart.angle() < oldArcEnd.angle()
                ? arcStart.angle()
                : oldArcEnd.angle()
            : arcStart.angle() > oldArcEnd.angle()
                ? arcStart.angle()
                : oldArcEnd.angle();
        const angle = Math.min(Math.PI * 2, this._arc.angle + Math.min(angleDelta1, angleDelta2));
        this._arc = new Arc(arcStart, this._arc.radius, startAngle, angle);
        this._line = new Line(this._line.start, cord);
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