import {Vec2} from "../../../common/utils/Vec2";
import {BoundingRect} from "../../../common/utils/BoundingRect";
import {TextAlign} from "./TextAlign";

interface IDrawingContext {
    setFill(color: string): void;
    setStroke(color: string): void;
    setStrokeWidth(width: number):void;
    setFont(font: string): void;
    setTextAlign(align: TextAlign): void;
    beginPath(): void;
    closePath(): void;
    stroke(): void;
    fill(): void;
    moveTo(vec: Vec2): void;
    lineTo(vec: Vec2): void;
    arc(center: Vec2, radius: number, startAngle: number, angle: number): void;
    clean(rect?: BoundingRect): void;
    rect(rect: BoundingRect): void;
    text(str: string, pos1: Vec2, pos2?: Vec2): void; // pos1 and pos2 set direction vector direction
}

export {IDrawingContext};