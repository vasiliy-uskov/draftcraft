import {IDrawingContext} from "../drawingcontext/IDrawingContext";

interface IChange {
    apply(drawingContext: IDrawingContext): void;
    serialize(): Object;
}

export {IChange}