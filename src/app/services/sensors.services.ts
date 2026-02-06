import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Sensor } from "../interfaces/sensor";

const API_URL = 'https://api-py-flask-study.vercel.app/api/v1/sensors';

@Injectable({ providedIn: 'root' })
export class SensorsService {
    private readonly http = inject(HttpClient);


    getSensors() {
        return this.http.get<Sensor[]>(`${API_URL}`);
    }
}
