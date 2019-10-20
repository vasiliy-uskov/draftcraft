import {Component} from "../component/Component";
import {ITool} from "./tools/ITool";
import {BemInfo} from "../component/BemInfo";

type ToolViewConfig = {
	tool: ITool,
	icon: string;
	cursor: string,
	bemInfo: BemInfo,
}

class ToolView extends Component {
	constructor({bemInfo, icon, tool, cursor}: ToolViewConfig) {
		super({bemInfo, content: icon});
		this._tool = tool;
		this._cursor = cursor
	}

	public activated(): boolean {
		return this._activated;
	}

	public reset() {
		this._tool.reset();
	}

	public activate() {
		this._tool.activate();
		document.body.style.cursor = this._cursor;
		this.updateModifier("selected", true);
		this._activated = true;
	}

	public deactivate() {
		this._tool.deactivate();
		this.updateModifier("selected", false);
		this._activated = false;
	}

	private _activated = false;
	private _cursor: string;
	private readonly _tool: ITool;
}

export {ToolView}