import {Vec2} from "../../common/utils/Vec2";

interface IDrawingContext {
    beginPath(): void;
    endPath(): void;
    moveTo(vec: Vec2): void;
    lineTo(vec: Vec2): void;
    arcTo(vec: Vec2): void;
    clean(vec?: Array<Vec2>): void
    text(str: string, pos1: Vec2, pos2: Vec2): void // pos1 and pos2 set direction vector direction
}

export {IDrawingContext};