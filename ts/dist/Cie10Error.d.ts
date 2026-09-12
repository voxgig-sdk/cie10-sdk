import { Context } from './Context';
declare class Cie10Error extends Error {
    isCie10Error: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { Cie10Error };
