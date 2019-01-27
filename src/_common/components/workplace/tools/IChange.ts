import {IDrawingContext} from "../drawingcontext/IDrawingContext";

interface IChange {
    execute(drawingContext: IDrawingContext): void;
    serialize(): Object;
}

export {IChange}