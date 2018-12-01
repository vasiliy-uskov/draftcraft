import {IDrawingContext} from "../workplace/drawingcontext/IDrawingContext";

interface IChange {
    execute(drawingContext: IDrawingContext): void;
    serialize(): string
}

export {IChange}