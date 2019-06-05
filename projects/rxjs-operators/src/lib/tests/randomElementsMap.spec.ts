import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { randomElementsMap } from '../operators/randomElementsMap';

describe('randomElementsMap', () => {

    it('should return an array with one element', (done) => {
        const value = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
        new BehaviorSubject(value).pipe(
            randomElementsMap(1, (value) => {
                return value + 10;
            }),
            map(result => result.random),
            take(1),
        ).subscribe(result => {
            expect(result.length).toEqual(1);
            expect(result[0]).toBeGreaterThan(10);
            done();
        });
    });

    it('should return an object with random and original arrays', (done) => {
        const value = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
        new BehaviorSubject(value).pipe(
            randomElementsMap(2, (value) => {
                return value + 10;
            }),
            take(1),
        ).subscribe(result => {
            expect(result.hasOwnProperty('random')).toBeTruthy();
            expect(result.hasOwnProperty('original')).toBeTruthy();
            expect(result.random[0]).toBeGreaterThan(10);
            expect(result.random[1]).toBeGreaterThan(10);
            expect(result.original.length).toEqual(10);
            done();
        });
    });

});
