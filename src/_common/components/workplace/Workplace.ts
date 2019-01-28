import {Component} from "../component/Component";
import {TagsName} from "../component/TagsName";
import {CanvasDrawingContext} from "./drawingcontext/CanvasDrawingContext";
import {IDrawingContext} from "./drawingcontext/IDrawingContext";
import {MouseEventDispatcher} from "./MouseEventDispatcher";
import {ResizeObserver} from "../../utils/ResizeObserver";
import {ITool} from "./tools/ITool";
import {BaseTool} from "./tools/BaseTool";
import {EventDispatcher} from "../../disposable/EventDispatcher";
import {ShapesHolder} from "./ShapesHolder";
import {ToolFactory} from "./tools/ToolFactory";
import {IToolsCreator} from "./tools/IToolsCreator";
import {IShapeInfo} from "./tools/IShape";

class Workplace extends Component {
    constructor(toolsCreator: IToolsCreator) {
        super({
            blockName: "workplace",
        });

        this._background = new Component({
            tagName: TagsName.img,
            bemInfo: this.createChildBemInfo("background"),
        });
        this.addChild(this._background);
        this._background.setStyle("display", "none");

        const {context: resultsCanvasContext} = this._createCanvas("results-canvas");
        this._resultsCanvasContext = resultsCanvasContext;

        const {context: workingCanvasContext, canvas: workingCanvas} = this._createCanvas("working-canvas");
        this._workingCanvasContext = workingCanvasContext;

        const canvasMouseEventDispatcher = new MouseEventDispatcher(workingCanvas);
        this._addDisposable(canvasMouseEventDispatcher);

        this._addDisposable(this._shapesHolder);
        this._addHandler(this._shapesHolder.changeEvent(), () => this._invalidateResultCanvas());

        const toolFactory = new ToolFactory({
            canvasMouseEventDispatcher,
            canvasContext: this._workingCanvasContext,
            shapesHolder: this._shapesHolder,
            workplaceContainer: this,
        });
        this._tools = toolsCreator.createTools(toolFactory);
        this._tools.forEach((tool) => {
            this._addDisposable(tool);
            this._addHandler(tool.activatedEvent(), () => {
                this.setStyle("cursor", tool.cursor());
            })
        });
        const actionEventDispatchers = this._tools.map((tool) => tool.actionCreatedEvent());
        this._actionCreatedEvent = this._createEventDispatcher(...actionEventDispatchers);
    }

    public actionCreatedEvent(): EventDispatcher<IAction> {
        return this._actionCreatedEvent;
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

    public getSerializedShapes(predicate?: (shape: IShapeInfo) => boolean): string {
        const data = [];
        for (const shape of this._shapesHolder) {
            (!predicate || predicate(shape)) && data.push(shape.serialize())
        }
        return JSON.stringify(data);
    }

    public clean(): void {
        this._shapesHolder.clear();
        this._workingCanvasContext.clean();
        this._resultsCanvasContext.clean();
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

    private _invalidateResultCanvas() {
        this._resultsCanvasContext.clean();
        for (const shape of this._shapesHolder) {
            shape.draw(this._resultsCanvasContext);
        }
    }

    private _tools: Array<BaseTool>;
    private _background: Component;
    private _shapesHolder = new ShapesHolder();
    private _resultsCanvasContext: IDrawingContext;
    private _workingCanvasContext: IDrawingContext;
    private _actionCreatedEvent: EventDispatcher<IAction>;
}

export {Workplace};