import { Component, OnInit } from '@angular/core';

//model
import { Contacte } from 'src/app/models/contacte';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public titol: string;
  public contacte: Contacte; //model
  public enviat: boolean = false;

  constructor() {
    this.titol = "Contacta'ns";
    this.contacte = new Contacte( '', '', '');

   }

  ngOnInit(): void {
  }

  onSubmit( form: any ) {

    console.log('Form Capturat!');
    console.log(form);
    console.log(this.contacte);
    
    this.enviat = true;

    // stop here if form is invalid
    /*
    if (this.registerForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    */
}

}
