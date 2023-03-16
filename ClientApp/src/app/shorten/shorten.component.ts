import { Component } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Time} from "@angular/common";

@Component({
  selector: 'app-shorten',
  templateUrl: './shorten.component.html',
})
export class ShortenComponent {
  private api_url:string='https://localhost:7130/getfullshorten';
  private delete_url:string = 'https://localhost:7130/api/Shorten/delete/';
  private http:HttpClient;
  public canDelete:boolean=false;
  public shorten:Shorten = {} as Shorten;
  private route:Router;

  constructor(private httpClient:HttpClient, rout: ActivatedRoute, route:Router) {
    if(sessionStorage.getItem('isAuthenticated')!=='true'){
      route.navigate(['/shortens'])
    }
    this.http=httpClient;
    const shortUrl = rout.snapshot.params['id'];
    const params = new HttpParams().set('shortUrl', shortUrl)
    this.route = route;
    this.http.get<Shorten>(this.api_url, {params}).subscribe((res:any) => {
      this.shorten=res;
      this.canDelete = this.CanDelete(this.shorten.createdBy.id);
    })
  }

  private CanDelete(ownerId:string ):boolean{
    return sessionStorage.getItem('role') === 'Admin' || sessionStorage.getItem('userId') === ownerId;
  }

  public async Delete(){
    const url = this.delete_url+this.shorten.id
    await this.http.delete(this.delete_url+this.shorten.id).subscribe((res:any)=>{

    });

    await this.route.navigate(['/shortens'])
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
