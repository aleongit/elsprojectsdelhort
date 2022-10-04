import { Component, OnInit } from '@angular/core';

//model
//import { Project } from 'src/app/models/project';

//serveis
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {

//per resposta
public projects: any;
public error: any;
public url:string;

//passem serveis
  constructor(
    private _projectService: ProjectService
  ) {
    this.url = _projectService.url + '/get-image/' 
   }

  ngOnInit(): void {

    this.getProjects();
  }

  //mètode per obtenir les dades a través del servei i resposta.
  getProjects() {
    this.error = false;
    this._projectService.getProjects().subscribe(
      {
      next: (res) => {
        console.log(res);
        this.projects = res.projects; //retornem .projects
        console.log(this.projects)
        
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
