import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { randomElement } from 'rxjs-operators';

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
            console.log('result', result);
        });
    }

}
