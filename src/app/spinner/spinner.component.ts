import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {SpinnerService} from "./spinner.service";

// Spinner Component
@Component({
  template: require("./spinner.component.html"),
  selector: "pg-spinner",
  styles: [require("./spinner.component.scss")]
})

export class SpinnerComponent implements OnInit {

  isLoading: boolean = false;

  constructor(
    private router: Router,
    private spinnerService: SpinnerService) {

    // Subscribe to loading change component to show or hide the spinner
    spinnerService.loadingChange$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnInit() {

  }

}