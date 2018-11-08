import {IDrawingContext} from "../workplace/IDrawingContext";

interface IChange {
    execute(drawingContext: IDrawingContext): void;
    serialize(): string
}

export {IChange}