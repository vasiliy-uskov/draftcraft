import {Component} from "../components/component/Component";
import {EventDispatcher} from "../disposable/EventDispatcher";
import {Icons} from "../components/Icons";

enum ToastType {
    error = "error",
    info = "info",
}

const SHOWN_TIMEOUT = 5000;

class Toast extends Component {
    constructor(type: ToastType, message: string) {
        super({blockName: "toast"});

        this.updateModifier("type", type);

        this.addChild(this._content);
        this._content.setContent(message);

        const closeButton = new Component({
            bemInfo: this.createChildBemInfo("close"),
            content: Icons.cross(),
        });
        this._addDisposable(closeButton);
        this.addChild(closeButton);
        this._listen("click", closeButton, () => this._hide());
    }

    public hideEvent(): EventDispatcher<void> {
        return this._hideEvent;
    }

    public show() {
        if (this._shown) {
            return;
        }
        this._shown = true;
        this.updateModifier("shown", true);
        this._setTimeout(() => this._hide(), SHOWN_TIMEOUT);
    }

    private _hide() {
        if (!this._shown) {
            return;
        }
        this._shown = false;
        this._clearTimeouts();
        this.updateModifier("shown", false);
        this._listenOnce("transitionend", this, () => {
            this._hideEvent.dispatch();
        });
    }

    private readonly _hideEvent = this._createEventDispatcher();
    private _content = new Component({bemInfo: this.createChildBemInfo("content")});
    private _shown = false;
}

export {Toast, ToastType};