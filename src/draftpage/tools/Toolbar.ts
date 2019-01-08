import {Component} from "../../common/components/component/Component";
import {EventDispatcher} from "../../common/disposable/EventDispatcher";
import {ITool} from "./ITool";
import {ChangeToolAction} from "../action/ChangeToolAction";


class Toolbar extends Component {
    constructor() {
        super({ blockName: "toolbar" });
    }

    public activate() {
        this._active = true;
    }

    public deactivate() {
        this._active = false;
    }

    public toolChoseEvent(): EventDispatcher<ChangeToolAction> {
        return this._toolChoseEvent;
    }

    public initTools(tools: Array<{icon: string, tool: ITool}>) {
        this._cleanToolbar();
        this._createTools(tools);
        this._activateTool(Array(...this._tools.keys())[0]);
    }

    private _createTools(tools: Array<{icon: string, tool: ITool}>) {
        tools.forEach(({icon, tool}) => {
            const toolView = new Component({
                bemInfo: this.createChildBemInfo("tool"),
                content: icon
            });
            this._listen("click", toolView, () => {
                if (!this._active) {
                    return;
                }
                this._toolChoseEvent.dispatch(this._createChangeToolAction(tool));
            });
            this._addDisposable(toolView);
            this.addChild(toolView);
            this._tools.set(tool, toolView);
        })
    }

    private _cleanToolbar() {
        for (const toolView of this._tools.values()) {
            this.removeChild(toolView);
            this._removeDisposable(toolView);
        }
        this._tools.clear();
    }

    private _activateTool(tool: ITool) {
        for (const [tool, toolView] of this._tools) {
            tool.deactivate();
            toolView.updateModifier("selected", false);
        }
        this._activeTool = tool;
        tool.activate();
        this._tools.get(tool).updateModifier("selected", true)
    }

    private _createChangeToolAction(tool: ITool): ChangeToolAction {
        return new ChangeToolAction(this._activateTool.bind(this), this._activeTool, tool);
    }

    private _activeTool?: ITool;
    private _tools: Map<ITool, Component> = new Map();
    private _toolChoseEvent = this._createEventDispatcher<ChangeToolAction>();
    private _active = false;
}

export {Toolbar};
