import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  userDetails;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
      console.log(res);
      this.userDetails = res;
    },
    err => {
      console.log(err);
    });
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/signin']);
  }

  makeUserAdmin(e) {
    // const serverId = {
    //   '_id': e._id
    // };
    if (e.admin) {
      alert('this user is already an admin!');
    } else {
      this.userService.makeAdmin({'_id': e._id}).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        });
    }
  }

}
