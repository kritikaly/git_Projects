import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.userService.isLoggedIn()) {
        console.log('access denied!');
        this.router.navigateByUrl('/signin');
        this.userService.deleteToken();
        return false;
      } else if (!this.userService.isAdminLoggedIn) {
        console.log('access denied! user is not admin');
        return false;
      } else {
        return true;
      }
  }
}
