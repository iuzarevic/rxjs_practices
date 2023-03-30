import { Component, OnInit } from '@angular/core';
import { delay, iif, mergeMap, Observable, of } from 'rxjs';

interface AnimalsQuery {
  topic: "dogs" | "cats"
  name: string;
}

@Component({
  selector: 'app-conditional-operators',
  templateUrl: './conditional-operators.component.html',
  styleUrls: ['./conditional-operators.component.scss']
})
export class ConditionalOperatorsComponent implements OnInit {
  constructor() {
  }
  catProducer = (item: string) => {
    console.log("catProducer");
  
    return of(`Cat: ${item}`).pipe(delay(2000));
  };
  
  dogProducer = (item: string) => {
    console.log("dogProducer");
  
    return of(`Dog: ${item}`).pipe(delay(2000));
  };

  animalsQuery: Observable<AnimalsQuery> = of<Array<AnimalsQuery>>(
    { topic: "dogs", name: "Miky" },
    { topic: "cats", name: "Kety" }
  )
  
  animals$ = this.animalsQuery.pipe(
    mergeMap(({ topic, name }) =>
      iif(
        () => topic === 'cats',
        this.catProducer(name),
        this.dogProducer(name)
      )
      // topic === "cats" ? this.catProducer(name) : this.dogProducer(name)
    )
  );

  ngOnInit(): void {

    this.animals$.subscribe(console.log);
  }
}
