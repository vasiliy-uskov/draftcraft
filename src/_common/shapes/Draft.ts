import {Arc} from "./Arc";
import {LabeledDot} from "./LabeledDot";
import {Line} from "./Line";
import {verifyArray, verifyObject} from "../utils/typetools";
import {Vec2} from "../utils/Vec2";

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
        const arcs = this.arcs.slice().filter(arc => draft.arcs.includes(arc));
        const dots = this.dots.slice().filter(dot => draft.dots.includes(dot));
        const lines = this.lines.slice().filter(line => draft.lines.includes(line));
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

    public readonly arcs: Array<Arc>;
    public readonly dots: Array<LabeledDot>;
    public readonly lines: Array<Line>;
}

export {Draft};