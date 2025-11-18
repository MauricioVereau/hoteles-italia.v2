import { Component, inject, signal } from '@angular/core';
import { BtnIdioma } from "../../components/btn-idioma/btn-idioma";
import { NavLinks } from "../../components/nav-links/nav-links";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [BtnIdioma, NavLinks, RouterLink],
  templateUrl: './navbar.html'
})
export class Navbar {
}
