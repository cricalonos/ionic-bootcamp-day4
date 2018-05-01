import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Event } from '../../models/event.model';
import { EventProvider } from '../../providers/event/event';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {
  // Se genera la fecha mínima permitida.
  minDate = new Date().toISOString();
  public createEventForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventProvider: EventProvider, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private formBuilder: FormBuilder, private alertCtrl: AlertController) {

    // Se crean las reglas del formulario de creación de eventos.
    this.createEventForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      date: ['', Validators.required],
      guestNumber: ['', Validators.compose([Validators.required, Validators.min(1)])]
    });
  }

  /**
   * Método empleado para realizar la creación de un evento.
   */
  createEvent(): void {
    if (this.createEventForm.valid) {
      // Se muestra el loading mientras se realiza el registro.
      let loader = this.loadingCtrl.create({
        content: "Creando evento..."
      });
      loader.present();

      // Se crea el evento que será almacenado en base de datos.
      const newEvent: Event = new Event();
      newEvent.name = this.createEventForm.value.name;
      newEvent.description = this.createEventForm.value.description;
      newEvent.date = this.createEventForm.value.date;
      newEvent.guestNumber = this.createEventForm.value.guestNumber;

      // Se llama el provider que contiene el método para agregar el evento
      this.eventProvider.addEvent(newEvent).then(
        () => {
          // Se muestra el toast de éxito, se oculta el loading y se redrige al listado de eventos
          let toast = this.toastCtrl.create({
            message: 'Evento creado con éxito!',
            duration: 3000
          });
          loader.dismiss();
          toast.present();
          this.navCtrl.pop();
        }, (error) => {
          // Se muestra el mensaje de error
          let toast = this.toastCtrl.create({
            message: 'Se ha presentado un error!',
            duration: 3000
          });
          loader.dismiss();
          toast.present();
        }
      );
    } else {
      // Se muestra error en caso de no ser un formulario válido.
      let alert = this.alertCtrl.create({
        title: 'Datos incorrectos!',
        subTitle: 'Por favor verifica los datos del evento',
        buttons: ['OK']
      });
      alert.present();
    }
  }

}
