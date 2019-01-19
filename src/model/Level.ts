import {verifyBoolean, verifyObject, verifyString} from "../common/utils/typetools";
import {ValidationError} from "../common/exception/Exceptions";

const MAX_STARS_COUNT = 3;
const MAX_SCORE = 1000;
const LEVEL_PASSED_SCORE = 400;

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
        this._score = score;
        this._enable = enable;
    }

    public isLevelPassed() {
        return this.score() > LEVEL_PASSED_SCORE;
    }

    public starsCount(): number {
        const rewardedScoreInterval = MAX_SCORE - LEVEL_PASSED_SCORE;
        const score = this.score() - LEVEL_PASSED_SCORE;
        const startCount = Math.floor(score * MAX_STARS_COUNT / rewardedScoreInterval);
        return startCount > 0 ? startCount : 0;
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

    public score(): number {
        return this._score ? this._score : 0;
    }

    public enable(): boolean {
        return this._enable;
    }

    public static validateConfig(levelConfig: LevelConfig) {
        try {
            verifyObject(levelConfig);
            verifyString(levelConfig.id);
            verifyString(levelConfig.task);
            verifyString(levelConfig.help);
            verifyString(levelConfig.img);
            verifyBoolean(levelConfig.enable);
        }
        catch (err) {
            throw new ValidationError(`Invalid level config ${err}`);
        }
    }

    private readonly _score?: number;
    private readonly _enable: boolean;
    private readonly _img: string;
    private readonly _help: string;
    private readonly _id: string;
    private readonly _task: string;
}

export {Level, LevelConfig};