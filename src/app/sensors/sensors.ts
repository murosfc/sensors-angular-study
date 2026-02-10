import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Sensor } from '../interfaces/sensor';
import { SensorsService } from '../services/sensors.service';

@Component({
  selector: 'app-sensors',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './sensors.html',
  styleUrl: './sensors.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sensors implements OnDestroy {
  private readonly sensorsService = inject(SensorsService);
  private readonly fb = inject(FormBuilder);
  private readonly subscription = new Subscription();

  readonly sensors = signal<Sensor[]>([]);
  readonly selectedSensorIndex = signal<number | null>(null);

  readonly sensorForm = this.fb.group({
    id: [{ value: '', disabled: true }],
    value: [0, [Validators.required]],
    timestamp: ['', [Validators.required]],
  });

  constructor() {
    this.initSensors();

    effect(() => {
      const sensors = this.sensors();
      const index = this.selectedSensorIndex();
      if (index !== null && index < sensors.length) {
        const sensor = sensors[index];
        this.sensorForm.patchValue({
          id: sensor.id,
          value: sensor.value,
          timestamp: sensor.timestamp.toISOString().slice(0, 16),
        });
      }
    });
  }

  private initSensors() {
    const sub = this.sensorsService.getSensors().subscribe((sensors) => {
      this.sensors.set(sensors);
    });
    this.subscription.add(sub);
  }

  onSelectSensor(event: Event) {
    const target = event.target as HTMLSelectElement;
    const index = Number(target.value);
    const sensor = this.sensors()[index];

    if (sensor) {
      this.selectedSensorIndex.set(index);
    } else {
      this.selectedSensorIndex.set(null);
      this.sensorForm.reset();
    }
  }

  onCancel() {
    this.sensorForm.reset();
    this.selectedSensorIndex.set(null);
    // potential logic to reset select if needed, handled by UI binding usually
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
