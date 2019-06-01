import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { randomElements } from '../operators/randomElements';

describe('randomElements', () => {

    it('should return an array with one element', (done) => {
        const value = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
        new BehaviorSubject(value).pipe(
            randomElements(1),
            take(1),
        ).subscribe(result => {
            expect(result.length).toEqual(1);
            expect(value.indexOf(result[0])).toBeGreaterThan(-1);
            done();
        });
    });

    it('should return an array with multiple elements', (done) => {
        const value = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
        new BehaviorSubject(value).pipe(
            randomElements(4),
            take(1),
        ).subscribe(result => {
            expect(result.length).toEqual(4);
            expect(value.indexOf(result[0]) > -1);
            expect(value.indexOf(result[1]) > -1);
            expect(value.indexOf(result[2]) > -1);
            expect(value.indexOf(result[3]) > -1);
            done();
        });
    });

    it('should return an empty array', (done) => {
        new BehaviorSubject([]).pipe(
            randomElements(4),
            take(1),
        ).subscribe(result => {
            expect(result.length).toEqual(0);
            done();
        });
    });

    it('should return an empty array for 0 size', (done) => {
        const value = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
        new BehaviorSubject(value).pipe(
            randomElements(0),
            take(1),
        ).subscribe(result => {
            expect(result.length).toEqual(0);
            expect(result).toEqual([]);
            done();
        });
    });

    it('should return undefined for negative size', (done) => {
        const value = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
        new BehaviorSubject(value).pipe(
            randomElements(-1),
            take(1),
        ).subscribe(result => {
            expect(result).toBeUndefined();
            done();
        });
    });

});
