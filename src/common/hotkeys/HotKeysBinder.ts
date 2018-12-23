import {Disposable} from "../disposable/Disposable";
import {ActionController} from "../action/ActionController";
import {ListenableWindow} from "../disposable/ListenableWindow";

const REDO_KEY = "y";
const UNDO_KEY = "z";

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
    }

    public setActionController(actionController: ActionController) {
        this._undoHandler = () => actionController.undo();
        this._redoHandler = () => actionController.redo();
    }

    private _handleKeyDown(event: KeyboardEvent) {
        if (!event.ctrlKey) {
            return;
        }
        switch (event.key) {
            case UNDO_KEY:
                return this._undoHandler && this._undoHandler();
            case REDO_KEY:
                return this._redoHandler && this._redoHandler();
        }
    }

    private _listenableWindow: ListenableWindow = new ListenableWindow();
    private _undoHandler?: () => void;
    private _redoHandler?: () => void;
}

export {HotKeyBinder};