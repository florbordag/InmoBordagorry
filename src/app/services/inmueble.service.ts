import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inmueble, NuevoInmueble } from '../Interfaces/Inmueble';
import { StorageService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  constructor(private httpCliente: HttpClient, private storage: StorageService) { }

  public async getAllInmuebles() {
    //crear headers para enviar json en body y agregar token
    const headers = {
      contentType: 'application/json',
      authorization: `Bearer ${await this.getToken()}`
    };
    //enviar peticion http con credenciales
    return new Promise<Inmueble[]>((resolve, reject) =>
    this.httpCliente.get<Inmueble[]> ('http://practicastuds.ulp.edu.ar/api/Inmuebles/0',	{ headers }
    )//.subscribe(res => resolve(res), err => reject(err)));
    .subscribe(res => {
      resolve(res);
      }, err => reject(err)));
  }

  public async getInmueblePorId(id) {
    //crear headers para enviar json en body y agregar token
    const headers = {
      contentType: 'application/json',
      authorization: `Bearer ${await this.getToken()}`
    };
    //enviar peticion http con credenciales
    return new Promise<Inmueble>((resolve, reject) =>
    this.httpCliente.get<Inmueble> ('http://practicastuds.ulp.edu.ar/api/Inmuebles/'+id,	{ headers }
    )//.subscribe(res => resolve(res), err => reject(err)));
    .subscribe(res => {
      resolve(res);
      }, err => reject(err)));
  }

  public async UpdateInmueble(inmueble: Inmueble) { //probar perfil: any
    //crear headers para enviar json en body y agregar token
    const headers = {
      contentType: 'application/json',
      authorization: `Bearer ${await this.getToken()}`
    };
    //enviar peticion http con credenciales
    return new Promise((resolve, reject) =>
    this.httpCliente.put<Inmueble>('http://practicastuds.ulp.edu.ar/api/Inmuebles/'+inmueble.id , inmueble, { headers }
    ).subscribe(res => resolve(res), err => reject(err)));
  }
  
  public async CreateInmueble(inmueble: NuevoInmueble) { 
    //crear headers para enviar json en body y agregar token
    const headers = {
      contentType: 'application/json',
      authorization: `Bearer ${await this.getToken()}`
    };
    //enviar peticion http con credenciales
    return new Promise((resolve, reject) =>
    this.httpCliente.post<NuevoInmueble>('http://practicastuds.ulp.edu.ar/api/Inmuebles' , inmueble, { headers }
    ).subscribe(res => resolve(res), err => reject(err)));
  }
  


  
  public async deleteInmueble(id) {
    //crear headers para enviar json en body y agregar token
    const headers = {
      contentType: 'application/json',
      authorization: `Bearer ${await this.getToken()}`
    };
    //enviar peticion http con credenciales
    return new Promise<Inmueble>((resolve, reject) =>
    this.httpCliente.delete<Inmueble> ('http://practicastuds.ulp.edu.ar/api/Inmuebles/'+id,	{ headers }
    )//.subscribe(res => resolve(res), err => reject(err)));
    .subscribe(res => {
      resolve(res);
      }, err => reject(err)));
  }



  private async getToken(): Promise<string> {
    return this.storage.get('token');
  }

}
