import {Vec2} from "../utils/Vec2";
import {Transform} from "../utils/Transform";
import {verifyObject} from "../utils/typetools";
import {Draft} from "./Draft";
import {LineType} from "./LineType";

class Line {
    constructor(start: Vec2, end: Vec2, lineType: LineType = LineType.thinSolid) {
        this.start = start;
        this.end = end;
        this.lineType = lineType;
    }

    public length(): number {
        return this.end.reduce(this.start).radius();
    }

    public draft(): Draft {
        return new Draft({arcs: [], lines: [this], dots: []})
    }

    public owns(cord: Vec2): boolean {
        const translate = Transform.translate(this.start.scale(-1));
        const accuracy = 5;
        cord = translate.transform(cord);
        let start = translate.transform(this.start);
        let end = translate.transform(this.end);
        const rotate = Transform.rotate(-end.angle());
        start = rotate.transform(start);
        end = rotate.transform(end);
        cord = rotate.transform(cord);
        return start.x - accuracy <= cord.x && cord.x <= end.x - accuracy
            && start.y - accuracy <= cord.y && cord.y <= start.y + accuracy
            && end.y - accuracy <= cord.y && cord.y <= end.y + accuracy;
    }

    public serialize(): Object {
        return {
            start: this.start.serialize(),
            end: this.end.serialize(),
        };
    }

    static load(data: any): Line {
        verifyObject(data);
        const start = Vec2.load(data.start);
        const end = Vec2.load(data.end);
        return new Line(start, end);
    }

    public readonly start: Vec2;
    public readonly end: Vec2;
    public readonly lineType: LineType;
}

export {Line}