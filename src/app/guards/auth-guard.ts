import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log(route.url);

  // recupere moi les informations de login
  // si oui je te laisse => true
  // sinon false

  return true;
};
