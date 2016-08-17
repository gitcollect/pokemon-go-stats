///<reference path="../../typings/index.d.ts"/>

import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {NgFor} from "@angular/common";
import {Router} from "@angular/router";

import {LoginService} from "./login/login.service";

// Electron mainWindow
let mainWindow = require("electron").remote.getGlobal("mainWindow");

@Component({
  selector: "pg-app",
  template: require("./app.component.html"),
  styles: [require("./app.component.scss")],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  pokemon_list: Array<Object> = [];

  constructor(
    private router: Router,
    private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.loginChange$.subscribe((logued) => {
      if (logued) this.router.navigate(["pokemon-list"]);
      else this.router.navigate(["login"]);
    });

    this.router.navigate(["login"]);
  }

  closeWindow() {
    mainWindow.close();
  }

  maximizeWindow() {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    }
    else {
      mainWindow.maximize();
    }
  }

  minimizeWindow() {
    mainWindow.minimize();
  }
}