import {Component} from "../../common/components/component/Component";
import {EventDispatcher} from "../../common/disposable/EventDispatcher";
import {ChangeToolAction} from "../action/ChangeToolAction";
import {ToolView} from "./ToolView";
import {ITool} from "../workplace/tools/ITool";

class Toolbar extends Component {
    constructor(tools: Array<ITool>) {
        super({ blockName: "toolbar" });
        this._tools = tools.map((tool: ITool) => {
            const toolView = new ToolView({
                icon: tool.icon(),
                tool,
                bemInfo: this.createChildBemInfo("tool")
            });
            this._addDisposable(toolView);
            this._listen("click", toolView, this._onToolClickHandler.bind(this, toolView));
            this.addChild(toolView);
            return toolView;
        });
    }

    public activateFirstTool() {
        this._tools[0].activate();
    }

    public toolChangedEvent(): EventDispatcher<ChangeToolAction> {
        return this._toolChangedEvent;
    }

    public resetTools() {
        this._tools.forEach((tool) => tool.reset());
    }

    private _onToolClickHandler(tool: ToolView) {
        this._toolChangedEvent.dispatch(new ChangeToolAction(this._tools, tool));
    }

    private readonly _tools: Array<ToolView> = [];
    private readonly _toolChangedEvent = this._createEventDispatcher<ChangeToolAction>();
}

export {Toolbar};
