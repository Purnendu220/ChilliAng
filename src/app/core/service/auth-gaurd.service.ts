import  {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { LocalStorageService } from './local-storage.service';


@Injectable()
export class AuthGuardService  implements CanActivate{

  constructor( private router : Router ) {
  }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
    if(LocalStorageService.isLoggedIn()) {
      return true;
    }
    else {
      //this.router.navigate(['/'])
      return true;
    }

  }
}
