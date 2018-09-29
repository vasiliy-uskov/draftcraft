import {Disposable} from "../disposable/Disposable";
import {PagesType} from "./PagesType";
import {EventDispatcher} from "../disposable/EventDispatcher";

class BasePage extends Disposable{
    constructor(container: HTMLElement) {
        super();
        this._container = container;
    }
    public open(): Promise<void> {
        return Promise.resolve();
    }
    public close(): Promise<void> {
        return Promise.resolve();
    }

    /** @final */
    public changePageRequestEvent(): EventDispatcher<PagesType> {
        return this._changePageRequestEvent;
    }

    /** @final */
    protected _sendChangePageRequest(page: PagesType) {
        this._changePageRequestEvent.dispatch(page);
    }

    private _container: HTMLElement;
    private _changePageRequestEvent: EventDispatcher<PagesType> = this._createEventDispatcher<PagesType>();
}

export {BasePage};

