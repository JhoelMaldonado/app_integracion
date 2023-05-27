import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms'; //Formularios
import { Router } from '@angular/router'; //Conesion a url
import { AlertController } from '@ionic/angular'; // Alerta de error o confirmacion
import { LoginService } from '../../Servicios/login.service'; // Se importa el Servicio de la validacion de user
import { Datos } from '../../Interfaces/usuario'; // Se importa la Clase o Interfas del usuario Pd: Cambiar de Datos A Usuario
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  //Se declara las Variales Proximas a utilizar en este Ts
  public formularioLog!: FormGroup;
  public usuarioInicio: Array<any> = [];
  public usuario!: Datos;
  constructor(
    //Se escriben loque se utilisara como los formularios, alertas , Router y el servicio
    private builder: FormBuilder,
    private router: Router,
    private alertControler: AlertController,
    private servicioLogin: LoginService
  ) {
    //Se declara la validacion rapida
    this.formularioInicio(); // <------
  }

  ngOnInit() {}

  //Se crea una funcion con el nombre declarado arriba con una flecha
  public formularioInicio() {
    this.formularioLog = this.builder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]), // <-- Le da parametros der validacion para el Ingreso de datos
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    });
  }
  ionViewWillEnter() {
    // Esto significa cuando recien esta cargando la pagina por el ciclo de vida
    this.servicioLogin.listaUsuario$.subscribe((datos) => {
      this.usuarioInicio = datos;
      //console.log(datos)
    });
    this.servicioLogin.inicioSesion();
    //console.log(this.usuarioInicio)
  }
  //Se crea otra Funcion con Condiciones
  public async iniciarSesion() {
    this.usuario = this.usuarioInicio.find((user) => {
      let inicio = this.formularioLog.value.username;
      return user.username === inicio;
    });

    if (this.formularioLog.valid) {
      if (this.usuario) {
        if (this.usuario.password == this.formularioLog.value.password) {
          this.router.navigate(['/principal'], {
            queryParams: {
              username: this.usuario.username,
            },
          });
        } else {
          {
            const alert = await this.alertControler.create({
              message: 'Completa Los Campos',
              buttons: ['Entendido'],
            });
            await alert.present();
          }
        }
      }
    }
  }
}
