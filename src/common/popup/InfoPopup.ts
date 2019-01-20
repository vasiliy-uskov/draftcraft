import {Component} from "../components/component/Component";
import {Icons} from "../components/Icons";
import {BemInfo} from "../components/component/BemInfo";

class InfoPopup extends Component {
    constructor(config: {
        blockName: string,
        content?: string,
    }) {
        super({blockName: "popup"});
        this.addBemInfo(new BemInfo(config.blockName));

        this._addDisposable(this._overlay);
        this.addChild(this._overlay);

        this._addDisposable(this._popup);
        this.addChild(this._popup);

        this._addDisposable(this._closeButton);
        this._popup.addChild(this._closeButton);

        this._contentContainer.setContent(config.content ? config.content : "");
        this._addDisposable(this._contentContainer);
        this._popup.addChild(this._contentContainer);

        this._listen("click", this._closeButton, () => this._changeActiveState());
        this._listen("click", this._overlay, () => this._changeActiveState());
    }

    public setTextContent(content: string) {
        this._contentContainer.setContent(content);
    }

    public setContent(content: string) {
        this._contentContainer.setContent(content);
    }

    public open() {
        this._activated = true;
        this._invalidatePopupState();
    }

    public setActivated(activated: boolean) {
        this._activated = activated;
        this._overlay.setStyle("transition", "none");
        this._popup.setStyle("transition", "none");
        this._closeButton.setStyle("transition", "none");
        requestAnimationFrame(() => {
            this._invalidatePopupState();
            this._overlay.setStyle("transition", "");
            this._popup.setStyle("transition", "");
            this._closeButton.setStyle("transition", "");
        })
    }

    private _changeActiveState(): void {
        this._activated = !this._activated;
        this._invalidatePopupState();
    }

    private _invalidatePopupState() {
        if (this._activated) {
            this.updateModifier("visible", true);
            requestAnimationFrame(() => this.updateModifier("shown", true));
        }
        else {
            this.updateModifier("shown", false);
            this.updateModifier("visible", false);
        }
    }

    private _popup = new Component({bemInfo: this.createChildBemInfo("popup-container")});
    private _contentContainer = new Component({bemInfo: this.createChildBemInfo("content-container")});
    private _closeButton = new Component({
        bemInfo: this.createChildBemInfo("close-button"),
        content: Icons.cross(),
    });
    private _overlay = new Component({bemInfo: this.createChildBemInfo("overlay")});
    private _activated = false;
}

export {InfoPopup}