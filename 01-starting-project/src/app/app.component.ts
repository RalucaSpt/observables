import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log(`clicked button ${this.clickCount()} times`);
    });
  }

  ngOnInit(): void {
    //   const subscription = interval(1000).pipe(
    //     map((val) => val * 2)
    //   ).subscribe({
    //   next: (value) => {
    //     console.log(value);
    //   }
    // });

    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
  }

  onClicked(){
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
