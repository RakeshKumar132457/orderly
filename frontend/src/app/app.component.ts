import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorDisplayComponent } from './shared/components/error-display/error-display.component';
import { NavComponent } from './shared/components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ErrorDisplayComponent, NavComponent],
  template: `
    <app-error-display></app-error-display>
    <app-nav></app-nav>
    <main class="p-4">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  title = 'Work Order Management';
}