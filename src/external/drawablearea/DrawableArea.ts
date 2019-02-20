import {Component} from "../../_common/components/component/Component";
import {Workplace} from "../../_common/components/workplace/Workplace";
import {Toolbar} from "../../_common/components/toolbar/Toolbar";
import {HotKeyBinder} from "../../_common/hotkeys/HotKeysBinder";
import {ToolsCreator} from "./ToolsCreator";

class DrawableArea extends Component{
    constructor(container: Element) {
        super({
            blockName: "drawable-area",
        });
        container.appendChild(this.element());

        this._addDisposable(this._workplace);
        this.addChild(this._workplace);

        this._addDisposable(this._toolbar);
        this.addChild(this._toolbar);
        this._toolbar.activateFirstTool();

        const hotKeyBinder = new HotKeyBinder();
        hotKeyBinder.setUndoHandler(() => this._workplace.undo());
        hotKeyBinder.setRedoHandler(() => this._workplace.redo());
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
        this._workplace.clean();
        this._toolbar.resetTools();
    }

    public getAnswer(): string {
        return JSON.stringify(this._workplace.selection().serialize());
    }

    public getDetailedAnswer(): string {
        return JSON.stringify(this._workplace.draft().serialize());
    }

    public setBackground(url: string) {
        this._workplace.setBackgroundImage(url);
    }

    private _activated = true;
    private _workplace = new Workplace(new ToolsCreator());
    private _toolbar = new Toolbar(this._workplace.tools());
}

(global as any).DrawableArea = DrawableArea;