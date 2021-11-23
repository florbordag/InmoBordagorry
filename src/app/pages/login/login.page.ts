import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginView } from 'src/app/Interfaces/LoginView';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(private svs : DataService,private router: Router) { }
  usuario: LoginView={
    usuario:'',
    clave:''
  }

  

  ngOnInit() {
  }


  async entrar(){

    const token = await this.svs.login(this.usuario).catch(err => {
      console.log('Error: ', err);
      return null;
    });
    if (!token) {
      return;
    }
    console.log('Token: ', token);
    this.router.navigate(['/mapa'])

    
    
   
  
}
}
