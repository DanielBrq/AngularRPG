import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-not-found',
  styles: '',
  template: `
  <div class="flex w-full justify-center items-center h-screen">
    <h1 class="text-6xl text-amber-800 font-semibold">Not Found</h1>
  </div>
  `,
})
export class NotFound { }
