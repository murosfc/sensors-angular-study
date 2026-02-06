import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sensor } from '../interfaces/sensor';
import { SensorsService } from '../services/sensors.services';

@Component({
  selector: 'app-sensors',
  imports: [DatePipe],
  templateUrl: './sensors.html',
  styleUrl: './sensors.scss',
})
export class Sensors implements OnDestroy {
  private readonly sensorsService = inject(SensorsService);
  private readonly subscription = new Subscription();

  readonly sensors = signal<Sensor[]>([]);

  constructor() {
    this.subscription = this.sensorsService.getSensors().subscribe((sensors) => {
      this.sensors.set(sensors);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
