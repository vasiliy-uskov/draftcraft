import {Component} from "../component/Component";
import {TagsName} from "../component/TagsName";
import {MouseEventDispatcher} from "./MouseEventDispatcher";
import {ITool} from "./tools/ITool";
import {BaseTool} from "./tools/BaseTool";
import {ToolFactory} from "./tools/ToolFactory";
import {IToolsCreator} from "./tools/IToolsCreator";
import {FieldOrganizer} from "./field/FieldOrganizer";
import {FieldDrawer} from "./field/view/FieldDrawer";
import {Draft} from "../../shapes/Draft";
import {Canvas} from "../canvas/Canvas";

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

        this._addDisposable(this._resultsCanvas);
        this.addChild(this._resultsCanvas);

        this._addDisposable(this._workingCanvas);
        this.addChild(this._workingCanvas);

        const canvasMouseEventDispatcher = new MouseEventDispatcher(this._workingCanvas);
        this._addDisposable(canvasMouseEventDispatcher);

        const toolFactory = new ToolFactory({
            canvasMouseEventDispatcher,
            canvasContext: this._workingCanvas.context(),
            fieldOrganizer: this._fieldOrganizer,
            workplaceContainer: this,
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
        return this._fieldOrganizer.draft();
    }

    public selection(): Draft {
        return this._fieldOrganizer.selection();
    }

    public undo() {
        this._fieldOrganizer.undo();
    }

    public redo() {
        this._fieldOrganizer.redo();
    }

    public clean() {
        this._fieldOrganizer.cleanField();
        this._workingCanvas.context().clean();
        this._resultsCanvas.context().clean();
    }

    private _tools: Array<BaseTool>;
    private _background: Component;
    private _resultsCanvas = new Canvas({bemInfo: this.createChildBemInfo("results-canvas")});
    private _workingCanvas = new Canvas({bemInfo: this.createChildBemInfo("working-canvas")});
    private _fieldOrganizer = new FieldOrganizer(new FieldDrawer(this._resultsCanvas.context()));
}

export {Workplace};