import {IDisposable} from "./IDisposable";

interface IListenable extends IDisposable {
    eventTarget(): EventTarget;

}

export {IListenable};