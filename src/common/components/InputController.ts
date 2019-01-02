import {Component} from "./component/Component";
import {Disposable} from "../disposable/Disposable";
import {EventDispatcher} from "../disposable/EventDispatcher";
import {TagsName} from "./TagsName";
import {eventToPromise} from "../utils/asynctools";


class InputController extends Disposable {
    constructor() {
        super();
        this._addDisposable(this._input);
        this._input.setAttribute("tabindex", "-1");
        this._listen("input", this._input, () => this._inputEvent.dispatch(this._getData()));
        this._listen("keydown", this._input, (event) => event.stopPropagation());
        this._listen("focusout", this._input, () => this._inputEndEvent.dispatch());
        document.body.appendChild(this._input.element());
    }

    public inputEvent(): EventDispatcher<string> {
        return this._inputEvent;
    }

    public getText(): Promise<string> {
        this._input.focus();
        this._clearData();
        return eventToPromise(this._inputEndEvent).then(() => this._getData());
    }

    protected _destruct() {
        super._destruct();
        document.body.removeChild(this._input.element());
    }

    private _getInputElement(): HTMLInputElement {
        return this._input.element() as HTMLInputElement;
    }

    private _getData() {
        return this._getInputElement().value;
    }

    private _clearData() {
        return this._getInputElement().value = "";
    }

    private _input = new Component({tagName: TagsName.input, blockName: "hidden-input"});
    private _inputEvent = this._createEventDispatcher<string>();
    private _inputEndEvent = this._createEventDispatcher<void>();
}

export {InputController};