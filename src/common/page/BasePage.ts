import {Component} from "../components/component/Component";
import {PagesType} from "./PagesType";
import {EventDispatcher} from "../disposable/EventDispatcher";
import {Messages} from "../lng/Messages";
import {Translate} from "../effects/transition/Translate";
import {Direction} from "../effects/transition/Direction";

class BasePage extends Component {
    constructor(container: HTMLElement, messages: Messages, pageType: PagesType) {
        super({
            baseElement: container,
            blockName: "page",
        });
        this._messages = messages;
        this._pageType = pageType;
    }

    public open(transitionDirection: Direction): Promise<void> {
        this._beforeOpen();
        const animation = new Translate(this, transitionDirection, false);
        this._addDisposable(animation);
        this._addHandlerCallOnce(animation.endEvent(), () => {
            this._removeDisposable(animation);
            this._afterOpen();
        });
        this.setStyle("transform", "scale(0)"); //to hide an element
        this.setStyle("display", "block");
        animation.play();
        return Promise.resolve();
    }

    public close(transitionDirection: Direction): Promise<void> {
        this._beforeClose();
        const animation = new Translate(this, transitionDirection, true);
        this._addDisposable(animation);
        this._addHandlerCallOnce(animation.endEvent(), () => {
            this._removeDisposable(animation);
            this.setStyle("display", "none");
            this._afterClose();
        });
        animation.play();
        return Promise.resolve();
    }

    /** @final */
    public changePageRequestEvent(): EventDispatcher<PagesType> {
        return this._changePageRequestEvent;
    }

    protected _beforeOpen(): void {}

    protected _afterOpen(): void {}

    protected _beforeClose(): void {}

    protected _afterClose(): void {}

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

