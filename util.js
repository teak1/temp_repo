class CallStack {
    constructor(str) {
        this.major = null;
        this.minor = null;
        this.stackLength = 0;
        if (str.indexOf(".") > -1) {
            let parts = str.split(".");
            this.major = parts.shift();
            if (parts.length > 1) {
                this.minor = parts;
                this.stackLength = 1 + parts.length;
            } else {
                this.minor = parts[0];
                this.stackLength = 2;
            }
        } else {
            this.stackLength = 1;
        }
    }
}
export default {
    caller() {
        let cs = new Error().stack.split("\n").map(_ => _.trim());
        cs.shift();
        cs.shift();
        for (let i = 0; i < cs.length; i++) {
            let item = cs[i];
            item = item.substr(3);
            let first = item.indexOf(" ");
            cs[i] = new CallStack(item.substring(0, first));
        }
        return cs;
    },
    uuid() {
        let template = "xxxx-xxxx-xxxxxxxxxxxx";
        let result = "";
        for (let i = 0; i < template.length; i++) {
            if (template[i] == "x") {
                result += Math.floor(Math.random() * 36).toString(36);
            } else {
                result += template[i];
            }
        }
        return result;
    }
}