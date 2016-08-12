///<reference path="../../typings/index.d.ts"/>

import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component, OnInit, ElementRef, ViewEncapsulation, Pipe, PipeTransform} from "@angular/core";
import {NgFor} from "@angular/common";
import {MATERIAL_BROWSER_PROVIDERS} from "ng2-material";
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material";
import {MdProgressCircle, MdSpinner} from "@angular2-material/progress-circle/progress-circle";
import {MdRadioGroup, MdRadioButton} from "@angular2-material/radio";
import {Router, ROUTER_DIRECTIVES, provideRouter, RouterConfig } from "@angular/router";
import {disableDeprecatedForms, provideForms} from "@angular/forms";
import * as _ from "lodash";

// Electron mainWindow
let mainWindow = require("electron").remote.getGlobal("mainWindow");

// Components
import {LoginComponent} from "./login/login.component";
import {SpinnerComponent} from "./spinner/spinner.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {PokemonListComponent} from "./pokemon-list/pokemon-list.component";

// Services
import {LoginService} from "./login/login.service";
import {SpinnerService} from "./spinner/spinner.service";
import {PokemonListService} from "./pokemon-list/pokemon-list.service";

export const routes: RouterConfig = [
  {path: "login",  component: LoginComponent},
  {path: "pokemon-list", component: PokemonListComponent}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

@Component({
  selector: "pg-app",
  directives: [
    MATERIAL_DIRECTIVES,
    ROUTER_DIRECTIVES,
    MdProgressCircle,
    MdRadioGroup,
    MdRadioButton,
    LoginComponent,
    SpinnerComponent,
    ToolbarComponent,
    PokemonListComponent],
  providers: [
    MATERIAL_PROVIDERS,
    LoginService,
    SpinnerService,
    PokemonListService],
  template: require("./app.component.html"),
  styles: [require("./app.scss")],
  encapsulation: ViewEncapsulation.None
})

export default class App implements OnInit {

  pokemon_list: Array<Object> = [];

  constructor(
    private router: Router,
    private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.loginChange$.subscribe((logued) => {
      if (logued) this.router.navigate(["/pokemon-list"]);
      else this.router.navigate(["/login"]);
    });

    this.router.navigate(["/login"]);
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

bootstrap(App, [MATERIAL_BROWSER_PROVIDERS, APP_ROUTER_PROVIDERS,
  disableDeprecatedForms(),
  provideForms()]);