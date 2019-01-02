import {Dot} from "./Dot";
import {Label} from "./Label";
import {IShape} from "../IShape";
import {IDrawingContext} from "../../workplace/drawingcontext/IDrawingContext";
import {AnnotationDrawer} from "../AnnotationDrawer";
import {TextAlign} from "../../workplace/drawingcontext/TextAlign";

class LabeledDot implements IShape {
    constructor(dot: Dot, label: Label) {
        this._dot = dot;
        this._label = label;
    }

    public draw(drawingContext: IDrawingContext): void {
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