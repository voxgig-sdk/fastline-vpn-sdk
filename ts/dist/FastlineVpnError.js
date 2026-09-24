"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastlineVpnError = void 0;
class FastlineVpnError extends Error {
    isFastlineVpnError = true;
    sdk = 'FastlineVpn';
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
exports.FastlineVpnError = FastlineVpnError;
//# sourceMappingURL=FastlineVpnError.js.map