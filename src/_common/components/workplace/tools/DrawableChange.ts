import {IChange} from "./IChange";
import {IShape} from "./IShape";
import {IDrawingContext} from "../drawingcontext/IDrawingContext";

class DrawableChange implements IChange {
    constructor(shape: IShape) {
        this._shape = shape;
    }

    public apply(drawingContext: IDrawingContext): void {
        this._shape.draw(drawingContext);
    }

    public serialize(): Object {
        return this._shape.serialize();
    }

    private _shape: IShape;
}

export {DrawableChange}