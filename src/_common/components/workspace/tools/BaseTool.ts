import {ITool} from "./ITool";
import {IDrawingContext} from "../../../drawingcontext/IDrawingContext";
import {MouseEventData, MouseEventDispatcher} from "../MouseEventDispatcher";
import {Disposable} from "../../../disposable/Disposable";
import {EventDispatcher} from "../../../disposable/EventDispatcher";
import {IWorkspaceModel} from "../document/IWorkspaceModel";
import {isKeyPressed} from "../../../hotkeys/ActiveKeysMap";

abstract class BaseTool extends Disposable implements ITool {
	constructor(drawingContext: IDrawingContext, mouseEventDispatcher: MouseEventDispatcher, workspace: IWorkspaceModel) {
		super();
		this._workspace = workspace;
		this._drawingContext = drawingContext;
		this._addHandler(mouseEventDispatcher.mouseDownEvent(), (data: MouseEventData) => this._activated && this._mouseDownHandler(data));
		this._addHandler(mouseEventDispatcher.mouseMoveEvent(), (data: MouseEventData) => this._activated && this._mouseMoveHandler(data));
		this._addHandler(mouseEventDispatcher.mouseUpEvent(), (data: MouseEventData) => this._activated && this._mouseUpHandler(data));
		this._addHandler(mouseEventDispatcher.mouseUpEvent(), (data: MouseEventData) => this._activated && this._mouseUpHandler(data));
	}

	public abstract icon(): string;

	public abstract cursor(): string;

	public actionCreatedEvent(): EventDispatcher<IAction> {
		return this._actionCreatedEvent;
	}

	public activatedEvent(): EventDispatcher<void> {
		return this._activatedEvent;
	}

	public activate(): void {
		this._activated = true;
		this._activatedEvent.dispatch();
	}

	public deactivate(): void {
		this._activated = false;
		this.reset();
	}

	public reset(): void {
	}

	protected _mouseDownHandler(data: MouseEventData): void {
	}

	protected _mouseUpHandler(data: MouseEventData): void {
	}

	protected _mouseMoveHandler(data: MouseEventData): void {
	}

	/** @final */
	protected _needToReducePoints(): boolean {
		return isKeyPressed("Alt");
	}

	/** @final */
	protected _dispatchActionCreatedEvent(action: IAction) {
		this._actionCreatedEvent.dispatch(action);
	}

	protected _drawingContext: IDrawingContext;
	protected _workspace: IWorkspaceModel;

	private _activated = false;
	private _actionCreatedEvent = this._createEventDispatcher<IAction>();
	private _activatedEvent = this._createEventDispatcher();
}

export {BaseTool}