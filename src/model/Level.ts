const MAX_STARS_COUNT = 3;
const MAX_SCORE = 1000;
const LEVEL_PASSED_SCORE = 400;

class Level {
    constructor(task: string, help: string, img: string|null, score: number|null = null) {
        this._task = task;
        this._help = help;
        this._img = img;
        this._score = score;
    }

    public score(): number|null {
        return this._score;
    }

    isLevelPassed() {
        return this._score ? this._score > LEVEL_PASSED_SCORE : false;
    }

    public starsCount(): number {
        const rewardedScoreInterval = MAX_SCORE - LEVEL_PASSED_SCORE;
        const score = (this._score ? this._score : 0) - LEVEL_PASSED_SCORE;
        const startCount = Math.floor(score * MAX_STARS_COUNT / rewardedScoreInterval);
        return startCount > 0 ? startCount : 0;
    }

    public img(): string|null {
        return this._img;
    }

    public help(): string {
        return this._help;
    }

    public task(): string {
        return this._task;
    }

    private _score: number|null;
    private _img: string|null;
    private _help: string;
    private _task: string;
}

export {Level};