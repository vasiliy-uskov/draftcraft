import {BaseTool} from "../BaseTool";
import {DrawChange} from "../DrawChange";
import {CleanArea} from "./CleanArea";
import {ToolsViewParams} from "../ToolsViewParams";
import {Vec2} from "../../../common/utils/Vec2";

class EraserTool extends BaseTool {
    protected _mouseDownHandler(event: MouseEvent): void {
        this._active = true;
        const shape = new CleanArea(this._getMouseCord(event).clone());
        this._dispatchChangeEvent(new DrawChange(shape));
    }

    protected _mouseMoveHandler(event: MouseEvent): void {
        const mouseCord = this._getMouseCord(event);
        this._drawEraser(mouseCord.clone());
        if (this._active) {
            const shape = new CleanArea(mouseCord.clone());
            this._dispatchChangeEvent(new DrawChange(shape));
        }
    }

    protected _mouseUpHandler(event: MouseEvent): void {
        this._active = false;
    }

    protected _getMouseCord(event: MouseEvent) {
        const mouseCord = super._getMouseCord(event);
        mouseCord.x -= ToolsViewParams.eraserSize() / 2;
        mouseCord.y -= ToolsViewParams.eraserSize() / 2;
        return mouseCord;
    }

    private _drawEraser(pos: Vec2) {
        this._drawingContext.clean();
        this._drawingContext.setFill(ToolsViewParams.eraserColor());
        this._drawingContext.setStroke(ToolsViewParams.eraserBorderColor());
        this._drawingContext.setStrokeWidth(ToolsViewParams.eraserBorderWidth());
        this._drawingContext.beginPath();

        let startAngle = 0;
        const roundAngle = Math.PI / 2;
        this._drawingContext.arc(new Vec2(
            pos.x + ToolsViewParams.eraserSize() - ToolsViewParams.eraserCornerRounding(),
            pos.y + ToolsViewParams.eraserSize() - ToolsViewParams.eraserCornerRounding()
        ), ToolsViewParams.eraserCornerRounding(), startAngle, roundAngle);

        this._drawingContext.lineTo(new Vec2(
            pos.x + ToolsViewParams.eraserCornerRounding(),
            pos.y + ToolsViewParams.eraserSize()
        ));

        startAngle += roundAngle;
        this._drawingContext.arc(new Vec2(
            pos.x + ToolsViewParams.eraserCornerRounding(),
            pos.y + ToolsViewParams.eraserSize() - ToolsViewParams.eraserCornerRounding()
        ), ToolsViewParams.eraserCornerRounding(), startAngle, roundAngle);

        this._drawingContext.lineTo(new Vec2(
            pos.x,
            pos.y + ToolsViewParams.eraserCornerRounding()
        ));

        startAngle += roundAngle;
        this._drawingContext.arc(new Vec2(
            pos.x + ToolsViewParams.eraserCornerRounding(),
            pos.y + ToolsViewParams.eraserCornerRounding()
        ), ToolsViewParams.eraserCornerRounding(), startAngle, roundAngle);

        this._drawingContext.lineTo(new Vec2(
            pos.x + ToolsViewParams.eraserSize() - ToolsViewParams.eraserCornerRounding(),
            pos.y
        ));

        startAngle += roundAngle;
        this._drawingContext.arc(new Vec2(
            pos.x + ToolsViewParams.eraserSize() - ToolsViewParams.eraserCornerRounding(),
            pos.y + ToolsViewParams.eraserCornerRounding()
        ), ToolsViewParams.eraserCornerRounding(), startAngle, roundAngle);

        this._drawingContext.closePath();
        this._drawingContext.fill();
        this._drawingContext.stroke();
    }

    private _active: boolean = false;
}

export {EraserTool}