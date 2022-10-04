import { Injectable } from '@angular/core';
import { Global } from './global'

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public url:string;

  constructor() {
    this.url = Global.api;
   }

  //petició AJAX clàssica, on s'adjunta arxiu
  makeFileRequest( url:string, params: Array<string>, files: Array<File>, name: string)
  {
    return new Promise ( (resolve, reject) => {
      //creem formulari
      let formData: any = new FormData();

      //objecte per fer peticicions AJAX
      let xhr = new XMLHttpRequest();

      //for per recorrer l'array d'arxius que arriba
      for (let i=0; i<files.length; i++) {
        formData.append( name, files[i], files[i].name);
      }
      
      //petició AJAX
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.send(formData);

    })
  }

}