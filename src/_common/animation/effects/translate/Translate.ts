import {createAnimation} from "../../Animation";
import {Component} from "../../../components/component/Component";
import {Disposable} from "../../../disposable/Disposable";
import {EventDispatcher} from "../../../disposable/EventDispatcher";
import {Direction} from "./Direction";

const LEAD_TIME = 600;

class Translate extends Disposable {
	constructor(component: Component, direction: Direction, reversed: boolean) {
		super();
		this._addDisposable(this._animation);
		this._addHandler(this._animation.frameEvent(), ([shift]) => {
			component.setStyle("transform", Translate._getTranslate(direction, shift, reversed));
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

	private static _getTranslate(direction: Direction, shift: number, reversed: boolean): string {
		switch (direction) {
			case Direction.Bottom:
				return `translate(0, ${reversed ? 100 - shift : shift}%)`;
			case Direction.Top:
				return `translate(0, ${reversed ? shift - 100 : -shift}%)`;
			case Direction.Right:
				return `translate(${reversed ? 100 - shift : shift}%)`;
			case Direction.Left:
				return `translate(${reversed ? shift - 100 : -shift}%)`;
		}
		throw new Error("Unexpected direction");
	}

	private _animation = createAnimation([100], [0], LEAD_TIME);
	private _startEvent = this._createEventDispatcher(this._animation.startEvent());
	private _endEvent = this._createEventDispatcher(this._animation.endEvent());
}

export {Translate};