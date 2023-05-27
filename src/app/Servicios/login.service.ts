import { Injectable } from '@angular/core';
//Importes Hechos por el Jhoel
import { Datos } from "../Interfaces/usuario"; // Viene de la interfas de prueba
import { HttpClient } from "@angular/common/http"; // Esto ya este imprtado desde el app component
import { Router } from "@angular/router"
import { BehaviorSubject } from 'rxjs';

// Aqui terminan
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlLogin: String = 'http://localhost:3000/usuario';
  public datosLogin: Datos | null = null;
  private comportamientoListaUsers =new BehaviorSubject<Array<any>>([]);
  public listaUsuario$ = this.comportamientoListaUsers.asObservable() ;

  constructor(private http: HttpClient,
              private ruta : Router) { }

  //Inicio Secion para el validador
  public inicioSesion(){
    this.http.get<Array<Datos>>('{this.urlLogin}')
    .subscribe(datos => {
      this.comportamientoListaUsers.next(datos)
    })
  }
}
