import {Level} from "./Level";
import {Iterator} from "../../_common/iterator/Iterator";

interface ILevelsProvider {
    get(id: string): Level;
    has(id: string): boolean;
    [Symbol.iterator](): Iterator<Level>;
}

export {ILevelsProvider};