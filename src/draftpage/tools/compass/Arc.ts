import {Vec2} from "../../../common/utils/Vec2";
import {IShape} from "../IShape";
import {IDrawingContext} from "../../workplace/IDrawingContext";
import {normalizeAngle} from "../../../common/utils/mathutils";
import {ToolsViewParams} from "../ToolsViewParams";

class Arc implements IShape {
    constructor(center: Vec2, arcStartPoint: Vec2, arcEndPoint: Vec2) {
        this._center = center;
        const angleStartVec = new Vec2(arcStartPoint.x - this._center.x, arcStartPoint.y - this._center.y);
        this._startAngle = angleStartVec.angle();
        this._radius = angleStartVec.radius();
        const angleEndVec = new Vec2(arcEndPoint.x - this._center.x, arcEndPoint.y - this._center.y);
        this._angle = angleEndVec.angle() - this._startAngle;
        this._angle = this._angle < 0 ? this._angle + Math.PI * 2 : this._angle;
    }

    public center(): Vec2 {
        return this._center.clone();
    }

    public radius(): number {
        return this._radius;
    }

    public startAngle(): number {
        return this._startAngle;
    }

    public angle(): number {
        return this._angle;
    }

    public setArcEndVec(vec: Vec2): void {
        if (vec.angle() < this._startAngle + this._angle && vec.angle() > this._startAngle
            || this._startAngle > normalizeAngle(this._startAngle + this._angle) && vec.angle() < normalizeAngle(this._startAngle + this._angle)) {
            return;
        }
        let startAngleDelta = this._startAngle - vec.angle();
        startAngleDelta = startAngleDelta < 0 ? startAngleDelta + Math.PI * 2 : startAngleDelta;
        let endAngleDelta = vec.angle() - (this._startAngle + this._angle);
        endAngleDelta = endAngleDelta < 0 ? endAngleDelta + Math.PI * 2 : endAngleDelta;
        if (startAngleDelta < endAngleDelta) {
            this._startAngle = normalizeAngle(this._startAngle - startAngleDelta);
            this._angle = Math.max(this._angle, this._angle + startAngleDelta);
        }
        else {
            this._angle = Math.max(this._angle, this._angle + endAngleDelta);
        }
    }

    public draw(drawingContext: IDrawingContext) {
        drawingContext.setStroke(ToolsViewParams.linesColor());
        drawingContext.setStrokeWidth(ToolsViewParams.linesWidth());
        drawingContext.beginPath();
        drawingContext.arc(this.center(), this.radius(), this.startAngle(), this.angle());
        drawingContext.stroke();
    }

    public toString(): string {
        return JSON.stringify({
            model: "arc",
            data: {
                center: this.center(),
                angle: this.angle(),
                radius: this.radius(),
                startAngle: this.startAngle(),
            }
        })
    }

    private _angle: number = 0;
    private _radius: number = 0;
    private _startAngle: number = 0;
    private _center: Vec2;
}

export {Arc}