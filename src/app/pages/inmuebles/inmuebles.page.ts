import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Inmueble, NuevoInmueble } from 'src/app/Interfaces/Inmueble';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { StorageService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.page.html',
  styleUrls: ['./inmuebles.page.scss'],
})


export class InmueblesPage implements OnInit {

  constructor(private inmServ: InmuebleService, private storage: StorageService, private router: Router, private alertController: AlertController) { }
  public ver = false;

  inmuebleSolo : Inmueble = {
    direccion : '', 
    superficie:'',
    latitud : '',
    longitud: '',
    propietarioId: 6,
    propietario: null,
    id: 0,
    grupoId: 6,
  }

    nuevoInmueble : NuevoInmueble = {
    direccion : '', 
    superficie:'',
    latitud : '',
    longitud: '',
    propietarioId: 6,
    grupoId: 6,
  }


  inmueblese : Inmueble[] = [
    {
      direccion : '', 
      superficie:'',
      latitud : '',
      longitud: '',
      propietarioId: 6,
      propietario:null,
      id: 0,
      grupoId: 0,
    }
  ]
  i =0;

  ngOnInit() {
    this.VerInmuebles();
  }

  public async VerInmuebles(){
    const inmuebles : any=  await this.inmServ.getAllInmuebles().catch(err => {
      console.log('Error: ', err);
    });
    console.log('Inmuebles: ', inmuebles);

    for (let inmu of inmuebles){
      this.inmueblese[this.i] = inmu;
      //this.inmueble.direccion = inmu.direccion;
      this.inmueblese[this.i].direccion = inmu.direccion;
      this.inmueblese[this.i].superficie = inmu.superficie;
      this.inmueblese[this.i].latitud = inmu.latitud;
      this.inmueblese[this.i].longitud = inmu.longitud;
      this.inmueblese[this.i].propietarioId = inmu.propietarioId;
      this.inmueblese[this.i].propietario = inmu.propietario;
      this.inmueblese[this.i].id = inmu.id;
      this.inmueblese[this.i].grupoId = inmu.grupoId;
      
      this.i++;
    }
  }

  public async crearInmueble(){
    console.log('crear inmueble');
     await this.inmServ.CreateInmueble(this.nuevoInmueble).catch(err => {
      console.log('Error: ', err);return null;
    });
   location.reload();
  }

  public async ObtenerInmueble(id){
    const inmueble : any=  await this.inmServ.getInmueblePorId(id).catch(err => {
      console.log('Error: ', err); 
    });
    this.inmuebleSolo = inmueble;
    console.log('Inmueble obtenido. Listo para editar');
  }

  public async editarInmueble(){
    await this.inmServ.UpdateInmueble(this.inmuebleSolo).catch(err => {
      console.log('Error: ', err); return null;
    });
    location.reload();
  }


  public async eliminarInmueble(){
    await this.inmServ.deleteInmueble(this.inmuebleSolo.id).catch(err => {
      console.log('Error: ', err); return null;
    });
    location.reload();
  }


  async editarAlertConfirm() {
    const alert = await this.alertController.create({
      backdropDismiss:false,
      header: 'Eliminar inmeuble',
      message: 'Message <strong>¿Esta seguro que desea eliminar el inmueble? Esta acción no se puede deshacer.</strong>',
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
            this.eliminarInmueble();
          }
        }
      ]
    });   await alert.present();
  }

}