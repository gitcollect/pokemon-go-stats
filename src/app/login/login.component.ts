import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {MATERIAL_DIRECTIVES} from "ng2-material";
import {MdProgressCircle, MdSpinner} from "@angular2-material/progress-circle/progress-circle";
import {MD_INPUT_DIRECTIVES} from "@angular2-material/input";
import {FORM_DIRECTIVES} from "@angular/forms";

import {LoginService} from "./login.service";
import {SpinnerService} from "../spinner/spinner.service";

// Login Component
@Component({
  template: require("./login.component.html"),
  selector: "pg-login",
  styles: [require("./login.component.scss")],
  directives: [
    MATERIAL_DIRECTIVES,
    MdProgressCircle,
    MdSpinner,
    MD_INPUT_DIRECTIVES,
    FORM_DIRECTIVES]
})

export class LoginComponent implements OnInit {

  user: {
    email: string
    password: string
  } = {
    email: "",
    password: "",
  };

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
      console.log("Login sucessfull");
    }).catch((reason) => {
      this.spinnerService.hide();
      alert("Login no válido");
      this.user = {
        email: this.user.email,
        password: ""
      };
    });
  }

}