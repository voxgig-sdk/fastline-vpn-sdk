import { Context } from './Context';
declare class FastlineVpnError extends Error {
    isFastlineVpnError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { FastlineVpnError };
