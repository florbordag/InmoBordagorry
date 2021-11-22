import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componente } from '../Interfaces/Componente';
import { LoginView } from '../Interfaces/LoginView';
import { StorageService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpCliente: HttpClient, private storage: StorageService) { }

  public getMenuOpts(){
    return this.httpCliente.get<Componente[]>('/assets/data/opciones.menu.json')
  }

  public login(credenciales: LoginView) : Promise<string> {

    //enviar peticion http con credenciales
    return new Promise<string>((resolve, reject) =>
    this.httpCliente.post('http://practicastuds.ulp.edu.ar/api/propietarios/login',
    credenciales, {responseType: 'text'}
    ).subscribe(res => {
      this.storage.setToken(res);
      resolve(res);
    }, err => reject(err)));
  }


  async limpiarStorage(){
    this.storage.clear();
  }
}
