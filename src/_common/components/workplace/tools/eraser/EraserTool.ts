import {DrawTool} from "../DrawTool";
import {CleanArea} from "./CleanArea";
import {DrawingParams} from "../DrawingParams";
import {Vec2} from "../../../../utils/Vec2";
import {Icons} from "../../../Icons";
import {MouseEventData} from "../../MouseEventDispatcher";

class EraserTool extends DrawTool {
    public icon(): string {
        return Icons.eraser();
    }

    protected _mouseDownHandler({relativeCords}: MouseEventData): void {
        this._active = true;
        const shape = new CleanArea(this._getEraserPosition(relativeCords).clone());
        this._dispatchAddShapeEvent(shape);
    }

    protected _mouseMoveHandler({relativeCords}: MouseEventData): void {
        const mouseCord = this._getEraserPosition(relativeCords);
        this._drawEraser(mouseCord.clone());
        if (this._active) {
            const shape = new CleanArea(mouseCord.clone());
            this._dispatchAddShapeEvent(shape);
        }
    }

    protected _mouseUpHandler(data: MouseEventData): void {
        this._active = false;
    }

    private _getEraserPosition(position: Vec2) {
        position.x -= DrawingParams.eraserSize() / 2;
        position.y -= DrawingParams.eraserSize() / 2;
        return position;
    }

    private _drawEraser(pos: Vec2) {
        this._drawingContext.clean();
        this._drawingContext.setFill(DrawingParams.eraserColor());
        this._drawingContext.setStroke(DrawingParams.eraserBorderColor());
        this._drawingContext.setStrokeWidth(DrawingParams.eraserBorderWidth());
        this._drawingContext.beginPath();

        let startAngle = 0;
        const roundAngle = Math.PI / 2;
        this._drawingContext.arc(new Vec2(
            pos.x + DrawingParams.eraserSize() - DrawingParams.eraserCornerRounding(),
            pos.y + DrawingParams.eraserSize() - DrawingParams.eraserCornerRounding()
        ), DrawingParams.eraserCornerRounding(), startAngle, roundAngle);

        this._drawingContext.lineTo(new Vec2(
            pos.x + DrawingParams.eraserCornerRounding(),
            pos.y + DrawingParams.eraserSize()
        ));

        startAngle += roundAngle;
        this._drawingContext.arc(new Vec2(
            pos.x + DrawingParams.eraserCornerRounding(),
            pos.y + DrawingParams.eraserSize() - DrawingParams.eraserCornerRounding()
        ), DrawingParams.eraserCornerRounding(), startAngle, roundAngle);

        this._drawingContext.lineTo(new Vec2(
            pos.x,
            pos.y + DrawingParams.eraserCornerRounding()
        ));

        startAngle += roundAngle;
        this._drawingContext.arc(new Vec2(
            pos.x + DrawingParams.eraserCornerRounding(),
            pos.y + DrawingParams.eraserCornerRounding()
        ), DrawingParams.eraserCornerRounding(), startAngle, roundAngle);

        this._drawingContext.lineTo(new Vec2(
            pos.x + DrawingParams.eraserSize() - DrawingParams.eraserCornerRounding(),
            pos.y
        ));

        startAngle += roundAngle;
        this._drawingContext.arc(new Vec2(
            pos.x + DrawingParams.eraserSize() - DrawingParams.eraserCornerRounding(),
            pos.y + DrawingParams.eraserCornerRounding()
        ), DrawingParams.eraserCornerRounding(), startAngle, roundAngle);

        this._drawingContext.closePath();
        this._drawingContext.fill();
        this._drawingContext.stroke();
    }

    private _active: boolean = false;
}

export {EraserTool}