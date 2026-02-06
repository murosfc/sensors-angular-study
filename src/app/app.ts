import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sensors } from './sensors/sensors';

@Component({
  selector: 'app-root',
  imports: [Sensors, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sensors-angular-study');

}
