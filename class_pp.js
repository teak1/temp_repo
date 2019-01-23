import util from './util.js';
let glob_sym_token = Symbol("glob_sym_token");
class Private {
    constructor() {
            let sym = Symbol();
            this[sym] = {};
            this.private = new Proxy(this, {
                set: (obj, name, value) => {
                    if (this[glob_sym_token](this.constructor, util.caller())) {
                        this[sym][name] = value;
                        return value;
                    }
                    return null;
                },
                get: () => {
                    if (this[glob_sym_token](this.constructor, util.caller())) {
                        return this[sym];
                    }
                    return null;
                }
            });
        }
        [glob_sym_token](self, caller) {
            let name = self.name;
            let interest = caller[1];
            let allowed = name == interest.major;
            if (!allowed) return false;
            return true;
        }
}
let private_creator = () => {
    let sym = Symbol();
    class Private2 {
        constructor() {
            this[sym] = {};
        }
        get __stack__() {
            return util.caller();
        }
        get __valid__() {
            if (this.__stack__[3] && this.__stack__[3].major == this.constructor.name) {
                return true;
            }
            return false
        }
        get private() {
            return this.__valid__ ? this[sym] : undefined;
        }
        set private(value) {
            throw new Error("private is not a settable value");
        }
    }
    return Private2;
}
export default {
    Private,
    Private2: private_creator
};