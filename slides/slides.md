---
highlighter: shiki
css: unocss
layout: cover
---

## RxJS best practices

---

# Table of contents
- RxJS keywords
- Common Pitfalls with solutions
- Other RxJS use cases
- What's going on with **reactivity** on the web?
- Resources

---

# RxJS keywords
- Observables
    - idea of an invokable collection of future values or events
    - https://benlesh.com/posts/learning-observable-by-building-observable/
- Observer
    - consumer of values delivered by an Observable
- Subscription
    - object that represents a disposable resource, usually the execution of an Observable
- Subjects
    - special type of Observable that allows values to be multicasted to many Observers
- Operators
    - async code composed in declarative manner

---

# Common Pitfalls with solutions #1
Nested subscriptions

```ts {all|1,2}
$observable.subscribe(item => {
  doSomething(item).subscribe(item2 => {
    ...
  });
});
```
<br>
Solution: higher-order operators

---

# Common Pitfalls with solutions #2
Subscription management, memory leaks

```ts {all|2,3,7,10}
export class AppComponent implements OnDestroy {
    subscription: Subscription;
    subscription2: Subscription;
    ...
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2) {
            this.subscription2.unsubscribe();
        }        
    }
}
```

Solutions: Async pipe, Destroy service,...

---

# Common Pitfalls with solutions #3
Avoid imperative approach (manual update, manual subscriptions handling)

```ts
this.something$.subsribe(value => {
    if (this.value) {
        this.lastestValue = this.value;
        this.allValues.push(this.value);
    }
    ...
})
}
```

Solution: Declarative approach

---

# Other pitfalls
- Replicating things from state management libraries
- Exposing subjects from read-only API
- Getters with observables (performance issues)

---

# More RxJS #1
RxJS stream definitions

Problem: RxJs streams are being re-created during component (or service) lifetime

Solution: Define whole RxJs stream from the start

```ts{all|1,4,8}
const allItems$ = this.someService.items$.pipe(
  filter(Boolean)
);
const completeditems$ = allItems$.pipe(
   map(items => items.filter(item => item.completed)),
);
const remainingItems$ = combineLatest(
  [allItems$, completeditems$]
).pipe(
   map(([items, completeditems]) => items - completeditems),
);
```

---

# More RxJS #2
Combining operators

Problem: Coordinating multiple inputs

Solution: Combination operators(combineLatest, forkJoin, ...) + debounce options

---

# More RxJS #3
Error handling

Problem: Error is not handled inside RxJS stream

Solution: catchError operator

---

# More RxJs #4
Side-effects

Problems:
- We need to debug RxJS stream
- We need to navigate to other page from Angular Router guard
- We need to store some things to local storage

Solution: **tap** operator

---

# More RxJs #5
Caching API responses

Problem: We need to retrieve data from API endpoint and we need to provide http header with api key

Solution: **Share** operator with **ReplaySubject**

---

# More RxJs #6
Carefull usage of conditonal operators (for example iff)

Problem: iif operator doesn't behave how we want

Solution: Use more simple approach

---

# More RxJs #7
Custom operator functions and custom operators

```ts
export function customOperatorFunction<T>(
    function1: (value: string) => Observable<readonly T[]>
): OperatorFunction<string, readonly T[] | null> {
    /** 
     * Source emits values to be proccessed in our local pipe
     */
    return source =>
        source.pipe(
            ...
        );
}
```

---

# Bonus: What's going on with **reactivity** on the web?
- Fine-grained reactivity
- Reactive primitives - Signals

---

# Bonus: What's going on with **reactivity** on the web?
- https://github.com/angular/angular/discussions/49090
    - Unified model for how data flows through an application
    - fully zoneless applications
    - Improved interoperability with reactive libraries
    - ...
- Angular 16 (POC with signals) - v16.0.0-next.0

---

# Resources
