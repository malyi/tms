import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';

import {NavbarModule, WavesModule, ButtonsModule, DropdownModule, PopoverModule, ModalModule, TooltipModule} from 'angular-bootstrap-md';

import {CoreModule} from './shared/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import {ReactiveFormsModule} from '@angular/forms';
import { GmapComponent } from './components/gmap/gmap.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import {NotificationsModule} from './components/notifications/notifications.module';
import {FilterPipe} from './shared/pipes/search.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    FooterComponent,
    ContactComponent,
    GmapComponent,
    NotificationsComponent,
    FilterPipe
  ],
  imports: [
    CoreModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    DropdownModule.forRoot(),
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBWREXXiXLIXlgr-miOKBcqvcp8QQ0_oxM'
    }),
    NotificationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
