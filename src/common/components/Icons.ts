import * as fs from "fs";

class Icons {
    public static back():string {
        return fs.readFileSync(__dirname + "/../../../res/images/svg/back.svg").toString();
    }
}

export {Icons};