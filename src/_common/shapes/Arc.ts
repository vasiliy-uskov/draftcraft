import {Vec2} from "../utils/Vec2";
import {verifyNumber, verifyObject} from "../utils/typetools";
import {Draft} from "./Draft";
import {LineType} from "./LineType";

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
        const accuracy = 3;
        const {start, end} = arcToVectors(this);
        const situateInCircle =
           cord.x * cord.x + cord.y * cord.y < (this.radius + accuracy) * (this.radius + accuracy)
        && cord.x * cord.x + cord.y * cord.y > (this.radius - accuracy) * (this.radius - accuracy);
        if (!situateInCircle) {
            return false
        }
        if (this.angle < Math.PI) {
            return cord.x * start.y - cord.y * start.x < 0
                && cord.x * end.y   - cord.y * end.x   > 0
        }
        else {
            return !(cord.x * start.y - cord.y * start.x > 0
                  && cord.x * end.y   - cord.y * end.x   < 0)
        }
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

function arcToVectors(arc: Arc): {center: Vec2, start: Vec2, end: Vec2} {
    const center = arc.center;
    const start = (new Vec2(
        arc.radius * Math.cos(arc.startAngle),
        arc.radius * Math.sin(arc.startAngle),
    )).add(center);
    const end = (new Vec2(
        arc.radius * Math.cos(arc.startAngle + arc.angle),
        arc.radius * Math.sin(arc.startAngle + arc.angle),
    )).add(center);
    return {center, start, end}
}

export {Arc}