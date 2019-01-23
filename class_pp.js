import util from './util.js';
class Private {
    constructor() {
        let sym = Symbol();
        this[sym] = {};
        this.private = new Proxy(this, {
            set: (obj, name, value) => {
                this.verifyPrivateStack(this.constructor, util.caller());
                this[sym][name] = value;
                return value;
            },
            get: () => {
                this.verifyPrivateStack(this.constructor, util.caller());
                return this[sym];
            }
        });
    }
    verifyPrivateStack(self, caller) {
        let name = self.name;
        let interest = caller[1];
        let allowed = name == interest.major;
        if (!allowed) throw new Error("disalowed operation");
    }
    test() {
        return this.private.test;
    }
}

export default {
    Private
};