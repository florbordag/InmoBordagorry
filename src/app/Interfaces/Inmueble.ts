import { Propietario } from "./Propietario";

export interface Inmueble {
    direccion : string, 
    superficie:string,
    latitud : string,
    longitud: string,
    propietarioId: number,
    propietario: Propietario,
    id: number,
    grupoId: number,
}

export interface NuevoInmueble {
    direccion : string, 
    superficie:string,
    latitud : string,
    longitud: string,
    propietarioId: number,
    grupoId: number,
}