import { Injectable } from "@angular/core";
import { Subject }    from "rxjs/Subject";

const pogobuf = require("pogobuf");
let pokedex = require("pokemon-go-pokedex");

import {LoginService} from "../login/login.service";

@Injectable()
export class PokemonListService {

  pokemon_list: Array<Object> = [];
  pokemon_list_filtered: Array<Object> = [];
  private current_sort = "iv";

  private pokemonListChange: Subject<Array<Object>> = new Subject<Array<Object>>();
  pokemonListChange$ = this.pokemonListChange.asObservable();

  constructor(private loginService: LoginService) {

  }

  getPokemonList() {
    return new Promise((resolve, reject) => {
      this.loginService.client.getInventory(0).then((inventory) => {

        if (inventory.inventory_delta && inventory.inventory_delta.inventory_items) {
          this.pokemon_list = inventory.inventory_delta.inventory_items.filter((item) => {
            return item.inventory_item_data.pokemon_data && item.inventory_item_data.pokemon_data.pokemon_id;
          }).map((item) => {

            let pokemon_data = item.inventory_item_data.pokemon_data;
            pokemon_data.perfection = ((pokemon_data.individual_attack +
              pokemon_data.individual_defense +
              pokemon_data.individual_stamina) * 100 / 45).toFixed(0);

            let pokemon_item = Object.assign({pokemon_data: pokemon_data}, _.find(pokedex.pokemon, (pok: any) => pok.id === pokemon_data.pokemon_id));

            // Convert type string to array types

            pokemon_item.type = pokemon_item.type.toLowerCase().split(" / ");
            pokemon_item.pokemon_data.creation_date = new Date(pokemon_item.pokemon_data.creation_time_ms);

            return pokemon_item;

          });

          this.sortPokemonList(this.current_sort);
          return resolve(this.pokemon_list);
        }
        else {
          this.pokemonListChange.next([]);
          return resolve([]);
        }
      }).catch((reason) => {
        reject(reason);
      });
    });
  }

  sortPokemonList(sort_by) {

    let working_list = this.pokemon_list_filtered.length > 0 ? this.pokemon_list_filtered : this.pokemon_list;
    switch (sort_by) {
      case  "iv":
        working_list.sort((a: any, b: any) => {
          return b.pokemon_data.perfection - a.pokemon_data.perfection;
        });
      break;

      case "cp":
        working_list.sort((a: any, b: any) => {
          return b.pokemon_data.cp - a.pokemon_data.cp;
        });
      break;

      case "number":
        working_list.sort((a: any, b: any) => {
          return a.pokemon_data.pokemon_id - b.pokemon_data.pokemon_id;
        });
      break;

      case "date":
        working_list.sort((a: any, b: any) => {
          return b.pokemon_data.creation_time_ms - a.pokemon_data.creation_time_ms;
        });
      break;

      case "name":
        working_list.sort((a: any, b: any) => {
          if (b.name < a.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        });
      break;
    }

    this.current_sort = sort_by;
    this.pokemonListChange.next(working_list);
  }

  filterByText(text) {
    if (text === "") {
      this.pokemon_list_filtered = [];
      this.sortPokemonList(this.current_sort);
    }
    else {
      this.pokemon_list_filtered = this.pokemon_list.filter((item: any) => {
        return new RegExp(text, "i").test(item.name);
      });

      return this.pokemonListChange.next(this.pokemon_list_filtered);
    }
  }

  refresh() {
    return this.getPokemonList();
  }
}