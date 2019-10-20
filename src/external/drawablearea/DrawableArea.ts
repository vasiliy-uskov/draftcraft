import {Component} from "../../_common/components/component/Component";
import {Workspace} from "../../_common/components/workspace/Workspace";
import {Toolbar} from "../../_common/components/toolbar/Toolbar";
import {HotKeyBinder} from "../../_common/hotkeys/HotKeysBinder";

class DrawableArea extends Component {
	constructor(container: Element) {
		super({
			blockName: "drawable-area",
		});
		container.appendChild(this.element());

		this._addDisposable(this._workspace);
		this.addChild(this._workspace);

		this._addDisposable(this._toolbar);
		this.addChild(this._toolbar);
		this._toolbar.activateFirstTool();

		const hotKeyBinder = new HotKeyBinder();
		hotKeyBinder.setUndoHandler(() => this._workspace.undo());
		hotKeyBinder.setRedoHandler(() => this._workspace.redo());
		hotKeyBinder.setResetHandler(() => this._toolbar.resetTools())
	}

	public activate() {
		this._activated = true;
		this.setStyle("pointer-events", "");
		this._toolbar.activateFirstTool();
	}

	public deactivate() {
		this._activated = false;
		this.setStyle("pointer-events", "none");
	}

	public reset() {
		this._workspace.clean();
		this._toolbar.resetTools();
	}

	public getAnswer(): string {
		return JSON.stringify(this._workspace.markedDraft().serialize());
	}

	public getDetailedAnswer(): string {
		return JSON.stringify(this._workspace.draft().serialize());
	}

	public setBackground(url: string) {
		this._workspace.setBackgroundImage(url);
	}

	private _activated = true;
	private _workspace = new Workspace();
	private _toolbar = new Toolbar(this._workspace, creator => [
		creator.createLineTool(),
		creator.createCompassTool(),
		creator.createDotTool(),
		creator.createMarkTool(),
		creator.createMoveTool()
	]);
}

(global as any).DrawableArea = DrawableArea;