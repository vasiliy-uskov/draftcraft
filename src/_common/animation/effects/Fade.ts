import {createAnimation} from "../Animation";
import {Component} from "../../components/component/Component";
import {Disposable} from "../../disposable/Disposable";
import {EventDispatcher} from "../../disposable/EventDispatcher";

const LEAD_TIME = 400;

class Fade extends Disposable {
	constructor(component: Component, fadeIn: boolean) {
		super();
		this._addDisposable(this._animation);
		this._addHandler(this._animation.frameEvent(), ([opacity]) => {
			component.setStyle("opacity", fadeIn ? opacity : 1 - opacity);
		})
	}

	play() {
		this._animation.play();
	}

	stop() {
		this._animation.stop();
	}

	startEvent(): EventDispatcher<void> {
		return this._startEvent;
	}

	endEvent(): EventDispatcher<void> {
		return this._endEvent;
	}

	private _animation = createAnimation([0], [1], LEAD_TIME);
	private _startEvent = this._createEventDispatcher(this._animation.startEvent());
	private _endEvent = this._createEventDispatcher(this._animation.endEvent());
}

export {Fade};