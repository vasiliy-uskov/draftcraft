import {IListenable} from "./IListenable";
import {Disposable} from "./Disposable";

class ListenableWindow extends Disposable implements IListenable{
    public eventTarget(): EventTarget {
        return window;
    }
}

export {ListenableWindow};