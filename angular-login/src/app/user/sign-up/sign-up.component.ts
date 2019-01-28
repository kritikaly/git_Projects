import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
 // tslint:disable-next-line:max-line-length
 emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  serverErrorMessages: String;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }
// submit function utilizing the NgForm as the form type. if the message is succesful, set a timeout function
// that shows a succesful message for a brief amount of time (4 seconds) then reset the form
// if there is a validation error, grab the err.error message and display it, if theres another error, you'll get another error thrown

onSubmit(form: NgForm) {
  this.userService.postUser(form.value).subscribe(
    res => {
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 4000);
      this.resetForm(form);
    },
    err => {
      if (err.status === 422) {
        console.log(err.error);
        this.serverErrorMessages = err.error;
      } else {
        this.serverErrorMessages = 'something else is wrong, check your code bro';
      }
    }
  );
}

// a basic function that resets the form and any error message asccociated with http call
resetForm(form: NgForm) {
  this.userService.selectedUser = {
    fullName: '',
    email: '',
    password: ''
  };
  form.resetForm();
  this.serverErrorMessages = '';
}
}
