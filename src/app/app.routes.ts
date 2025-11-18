import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { TurismoPage } from './pages/turismo-page/turismo-page';
import { ContactoPage } from './pages/contacto-page/contacto-page';
import { HabitacionesPage } from './pages/habitaciones-page/habitaciones-page';
import { ReclamacionesPage } from './pages/reclamaciones-page/reclamaciones-page';

export const routes: Routes = [
  {
    path: '', component: HomePage
  },
  {
    path: 'habitaciones', component: HabitacionesPage
  },
  {
    path: 'contacto', component: ContactoPage
  },
  {
    path: 'turismo', component: TurismoPage
  },
  {
    path: 'libro-de-reclamaciones', component: ReclamacionesPage
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }

];
