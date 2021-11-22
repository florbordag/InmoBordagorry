import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente } from './Interfaces/Componente';
import { DataService } from './services/data.service';
import { StorageService } from './services/storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  rutas: Observable<Componente[]>;

  constructor(private dataSvc: DataService, private storage : StorageService, private alertController: AlertController) { }

  ngOnInit() {
    this.rutas = this.dataSvc.getMenuOpts();
  }

  CerrarSesion(){
    this.storage.clear();
  }


  async editarAlertConfirm() {
    const alert = await this.alertController.create({
      backdropDismiss:false,
      header: 'Cerrar Sesión',
      message: 'Message <strong>¿Desea salir de la aplicación?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.CerrarSesion();
            location.reload();
          }
        }
      ]
    });   await alert.present();
  }
  
}
