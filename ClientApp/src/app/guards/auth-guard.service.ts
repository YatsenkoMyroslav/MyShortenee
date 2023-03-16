import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private router:Router, private JwtHelper:JwtHelperService) {

  }

  canActivate() {
    const token = sessionStorage.getItem('token');

    return true;
  }

}
