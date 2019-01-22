import {verifyBoolean, verifyObject, verifyString} from "../common/utils/typetools";
import {ValidationError} from "../common/exceptions/Exceptions";

const MAX_STARS_COUNT = 3;
const MAX_SCORE = 1000;
const LEVEL_PASSED_SCORE = 500;

type LevelConfig = {
    id: string,
    task: string,
    help: string,
    img: string,
    enable: boolean,
    score?: number
}

class Level {
    constructor({id, task, help, score, img, enable}: LevelConfig) {
        this._id = id;
        this._task = task;
        this._help = help;
        this._img = img;
        this._enable = enable;
        this._awardedScore = Math.floor(score);
    }

    public isLevelPassed() {
        return this.lastScore() > LEVEL_PASSED_SCORE;
    }

    public img(): string {
        return this._img;
    }

    public help(): string {
        return this._help;
    }

    public task(): string {
        return this._task;
    }

    public id(): string {
        return this._id;
    }

    public awardedScore(): number {
        return this._awardedScore ? this._awardedScore : 0;
    }

    public lastScore(): number {
        return this._lastScore ? this._lastScore : 0;
    }

    public setLastScore(score: (number|null)) {
        if (!this._awardedScore && score)
        {
            this._awardedScore = score;
        }
        this._lastScore = score;
    }

    public enable(): boolean {
        return this._enable;
    }

    public static calculateStarsCount(score: number) {
        const rewardedScoreInterval = MAX_SCORE - LEVEL_PASSED_SCORE;
        const rewardedScore = score - LEVEL_PASSED_SCORE;
        const startCount = Math.ceil(rewardedScore / rewardedScoreInterval * MAX_STARS_COUNT);
        return Math.max(startCount, 0);
    }

    public static maxStarsCount(): number {
        return MAX_STARS_COUNT;
    }

    public static validateConfig(levelConfig: LevelConfig) {
        try {
            verifyObject(levelConfig);
            verifyString(levelConfig.id);
            verifyString(levelConfig.task);
            verifyString(levelConfig.help);
            verifyString(levelConfig.img);
            verifyBoolean(!!levelConfig.enable);
        }
        catch (err) {
            throw new ValidationError(`Invalid level config ${err}`);
        }
    }

    private _lastScore?: number;
    private _awardedScore?: number;
    private readonly _enable: boolean;
    private readonly _img: string;
    private readonly _help: string;
    private readonly _id: string;
    private readonly _task: string;
}

export {Level, LevelConfig};