import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.userService.isLoggedIn) {
      if (this.userService.getUserPayLoad().admin) {
        this.router.navigateByUrl('/adminprofile');
      } else {
        this.router.navigateByUrl('/userprofile');
      }
    }
  }
  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        console.log(this.userService.getUserPayLoad());
        if (this.userService.getUserPayLoad().admin) {
          console.log('this is an admin trying to login!');
          this.router.navigateByUrl('/adminprofile');
        } else {
          this.router.navigateByUrl('/userprofile');
        }
      },
      err => {
        console.log(err);
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}
