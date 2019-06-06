# RxJS operators

[![Build Status](https://travis-ci.org/hellish/rxjs-operators.svg?branch=master)](https://travis-ci.org/hellish/rxjs-operators)

## Install
```javascript
npm install npx-rxjs-operators
```

## Usage
```typescript
import { randomElement } from 'npx-rxjs-operators';
```

## Operators

### randomElement
----------------
Get a single random element from the array

```typescript
import { randomElement } from 'npx-rxjs-operators';

const subject = new BehaviorSubject([ 1, 2, 3, ]).pipe(
    randomElement(),
    take(1),
);

subject.subscribe(value => {
    // value can be 1 or 2 or 3 ...
});
```

### randomElements
----------------
Get an array with from the array

```typescript
import { randomElements } from 'npx-rxjs-operators';

const subject = new BehaviorSubject([ 5, 6, 7, 8, ]).pipe(
    randomElements(2),
    take(1),
);

subject.subscribe(value => {
    // value can be [ 5, 6 ] or [ 5, 7 ] or [ 8, 6 ] ...
});
```
