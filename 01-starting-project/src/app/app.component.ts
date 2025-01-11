import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  private destroyRef = inject(DestroyRef);


  ngOnInit(): void {
    this.clickCount$.subscribe({
      next: (value) => console.log(value)
    });  

    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
  }

  onClicked(){
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
