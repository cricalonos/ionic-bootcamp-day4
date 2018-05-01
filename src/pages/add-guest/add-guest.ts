import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Guest } from '../../models/guest.model';
import { Camera } from '@ionic-native/camera';
import { EventProvider } from '../../providers/event/event';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-add-guest',
  templateUrl: 'add-guest.html',
})
export class AddGuestPage {

  // Objeto que contendrá la información que será almacenada.
  guestData: Guest = new Guest();
  // Variable que contendrá la img que se mostrará en pantalla.
  picture: string = "assets/imgs/img-perfil.jpg";

  public guestForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private eventProvider: EventProvider, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, private formBuilder: FormBuilder) {

    this.guestForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    })
  }

  /**
   * Método empleado para tomar la fotografía del invitado.
   */
  takePicture(): void {
    this.camera.getPicture({
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    }).then((imageData) => {
      // Se asigna la fotografía tomada al objeto que se almacenará.
      this.guestData.picture = imageData;
      // Se asigna la fotografía tomada a la imagen mostrada.
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, () => {
      // Se muestra error en caso de algún fallo.
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Ha ocurrido un error.',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  /**
   * Método empleado para agregar un invitado a el evento.
   */
  addGuest(): void {
    if (this.guestData.picture && this.guestForm.valid) {
      this.guestData.name = this.guestForm.value.name;
      // Se muestra un loading durante el proceso de almacenamiento.
      let loader = this.loadingCtrl.create({
        content: "Agregando invitado..."
      });
      loader.present();
      debugger;
      // Se realiza el llamado al método del provider envando los parámetros necesarios.
      this.eventProvider.addGuest(this.navParams.get('eventId'), this.guestData).then(
        (success) => {
          // Se oculta el loading y se muestra un mensaje de éxito
          let toast = this.toastCtrl.create({
            message: 'Invitado agregado con éxito!',
            duration: 3000
          });
          loader.dismiss();
          toast.present();
          // Se retorna a la página de detalle evento.
          this.navCtrl.pop();
        }, (error) => {
          // Se presenta el mensaje de error.
          let toast = this.toastCtrl.create({
            message: 'Se ha presentado un error!',
            duration: 3000
          });
          loader.dismiss();
          toast.present();
        });
    } else {
      // Se muestra error en caso de no ser un formulario válido.
      let alert = this.alertCtrl.create({
        title: 'Datos incorrectos!',
        subTitle: 'Por favor verifica el nombre y la foto del invitado',
        buttons: ['OK']
      });
      alert.present();
    }

  }

}
