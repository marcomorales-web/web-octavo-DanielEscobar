import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { InicioComponent } from './inicio/inicio';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inicio', component: InicioComponent }
];
