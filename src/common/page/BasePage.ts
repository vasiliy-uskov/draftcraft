import {Component} from "../components/component/Component";
import {PagesType} from "./PagesType";
import {EventDispatcher} from "../disposable/EventDispatcher";
import {Messages} from "../lng/Messages";
import {Transition} from "../effects/transition/Transition";
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
        console.trace(this._pageType);
        const animation = new Transition(this, transitionDirection, false);
        this._addDisposable(animation);
        this.setStyle("display", "block");
        return new Promise((resolve, reject) => {
            this._addHandlerCallOnce(animation.endEvent(), () => {
                resolve();
                this._removeDisposable(animation);
            });
            animation.play();
        });
    }

    public close(transitionDirection: Direction): Promise<void> {
        const animation = new Transition(this, transitionDirection, true);
        this._addDisposable(animation);
        return new Promise((resolve, reject) => {
            this._addHandlerCallOnce(animation.endEvent(), () => {
                resolve();
                this._removeDisposable(animation);
                this.setStyle("display", "none");
            });
            animation.play()
        });
    }

    /** @final */
    public changePageRequestEvent(): EventDispatcher<PagesType> {
        return this._changePageRequestEvent;
    }

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

