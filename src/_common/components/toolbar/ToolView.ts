import {Component} from "../component/Component";
import {ITool} from "../workspace/tools/ITool";
import {BemInfo} from "../component/BemInfo";

class ToolView extends Component {
	constructor({bemInfo, icon, tool}: { bemInfo: BemInfo, icon: string, tool: ITool }) {
		super({bemInfo, content: icon});
		this._tool = tool;
	}

	public activated(): boolean {
		return this._activated;
	}

	public reset() {
		this._tool.reset();
	}

	public activate() {
		this._tool.activate();
		this.updateModifier("selected", true);
		this._activated = true;
	}

	public deactivate() {
		this._tool.deactivate();
		this.updateModifier("selected", false);
		this._activated = false;
	}

	private _activated = false;
	private readonly _tool: ITool;
}

export {ToolView}