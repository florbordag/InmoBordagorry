import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage-service.service';
import { Propietario } from '../Interfaces/Propietario';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private httpCliente: HttpClient, private storage: StorageService) { }
  
  public async getPerfil() {
	//crear headers para enviar json en body y agregar token
	const headers = {
		contentType: 'application/json',
		authorization: `Bearer ${await this.getToken()}`
	};
	//enviar peticion http con credenciales
	return new Promise<Propietario>((resolve, reject) =>
	this.httpCliente.get<Propietario> ('http://practicastuds.ulp.edu.ar/api/propietarios/',	{ headers }
	)//.subscribe(res => resolve(res), err => reject(err)));
	.subscribe(res => {
		this.storage.set('propietario', res); //se puede sacar esta linea
		resolve(res);
	  }, err => reject(err)));
}

public async setPerfil(perfil: Propietario) { //probar perfil: any
	//crear headers para enviar json en body y agregar token
	const headers = {
		contentType: 'application/json',
		authorization: `Bearer ${await this.getToken()}`
	};
	//enviar peticion http con credenciales
	return new Promise((resolve, reject) =>
	this.httpCliente.put<Propietario>('http://practicastuds.ulp.edu.ar/api/propietarios/'+perfil.id , perfil, { headers }
	).subscribe(res => resolve(res), err => reject(err)));
}



private async getToken(): Promise<string> {
    return this.storage.get('token');
  }


}
