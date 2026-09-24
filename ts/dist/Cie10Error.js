"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cie10Error = void 0;
class Cie10Error extends Error {
    isCie10Error = true;
    sdk = 'Cie10';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.Cie10Error = Cie10Error;
//# sourceMappingURL=Cie10Error.js.map