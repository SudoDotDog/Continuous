/**
 * @author WMXPY
 * @namespace Continuous
 * @description Cache
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Cached } from '../../src/cached';
import { Awaitable } from '../../src/declare';

describe('Given {Cached} class', (): void => {

    const chance: Chance.Chance = new Chance('continuous-cache');

    it('should be able to create cached class', (): void => {

        const value: string = chance.string();
        const cache: Cached<string> = Cached.create(() => value);

        expect(cache).to.be.instanceOf(Cached);
    });

    it('should be able to get init value', async (): Promise<void> => {

        let called: number = 0;

        const value: string = chance.string();
        const createFunction: Awaitable<string> = async () => {
            called++;
            return value;
        };
        const cache: Cached<string> = Cached.create(createFunction);

        const result: string = await cache.get();

        expect(called).to.be.equal(1);
        expect(result).to.be.equal(value);

        cache.clear();
    });

    it('should be able to get cached value', async (): Promise<void> => {

        let called: number = 0;

        const value: string = chance.string();
        const createFunction: Awaitable<string> = async () => {
            called++;
            return value;
        };
        const cache: Cached<string> = Cached.create(createFunction);

        const result1: string = await cache.get();
        const result2: string = await cache.get();

        expect(called).to.be.equal(1);
        expect(result1).to.be.equal(value);
        expect(result2).to.be.equal(value);

        cache.clear();
    });

    it('should be able to get second value', async (): Promise<void> => {

        let called: number = 0;

        const value: string = chance.string();
        const createFunction: Awaitable<string> = async () => {
            called++;
            return value;
        };
        const cache: Cached<string> = Cached.create(createFunction, 1);

        const result1: string = await cache.get();

        await new Promise((resolve: any) => setTimeout(resolve, 5));

        const result2: string = await cache.get();

        expect(called).to.be.equal(2);
        expect(result1).to.be.equal(value);
        expect(result2).to.be.equal(value);

        cache.clear();
    });
});
