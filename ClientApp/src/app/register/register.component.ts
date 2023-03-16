import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private api_url:string = 'https://localhost:7130/api/Authenticate/register';
  private http: HttpClient;
  public username:string='';
  public email:string = '';
  public password:string = '';
  public repeatpassword:string = '';

  constructor(private router: Router,http:HttpClient) {
    this.http = http;
  }


  public Create(){
    if(this.password!==this.repeatpassword){
      alert("Repeat password doesn`t match")
      return;
    }
    if(this.username === '' || this.username === null || this.username == undefined ||
      this.email === '' || this.email === null || this.email == undefined ||
      this.password === '' || this.password === null || this.password == undefined){
      alert("Enter all data")
      return;
    }

    const model:RegisterModel = {
      Username: this.username,
      Email:this.email,
      Password:this.password
    }

    this.http.post(this.api_url, model).subscribe( (response) => {
      alert("Successfully created");
    }, (error) => {
      alert("Error happened. Try again");
    });
    this.router.navigate(['/login'])
  }
}

interface RegisterModel{
  Username:string;
  Email:string;
  Password:string;
}
