import classPP from "./class_pp.js";
class Dict extends classPP.Private2() {
    constructor() {
        super();
        this.init();
    }
    init() {
        if (this.private.initialized) return null;
        this.private.data = {};
        this.private.initialized = true;
        //this.private.* is only accessable from within class functions.
        //so Dict.private.data
    }
    get(key) {
        return this.private.data[key];
    }
    set(key, value) {
        this.private.data[key] = value;
    }
}

window.d = new Dict();
export {}