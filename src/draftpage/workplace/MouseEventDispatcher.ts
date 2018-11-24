import {Disposable} from "../../common/disposable/Disposable";
import {EventDispatcher} from "../../common/disposable/EventDispatcher";
import {Component} from "../../common/components/component/Component";

class MouseEventDispatcher extends Disposable {
    constructor(component: Component) {
        super();
        this._listen("mousedown", component, (event: Event) => {
            this._mouseDownEvent.dispatch(this._modifyCords(event as MouseEvent, component));
        });
        this._listen("mouseup", component, (event: Event) => {
            this._mouseUpEvent.dispatch(this._modifyCords(event as MouseEvent, component));
        });
        this._listen("mousemove", component, (event: Event) => {
            this._mouseMoveEvent.dispatch(this._modifyCords(event as MouseEvent, component));
        });
    }

    public mouseDownEvent(): EventDispatcher<MouseEvent> {
        return this._mouseDownEvent;
    }

    public mouseUpEvent(): EventDispatcher<MouseEvent> {
        return this._mouseUpEvent;
    }

    public mouseMoveEvent(): EventDispatcher<MouseEvent> {
        return this._mouseMoveEvent;
    }

    _modifyCords(event: MouseEvent, component: Component): MouseEvent {
        const boundingBox = component.getClientRect();
        return new MouseEvent(event.type, {
            clientX: event.clientX - boundingBox.left,
            clientY: event.clientY - boundingBox.top,
        });
    }

    private _mouseDownEvent: EventDispatcher<MouseEvent> = this._createEventDispatcher();
    private _mouseUpEvent: EventDispatcher<MouseEvent> = this._createEventDispatcher();
    private _mouseMoveEvent: EventDispatcher<MouseEvent> = this._createEventDispatcher();
}

export {MouseEventDispatcher}