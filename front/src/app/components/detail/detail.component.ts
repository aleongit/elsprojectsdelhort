import { Component, OnInit } from '@angular/core';

//importar mòduls rutes
import { Router, ActivatedRoute, Params } from '@angular/router';

//serveis
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {

//id detall
public id: string = '';

//per url imatge
public url:string;

//per resposta
public project: any;
public error: any;

//passem servei i paràmetres rutes
  constructor(
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.url = _projectService.url + '/get-image/' 
  }

  ngOnInit(): void {

    //paràmetres url
    this._route.params.subscribe( (params: Params) => {
      //id
      this.id = params['id']
      })

    //get project
    this.getProject();
  }

  //mètode per obtenir les dades a través del servei i resposta.
  getProject() {
    this.error = false;
    this._projectService.getProject(this.id).subscribe(
      {
      next: (res) => {
        console.log(res);
        this.project = res.project; //retornem .project
        console.log(this.project)
        
      },
      error: (err) => {
        console.error(err);
        this.error = err;
      },
      complete: () => console.info('complet!')
      }
      );
    }

  //delete
  deleteProject() {
    this.error = false;
    this._projectService.deleteProject(this.id).subscribe(
      {
      next: (res) => {
        console.log(res);
        this.project = res.project; //retornem .project
        console.log(this.project)
        window.location.href = '/projects'
        
      },
      error: (err) => {
        console.error(err);
        this.error = err;
      },
      complete: () => console.info('complet!')
      }
      );
    }




}


