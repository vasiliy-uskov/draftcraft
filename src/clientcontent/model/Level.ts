import {verifyBoolean, verifyObject, verifyString} from "../../_common/utils/typetools";
import {ValidationError} from "../../_common/http/Exceptions";

type LevelConfig = {
    id: string,
    task: string,
    help: string,
    img: string,
    enable: boolean,
    passed: boolean
}

class Level {
    constructor({id, task, help, passed, img, enable}: LevelConfig) {
        this._id = id;
        this._task = task;
        this._help = help;
        this._img = img;
        this._enable = enable;
        this._passed = passed;
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

    public passed(): boolean {
        return this._passed;
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
            verifyBoolean(levelConfig.passed);
            verifyBoolean(levelConfig.enable);
        }
        catch (err) {
            throw new ValidationError(`Invalid level config ${err}`);
        }
    }

    private readonly _passed: boolean;
    private readonly _enable: boolean;
    private readonly _img: string;
    private readonly _help: string;
    private readonly _id: string;
    private readonly _task: string;
}

export {Level, LevelConfig};