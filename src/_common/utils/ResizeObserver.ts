import {Disposable} from "../disposable/Disposable";
import {Component} from "../components/component/Component";
import {FramesController, IFrameHandler} from "../animation/FramesController";
import {EventDispatcher} from "../disposable/EventDispatcher";
import {Size} from "./Size";

class ResizeObserver extends Disposable implements IFrameHandler {
    constructor(...components: Array<Component>) {
        super();
        this._componentsList = components.map((component) => ({
            component,
            size: new Size(component.width(), component.height())
        }));
        FramesController.addFrameHandler(this)

    }

    public resizeEvent() {
        return this._resizeEvent;
    }

    public onFrame() {
        for (const element of this._componentsList) {
            const newSize = new Size(element.component.width(), element.component.height());
            if (!element.size.equal(newSize)) {
                element.size = newSize;
                this._resizeEvent.dispatch(element.component);
            }
        }
    }

    protected _destruct() {
        FramesController.removeFrameHandler(this);
    }

    _componentsList: Array<{component: Component, size: Size}>;
    _resizeEvent: EventDispatcher<Component> = this._createEventDispatcher();
}

export {ResizeObserver}