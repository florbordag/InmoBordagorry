import { Component, OnInit } from '@angular/core';
import { Propietario } from 'src/app/Interfaces/Propietario';
import { PerfilService } from 'src/app/services/perfil.service';
import { StorageService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public habilitar= false;
  public cancel = false;
  constructor(private ServPerfil: PerfilService, private storage: StorageService) { }
  propietario: Propietario = {
    id: '',
    nombre: '',
    email: '',
    clave: '',
    telefono: '',
    grupoId: ''
  }
  
  ngOnInit() {
   this.VerProp() 
  }

  public habilitarEdicion(){

    
    this.habilitar = !this.habilitar;
    if (this.habilitar) {console.log('edicion habilitada'); }
    else {console.log('edicion deshabilitada'); }
  }

  public editar(){
    console.log('editar perfil');
    this.ServPerfil.setPerfil(this.propietario);

//    this.habilitar = !this.habilitar;
  }

  public async VerProp(){
    const perfil : any=  await this.ServPerfil.getPerfil().catch(err => {
      console.log('Error: ', err);
    });
    console.log('Perfil: ', perfil)
    this.propietario.nombre = perfil.nombre;
    this.propietario.clave = '';
    this.propietario.email = perfil.email;
    this.propietario.telefono = perfil.telefono;
    this.propietario.id = perfil.id;
    this.propietario.grupoId = perfil.grupoId;
   // como asigno ls partes del propietario?

  }

  

}
