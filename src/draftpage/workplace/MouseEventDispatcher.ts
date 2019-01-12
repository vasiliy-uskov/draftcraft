import {Disposable} from "../../common/disposable/Disposable";
import {EventDispatcher} from "../../common/disposable/EventDispatcher";
import {Component} from "../../common/components/component/Component";
import {ListenableWindow} from "../../common/disposable/ListenableWindow";
import {Vec2} from "../../common/utils/Vec2";

type MouseEventData = {relativeCors: Vec2, absoluteCords: Vec2}

class MouseEventDispatcher extends Disposable {
    constructor(component: Component) {
        super();
        const listenableWindow = new ListenableWindow();
        this._addDisposable(listenableWindow);
        let mouseDown = false;
        this._listen("mousedown", component, (event: Event) => {
            mouseDown = true;
            this._mouseDownEvent.dispatch(this._getEventData(event as MouseEvent, component));
        });
        this._listen("mouseup", listenableWindow, (event: Event) => {
            if (mouseDown) {
                this._mouseUpEvent.dispatch(this._getEventData(event as MouseEvent, component));
            }
            mouseDown = false;
        });
        this._listen("mousemove", listenableWindow, (event: Event) => {
            this._mouseMoveEvent.dispatch(this._getEventData(event as MouseEvent, component));
        });
    }

    public mouseDownEvent(): EventDispatcher<MouseEventData> {
        return this._mouseDownEvent;
    }

    public mouseUpEvent(): EventDispatcher<MouseEventData> {
        return this._mouseUpEvent;
    }

    public mouseMoveEvent(): EventDispatcher<MouseEventData> {
        return this._mouseMoveEvent;
    }

    private _getEventData(event: MouseEvent, component: Component): MouseEventData {
        return {
            relativeCors: this._getRelativeCords(event, component),
            absoluteCords: new Vec2(event.clientX, event.clientY)
        }
    }

    private _getRelativeCords(event: MouseEvent, component: Component): Vec2 {
        const boundingBox = component.getClientRect();
        return new Vec2(
            event.clientX - boundingBox.left,
            event.clientY - boundingBox.top
        );
    }

    private _mouseDownEvent: EventDispatcher<MouseEventData> = this._createEventDispatcher();
    private _mouseUpEvent: EventDispatcher<MouseEventData> = this._createEventDispatcher();
    private _mouseMoveEvent: EventDispatcher<MouseEventData> = this._createEventDispatcher();
}

export {MouseEventDispatcher, MouseEventData}