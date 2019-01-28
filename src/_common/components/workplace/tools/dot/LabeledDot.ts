import {Dot} from "./Dot";
import {Label} from "./Label";
import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {AnnotationDrawer} from "../AnnotationDrawer";
import {TextAlign} from "../../drawingcontext/TextAlign";
import {Vec2} from "../../../../utils/Vec2";
import {BaseShape} from "../BaseShape";
import {DrawingParams} from "../DrawingParams";

class LabeledDot extends BaseShape {
    constructor(dot: Dot, label: Label) {
        super();
        this._dot = dot;
        this._label = label;
    }

    public owns(cord: Vec2): boolean {
        return this._dot.owns(cord);
    }

    public draw(drawingContext: IDrawingContext): void {
        drawingContext.setFill(this.selected() ? DrawingParams.selectedLinesColor() : DrawingParams.linesColor());
        this._dot.draw(drawingContext);
        drawingContext.setTextAlign(TextAlign.left);
        AnnotationDrawer.drawLabel(drawingContext, this._label.label(), this._label.position())
    }

    public serialize(): Object {
        return {
            model: "dot",
            data: {
                position: this._dot.position(),
                label: this._label.label()
            }
        };
    }

    private _dot: Dot;
    private _label: Label;
}

export {LabeledDot};