import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'https://workoutlogger3.000webhostapp.com/models/';
  // private baseUrl = 'http://127.0.0.1/workout-logger-php/models/';

  constructor(private http: HttpClient) {}

  getData(destinationUrl: string) {
    return this.http.get(this.baseUrl + destinationUrl);
  }

  postData(data: any, destinationUrl: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.baseUrl + destinationUrl, data, { headers });
  }
}
