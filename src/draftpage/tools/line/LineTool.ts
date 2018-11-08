import {BaseTool} from "../BaseTool";
import {Line} from "./Line";
import {Vec2} from "../../../common/utils/Vec2";
import {DrawLineChange} from "./DrawLineChange";
import {verify} from "../../../common/utils/typetools";

class LineTool extends BaseTool {
    protected _mouseDownHandler(event: MouseEvent): void {
        const mousePos = new Vec2(event.clientX, event.clientY);
        this._line = new Line(mousePos, mousePos);
        this._invalidateLineView();
    }

    protected _mouseMoveHandler(event: MouseEvent): void {
        if (this._line) {
            this._line.setEnd(new Vec2(event.clientX, event.clientY));
            this._invalidateLineView();
        }
    }

    protected _mouseUpHandler(event: MouseEvent): void {
        verify(this._line);
        this._dispatchChangeEvent(new DrawLineChange(this._line));
        this._line = null;
        this._drawingContext.clean();
    }

    private _invalidateLineView() {
        this._drawingContext.clean();
        if (this._line)
        {
            this._drawingContext.beginPath();
            this._drawingContext.moveTo(this._line.start());
            this._drawingContext.lineTo(this._line.end());
            this._drawingContext.endPath();
        }
    }

    private _line?: Line;
}

export {LineTool}