import { Component } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Time} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private api_url:string = 'https://localhost:7130/api/Authenticate/login';
  private http: HttpClient;
  public username:string='';
  public password:string = '';

  constructor(private router: Router,http:HttpClient) {
    this.http = http;
  }

  public Login(){
    if(this.username === '' || this.username === null || this.username === undefined ||
      this.password === '' || this.password === null || this.password === undefined){
      alert("Enter all fields")
      return;
    }

    const model: LoginModel = {
      username:this.username,
      password:this.password
    }

    this.http.post(this.api_url, model).subscribe( (response:any) => {
      if(response.status!==401){
        sessionStorage.setItem('isAuthenticated', 'true')
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userId', response.userId);
        sessionStorage.setItem('role', response.userRole);
      }else {
        alert("You haven`t been authorised")
      }
    }, (error) => {
      alert("Error happened. Try again");
    });

    this.router.navigate(['/shortens'])
  }
}

interface LoginModel{
  username:string;
  password:string;
}

interface LoginReturn{
  token:string;
  userId:string;
}
