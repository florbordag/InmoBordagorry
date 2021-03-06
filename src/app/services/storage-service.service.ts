import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string,) {
    return this.storage?.get(key);
  }

  public remove(key : string){
    return this.storage?.remove(key);
  }

   
  public clear(){
    this.storage.clear();
  }

  public keys(){
    this.storage.keys();
  }

  public length(){
    this.storage.length();
  }

  //recupera todas las claves y muestra los valores guardados
  public async logValues(){
    const keys = await this.storage?.keys();
    for (const key of keys){
      console.log(key, await this.storage?.get(key));
    }
  }

 public async getToken(): Promise<string> {
    return this.storage.get('token');
  }
  
  public async setToken(token: string){
    return await this.storage?.set('token', token);
  }

}
