import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = "https://reqres.in/api";

  constructor(
    private http: HttpClient
  ) { }

  get(path, params={}){
    return this.http.get(`${this.apiUrl}${path}`, {params});
  }

  post(path, body={}, params={}){
    return this.http.post(`${this.apiUrl}${path}`, body, {params});
  }
}
