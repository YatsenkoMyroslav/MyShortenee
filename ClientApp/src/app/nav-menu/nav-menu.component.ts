import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  public isAuthenticated?: boolean;

  constructor(private route:Router) {
    this.isAuthenticated = sessionStorage.getItem('isAuthenticated') == 'true';
  }

  ngOnInit():void{
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        this.isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
      }
    })
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
