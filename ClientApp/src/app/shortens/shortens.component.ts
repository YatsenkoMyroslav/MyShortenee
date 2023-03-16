import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Time} from "@angular/common";

@Component({
  selector: 'app-shortens',
  templateUrl: './shortens.component.html',
})
export class ShortensComponent {
  private http:HttpClient;
  private api_url:string='https://localhost:7130/all';
  public shortens:Shorten[] = [];

  constructor(private httpClient:HttpClient, route:Router) {
    this.http=httpClient;

    httpClient.get<Shorten[]>(this.api_url).subscribe(res => {
      this.shortens=res
    }, error => console.error(error));
  }
}

interface Shorten{
  id:bigint;
  shortUrl:string;
  fullUrl : string;
  createdBy : UserDto;
  createdAt:Time;
  shortenName:string;
  shortenDescription:string;
}

interface UserDto{
  id : string;
  email : string;
  userName : string;
}
