import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioIdGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  constructor(private storage: StorageService, private router : Router, private alertController: AlertController ){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      //Verificar si el usuario esta logeado, si no redirecciona a login
      const token = await this.storage.getToken();
      if (token != null) {return true; }
      else { this.presentAlert(); this.router.navigate(['/login']);
    return false;} 
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      backdropDismiss:false,
      header: 'Error',
      message: 'Debe logearse para usar esta aplicación.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
