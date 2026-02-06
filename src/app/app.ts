import { Component, signal } from '@angular/core';
import { Sensors } from './sensors/sensors';

@Component({
  selector: 'app-root',
  imports: [Sensors],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sensors-angular-study');

}
