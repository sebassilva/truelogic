import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MemoriesComponent } from './memories/memories.component';
import { MapComponent } from './map/map.component';
import { MemoryListComponent } from './memory-list/memory-list.component';
import { MemoryCreateComponent } from './memory-create/memory-create.component';

import { GoogleMapsModule } from '@angular/google-maps'



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    MemoriesComponent,
    MapComponent,
    MemoryListComponent,
    MemoryCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
