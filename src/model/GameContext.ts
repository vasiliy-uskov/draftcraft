import {Level} from "./Level";

class GameContext {
    constructor(levels: Array<Level>) {
        this._levels = levels;
        this._currentLevel = this._levels[0];
    }

    getLevels(): Array<Level> {
        return this._levels.slice();
    }

    setCurrentLevel(index: number) {
        this._currentLevel = this._levels[index];
    }

    currentLevel(): Level {
        return this._currentLevel;
    }

    getLevelByIndex(index: number): Level {
        if (!this._levels.hasOwnProperty(index)) {

        }
        return this._levels[index];
    }

    private _levels: Array<Level> = [];
    private _currentLevel: Level;
}

export {GameContext};