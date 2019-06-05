import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { randomElement, randomElements, randomElementsMap } from 'npx-rxjs-operators';

export interface Test {
    id: number;
    updatedAt?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'rxjs-operators-app';

    ngOnInit() {
        new BehaviorSubject([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]).pipe(
            randomElement(),
            take(1),
        ).subscribe(result => {
            console.log('randomElement result', result);
        });

        new BehaviorSubject([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]).pipe(
            randomElements(6),
            take(1),
        ).subscribe(result => {
            console.log('randomElements result', result);
        });

        const arr = [ { id: 10 }, { id: 11 },  { id: 12 },  { id: 13 }, { id: 14 }, { id: 15 } ];

        new BehaviorSubject(arr).pipe(
            randomElementsMap(2, (value => {
                value.updatedAt = Date.now();
                return value;
            })),
            take(1),
        ).subscribe(result => {
            console.log('randomElementsMap result', result, arr);
        });

        const narr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
        new BehaviorSubject(narr).pipe(
            randomElementsMap(2, ((value) => {
                return value * 2;
            })),
            map(results => results.random),
            take(1),
        ).subscribe(result => {
            console.log('randomElementsMap result #2', result);
        });
    }

}
