import * as fs from "fs";

class Icons {
    public static back():string {
        return fs.readFileSync(__dirname + "/../../../res/images/svg/arrow.svg").toString();
    }
}

export {Icons};