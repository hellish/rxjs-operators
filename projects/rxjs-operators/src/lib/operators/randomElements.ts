import { OperatorFunction, Observable } from 'rxjs';
import { sampleSize } from 'lodash';

export function randomElements<T>( size: number ): OperatorFunction<T[], T[]> {
    return (source$: Observable<T[]>): Observable<T[]> => {
        return new Observable<T[]>(observer => {
            return source$.subscribe({
                next: (items: T[]) => {
                    if (!items) {
                        observer.next( undefined );
                    } else if (size < 0) {
                        observer.next( undefined );
                    } else {
                        observer.next( sampleSize(items, size) );
                    }
                },
                error: observer.error,
                complete: observer.complete,
            });
        });
    };
}
