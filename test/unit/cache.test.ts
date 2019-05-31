/**
 * @author WMXPY
 * @namespace Continuous
 * @description Cache
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Cached } from '../../src/cached';

describe('Given {Cached} class', (): void => {

    const chance: Chance.Chance = new Chance('continuous-cache');

    it('should be able to create cached class', (): void => {

        const value: string = chance.string();
        const cache: Cached<string> = Cached.create(() => value);

        expect(cache).to.be.instanceOf(Cached);
    });
});
