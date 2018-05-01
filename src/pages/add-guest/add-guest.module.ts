import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGuestPage } from './add-guest';

@NgModule({
  declarations: [
    AddGuestPage,
  ],
  imports: [
    IonicPageModule.forChild(AddGuestPage),
  ],
})
export class AddGuestPageModule { }
