import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router, Routes } from "@angular/router";

import { BaMenuService } from "../theme";
import { PAGES_MENU } from "./pages.menu";

@Component({
  selector: "pages",
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right" translate>Created on <i class="ion-earth" style="color: blue;"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="#" >Steve Mieskoski</a> 2017</div>
        <ul class="al-share clearfix">
        </ul>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages implements OnInit{

  constructor(private _menuService: BaMenuService) {

  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
