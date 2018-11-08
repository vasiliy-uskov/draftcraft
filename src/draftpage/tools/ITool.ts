import {EventDispatcher} from "../../common/disposable/EventDispatcher";
import {IDrawingContext} from "../workplace/IDrawingContext";
import {IChange} from "./IChange";
import {MouseEventDispatcher} from "../workplace/MouseEventDispatcher";

interface ITool {
    changeEvent(): EventDispatcher<IChange>;
    activate(): void;
    deactivate(): void;
}

export {ITool}