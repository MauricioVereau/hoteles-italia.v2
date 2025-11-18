import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '../../services/translate.service';
import { NavLinks } from "../../components/nav-links/nav-links";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, NavLinks, RouterLink],
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly translate = inject(TranslateService);
  protected readonly router = inject(Router);

  // Icon props used in template
  protected readonly iconLocation = faMapMarkerAlt;
  protected readonly iconPhone = faPhone;
  protected readonly iconFb = faFacebookF;
  protected readonly iconGm = faInstagram;

  // Links for the nav section (key -> translation key, path -> router path)
  protected readonly links = [
    { key: 'navbar.inicio', path: '/' },
    { key: 'navbar.habitaciones', path: '/habitaciones' },
    { key: 'navbar.turismo', path: '/turismo' },
    { key: 'navbar.contacto', path: '/contacto' },
  ];

  protected handleLinkClick(link: { key: string; path: string }) {
    // navigate and scroll to top
    this.router.navigate([link.path]).catch(() => {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected readonly currentYear = new Date().getFullYear();
}
