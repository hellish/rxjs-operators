import { Observable, OperatorFunction, Operator, Subscriber, TeardownLogic } from 'rxjs';
import * as _ from 'lodash';

/*
  random<T, R>( size: number, rawData: R[], project: ( value: T, index: number ) => T ): R[] {
    const sample = _.sampleSize( rawData, size );
    return _.map( sample, _.ary(project, 2) );
  }
*/

class RandomElementsMapSubscriber extends Subscriber<any> {

    constructor(
        destination: Subscriber<any>,
        private size: number,
        private project: ( value: any, index: number ) => any,
    ) {
        super(destination);
    }

    protected _next(value: any) {
        let result: any;
        const clone = _.cloneDeep( value );

        try {
            const sample = _.sampleSize( value, this.size );
            result = _.map( sample, _.ary(this.project, 3) );
        } catch (err) {
            this.destination.error(err);
            return;
        }

        this.destination.next({ random: result, original: clone });
    }

}

class RandomElementsMapOperator implements Operator<any, any> {

    constructor(
        private size: number,
        private project: ( value: any, index: number ) => any,
    ) {
        //
    }

    call(subscriber: Subscriber<any>, source: any): TeardownLogic {
        return source.subscribe(new RandomElementsMapSubscriber(subscriber, this.size, this.project));
    }

}

export function randomElementsMap(
    size: number,
    project: ( value: any, index: number ) => any,
): OperatorFunction<any, any> {
    return function mapOperation(source: Observable<any>): Observable<any> {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function');
        }

        return source.lift(new RandomElementsMapOperator(size, project));
    };
}
