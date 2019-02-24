import {Level} from "./Level";
import {ILevelsProvider} from "./ILevelsProvider";
import {isNull} from "../../_common/utils/typetools";

class LevelsIterator {
    constructor(levelsProvider: ILevelsProvider, currentLevelId?: string) {
        this._levelsProvider = levelsProvider;
        this._currentLevelId = currentLevelId && this._levelsProvider.has(currentLevelId)
            ? currentLevelId
            : this._getFirstElementId();
    }

    public value(): Level|null {
        if (isNull(this._currentLevelId)) {
            this._currentLevelId = this._getFirstElementId();
        }
        return this._currentLevelId ? this._levelsProvider.get(this._currentLevelId) : null
    }

    public next(): LevelsIterator {
        if (isNull(this._currentLevelId)) {
            this._currentLevelId = this._getFirstElementId();
        }
        if (isNull(this._currentLevelId)) {
            return new LevelsIterator(this._levelsProvider);
        }
        const levels = [...this._levelsProvider];
        const levelIndex = levels.indexOf(this._levelsProvider.get(this._currentLevelId));
        const nextLevelId = levelIndex + 1 < levels.length ? levels[levelIndex + 1].id : this._currentLevelId;
        return new LevelsIterator(this._levelsProvider, nextLevelId)
    }

    private _getFirstElementId(): string|null {
        const firstElement = [...this._levelsProvider].find(level => !level.passed);
        return firstElement ? firstElement.id : null;
    }

    private _levelsProvider: ILevelsProvider;
    private _currentLevelId: string|null = null;
}

export {LevelsIterator};