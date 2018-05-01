import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Event } from '../../models/event.model';
import { EventProvider } from '../../providers/event/event';
import { Guest } from '../../models/guest.model';

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  // Objeto que almacenará el evento detallado.
  event: Event = new Event();
  // Listado que contendrá los invitados del evento.
  guestsList$: Guest[];
  // Contador de invitados confirmados.
  guestCount: number = 0;
  // Contador de cupos disponibles para el evento.
  spaceAvailable: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventProvider: EventProvider) {
    // Se obtiene el evento proveniente por parámetros.
    this.event = navParams.get('event');
    // Se realiza la consulta de los invitados del evento.
    this.eventProvider.getGuests(this.event.id).subscribe((content) => {
      // Se sacan los datos: Listado de invitados, total invitados y cupos disponibles.
      this.guestsList$ = content;
      this.guestCount = this.guestsList$.length;
      this.spaceAvailable = this.event.guestNumber - this.guestCount;
    });
  }

  /**
   * Método empleado para agregar un invitado al evento.
   */
  addGuest(): void {
    // Se llama la página de agregar invitado enviando el id del evento
    const eventId = this.event.id;
    this.navCtrl.push('AddGuestPage', { eventId });
  }

}
