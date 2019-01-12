import {Component} from "../../common/components/component/Component";
import {TagsName} from "../../common/components/TagsName";
import {CanvasDrawingContext} from "./drawingcontext/CanvasDrawingContext";
import {IDrawingContext} from "./drawingcontext/IDrawingContext";
import {MouseEventDispatcher} from "./MouseEventDispatcher";
import {ChangesHolder} from "./ChangesHolder";
import {IChange} from "./tools/IChange";
import {AddChangeAction} from "../action/AddChangeAction";
import {ResizeObserver} from "../../common/utils/ResizeObserver";
import {ITool} from "./tools/ITool";
import {BaseTool} from "./tools/BaseTool";
import {EventDispatcher} from "../../common/disposable/EventDispatcher";
import {LineTool} from "./tools/line/LineTool";
import {CompassTool} from "./tools/compass/CompassTool";
import {DotTool} from "./tools/dot/DotTool";
import {EraserTool} from "./tools/eraser/EraserTool";

class Workplace extends Component {
    constructor() {
        super({
            blockName: "workplace",
        });

        this._background = new Component({
            tagName: TagsName.img,
            bemInfo: this.createChildBemInfo("background"),
        });
        this.addChild(this._background);

        const {context: resultsCanvasContext} = this._createCanvas("results-canvas");
        this._resultsCanvasContext = resultsCanvasContext;

        const {context: workingCanvasContext, canvas: workingCanvas} = this._createCanvas("working-canvas");
        this._workingCanvasContext = workingCanvasContext;

        const canvasMouseEventDispatcher = new MouseEventDispatcher(workingCanvas);
        this._addDisposable(canvasMouseEventDispatcher);

        this._addDisposable(this._changes);
        this._addHandler(this._changes.invalidateRequestEvent(), this._invalidateResultCanvas.bind(this));
        this._tools = this._createTools(canvasMouseEventDispatcher);
        this._tools.forEach((tool) => {
            this._addDisposable(tool);
            this._addHandler(tool.changeCreatedEvent(), (change) => {
                this._dispatchChangeCreatedEvent(change)
            })
        })
    }

    public changeCreatedEvent(): EventDispatcher<AddChangeAction> {
        return this._changeCreatedEvent;
    }

    public tools(): Array<ITool> {
        return this._tools;
    }

    public setBackgroundImage(src: string): void {
        if (src) {
            this._background.setStyle("display", "");
            this._background.setAttribute("src", src);
        }
        else {
            this._background.setStyle("display", "none");
        }
    }

    public getSerializedChanges(): string {
        const data = [];
        for (const change of this._changes.toArray()) {
            data.push(change.serialize())
        }
        return JSON.stringify(data);
    }

    public clean(): void {
        this._changes.clean();
        this._workingCanvasContext.clean();
        this._resultsCanvasContext.clean();
    }

    private _dispatchChangeCreatedEvent(change: IChange): void {
        this._changeCreatedEvent.dispatch(new AddChangeAction(this._changes, change));
    }

    private _createCanvas(elementName: string): {context: IDrawingContext, canvas: Component} {
        const canvas = new Component({
            tagName: TagsName.canvas,
            bemInfo: this.createChildBemInfo(elementName),
        });
        this.addChild(canvas);
        const canvasElement = canvas.element() as HTMLCanvasElement;
        const canvasResizeObserver = new ResizeObserver(canvas);
        this._addDisposable(canvasResizeObserver);
        this._addHandler(canvasResizeObserver.resizeEvent(), () => {
            requestAnimationFrame(() => {
                const canvasRect = canvasElement.getBoundingClientRect();
                canvasElement.width = canvasRect.width;
                canvasElement.height = canvasRect.height;
            })
        });
        return {context: new CanvasDrawingContext(canvasElement), canvas};
    }

    private _invalidateResultCanvas(changes: Array<IChange>) {
        this._resultsCanvasContext.clean();
        for (const change of changes) {
            change.execute(this._resultsCanvasContext);
        }
    }

    private _createTools(mouseEventDispatcher: MouseEventDispatcher): Array<BaseTool> {
        const tools: Array<BaseTool> = [];
        tools.push(new LineTool(this._workingCanvasContext, mouseEventDispatcher));
        tools.push(new CompassTool(this._workingCanvasContext, mouseEventDispatcher));
        tools.push(new DotTool(this._workingCanvasContext, mouseEventDispatcher, this));
        //tools.push(new EraserTool(this._workingCanvasContext, mouseEventDispatcher));
        return tools;
    }

    private _tools: Array<BaseTool>;
    private _background: Component;
    private _changes = new ChangesHolder();
    private _resultsCanvasContext: IDrawingContext;
    private _workingCanvasContext: IDrawingContext;
    private _changeCreatedEvent = this._createEventDispatcher<AddChangeAction>();
}

export {Workplace};