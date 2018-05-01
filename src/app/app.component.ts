import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private angularFireAuth: AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // Se valida si existe sesión ya iniciada en la aplicación.
    const as = this.angularFireAuth.authState.subscribe((user) => {
      if (!user) {
        // En caso de no existir se redirige al home para su logueo
        this.rootPage = HomePage;
        as.unsubscribe();
      } else {
        // Si existe sesión se redirige a el listado de eventos.
        this.rootPage = 'EventsListPage';
        as.unsubscribe();
      }
    });

  }
}

