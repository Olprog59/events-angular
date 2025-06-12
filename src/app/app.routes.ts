import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { EventComponent } from './components/event/event.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: EventComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
