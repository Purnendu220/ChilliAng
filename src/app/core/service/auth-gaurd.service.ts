import  {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { LocalStorageService } from './local-storage.service';


@Injectable()
export class AuthGuardService  implements CanActivate{

  constructor( private router : Router ) {
  }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
    if(LocalStorageService.isLoggedIn()) {
      console.log("Logged In");
      return true;
    }
    else {
      console.log("Logged Out");

      this.router.navigate(['/login'])
      //return true;
    }

  }
}
