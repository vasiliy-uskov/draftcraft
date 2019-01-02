import {Component} from "../components/component/Component";
import {PagesType} from "./PagesType";
import {EventDispatcher} from "../disposable/EventDispatcher";
import {Messages} from "../lng/Messages";
import {Fade} from "../effects/transition/Fade";
import {eventToPromise} from "../utils/asynctools";
import {HotKeyBinder} from "../hotkeys/HotKeysBinder";

class BasePage extends Component {
    constructor(container: HTMLElement, messages: Messages, pageType: PagesType, hotKeyBinder: HotKeyBinder) {
        super({
            baseElement: container,
            blockName: "page",
        });
        this._messages = messages;
        this._pageType = pageType;
        this._hotKeyBinder = hotKeyBinder;
    }

    public async open() {
        this.setStyle("opacity", 0);
        this.setStyle("display", "block");
        await this._beforeOpen();
        const parallelTasksPromise = BasePage._executeParallelsTasks(this._openingParallelsTasks);
        const animation = new Fade(this, true);
        this._addDisposable(animation);
        animation.play();
        await eventToPromise(animation.endEvent());
        this._removeDisposable(animation);
        await this._afterOpen();
        this._hotKeyBinder.clean();
        this._initHotKeyBinder(this._hotKeyBinder);
        await parallelTasksPromise;
    }

    public async close() {
        await this._beforeClose();
        const parallelTasksPromise = BasePage._executeParallelsTasks(this._closingParallelsTasks);
        const animation = new Fade(this, false);
        this._addDisposable(animation);
        animation.play();
        await eventToPromise(animation.endEvent());
        this._removeDisposable(animation);
        requestAnimationFrame(() => this.setStyle("display", "none"));
        await this._afterClose();
        await parallelTasksPromise;
    }

    /** @final */
    public changePageRequestEvent(): EventDispatcher<PagesType> {
        return this._changePageRequestEvent;
    }

    protected async _beforeOpen() {}

    protected async _afterOpen() {}

    protected async _beforeClose() {}

    protected async _afterClose() {}

    protected _initHotKeyBinder(hotKeyBinder: HotKeyBinder) {}

    /** @final */
    protected _sendChangePageRequest(page: PagesType) {
        this._changePageRequestEvent.dispatch(page);
    }

    /** @final */
    protected _getMessage(id: string): string {
        return this._messages.getMessage(this._pageType, id);
    }

    /** @final */
    protected _addOpeningParallelTask(task: () => Promise<void>): void {
        this._openingParallelsTasks.push(task);
    }

    /** @final */
    protected _addClosingParallelTask(task: () => Promise<void>): void {
        this._closingParallelsTasks.push(task);
    }

    private static _executeParallelsTasks(tasks: Array<() => Promise<void>>): Promise<void[]> {
        const promises: Array<Promise<void>> = [];
        while (tasks.length) {
            promises.push(tasks.pop()());
        }
        return Promise.all(promises);
    }

    private _changePageRequestEvent: EventDispatcher<PagesType> = this._createEventDispatcher<PagesType>();
    private _messages: Messages;
    private _pageType: PagesType;
    private _hotKeyBinder: HotKeyBinder;
    private _closingParallelsTasks: Array<() => Promise<void>> = [];
    private _openingParallelsTasks: Array<() => Promise<void>> = [];
}

export {BasePage};

