import {Component} from "../../common/components/component/Component";
import {EventDispatcher} from "../../common/disposable/EventDispatcher";

class Toolbar<T> extends Component {
    constructor() {
        super({
            blockName: "toolbar",
        });
    }

    public initTools(tools: Array<{icon: string, tool: T}>) {
        for (const toolView of this._tools) {
            this.removeChild(toolView);
            this._removeDisposable(toolView);
        }
        for (const {icon, tool} of tools) {
            const toolView = new Component({
                bemInfo: this.createChildBemInfo("tool"),
                content: icon
            });
            this._listen("click", toolView, () => this._setToolSelected(toolView, tool));
            this._addDisposable(toolView);
            this.addChild(toolView);
            this._tools.push(toolView);
        }
        if (this._tools[0] && tools[0]) {
            this._setToolSelected(this._tools[0], tools[0].tool);
        }
    }

    public toolChoseEvent(): EventDispatcher<T> {
        return this._toolChoseEvent;
    }

    private _setToolSelected(toolView: Component, tool: T) {
        for (const toolView of this._tools) {
            toolView.updateModifier("selected", false);
        }
        toolView.updateModifier("selected", true);
        this._toolChoseEvent.dispatch(tool);
    }

    private _tools: Array<Component> = [];
    private _toolChoseEvent: EventDispatcher<T> = this._createEventDispatcher();
}

export {Toolbar};
