import {IDrawingContext} from "../workplace/drawingcontext/IDrawingContext";

interface IShape {
    draw(drawingContext: IDrawingContext): void;
    serialize(): Object;
}

export {IShape};