import {Level} from "./Level";

class GameContext {
    constructor(levels: Array<Level>) {
        this._levels = levels;
    }

    getLevels(): Array<Level> {
        return this._levels.slice();
    }

    getLevelByIndex(index: number): Level {
        if (!this._levels.hasOwnProperty(index)) {

        }
        return this._levels[index];
    }

    private _levels: Array<Level> = [];
}

export {GameContext};