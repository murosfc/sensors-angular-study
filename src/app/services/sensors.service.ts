import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Sensor } from "../interfaces/sensor";

const API_URL = 'https://api-py-flask-study.vercel.app/api/v1/sensors';

@Injectable({ providedIn: 'root' })
export class SensorsService {
    private readonly http = inject(HttpClient);


    getSensors(): Observable<Sensor[]> {
        return this.http.get<Sensor[]>(`${API_URL}`).pipe(
            map((sensors) => sensors.map((sensor) => ({
                ...sensor,
                id: String(sensor.id),
                timestamp: new Date(sensor.timestamp)
            })).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()))
        );
    }

    updateSensor(sensor: Sensor): Observable<Sensor> {
        return this.http.patch<Sensor>(`${API_URL}/${sensor.id}`, sensor);
    }
}
