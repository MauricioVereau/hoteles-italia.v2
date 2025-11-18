import { NgStyle } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faStar,
  faLocationDot,
  faPhone,
  faInfoCircle,
  faWifi,
  faConciergeBell,
  faBath,
  faTint,
  faFan,
  faBroom,
  faVideo,
  faSuitcase,
  faDoorOpen,
  faDoorClosed
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { TranslateService } from '../../services/translate.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgStyle, FontAwesomeModule, RouterLink],
  templateUrl: './home-page.html'
})
export class HomePage {

  title = 'Hotel Italia';

  // Iconos
  iconStart = faStar;
  iconLocation = faLocationDot;
  iconTelf = faPhone;
  iconWsp = faWhatsapp;
  iconInfo = faInfoCircle;
  iconOpen = faDoorOpen;
  iconClose = faDoorClosed;

  // Servicios
  services = [
    { icon: faWifi, titleKey: 'home.wifi', descriptionKey: 'home.wifiDesc' },
    { icon: faBath, titleKey: 'home.bath', descriptionKey: 'home.bathDesc' },
    { icon: faTint, titleKey: 'home.water', descriptionKey: 'home.waterDesc' },
    { icon: faFan, titleKey: 'home.fan', descriptionKey: 'home.fanDesc' },
    { icon: faBroom, titleKey: 'home.cleaning', descriptionKey: 'home.cleaningDesc' },
    { icon: faVideo, titleKey: 'home.security', descriptionKey: 'home.securityDesc' },
    { icon: faConciergeBell, titleKey: 'home.reception', descriptionKey: 'home.receptionDesc' },
    { icon: faSuitcase, titleKey: 'home.luggage', descriptionKey: 'home.luggageDesc' }
  ];

  images = signal([
    { src: 'assets/img/inicio/recepcion-arica1.webp', alt: 'Imagen 1' },
    { src: 'assets/img/inicio/recepcion-arica2.webp', alt: 'Imagen 2' },
    { src: 'assets/img/inicio/recepcion-7enero1.webp', alt: 'Imagen 3' },
    { src: 'assets/img/inicio/recepcion-7enero2.webp', alt: 'Imagen 4' },
  ]);

  currentImgIndex = signal(0);

  translate = inject(TranslateService);

  ngOnInit() {
    setInterval(() => {
      const next = (this.currentImgIndex() + 1) % this.images().length;
      this.currentImgIndex.set(next);
    }, 5000)
  }

}
