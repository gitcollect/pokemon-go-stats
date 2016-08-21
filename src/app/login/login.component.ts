import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {LoginService} from "./login.service";
import {SpinnerService} from "../spinner/spinner.service";

// Login Component
@Component({
  template: require("./login.component.html"),
  selector: "pg-login",
  styles: [require("./login.component.scss")]
})

export class LoginComponent implements OnInit {

  user: {
    email: string
    password: string
  } = {
    email: "",
    password: "",
  };

  error: string = "";

  constructor(
    private router: Router,
    private loginService: LoginService,
    private spinnerService: SpinnerService) {

  }

  ngOnInit() {

  }

  onSubmit() {
    this.spinnerService.show();
    this.loginService.login(this.user.email, this.user.password).then(() => {
      this.error = "";
      console.log("Login sucessfull");
    }).catch((reason: Error) => {

      this.spinnerService.hide();
      if (reason.message.includes("403")) {
        this.error = "Error 403: Could not login with the provided email and password";
      }
      else {
        this.error = reason.message;
      }

      console.log(reason);
      this.user = {
        email: this.user.email,
        password: ""
      };
    });
  }

}