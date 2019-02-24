import {Arc} from "./Arc";
import {LabeledDot} from "./LabeledDot";
import {Line} from "./Line";
import {verifyArray, verifyObject} from "../utils/typetools";
import {Vec2} from "../utils/Vec2";
import {getArcsIntersections, getLineAndArcIntersections, getLinesIntersection, inRange} from "../utils/mathutils";

type DratConfig = {
    arcs: Array<Arc>,
    dots: Array<LabeledDot>,
    lines: Array<Line>,
}

class Draft {
    constructor({arcs, dots, lines}: DratConfig) {
        this.arcs = arcs;
        this.dots = dots;
        this.lines = lines;
        this.controlPoints = this._getControlPoints();
        Object.freeze(this)
    }

    public empty(): boolean {
        return !this.arcs.length && !this.lines.length && !this.dots.length;
    }

    public getOwner(vec: Vec2): Draft {
        const arcs = this.arcs.filter(arc => arc.owns(vec));
        const dots = this.dots.filter(dot => dot.owns(vec));
        const lines = this.lines.filter(line => line.owns(vec));
        return new Draft({arcs, dots, lines})
    }

    public add(draft: Draft): Draft {
        const arcs = [...(new Set([
            ...this.arcs.slice(),
            ...draft.arcs.slice(),
        ]))];
        const dots = [...(new Set([
            ...this.dots.slice(),
            ...draft.dots.slice(),
        ]))];
        const lines = [...(new Set([
            ...this.lines.slice(),
            ...draft.lines.slice(),
        ]))];
        return new Draft({arcs, dots, lines})
    }

    public remove(draft: Draft): Draft {
        const arcs = this.arcs.slice().filter(arc => !draft.arcs.includes(arc));
        const dots = this.dots.slice().filter(dot => !draft.dots.includes(dot));
        const lines = this.lines.slice().filter(line => !draft.lines.includes(line));
        return new Draft({arcs, dots, lines})
    }

    public serialize(): Object {
        return {
            arcs: this.arcs.map(arc => arc.serialize()),
            lines: this.lines.map(line => line.serialize()),
            dots: this.dots.map(dot => dot.serialize()),
        }
    }

    public static load(data: any): Draft {
        verifyObject(data);
        const lines = verifyArray(data['lines']).map(line => Line.load(line));
        const dots = verifyArray(data['dots']).map(dot => LabeledDot.load(dot));
        const arcs = verifyArray(data['arcs']).map(arc => Arc.load(arc));
        return new Draft({lines, dots, arcs})
    }

    public static create(): Draft {
        return new Draft({
            lines: [],
            arcs: [],
            dots: [],
        })
    }

    private _getControlPoints(): Array<Vec2> {
        const points = new Array<Vec2>();
        this.arcs.forEach(arc => points.push(arc.center));
        this.dots.forEach(dot => points.push(dot.position));
        this.lines.forEach(line => points.push(line.start, line.end));
        points.push(...this._getIntersectionControlPoints());
        return points;
    }

    private _getIntersectionControlPoints(): Array<Vec2> {
        const points = new Array<Vec2>();
        for (let i = 0; i < this.lines.length; ++i) {
            for (let j = i + 1; j < this.lines.length; ++j) {
                const line1 = this.lines[i];
                const line2 = this.lines[j];
                const intersection = getLinesIntersection(line1, line2);
                if (intersection
                    && inRange(intersection.x, line1.start.x, line1.end.x)
                    && inRange(intersection.y, line1.start.y, line1.end.y)
                    && inRange(intersection.x, line2.start.x, line2.end.x)
                    && inRange(intersection.y, line2.start.y, line2.end.y)
                ) {
                    points.push(intersection)
                }
            }
        }
        this.lines.forEach((line) => {
            this.arcs.forEach(arc => {
                const intersections = getLineAndArcIntersections(line, arc)
                    .filter(intersection =>
                        inRange(intersection.x, line.start.x, line.end.x)
                        && inRange(intersection.y, line.start.y, line.end.y));
                points.push(...intersections);
            })
        });
        for (let i = 0; i < this.arcs.length; ++i) {
            for (let j = i + 1; j < this.arcs.length; ++j) {
                points.push(...getArcsIntersections(this.arcs[i], this.arcs[j]));
            }
        }
        return points;
    }

    public readonly arcs: Array<Arc>;
    public readonly dots: Array<LabeledDot>;
    public readonly lines: Array<Line>;

    public readonly controlPoints: Array<Vec2>;
}

export {Draft};