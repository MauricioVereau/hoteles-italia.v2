import { Component, signal } from '@angular/core';
import { Comentario } from '../../interfaces/Comentario';

@Component({
  selector: 'app-comentarios',
  imports: [],
  templateUrl: './comentarios.html'
})
export class Comentarios {

  comentarios = signal<Comentario[]>([
    {
      nombre: 'Juan Pérez',
      fecha: 'Hace 2 semanas',
      estrellas: 5,
      comentario: 'La habitación estaba impecable, el servicio muy atento y la ubicación perfecta. ¡Recomendado!',
      foto: 'assets/img/comentarios/usuario-1.jpg'
    },
    {
      nombre: 'María López',
      fecha: 'Hace 1 mes',
      estrellas: 4,
      comentario: 'Muy buena experiencia, aunque el desayuno podría mejorar. El personal fue excelente.',
      foto: 'assets/img/comentarios/usuario-2.jpg'
    },
    {
      nombre: 'Carlos Fernández',
      fecha: 'Hace 3 meses',
      estrellas: 5,
      comentario: 'Me encantó todo, volveré sin duda alguna. La vista desde la habitación es increíble.',
      foto: 'assets/img/comentarios/usuario-3.jpg'
    },
    {
      nombre: 'Piero Salvador',
      fecha: 'Hace 3 meses',
      estrellas: 5,
      comentario: 'Me encantó todo, volveré sin duda alguna. La vista desde la habitación es increíble.',
      foto: 'assets/img/comentarios/usuario-4.jpg'
    },
    {
      nombre: 'Luis Silva',
      fecha: 'Hace 3 meses',
      estrellas: 5,
      comentario: 'Me encantó todo, volveré sin duda alguna. La vista desde la habitación es increíble.',
      foto: 'assets/img/comentarios/usuario-5.jpg'
    }
  ]);
}
