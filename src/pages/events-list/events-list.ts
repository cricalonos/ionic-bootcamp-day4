import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { Event } from '../../models/event.model';

@IonicPage()
@Component({
  selector: 'page-events-list',
  templateUrl: 'events-list.html',
})
export class EventsListPage {

  // Variable que contiene el listado de eventos
  eventsList$: Event[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventProvide: EventProvider) {
    // Se realiza la consulta de los eventos.
    this.eventProvide.getEvents().subscribe(content => {
      this.eventsList$ = content;
    });
  }

  /**
   * Método empleado para redirigir a la página de creación de eventos.
   */
  goToCreatePage(): void {
    this.navCtrl.push('CreateEventPage');
  }

  /**
   * Método empleado para redirigir a la página de detalle de evento.
   * @param event Evento al que se le mostrará el detalle.
   */
  getDetailEvent(event: Event): void {
    this.navCtrl.push('EventDetailPage', { event });
  }

}
