import {Vec2} from "../utils/Vec2";
import {verifyNumber, verifyObject} from "../utils/typetools";
import {Draft} from "./Draft";
import {LineType} from "./LineType";
import {pointInCorner} from "../utils/mathutils";

class Arc {
    constructor(center: Vec2, radius: number, startAngle: number, angle: number, lineType: LineType = LineType.thinSolid) {
        this.center = center;
        this.radius = radius;
        this.startAngle = startAngle;
        this.angle = angle;
        this.lineType = lineType;
    }

    public draft(): Draft {
        return new Draft({arcs: [this], lines: [], dots: []})
    }

    public owns(cord: Vec2): boolean {
        const movedToCenterPoint = cord.reduce(this.center);
        const accuracy = 3;
        const situateInCircle =
            movedToCenterPoint.x * movedToCenterPoint.x + movedToCenterPoint.y * movedToCenterPoint.y < (this.radius + accuracy) * (this.radius + accuracy)
        && movedToCenterPoint.x * movedToCenterPoint.x + movedToCenterPoint.y * movedToCenterPoint.y > (this.radius - accuracy) * (this.radius - accuracy);
        return situateInCircle && pointInCorner(cord, this)
    }

    public serialize(): Object {
        return {
            model: "arc",
            data: {
                center: this.center,
                angle: this.angle,
                radius: this.radius,
                startAngle: this.startAngle,
                lineType: this.lineType,
            }
        }
    }

    static load(data: any): Arc {
        verifyObject(data);
        verifyNumber(data.radius);
        verifyNumber(data.startAngle);
        verifyNumber(data.angle);
        const center = Vec2.load(data.center);
        return new Arc(center, data.radius, data.startAngle, data.angle);
    }

    readonly angle: number = 0;
    readonly radius: number = 0;
    readonly startAngle: number = 0;
    readonly center: Vec2;
    readonly lineType: LineType;
}

export {Arc}