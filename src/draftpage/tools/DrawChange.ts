import {IChange} from "./IChange";
import {IShape} from "./IShape";
import {IDrawingContext} from "../workplace/drawingcontext/IDrawingContext";

class DrawChange implements IChange {
    constructor(shape: IShape) {
        this._shape = shape;
    }

    public execute(drawingContext: IDrawingContext): void {
        this._shape.draw(drawingContext);
    }

    public serialize(): string {
        return this._shape.toString();
    }

    private _shape: IShape;
}

export {DrawChange}