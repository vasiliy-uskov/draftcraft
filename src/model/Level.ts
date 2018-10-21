const MAX_STARS_COUNT = 3;
const MAX_SCORE = 1000;

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

    public starsCount(): number {
        const score = this._score ? this._score : 0;
        return Math.floor(score * MAX_STARS_COUNT / MAX_SCORE) ;
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