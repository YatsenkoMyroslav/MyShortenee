import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-addshorten',
  templateUrl: './addshorten.component.html',
})
export class AddshortenComponent {
  public api_url='https://localhost:7130/create';
  private route: Router;
  public url:string='';
  public shortenName:string='';
  public shortenDescription:string='';


  constructor(private http:HttpClient, route:Router) {
    if(sessionStorage.getItem('isAuthenticated')!=='true'){
      route.navigate(['']);
    }
    this.http = http;
    this.route=route
  }

  public Create(){

    if(this.url === '' || this.url == null
      || this.shortenName === '' || this.shortenName == null
      || this.shortenDescription === '' || this.shortenDescription == null){
      alert("Enter all information");
      return;
    }

    const shorten:ShortenCreation = {
      FullUrl:this.url,
      ShortenName:this.shortenName,
      ShortenDescription:this.shortenDescription
    }

    const token = localStorage.getItem('token');

    let head_obj = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post(this.api_url, shorten, {headers:head_obj}).subscribe((response:any)=>{
    })
    this.route.navigate(['shortens'])
  }
}

interface ShortenCreation{
  FullUrl:string;
  ShortenName:string;
  ShortenDescription:string;
}
