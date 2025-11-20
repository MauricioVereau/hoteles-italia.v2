import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { SocialLinks } from "../interfaces/SocialLinks";

export const SOCIALLINKS_DATA: SocialLinks[] = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/',
    icon: faInstagram,
    gradient: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
    desc: 'redes.instagram'
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: faFacebook,
    gradient: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), linear-gradient(45deg,#1877f2,#3b5998)',
    desc: 'redes.facebook'
  },
  {
    name: 'Booking',
    url: 'https://booking.com',
    icon: faBook,
    gradient: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), linear-gradient(45deg,#003580,#0059b3,#0071c2,#feba02)',
    desc: 'redes.booking'
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/51999999999',
    icon: faWhatsapp,
    gradient: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), linear-gradient(45deg,#25D366,#128C7E)',
    desc: 'redes.whatsapp'
  }
];
