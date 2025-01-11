import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });
  customInterval$ = new Observable((subscriber) => {
    let timeExecuted = 0;
    const interval = setInterval(() => {
      if(timeExecuted > 5){
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value...');
      subscriber.next({message: 'New value'});
      timeExecuted++;
    }, 2000);
  });
  private destroyRef = inject(DestroyRef);


  ngOnInit(): void {
    this.clickCount$.subscribe({
      next: (value) => console.log(value)
    });  

    this.customInterval$.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Completed')
    });
  }

  onClicked(){
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
