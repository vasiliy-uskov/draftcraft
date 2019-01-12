import {BaseTool} from "../BaseTool";
import {Line} from "./Line";
import {DrawChange} from "../DrawChange";
import {AnnotationDrawer} from "../AnnotationDrawer";
import {Icons} from "../../../../common/components/Icons";
import {MouseEventData} from "../../MouseEventDispatcher";

class LineTool extends BaseTool {
    public icon(): string {
        return Icons.line();
    }

    public reset(): void {
        this._drawingContext.clean();
        this._line = null;
    }

    protected _mouseDownHandler({relativeCors}: MouseEventData): void {
        if (!this._line) {
            this._line = new Line(relativeCors, relativeCors);
            this._invalidateLineView();
        }
        else {
            this._dispatchChangeEvent(new DrawChange(this._line));
            this.reset();
        }
    }

    protected _mouseMoveHandler({relativeCors}: MouseEventData): void {
        if (this._line) {
            this._line.setEnd(relativeCors);
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