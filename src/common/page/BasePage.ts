import {Component} from "../components/component/Component";
import {PagesType} from "./PagesType";
import {EventDispatcher} from "../disposable/EventDispatcher";
import {Messages} from "../lng/Messages";
import {Fade} from "../effects/transition/Fade";
import {eventToPromise} from "../utils/asynctools";

class BasePage extends Component {
    constructor(container: HTMLElement, messages: Messages, pageType: PagesType) {
        super({
            baseElement: container,
            blockName: "page",
        });
        this._messages = messages;
        this._pageType = pageType;
    }

    public async open() {
        this.setStyle("opacity", 0);
        this.setStyle("display", "block");
        await this._beforeOpen();
        const animation = new Fade(this, true);
        this._addDisposable(animation);
        animation.play();
        return eventToPromise(animation.endEvent()).then(() => {
            this._removeDisposable(animation);
            return this._afterOpen();
        });
    }

    public async close() {
        await this._beforeClose();
        const animation = new Fade(this, false);
        this._addDisposable(animation);
        animation.play();
        return eventToPromise(animation.endEvent()).then(() => {
            this._removeDisposable(animation);
            requestAnimationFrame(() => this.setStyle("display", "none"));
            return this._afterClose();
        });
    }

    /** @final */
    public changePageRequestEvent(): EventDispatcher<PagesType> {
        return this._changePageRequestEvent;
    }

    protected async _beforeOpen() {}

    protected async _afterOpen() {}

    protected async _beforeClose() {}

    protected async _afterClose() {}

    /** @final */
    protected _sendChangePageRequest(page: PagesType) {
        this._changePageRequestEvent.dispatch(page);
    }

    /** @final */
    protected _getMessage(id: string): string {
        return this._messages.getMessage(this._pageType, id);
    }

    private _changePageRequestEvent: EventDispatcher<PagesType> = this._createEventDispatcher<PagesType>();
    private _messages: Messages;
    private _pageType: PagesType;
}

export {BasePage};

