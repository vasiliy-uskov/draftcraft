import {EventDispatcher} from "../../common/disposable/EventDispatcher";
import {IChange} from "./IChange";

interface ITool {
    changeEvent(): EventDispatcher<IChange>;
    activate(): void;
    deactivate(): void;
}

export {ITool}