import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsListPage } from './events-list';

@NgModule({
  declarations: [
    EventsListPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsListPage),
  ],
})
export class EventsListPageModule {}
