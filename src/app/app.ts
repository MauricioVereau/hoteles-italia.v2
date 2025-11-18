import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/navbar/navbar";
import { Footer } from "./shared/footer/footer";
import { faConciergeBell } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { ModalRedes } from "./shared/modal-redes/modal-redes";
import { ModalReserva } from "./shared/modal-reserva/modal-reserva";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, FaIconComponent, ModalRedes, ModalReserva],
  schemas:[],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('Hoteles Italia');

  iconBell = faConciergeBell;
}
