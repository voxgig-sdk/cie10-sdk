import { Cie10EntityBase } from '../Cie10EntityBase';
import type { Cie10SDK } from '../Cie10SDK';
import type { Control } from '../types';
import type { Cie10, Cie10ListMatch } from '../Cie10Types';
declare class Cie10Entity extends Cie10EntityBase<Cie10> {
    constructor(client: Cie10SDK, entopts: any);
    make(this: Cie10Entity): Cie10Entity;
    list(this: any, reqmatch?: Cie10ListMatch, ctrl?: Control): Promise<Cie10Entity[]>;
}
export { Cie10Entity };
