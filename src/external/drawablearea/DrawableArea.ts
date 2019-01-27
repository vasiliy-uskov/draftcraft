import {Component} from "../../_common/components/component/Component";
import {Workplace} from "../../_common/components/workplace/Workplace";
import {Toolbar} from "../../_common/components/toolbar/Toolbar";
import {ActionController} from "../../_common/action/ActionController";
import {AddChangeAction} from "../../_common/components/workplace/action/AddChangeAction";
import {ChangeToolAction} from "../../_common/components/toolbar/action/ChangeToolAction";

class DrawableArea extends Component{
    constructor(container: Element) {
        super({
            blockName: "drawable-area",
        });
        container.appendChild(this.element());
        this._addDisposable(this._workplace);
        this.addChild(this._workplace);
        this._addHandler(this._workplace.changeCreatedEvent(), (action: AddChangeAction) => {
            this._activated && this._actionController.execute(action)
        });
        this._addDisposable(this._toolbar);
        this.addChild(this._toolbar);
        this._addHandler(this._toolbar.toolChangedEvent(), (action: ChangeToolAction) => {
            this._activated && this._actionController.execute(action)
        });
        this._toolbar.activateFirstTool();
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

    public getValue(): string {
        return this._workplace.getSerializedChanges();
    }

    public setBackground(url: string) {
        this._workplace.setBackgroundImage(url);
    }

    private _activated = true;
    private _workplace = new Workplace();
    private _actionController = new ActionController();
    private _toolbar = new Toolbar(this._workplace.tools());
}

(global as any).DrawableArea = DrawableArea;