import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing'; //per routing
import { HttpClientModule } from '@angular/common/http';


//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { Err404Component } from './components/err404/err404.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Err404Component,
    AboutComponent,
    ProjectsComponent,
    CreateComponent,
    ContactComponent,
    DetailComponent,
    EditComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    routing, //per routing
    HttpClientModule,
    ],

  providers: [
    appRoutingProviders //per routing
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
