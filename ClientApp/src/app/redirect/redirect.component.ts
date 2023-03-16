import { Component } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
})
export class RedirectComponent {
  private http:HttpClient;
  private fullUrl:string = '';
  private api_url:string= 'https://localhost:7130/getfullurl';

  constructor(private httpClient:HttpClient, route: ActivatedRoute) {
    this.http = httpClient;
    const id = route.snapshot.params['id'];
    const params = new HttpParams().set('shortUrl', id)

    this.http.get<string>(this.api_url, {params}).subscribe((res:any) => {
      this.fullUrl=res;
      window.open(this.fullUrl)
    })

  }
}
