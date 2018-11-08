import {IDrawingContext} from "./IDrawingContext";
import {Vec2} from "../../common/utils/Vec2";

class CanvasDrawingContext implements IDrawingContext {
    constructor(canvasElement: HTMLCanvasElement) {
        this._context = canvasElement.getContext("2d");
        this._canvasElement = canvasElement;
    }

    public beginPath(): void {
        this._context.beginPath();
    }
    public endPath(): void {
        this._context.closePath();
        this._context.stroke();
    }
    public moveTo(vec: Vec2): void {
        this._context.moveTo(vec.x, vec.y);
    }
    public lineTo(vec: Vec2): void {
        this._context.lineTo(vec.x, vec.y);
    }
    public arcTo(vec: Vec2): void {} // todo: Realise this method

    public clean(vec?: Array<Vec2>): void {
        if (vec) {
            for (const point of vec) {
                this._context.clearRect(point.x, point.y, 1, 1);
            }
        }
        else {
            this._context.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
        }
    }
    public text(str: string, pos1: Vec2, pos2: Vec2): void  {} // todo: Realise this method

    private _context: CanvasRenderingContext2D;
    private _canvasElement: HTMLCanvasElement;
}

export {CanvasDrawingContext}