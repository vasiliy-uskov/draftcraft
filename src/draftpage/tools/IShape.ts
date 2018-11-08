import {IDrawingContext} from "../workplace/IDrawingContext";

interface IShape {
    draw(drawingContext: IDrawingContext): void;
    toString(): string;
}

export {IShape};