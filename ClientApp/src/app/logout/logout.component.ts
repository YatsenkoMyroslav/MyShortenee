import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent {
  private api_url:string = 'https://localhost:7130/api/Authenticate/logout';

  constructor(private router: Router,http:HttpClient) {
    const token = localStorage.getItem('token');
    sessionStorage.setItem('isAuthenticated', 'false')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')
    let head_obj = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    http.post(this.api_url, '',{headers:head_obj});

    this.router.navigate(['shortens'])
  }
}
