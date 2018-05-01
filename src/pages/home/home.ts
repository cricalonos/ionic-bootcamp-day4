import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { User } from '../../models/user.model';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public loginForm: FormGroup;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private authProvider: AuthProvider, public formBuilder: FormBuilder, private loadingCtrl: LoadingController) {

    // Se crean las reglas de validación del formulario de registro.
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  loginUserB() {

  }

  /**
   * Método empleado para realiar el registro y posterior logueo de un usuario nuevo.
   */
  loginUser() {
    // Se valida el formulario de ingreso
    if (this.loginForm.valid) {
      // Se muestra el loading durante el proceso de inserción.
      let loader = this.loadingCtrl.create({
        content: "Registrando usuario..."
      });
      loader.present();
      // Se crea el usuario que será almacenado.
      const newUser: User = new User();
      newUser.email = this.loginForm.value.email;
      newUser.password = this.loginForm.value.password;
      // Se llama el provider encargado de hacer el login.
      this.authProvider.loginUser(newUser).then(
        () => {
          // Se oculta el loader y se redirige al listado de eventos.
          loader.dismiss();
          this.navCtrl.setRoot('EventsListPage');
        }, error => {
          // Se oculta el loader y se muestra un mensaje de fallo.
          let alert = this.alertCtrl.create({
            title: 'Falló!',
            subTitle: 'Ha fallado el inicio de sesión, vuelve a intentarlo.',
            buttons: ['OK']
          });
          loader.dismiss();
          alert.present();
        });
    } else {
      // Se muestra un error por validación de formularios.
      let alert = this.alertCtrl.create({
        title: 'Datos incorrectos!',
        subTitle: 'Por favor verifica los datos de ingreso',
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
