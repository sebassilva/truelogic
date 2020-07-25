import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://localhost:8000/api';
  private httpHeaders: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json');

  private options = {
      headers: this.httpHeaders,
      responseType: 'json'
    };

    constructor(private http: HttpClient) {
    }

    getAuthHeaders(){
      const accessToken = JSON.parse(localStorage.getItem('user')).access;
      const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);
      const options = {
            headers: httpHeaders,
            responseType: 'json',
          };
      return options;
    }

    login(data): Observable<any> {
      const url = `${this.BASE_URL}/token/`;
      return this.http.post(url, data, this.options as any);
    }

    register(data): Observable<any> {
      const url = `${this.BASE_URL}/user/`;
      return this.http.post(url, data, this.options as any);
    }

    getMemories(): Observable<any> {
      const url = `${this.BASE_URL}/memory/`;
      return this.http.get(url, this.getAuthHeaders() as any);
    }

    getMemory(id: number): Observable<any> {
      const url = `${this.BASE_URL}/memory/${id}/`;
      return this.http.get(url, this.getAuthHeaders() as any);
    }

    postMemory(memory): Observable<any> {
      const url = `${this.BASE_URL}/memory/`;
      return this.http.post(url, memory, this.getAuthHeaders() as any);
    }

    deleteMemory(id: number): Observable<any> {
      const url = `${this.BASE_URL}/memory/${id}/`;
      return this.http.delete(url, this.getAuthHeaders() as any);
    }
}
