import {DrawTool} from "../DrawTool";
import {Line} from "./Line";
import {AnnotationDrawer} from "../AnnotationDrawer";
import {Icons} from "../../../Icons";
import {MouseEventData} from "../../MouseEventDispatcher";

class LineTool extends DrawTool {
    public icon(): string {
        return Icons.pencil();
    }

    public reset(): void {
        this._drawingContext.clean();
        this._line = null;
    }

    protected _mouseDownHandler({relativeCords}: MouseEventData): void {
        if (!this._line) {
            this._line = new Line(relativeCords, relativeCords);
            this._invalidateLineView();
        }
        else {
            this._dispatchAddShapeEvent(this._line);
            this.reset();
        }
    }

    protected _mouseMoveHandler(data: MouseEventData): void {
        if (this._line) {
            this._line.setEnd(data.relativeCords, data.shiftKey);
            this._invalidateLineView();
        }
    }

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