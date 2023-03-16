import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  private http:HttpClient;
  private api_url:string='https://localhost:7130/api/About';
  public isAdmin:boolean=false;
  public info:string = '';

  constructor(private httpClient:HttpClient) {
    this.isAdmin = sessionStorage.getItem('role')==='Admin'
    this.http=httpClient;
    this.http.get<string>(this.api_url).subscribe((res:any) => {
      this.info=res;
    })
  }

  Save(){
    const request = {
      newValue: this.info
    }
    this.http.post('https://localhost:7130/save', request).subscribe((res:any)=>
    {
      alert(res.status)
    })
  }
}
