import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Event } from '../../models/event.model';
import { Guest } from '../../models/guest.model';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class EventProvider {

  // Variables con los nombres de las colecciones utilizadas.
  eventCollectionName = 'events';
  guestCollectionName = 'guests';

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
  }

  /**
   * Método empleado para consultar todos los eventos almacenados.
   */
  getEvents(): Observable<Event[]> {
    return this.db.collection<Event>(this.eventCollectionName).valueChanges();
  }

  /**
   * Método empleado para almacenar un evento en la base de datos.
   * @param event Evento que será almacenado
   */
  addEvent(event: Event): Promise<any> {
    const id = this.db.createId();
    return this.db
      .collection(this.eventCollectionName)
      .doc(id)
      .set({ id, name: event.name, description: event.description, date: event.date, guestNumber: event.guestNumber });
  }

  /**
   * Método empleado para subir una imagen al storage y posteriormente almacenar un invitado.
   * @param eventId Id del evento al que se agregará el invitado.
   * @param guest Datos del invitado a almacenar.
   */
  addGuest(eventId: string, guest: Guest): Promise<any> {
    debugger;
    return this.storage.ref(`events/${eventId}/profile/${guest.name}`).putString(guest.picture, 'base64', { contentType: 'image/png' }).then(
      (data) => {
        // Se obtiene la URL de la imagen subida.
        const url = data.metadata.downloadURLs[0];
        // Se realiza el llamado al método que registra el invitado en el evento.
        return this.addGuestToEvent(eventId, guest, url);
      }, (error) => {
        console.log(error);
      });
  }

  /**
   * Método empleado para agregar un invitado a un evento.
   * @param eventId Id del evento al que se le agregará el invitado.
   * @param guest Datos del invitado a almacenar.
   * @param url URL de la imagen del invitado.
   */
  addGuestToEvent(eventId: string, guest: Guest, url: string): Promise<any> {
    const id = this.db.createId();
    return this.db.collection(this.eventCollectionName).doc(eventId).collection(this.guestCollectionName).doc(id).set({
      id, name: guest.name, url: url
    });
  }

  /**
   * Método empleado para obtener los invitados de un evento.
   * @param eventId Id del evento al que se le obtendrán los invitados.
   */
  getGuests(eventId): Observable<Guest[]> {
    return this.db.collection<Event>(this.eventCollectionName).doc(eventId).collection<Guest>(this.guestCollectionName).valueChanges();
  }

}
