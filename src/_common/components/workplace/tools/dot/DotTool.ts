import {Vec2} from "../../../../utils/Vec2";
import {Icons} from "../../../Icons";
import {LabelInput} from "./LabelInput";
import {IDrawingContext} from "../../../../drawingcontext/IDrawingContext";
import {MouseEventData, MouseEventDispatcher} from "../../MouseEventDispatcher";
import {Component} from "../../../component/Component";
import {BaseTool} from "../BaseTool";
import {IFieldOrganizer} from "../../field/IFieldOrganizer";
import {LabeledDot} from "../../../../shapes/LabeledDot";
import {ShapesDrawer} from "../../../../shapes/drawers/ShapesDrawer";
import {DrawingParams} from "../../../../shapes/drawers/DrawingParams";

const LABEL_PADDING = new Vec2(0, -15);

class DotTool extends BaseTool {
    constructor(drawingContext: IDrawingContext, mouseEventDispatcher: MouseEventDispatcher, fieldOrganizer: IFieldOrganizer, workplace: Component) {
        super(drawingContext, mouseEventDispatcher, fieldOrganizer);
        this._labelInput = new LabelInput(workplace);
        this._addDisposable(this._labelInput);
    }

    public cursor(): string {
        return "crosshair";
    }

    public icon(): string {
        return Icons.dot();
    }

    public reset(): void {
        this._removeDependency(this._labelInput);
        this._drawingContext.clean();
        this._labelInput.hide();
    }

    protected _mouseUpHandler({relativeCords}: MouseEventData): void {
        const labelPosition = relativeCords.add(LABEL_PADDING);
        this._labelInput.show(labelPosition);
        ShapesDrawer.drawDot(this._drawingContext, relativeCords, DrawingParams.linesColor());
        this._addHandlerCallOnce(this._labelInput.inputEndEvent(), (label) => {
            const dot = new LabeledDot(relativeCords, label);
            this._fieldOrganizer.edit().then(api => {
                api.addDraft(dot.draft());
                api.commit();
            });
            this.reset();
        });
    }

    private _labelInput: LabelInput;
}

export {DotTool};