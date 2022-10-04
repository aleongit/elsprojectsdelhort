import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public titol: string;
  public subtitol: string;
  public mail: string;

  constructor() {
    this.titol = "Els Projects de l'hort";
    this.subtitol = "made with Angular & Node.js by aleon";
    this.mail = "hola@projectsdelhort.com";
   }

  ngOnInit(): void {
  }

}
