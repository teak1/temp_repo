import classPP from "./class_pp.js";
import util from "./util.js";
class Dict extends classPP.Private {
    constructor() {
        super();
        this.init();
    }
    init() {
        this.private.data = {};
    }
    get(key) {
        return this.private.data[key];
    }
    set(key, value) {
        this.private.data[key] = value;
    }
}

window.d = new Dict();
// window.ClassPP = classPP.ClassPP;
// window.a = new(window.ClassPP);
export {}