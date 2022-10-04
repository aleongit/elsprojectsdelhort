import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//global
import { Global } from './global';

//model
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public url:string;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = Global.api;
  }

  testService() {
    return 'Provant el servei'
  }

  //node: router.get('/projects', ProjectController.getProjects);
  getProjects(): Observable<any> {
    //all
    return this._http.get( this.url + '/projects' );
  }

  //node: router.get('/project/:id?', ProjectController.getProject);
  getProject(id:string): Observable<any> {
    
    return this._http.get( this.url + '/project/' + id );
  }

  //mètode afegir post
  //passem a JSON l’objecte de tipus Project
  //creem una capçalera HTTP, on indiquem que enviem contingut json
  //fem petició POST a la url, enviant JSON i capçalera
  //node:router.post('/save', ProjectController.saveProject);

  saveProject(project: Project): Observable<any> {
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this._http.post(this.url + '/save', params, {headers: headers});
  }

  //node:router.delete('/project/:id', ProjectController.deleteProject);
  deleteProject(id:string): Observable<any> {

    //http delete
    return this._http.delete( this.url + '/project/' + id );

  }

  //node:router.put('/project/:id', ProjectController.updateProject);
  editProject(id:string, project:Project): Observable<any> {

    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    //http put
    return this._http.put( this.url + '/project/' + id, params, {headers: headers} );

  }

}