import {IDrawingContext} from "../drawingcontext/IDrawingContext";
import {Vec2} from "../../../utils/Vec2";
import {EventDispatcher} from "../../../disposable/EventDispatcher";
import {IDisposable} from "../../../disposable/IDisposable";


interface IShape extends IDisposable, IShapeInfo {
    draw(drawingContext: IDrawingContext): void;
    serialize(): Object;
    setSelected(selected: boolean): void;
    changeEvent(): EventDispatcher<void>;
}

interface IShapeInfo {
    selected():boolean;
    owns(cord: Vec2): boolean;
}

export {IShape, IShapeInfo};