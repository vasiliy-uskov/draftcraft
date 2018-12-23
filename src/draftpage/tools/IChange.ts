import {IDrawingContext} from "../workplace/drawingcontext/IDrawingContext";

interface IChange {
    execute(drawingContext: IDrawingContext): void;
    serialize(): Object;
}

export {IChange}