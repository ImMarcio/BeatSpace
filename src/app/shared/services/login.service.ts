import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscribable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  base_url : string = "http://localhost:8081"
  
  constructor(private http : HttpClient) { }


 

}
