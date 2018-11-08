import {Vec2} from "../../../common/utils/Vec2";
import {IShape} from "../IShape";
import {IDrawingContext} from "../../workplace/IDrawingContext";
import {normalizeAngle} from "../../../common/utils/mathutils";

class Arc implements IShape {
    constructor(center: Vec2, arcStartPoint: Vec2, arcEndPoint: Vec2) {
        this._center = center;
        const angleStartVec = new Vec2(arcStartPoint.x - this._center.x, arcStartPoint.y - this._center.y);
        this._startAngle = angleStartVec.angle();
        this._radius = angleStartVec.radius();
        const angleEndVec = new Vec2(arcEndPoint.x - this._center.x, arcEndPoint.y - this._center.y);
        this._angle = normalizeAngle(angleEndVec.angle() - this._startAngle);
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
        let endAngle = vec.angle();
        console.log(this._startAngle / Math.PI * 180, endAngle / Math.PI * 180);
        endAngle = endAngle == 0 ? Math.PI * 2 : endAngle;
        this._angle = endAngle - this._startAngle;
    }

    public draw(drawingContext: IDrawingContext) {
        drawingContext.beginPath();
        drawingContext.arc(this.center(), this.radius(), this.startAngle(), this.angle());
        drawingContext.endPath();
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