import {Component} from "../component/Component";
import {ToolView} from "./ToolView";
import {ITool} from "../workspace/tools/ITool";

class Toolbar extends Component {
	constructor(tools: Array<ITool>) {
		super({blockName: "toolbar"});
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
		this._tools.forEach((tool) => tool.deactivate());
		this._tools[0].activate();
	}

	public resetTools() {
		this._tools.forEach((tool) => tool.reset());
	}

	private _onToolClickHandler(tool: ToolView) {
		this._tools.forEach((tool) => tool.deactivate());
		tool.activate();
	}

	private readonly _tools: Array<ToolView> = [];
}

export {Toolbar};
