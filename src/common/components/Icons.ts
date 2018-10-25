import * as fs from "fs";

class Icons {
    public static back():string {
        return fs.readFileSync(__dirname + "/../../../res/images/svg/arrow.svg").toString();
    }
    public static stickyNote():string {
        return fs.readFileSync(__dirname + "/../../../res/images/svg/sticky-note.svg").toString();
    }
    public static star():string {
        return fs.readFileSync(__dirname + "/../../../res/images/svg/star.svg").toString();
    }
}

export {Icons};