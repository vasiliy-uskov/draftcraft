import {Level} from "./Level";
import {clamp} from "../common/utils/mathutils";

class GameContext {
    constructor(levels: Array<Level>) {
        this._levels = levels;
        this._currentLevelIndex = 0;
    }

    public getLevels(): Array<Level> {
        return this._levels.slice();
    }

    public setCurrentLevel(index: number) {
        this._currentLevelIndex = clamp(index, 0, this._levels.length);
    }

    public setCurrentLevelAnswer(answer: string) {
        console.log(answer);
        this._levels[this._currentLevelIndex] = new Level(this.currentLevel().task(), this.currentLevel().help(), this.currentLevel().img(), 1000);
    }

    public currentLevel(): Level {
        return this._levels[this._currentLevelIndex];
    }

    public currentLevelIndex(): number {
        return this._currentLevelIndex;
    }

    public getLevelByIndex(index: number): Level|null {
        return this._levels.hasOwnProperty(index) ? this._levels[index] : null;
    }

    private _levels: Array<Level> = [];
    private _currentLevelIndex: number;
}

export {GameContext};