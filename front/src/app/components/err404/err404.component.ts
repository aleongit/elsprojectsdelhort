import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-err404',
  templateUrl: './err404.component.html',
  styleUrls: ['./err404.component.css']
})
export class Err404Component implements OnInit {

  public titol: string;
  public missatge: string;

  constructor() {
    this.titol = '* FATAL ERROR 404 *';
    this.missatge = 'Aquesta ruta no existeix! Revisa millor el GPS'
   }

  ngOnInit(): void {
  }

}
