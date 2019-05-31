/**
 * @author WMXPY
 * @namespace Continuous
 * @description Cached
 */

import { Awaitable } from "./declare";

export class Cached<T = any> {

    public static create<T = any>(fetch: Awaitable<T>, timeout: number = 50000): Cached<T> {

        return new Cached<T>(fetch, timeout);
    }

    private readonly _fetch: Awaitable<T>;
    private readonly _timeout: number;

    private _cached?: T;
    private _clearer?: any;

    private constructor(fetch: Awaitable<T>, timeout: number) {

        this._fetch = fetch;
        this._timeout = timeout;
    }

    public async get(): Promise<T> {

        if (this._cached) {
            return this._cached;
        }

        const newValue: T = await this.update();
        return newValue;
    }

    public async update(): Promise<T> {

        this.clear();
        const newValue: T = await this._fetch();
        this._cached = newValue;

        this._clearer = setTimeout((): void => {
            this._cached = undefined;
            return;
        }, this._timeout);

        return newValue;
    }

    public clear(): this {

        clearTimeout(this._clearer);
        return this;
    }
}
