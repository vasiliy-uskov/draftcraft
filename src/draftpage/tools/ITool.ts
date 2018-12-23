import {EventDispatcher} from "../../common/disposable/EventDispatcher";
import {IChange} from "./IChange";
import {IDisposable} from "../../common/disposable/IDisposable";

interface ITool extends IDisposable {
    changeEvent(): EventDispatcher<IChange>;
    activate(): void;
    deactivate(): void;
}

export {ITool}