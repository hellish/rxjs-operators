import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { randomElement } from '../operators/randomElement';

describe('operators', () => {

    it('should return a single random element', (done) => {
        const value = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
        new BehaviorSubject(value).pipe(
            randomElement(),
            take(1),
        ).subscribe(result => {
            expect(value.indexOf(result) > -1);
            done();
        });
    });

    it('should return same element', (done) => {
        const value = 45;
        new BehaviorSubject([ value ]).pipe(
            randomElement(),
            take(1),
        ).subscribe(result => {
            expect(result).toEqual(value);
            done();
        });
    });

    it('should return undefined with empty array', (done) => {
        new BehaviorSubject([]).pipe(
            randomElement(),
            take(1),
        ).subscribe(result => {
            expect(result).toBeUndefined();
            done();
        });
    });

    it('should return undefined with null', (done) => {
        new BehaviorSubject(null).pipe(
            randomElement(),
            take(1),
        ).subscribe(result => {
            expect(result).toBeUndefined();
            done();
        });
    });

    it('should return undefined with undefined', (done) => {
        new BehaviorSubject(undefined).pipe(
            randomElement(),
            take(1),
        ).subscribe(result => {
            expect(result).toBeUndefined();
            done();
        });
    });

});
