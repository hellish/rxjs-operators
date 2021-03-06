import { OperatorFunction, Observable } from 'rxjs';
import { sample } from 'lodash';

export function randomElement<T>(): OperatorFunction<T[], T> {
    return (source$: Observable<T[]>): Observable<T> => {
        return new Observable<T>(observer => {
            return source$.subscribe({
                next: (items: T[]) => {
                    if (!items) {
                        observer.next( undefined );
                    } else if (items.length === 0) {
                        observer.next( undefined );
                    } else if (items.length === 1) {
                        observer.next( items[0] );
                    } else {
                        observer.next( sample(items) );
                    }
                },
                error: observer.error,
                complete: observer.complete,
            });
        });
    };
}
