import {DrawTool} from "../DrawTool";
import {Dot} from "./Dot";
import {LabeledDot} from "./LabeledDot";
import {Vec2} from "../../../../utils/Vec2";
import {Icons} from "../../../Icons";
import {LabelInput} from "./LabelInput";
import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {MouseEventData, MouseEventDispatcher} from "../../MouseEventDispatcher";
import {Component} from "../../../component/Component";
import {ShapesHolder} from "../../ShapesHolder";

const LABEL_PADDING = new Vec2(0, -15);

class DotTool extends DrawTool {
    constructor(drawingContext: IDrawingContext, eventDispatcher: MouseEventDispatcher, shapes: ShapesHolder, workPlace: Component) {
        super(drawingContext, eventDispatcher, shapes);
        this._labelInput = new LabelInput(workPlace);
        this._addDisposable(this._labelInput);
    }

    public icon(): string {
        return Icons.dot();
    }

    public reset(): void {
        this._removeDependency(this._labelInput);
        this._drawingContext.clean();
        this._labelInput.hide();
        this._dot = null;
    }

    protected _mouseUpHandler({relativeCords}: MouseEventData): void {
        this._dot = new Dot(relativeCords);
        this._dot.draw(this._drawingContext);
        const labelPosition = relativeCords.clone().add(LABEL_PADDING);
        this._labelInput.show(labelPosition);
        this._addHandlerCallOnce(this._labelInput.inputEndEvent(), (label) => {
            this._dispatchAddShapeEvent(new LabeledDot(this._dot, label));
            this.reset();
        });
    }

    private _labelInput: LabelInput;
    private _dot?: Dot;
}

export {DotTool};