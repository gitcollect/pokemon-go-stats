import { Injectable } from "@angular/core";
import { Subject }    from "rxjs/Subject";

const pogobuf = require("pogobuf");

@Injectable()
export class LoginService {

  private googleLogin = new pogobuf.GoogleLogin();
  public client = new pogobuf.Client();
  private token = null;

  public logued = false;

  private loginChange: Subject<boolean> = new Subject<boolean>();
  loginChange$ = this.loginChange.asObservable();

  login(username, password) {
    return new Promise((resolve, reject) => {
      this.googleLogin.login(username, password)
        .then(token => {
          this.token = token;
          this.client.setAuthInfo("google", token);
          return this.client.init().then(() => {
            this.logued = true;
            this.loginChange.next(true);
            resolve();
          }).catch((reason) => {
            reject(reason);
          });
        })
        .catch((reason) => {
          return reject(reason);
        });
    });
  }

  logout() {
    this.token = null;
    this.logued = false;
    this.googleLogin = new pogobuf.GoogleLogin();
    this.client = new pogobuf.Client();

    this.loginChange.next(false);
  }
}