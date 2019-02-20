import {Disposable} from "../disposable/Disposable";
import {ListenableWindow} from "../disposable/ListenableWindow";

const REDO_KEY = "KeyY";
const UNDO_KEY = "KeyZ";
const RESET_KEY = "Escape";

class HotKeyBinder extends Disposable {
    constructor() {
        super();
        this._addDisposable(this._listenableWindow);
        this._listen("keydown", this._listenableWindow, (event: Event) => {
            requestAnimationFrame(() => this._handleKeyDown(event as KeyboardEvent));
        })
    }

    public clean() {
        delete this._undoHandler;
        delete this._redoHandler;
        delete this._resetHandler;
    }

    public setUndoHandler(handler: () => void) {
        this._undoHandler = handler;
    }

    public setRedoHandler(handler: () => void) {
        this._redoHandler = handler;
    }

    public setResetHandler(handler: () => void) {
        this._resetHandler = handler;
    }

    private _handleKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case UNDO_KEY:
                return event.ctrlKey && this._undoHandler && this._undoHandler();
            case REDO_KEY:
                return event.ctrlKey && this._redoHandler && this._redoHandler();
            case RESET_KEY:
                return this._resetHandler && this._resetHandler();
        }
    }

    private _listenableWindow: ListenableWindow = new ListenableWindow();
    private _undoHandler?: () => void;
    private _redoHandler?: () => void;
    private _resetHandler?: () => void;
}

export {HotKeyBinder};