import {EventDispatcher} from "../../../../common/disposable/EventDispatcher";
import {Component} from "../../../../common/components/component/Component";
import {TagsName} from "../../../../common/components/component/TagsName";
import {Vec2} from "../../../../common/utils/Vec2";
import {DrawingParams} from "../DrawingParams";
import {Label} from "./Label";
import {ListenableWindow} from "../../../../common/disposable/ListenableWindow";

class LabelInput extends Component {
    constructor(parent: Component) {
        super({
            tagName: TagsName.input,
            blockName: "label-input"
        });
        this.setAttribute("type", "text");
        this.applyStyles({
            "color": DrawingParams.textFill(),
            "font": DrawingParams.font(),
        });
        this._parent = parent;
        this._listen("keydown", this, (event) => this._keyDownHandler(event as KeyboardEvent));
        this._listen("focusout", this, () => this.focus());
        this._listen("mousedown", new ListenableWindow(), () => this._dispatchInputEvent());
    }

    public inputEndEvent(): EventDispatcher<Label> {
        return this._inputEndEvent;
    }

    public show(position: Vec2) {
        this._visible = true;
        this._clearData();
        this.move(position);
        this._parent.addChild(this);
        this.focus();
    }

    public hide() {
        this._visible = false;
        this.blur();
        this.element().parentNode && this._parent.removeChild(this);
    }

    public createLabel(): Label {
        return new Label(new Vec2(this.x(), this.y()), this._getInputElement().value);
    }

    public focus() {
        this._visible && super.focus();
    }

    protected _destruct() {
        super._destruct();
        this._visible && this._parent.removeChild(this.element());
    }

    private _keyDownHandler(event: KeyboardEvent) {
        const isSymbol = /(^[\w -]$)/.test(event.key);
        if (event.ctrlKey && isSymbol || event.key == "Enter") {
            this._dispatchInputEvent();
        }
    }

    private _clearData() {
        return this._getInputElement().value = "";
    }

    private _dispatchInputEvent() {
        this._inputEndEvent.dispatch(this.createLabel());
    }

    private _getInputElement(): HTMLInputElement {
        return this.element() as HTMLInputElement;
    }

    private _parent: Component;
    private _visible = false;
    private _inputEndEvent = this._createEventDispatcher<Label>();
}

export {LabelInput};