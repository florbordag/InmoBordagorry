import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from './Interfaces/Componente';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  rutas: Observable<Componente[]>;

  constructor(private dataSvc: DataService) { }

  ngOnInit() {
    this.rutas = this.dataSvc.getMenuOpts();
  }

  
}
