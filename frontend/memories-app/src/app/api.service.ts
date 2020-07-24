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

    getUsers(): Observable<any> {
      const url = `${this.BASE_URL}/user/`;
      return this.http.get(url, this.getAuthHeaders() as any);
    }

    getUserDetail(id: number): Observable<any> {
      const url = `${this.BASE_URL}/user/${id}/`;
      return this.http.get(url, this.getAuthHeaders() as any);
    }

    postUserDetail(user): Observable<any> {
      const url = `${this.BASE_URL}/user/`;
      return this.http.post(url, user, this.getAuthHeaders() as any);
    }

    putUserDetail(id, user): Observable<any> {
      const url = `${this.BASE_URL}/user/${id}/`;
      return this.http.put(url, user, this.getAuthHeaders() as any);
    }

    deleteUserDetail(id: number): Observable<any> {
      const url = `${this.BASE_URL}/user/${id}/`;
      return this.http.delete(url, this.getAuthHeaders() as any);
    }
}
