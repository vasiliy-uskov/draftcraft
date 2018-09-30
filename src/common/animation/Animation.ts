import {Disposable} from "../disposable/Disposable";
import {EventDispatcher} from "../disposable/EventDispatcher";
import {IFrameHandler} from "./FramesController";
import {FramesController} from "./FramesController";

interface IAnimation {
    startEvent(): EventDispatcher<void>;
    endEvent(): EventDispatcher<void>;
    frameEvent(): EventDispatcher<Array<number>>;
    play();
    stop(goToEnd: boolean|void);
    state(): number; // progress from 0 to 1
}

class Animation extends Disposable implements IAnimation, IFrameHandler {
    constructor(startValues: Array<number>, endValues: Array<number>, leadTime: number, accFn: (x: number) => number|void = (x) => x) {
        this._startValues = startValues;
        this._endValues = endValues;
        this._leadTime = leadTime;
        this._accelerationFn = accFn;
    }

    public startEvent(): EventDispatcher<void> {
        return this._startEvent;
    }

    public endEvent(): EventDispatcher<void> {
        return this._endEvent;
    }

    public frameEvent(): EventDispatcher<Array<number>> {
        return this._frameEvent;
    }

    public play() {
        this._startTime = Data.now();
        this._progress = 0;
        FramesController.addFrameHandler(this);
    }

    public stop(goToEnd: boolean|void) {
        FramesController.removeHandler(this);
        if (goToEnd) {
            this._progress = 1;
            this._frameEvent.dispatch(this._getCurrentValues(this._progress));
            this._endEvent.dispatch();
        }
    }

    public state(): number {
        return this._progress;
    }

    public onFrame() {
        const now = Data.now();
        this._progress = (this._startTime - now) / this._leadTime;
        if (this._progress > 1) {
            progress = 1;
        }
        this._frameEvent.dispatch(this._getCurrentValues(this._progress));
        if (this._progress == 1) {
            FramesController.removeHandler(this);
            this._endEvent.dispatch();
        }
    }

    private _getCurrentValues(state: number): Array<number> {
        const values = [];
        for (let i = 0; i < this._startValues.length; ++i) {
            const startVal = this._startValues[i];
            const endVal = this._endValues[i];
            values.push((endVal - startVal) * this._accelerationFn(state) + startVal)
        }
        return values;
    }

    private _startEvent: EventDispatcher<void> = this._createEventDispatcher<void>();
    private _endEvent: EventDispatcher<void> = this._createEventDispatcher<void>();
    private _frameEvent: EventDispatcher<Array<number>> = this._createEventDispatcher<Array<number>>();
    private _progress: number = 0; //from 0 to 1
    private _startTime: number = 0;
    private _accelerationFn: (x: number) => number;
    private _startValues: Array<number>;
    private _endValues: Array<number>;
    private _leadTime: number;
}

function createAnimation(startValues: Array<number>, endValues: Array<number>, leadTime: number, accFn: (x: number) => number|void): IAnimation {
    return new Animation(startValues, endValues, leadTime, accFn);
}

export {createAnimation, IAnimation};