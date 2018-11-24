import {Component} from "../../common/components/component/Component";
import {Icons} from "../../common/components/Icons";
import {BemInfo} from "../../common/components/component/BemInfo";
import {createAnimation, IAnimation} from "../../common/animation/Animation";

const OPEN_TIME = 400;
const CLOSE_TIME = 300;
const OVERLAY_OPACITY = 0.77;

abstract class InfoPopup extends Component {
    constructor(config: {
        blockName: string,
        title: string
    }) {
        super({blockName: "popup"});
        this.addBemInfo(new BemInfo(config.blockName));
        this._overlay = new Component({bemInfo: this.createChildBemInfo("overlay")});
        this._addDisposable(this._overlay);
        this.addChild(this._overlay);

        this._popup = new Component({bemInfo: this.createChildBemInfo("popup-container")});
        this._addDisposable(this._popup);
        this.addChild(this._popup);

        this._control = new Component({ bemInfo: this.createChildBemInfo("control") });
        this._addDisposable(this._control);
        this._popup.addChild(this._control);

        this._contentContainer = new Component({bemInfo: this.createChildBemInfo("content-container")});
        this._addDisposable(this._contentContainer);
        this._popup.addChild(this._contentContainer);

        this._title = config.title;

        this._listen("click", this._control, () => this._changeActiveState());
        this._listen("click", this._overlay, () => this._changeActiveState());
    }

    public setTextContent(content: string) {
        this._content = content;
        this._invalidatePopupState();
    }

    public setActivated(activated: boolean) {
        if (this._activated != activated) {
            this._changeActiveState();
        }
    }

    private _changeActiveState(): void {
        if (this._activated) {
            this._close();
        }
        else {
            this._open();
        }
    }

    private _open() {
        this._activated = true;
        if (this._currentAnimation) {
            this._currentAnimation.stop(true);
        }
        this._invalidatePopupState();
        this._overlay.setStyle("opacity", OVERLAY_OPACITY);
        this._currentAnimation = createAnimation([this._closedExpandedPopupPosition()], [this._openedPopupPosition()], OPEN_TIME);
        this._addDisposable(this._currentAnimation);
        this._addHandler(this._currentAnimation.frameEvent(), ([translate]) => {
            this._popup.setStyle("transform", `translateY(${translate}px)`);
        });
        this._addHandlerCallOnce(this._currentAnimation.endEvent(), () => {
            this._removeDisposable(this._currentAnimation);
        });
        this._currentAnimation.play();
    }

    private _close() {
        this._activated = false;
        if (this._currentAnimation) {
            this._currentAnimation.stop(true);
        }
        this._overlay.setStyle("opacity", "0");
        this._contentContainer.setStyle("opacity", "0");
        this._currentAnimation = createAnimation([this._openedPopupPosition()], [this._closedExpandedPopupPosition()], CLOSE_TIME);
        this._addDisposable(this._currentAnimation);
        this._addHandler(this._currentAnimation.frameEvent(), ([translate]) => {
            this._popup.setStyle("transform", `translateY(${translate}px)`);
        });
        this._addHandlerCallOnce(this._currentAnimation.endEvent(), () => {
            this._removeDisposable(this._currentAnimation);
            this._invalidatePopupState();
            this._contentContainer.setStyle("opacity", "1");
        });
        this._currentAnimation.play();
    }

    private _openedPopupPosition(): number {
        return (this.height() - this._popup.height()) / 2;
    }

    private _invalidatePopupState() {
        this._invalidatePopupContent();
        this._invalidateControl();
        this.updateModifier("activated", this._activated);
        this._overlay.setStyle("display", this._activated ? "block" : "none");
        this.setStyle("height", this._activated ? "100%" : "");
        const popupPosition = this._activated ? this._openedPopupPosition() : this._closedPopupPosition();
        const popupContentPadding = 20;
        if (this._activated && this._popup.element().scrollHeight != this._popup.height()) {
            this._contentContainer.setStyle("height", `${this._popup.height() - 2 * popupContentPadding}px`);
        }
        else {
            this._contentContainer.setStyle("height", "");
        }
        this._popup.setStyle("transform", `translateY(${popupPosition}px)`);
    }

    private _invalidatePopupContent() {
        this._contentContainer.setContent(this._activated ? this._content : this._title);
    }
    
    private _invalidateControl() {
        this._control.setContent(this._activated ? Icons.cross() : Icons.arrow());
        this._control.updateModifier("state", this._activated ? "cross" : "arrow")
    }

    private _closedPopupPosition(): number {
        return 0;
    }

    protected abstract _closedExpandedPopupPosition(): number;


    protected _notExpandedHeight = 60;
    protected _popup: Component;
    private _contentContainer: Component;
    private _control: Component;
    private _overlay: Component;
    private _activated: boolean;
    private _currentAnimation?: IAnimation = null;
    private _content = "";
    private _title = "";
}

export {InfoPopup}