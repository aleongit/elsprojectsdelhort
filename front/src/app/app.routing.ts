//importem mòduls pel routing angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importar components pel routing
import { HomeComponent } from './components/home/home.component';
import { Err404Component } from './components/err404/err404.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';


//array de routes
const appRoutes: Routes = [
    {path: '', component: AboutComponent},
    {path: 'home', component: AboutComponent},
    {path: 'about', component: AboutComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'create', component: CreateComponent},
    {path: 'project/:id', component: DetailComponent},
    {path: 'project/edit/:id', component: EditComponent},
    {path: 'contact', component: ContactComponent},
    
    //404 per path no trobat
    {path: '**', component: Err404Component},
]

//exportar el mòdul
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

//compte error, canviat ModuleWithProviders per ModuleWithProviders<any> 
//https://stackoverflow.com/questions/62755093/angular-error-generic-type-modulewithproviderst-requires-1-type-arguments