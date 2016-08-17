import { Routes, RouterModule } from "@angular/router";

import {LoginComponent} from "./login/login.component";
import {PokemonListComponent} from "./pokemon-list/pokemon-list.component";


const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "pokemon-list",
    component: PokemonListComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);
