import {BaseTool} from "../BaseTool";
import {Dot} from "./Dot";
import {InputController} from "../../../common/components/InputController";
import {DrawChange} from "../DrawChange";
import {IDrawingContext} from "../../workplace/drawingcontext/IDrawingContext";
import {MouseEventDispatcher} from "../../workplace/MouseEventDispatcher";
import {Label} from "./Label";
import {LabeledDot} from "./LabeledDot";
import {Vec2} from "../../../common/utils/Vec2";
import {AnnotationDrawer} from "../AnnotationDrawer";
import {FramesController, IFrameHandler} from "../../../common/animation/FramesController";
import {TextAlign} from "../../workplace/drawingcontext/TextAlign";

const LABEL_PADDING = new Vec2(-3, -15);
const CURSOR_SYMBOL = "I";
const CURSOR_BLINK_TIMEOUT = 300;

class DotTool extends BaseTool implements IFrameHandler {
    constructor(drawingContext: IDrawingContext, mouseEventDispatcher: MouseEventDispatcher) {
        super(drawingContext, mouseEventDispatcher);
        this._addDisposable(this._inputController);
        this._addHandler(this._inputController.inputEvent(), (label) => {
            this._label && this._label.setLabel(label);
        });
        this._cursorBlinkIntervalId = setInterval(() => {
            this._showCursor = !this._showCursor;
        }, CURSOR_BLINK_TIMEOUT);
    }

    public onFrame() {
        this._redraw();
    }

    protected _mouseUpHandler(event: MouseEvent): void {
        if (this._dot && this._label) {
            return;
        }
        this._dot = new Dot(this._getMouseCord(event));
        this._label = new Label(this._dot.position().clone().add(LABEL_PADDING));
        this._showCursor = true;
        FramesController.addFrameHandler(this);
        this._inputController.getText().then((label) => {
            this._label.setLabel(label);
            FramesController.removeFrameHandler(this);
            this._dispatchDotCreatedChangeEvent();
            this._dot = null;
            this._label = null;
            this._drawingContext.clean();
        });
    }

    private _redraw() {
        this._drawingContext.clean();
        if (!this._dot || !this._label) {
            return;
        }
        this._dot.draw(this._drawingContext);
        const label = this._label.label() + (this._showCursor ? CURSOR_SYMBOL : "");
        this._drawingContext.setTextAlign(TextAlign.left);
        AnnotationDrawer.drawLabel(this._drawingContext, label, this._label.position());
    }

    private _dispatchDotCreatedChangeEvent() {
        if (this._dot && this._label) {
            const labeledDot = new LabeledDot(this._dot, this._label);
            this._dispatchChangeEvent(new DrawChange(labeledDot));
        }
    }

    protected _destruct() {
        super._destruct();
        clearInterval(this._cursorBlinkIntervalId);
    }

    private _cursorBlinkIntervalId: any;
    private _showCursor = true;
    private _inputController = new InputController();
    private _dot?: Dot;
    private _label?: Label;
}

export {DotTool};