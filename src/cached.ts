/**
 * @author WMXPY
 * @namespace Continuous
 * @description Cached
 */

import { Awaitable } from "./declare";

export class Cached<T = any> {

    public static create<T = any>(fetch: Awaitable<T>): Cached<T> {

        return new Cached<T>(fetch);
    }

    private readonly _fetch: Awaitable<T>;

    private constructor(fetch: Awaitable<T>) {

        this._fetch = fetch;
    }
}
