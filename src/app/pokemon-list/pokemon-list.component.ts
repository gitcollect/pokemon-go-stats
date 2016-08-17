import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
const pogobuf = require("pogobuf");

import {PokemonListService} from "./pokemon-list.service";
import {SpinnerService} from "../spinner/spinner.service";

// Pokemon List Component
@Component({
  template: require("./pokemon-list.component.html"),
  selector: "pg-pokemon-list",
  styles: [require("./pokemon-list.component.scss")]
})

export class PokemonListComponent implements OnInit {

  pokemon_list: Array<Object> = [];
  show_details: Boolean = false;
  selected_pokemon: any = {
    pokemon_data: {}
  };

   constructor(
    private router: Router,
    private pokemonListService: PokemonListService,
    private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.show();
    this.pokemonListService.getPokemonList().then((pokemon_list: any) => {

        console.log(pokemon_list);
        this.pokemon_list = pokemon_list;
        this.pokemonListService.pokemonListChange$.subscribe((pokemon_list) => {
          this.pokemon_list = pokemon_list;
        });

        this.spinnerService.hide();

    }).catch((reason) => {
      console.log("Error getting inventory: " + reason);
    });
  }

  showDetails(pokemon: any) {
    this.selected_pokemon = pokemon;
    this.show_details = true;
  }
}