import {Vec2} from "../../../../utils/Vec2";
import {Icons} from "../../../Icons";
import {LabelInput} from "./LabelInput";
import {IDrawingContext} from "../../../../drawingcontext/IDrawingContext";
import {MouseEventData, MouseEventDispatcher} from "../../MouseEventDispatcher";
import {Component} from "../../../component/Component";
import {BaseTool} from "../BaseTool";
import {IWorkspaceModel} from "../../document/IWorkspaceModel";
import {LabeledDot} from "../../../../shapes/LabeledDot";
import {ShapesDrawer} from "../../../../shapes/drawers/ShapesDrawer";
import {DrawingParams} from "../../../../shapes/drawers/DrawingParams";
import {reducePoint} from "../../../../utils/mathutils";

const LABEL_PADDING = new Vec2(0, -15);

class DotTool extends BaseTool {
    constructor(drawingContext: IDrawingContext, mouseEventDispatcher: MouseEventDispatcher, documentOrganizer: IWorkspaceModel, workspace: Component) {
        super(drawingContext, mouseEventDispatcher, documentOrganizer);
        this._labelInput = new LabelInput(workspace);
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
        const position = reducePoint(this._workspace.draft().controlPoints, relativeCords);
        const labelPosition = relativeCords.add(LABEL_PADDING);
        this._labelInput.show(labelPosition);
        ShapesDrawer.drawDot(this._drawingContext, position, DrawingParams.linesColor());
        this._addHandlerCallOnce(this._labelInput.inputEndEvent(), (label) => {
            const dot = new LabeledDot(position, label);
            this._workspace.edit(api => api.addDraft(dot.draft()).commit());
            this.reset();
        });
    }

    private _labelInput: LabelInput;
}

export {DotTool};