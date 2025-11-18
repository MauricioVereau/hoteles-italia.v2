import { Component, inject, signal } from '@angular/core';
import { TranslateService } from '../../services/translate.service';
import { Comentarios } from "../../components/comentarios/comentarios";
import { Tarifas } from "../../components/tarifas/tarifas";

@Component({
  selector: 'app-habitaciones-page',
  imports: [Comentarios, Tarifas],
  standalone: true,
  templateUrl: './habitaciones-page.html'
})
export class HabitacionesPage {

  translate = inject(TranslateService);

  imgBanner = signal([
    { src: 'assets/img/habitaciones/banner.webp', alt: 'Banner Habitaciones' },
    { src: 'assets/img/habitaciones/banner2.webp', alt: 'Banner Habitaciones' },
    { src: 'assets/img/habitaciones/banner3.webp', alt: 'Banner Habitaciones' },
    { src: 'assets/img/habitaciones/banner4.webp', alt: 'Banner Habitaciones' }
  ]);

  currentImgBanner = signal(0);

  ngOnInit() {
    setInterval( () =>{
      const next = (this.currentImgBanner() + 1) % this.imgBanner().length;
      this.currentImgBanner.set(next);
    }, 4000);
  }
}
