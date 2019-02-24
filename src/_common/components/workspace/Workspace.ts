import {Component} from "../component/Component";
import {MouseEventDispatcher} from "./MouseEventDispatcher";
import {ITool} from "./tools/ITool";
import {BaseTool} from "./tools/BaseTool";
import {ToolCreator} from "./tools/ToolCreator";
import {DocumentOrganizer} from "./document/DocumentOrganizer";
import {DocumentDrawer} from "./document/view/DocumentDrawer";
import {Draft} from "../../shapes/Draft";
import {Canvas} from "../canvas/Canvas";
import {Size} from "../../utils/Size";

class Workspace extends Component {
    constructor(createTools: (creator: ToolCreator) => Array<BaseTool>) {
        super({
            blockName: "workspace",
        });

        this._addDisposable(this._resultsCanvas);
        this.addChild(this._resultsCanvas);

        this._addDisposable(this._workingCanvas);
        this.addChild(this._workingCanvas);

        const canvasMouseEventDispatcher = new MouseEventDispatcher(this._workingCanvas);
        this._addDisposable(canvasMouseEventDispatcher);

        const toolFactory = new ToolCreator({
            canvasMouseEventDispatcher,
            canvasContext: this._workingCanvas.context(),
            documentOrganizer: this._documentOrganizer,
            workspaceContainer: this,
        });

        this._tools = createTools(toolFactory);
        this._tools.forEach((tool) => {
            this._addDisposable(tool);
            this._addHandler(tool.activatedEvent(), () => {
                this.setStyle("cursor", tool.cursor());
            })
        });
    }

    public tools(): Array<ITool> {
        return this._tools;
    }

    public setBackgroundImage(src: string) {
        this.setStyle("background-image", `url(${src})`);
    }

    public setCanvasSize(size: Size) {
        this.setSize(size);
        this._workingCanvas.setCanvasSize(size);
        this._resultsCanvas.setCanvasSize(size);
    }

    public draft(): Draft {
        return this._documentOrganizer.draft();
    }

    public selection(): Draft {
        return this._documentOrganizer.selection();
    }

    public undo() {
        this._documentOrganizer.undo();
    }

    public redo() {
        this._documentOrganizer.redo();
    }

    public clean() {
        this._documentOrganizer.cleanDocument();
        this._workingCanvas.context().clean();
        this._resultsCanvas.context().clean();
    }

    private _tools: Array<BaseTool>;
    private _resultsCanvas = new Canvas({
        bemInfo: this.createChildBemInfo("results-canvas"),
        adoptiveSize: true,
    });
    private _workingCanvas = new Canvas({
        bemInfo: this.createChildBemInfo("working-canvas"),
        adoptiveSize: true,
    });
    private _documentOrganizer = new DocumentOrganizer(new DocumentDrawer(this._resultsCanvas.context()));
}

export {Workspace};