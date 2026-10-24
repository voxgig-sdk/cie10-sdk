import { Cie10Entity } from './entity/Cie10Entity';
export type * from './Cie10Types';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { Cie10EntityBase } from './Cie10EntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class Cie10SDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Cie10(entopts?: Record<string, any>): Cie10Entity;
    static test(testoptsarg?: any, sdkoptsarg?: any): Cie10SDK;
    tester(testopts?: any, sdkopts?: any): Cie10SDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof Cie10SDK;
export { stdutil, config, BaseFeature, Cie10EntityBase, Cie10SDK, SDK, };
export type { DirectResult };
