import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl='https://api.randomuser.me/';
  constructor(private http:HttpClient) { }

  
}
