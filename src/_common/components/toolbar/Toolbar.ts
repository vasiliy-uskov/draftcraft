import {Component} from "../component/Component";
import {ToolView} from "./ToolView";
import {IWorkspace} from "./IWorkspace";
import {IToolCreator, ToolViewCreator} from "./ToolViewCreator";

class Toolbar extends Component {
	constructor(workspace: IWorkspace, createToolsFn: (a: IToolCreator) => Array<ToolView>) {
		super({blockName: "toolbar"});
		const toolCreator = new ToolViewCreator({
			canvasContext: workspace.canvasContext(),
			canvasMouseEventDispatcher: workspace.eventDispatcher(),
			documentOrganizer: workspace.model(),
			workspaceContainer: workspace,
			createBemInfoFn: () => this.createChildBemInfo("tool"),
		});
		this._tools = createToolsFn(toolCreator).map((tool: ToolView) => {
			this._addDisposable(tool);
			this._listen("click", tool, this._onToolClickHandler.bind(this, tool));
			this.addChild(tool);
			return tool;
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
