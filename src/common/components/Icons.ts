import * as fs from "fs";

class Icons {
    public static back():string {
        return fs.readFileSync(__dirname + "/../../../res/images/svg/back.svg").toString();
    }
    public static star():string {
        return fs.readFileSync(__dirname + "/../../../res/images/svg/star.svg").toString();
    }
    public static line():string {
        return fs.readFileSync(__dirname + "/../../../res/images/svg/line.svg").toString();
    }
    public static compass():string {
        return fs.readFileSync(__dirname + "/../../../res/images/svg/compass.svg").toString();
    }
    public static eraser():string {
        return fs.readFileSync(__dirname + "/../../../res/images/svg/eraser.svg").toString();
    }
    public static arrow():string {
        return fs.readFileSync(__dirname + "/../../../res/images/svg/arrow.svg").toString();
    }
    public static cross():string {
        return fs.readFileSync(__dirname + "/../../../res/images/svg/cross.svg").toString();
    }
}

export {Icons};