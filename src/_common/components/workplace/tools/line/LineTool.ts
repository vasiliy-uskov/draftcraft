import {AnnotationDrawer} from "../../../../shapes/drawers/AnnotationDrawer";
import {Icons} from "../../../Icons";
import {MouseEventData} from "../../MouseEventDispatcher";
import {BaseTool} from "../BaseTool";
import {Line} from "../../../../shapes/Line";
import {reduceVector} from "../../../../utils/mathutils";
import {ShapesDrawer} from "../../../../shapes/drawers/ShapesDrawer";
import {DrawingParams} from "../../../../shapes/drawers/DrawingParams";

class LineTool extends BaseTool {
    public cursor(): string {
        return "crosshair";
    }

    public icon(): string {
        return Icons.pencil();
    }

    public reset(): void {
        this._drawingContext.clean();
        this._line = null;
    }

    protected _mouseDownHandler({relativeCords}: MouseEventData): void {
        this._line = new Line(relativeCords, relativeCords);
        this._invalidateView();
    }

    protected _mouseUpHandler(data: MouseEventData): void {
        if (this._line) {
            this._fieldOrganizer.addDraft(this._line.draft());
            this.reset();
        }
    }

    protected _mouseMoveHandler(data: MouseEventData): void {
        if (this._line) {
            const start = this._line.start;
            const end = data.shiftKey
                ? reduceVector(data.relativeCords.reduce(start)).add(start)
                : data.relativeCords;
            this._line = new Line(start, end);
            this._invalidateView();
        }
    }

    private _invalidateView() {
        this._drawingContext.clean();
        if (this._line)
        {
            ShapesDrawer.drawLine(this._drawingContext, this._line, DrawingParams.linesColor());
            AnnotationDrawer.drawLineAnnotation(this._drawingContext, this._line);
        }
    }

    private _line: Line|null = null;
}

export {LineTool}