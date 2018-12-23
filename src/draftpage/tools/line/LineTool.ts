import {BaseTool} from "../BaseTool";
import {Line} from "./Line";
import {DrawChange} from "../DrawChange";
import {AnnotationDrawer} from "../AnnotationDrawer";

class LineTool extends BaseTool {
    protected _mouseDownHandler(event: MouseEvent): void {
        if (!this._line) {
            const mousePos = this._getMouseCord(event);
            this._line = new Line(mousePos, mousePos);
            this._invalidateLineView();
        }
        else {
            this._dispatchChangeEvent(new DrawChange(this._line));
            this._line = null;
            this._drawingContext.clean();
        }
    }

    protected _mouseMoveHandler(event: MouseEvent): void {
        if (this._line) {
            this._line.setEnd(this._getMouseCord(event));
            this._invalidateLineView();
        }
    }

    protected _mouseUpHandler(event: MouseEvent): void {}

    private _invalidateLineView() {
        this._drawingContext.clean();
        if (this._line)
        {
            this._line.draw(this._drawingContext);
            AnnotationDrawer.drawLineAnnotation(this._drawingContext, this._line);
        }
    }

    private _line: Line|null = null;
}

export {LineTool}