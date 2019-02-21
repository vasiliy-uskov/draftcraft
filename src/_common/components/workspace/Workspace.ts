import {Component} from "../component/Component";
import {TagsName} from "../component/TagsName";
import {MouseEventDispatcher} from "./MouseEventDispatcher";
import {ITool} from "./tools/ITool";
import {BaseTool} from "./tools/BaseTool";
import {ToolCreator} from "./tools/ToolCreator";
import {IToolsFactory} from "./tools/IToolsFactory";
import {DocumentOrganizer} from "./document/DocumentOrganizer";
import {DocumentDrawer} from "./document/view/DocumentDrawer";
import {Draft} from "../../shapes/Draft";
import {Canvas} from "../canvas/Canvas";

class Workspace extends Component {
    constructor(toolsCreator: IToolsFactory) {
        super({
            blockName: "workspace",
        });

        this._background = new Component({
            tagName: TagsName.img,
            bemInfo: this.createChildBemInfo("background"),
        });
        this.addChild(this._background);
        this._background.setStyle("display", "none");

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

        this._tools = toolsCreator.createTools(toolFactory);
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
        if (src) {
            this._background.setStyle("display", "");
            this._background.setAttribute("src", src);
        }
        else {
            this._background.setStyle("display", "none");
        }
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
    private _background: Component;
    private _resultsCanvas = new Canvas({bemInfo: this.createChildBemInfo("results-canvas")});
    private _workingCanvas = new Canvas({bemInfo: this.createChildBemInfo("working-canvas")});
    private _documentOrganizer = new DocumentOrganizer(new DocumentDrawer(this._resultsCanvas.context()));
}

export {Workspace};