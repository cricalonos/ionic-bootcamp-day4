import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/user.model';

@Injectable()
export class AuthProvider {

  // Nombre de la colección donde se almacenarán los usuarios registrados.
  collectionName = 'user';

  /**
  * Constructor de la clase en el que se inyecta la dependencia a AngularFirestore.
  */
  constructor(private angularAuth: AngularFireAuth, private db: AngularFirestore) {
  }

  /**
   * Método empleado para ralizar la creación de un usuario y su posterior inicio de sesión.
   */
  loginUser(user: User): Promise<any> {
    return this.angularAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

}
