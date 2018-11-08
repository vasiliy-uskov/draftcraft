import {IChange} from "../IChange";
import {Line} from "./Line";
import {IDrawingContext} from "../../workplace/IDrawingContext";

class DrawLineChange implements IChange {
    constructor(line: Line) {
        this._line = line;
    }

    public execute(drawingContext: IDrawingContext): void {
        drawingContext.beginPath();
        drawingContext.moveTo(this._line.start());
        drawingContext.lineTo(this._line.end());
        drawingContext.endPath();
    }

    public serialize(): string {
        return this._line.toString();
    }

    private _line: Line;
}

export {DrawLineChange}