import {Vec2} from "../../../common/utils/Vec2";

class Line {
    constructor(start: Vec2, end: Vec2) {
        this._start = start;
        this._end = end;
    }

    public setEnd(end: Vec2) {
        this._end = end;
    }

    public end(): Vec2 {
        return this._end.clone();
    }

    public start(): Vec2 {
        return this._start.clone();
    }

    public toString(): string {
        return JSON.stringify({
            model: "line",
            data: {
                start: this._start.toString(),
                end: this._end.toString(),
            }
        })
    }

    private _start: Vec2;
    private _end: Vec2;
}

export {Line};