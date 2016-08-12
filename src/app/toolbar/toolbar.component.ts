import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {Router} from "@angular/router";
import {MATERIAL_DIRECTIVES} from "ng2-material";
import {MdRadioGroup, MdRadioButton, MdUniqueSelectionDispatcher} from "@angular2-material/radio";
import {MD_INPUT_DIRECTIVES} from "@angular2-material/input";

import {LoginService} from "../login/login.service";
import {PokemonListService} from "../pokemon-list/pokemon-list.service";
import {SpinnerService} from "../spinner/spinner.service";

// Toolbar component
@Component({
  template: require("./toolbar.component.html"),
  selector: "pg-toolbar",
  styles: [require("./toolbar.component.scss")],
  directives: [
    MATERIAL_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MdRadioGroup,
    MdRadioButton
  ],
  providers: [MdUniqueSelectionDispatcher]
})

export class ToolbarComponent implements OnInit {
  // Toolbar button events
  @Output() close = new EventEmitter();
  @Output() maximize = new EventEmitter();
  @Output() minimize = new EventEmitter();

  logued: boolean = false;
  sort_by: string = "date";
  search: string = "";

  constructor(
    private router: Router,
    private loginService: LoginService,
    private pokemonListService: PokemonListService,
    private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.loginService.loginChange$.subscribe((logued) => {
      this.logued = logued;
    });
  }

  closeWindow() {
    this.close.emit("event");
  }

  maximizeWindow() {
    this.maximize.emit("event");
  }

  minimizeWindow() {
    this.minimize.emit("event");
  }

  sortChanged(sort_by) {
    this.pokemonListService.sortPokemonList(sort_by);
  }

  filterByText() {
    console.log("filter by text");
    if (this.search.length > 3) {
      this.pokemonListService.filterByText(this.search);
    }
    else this.pokemonListService.filterByText("");
  }

  refresh() {
    this.spinnerService.show();
    this.search = "";
    this.sort_by = "date";
    this.pokemonListService.filterByText("");
    this.pokemonListService.getPokemonList().then(() => {
      this.spinnerService.hide();
    }).catch(() => {
      this.spinnerService.hide();
    });
  }

  logout() {
    this.search = "";
    this.sort_by = "date";
    this.pokemonListService.filterByText("");
    this.loginService.logout();
  }
}