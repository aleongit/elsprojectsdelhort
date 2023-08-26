import { Component, OnInit } from '@angular/core';

//importar mòduls rutes
import { Router, ActivatedRoute, Params } from '@angular/router';

//model
import { Project } from 'src/app/models/project';

//servei global
import { Global } from 'src/app/services/global';

//serveis
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html', //template crear
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public titol: string;
  public any_actual = new Date().getFullYear(); //any actual
  public langs: string[]; //llista llenguatges
  public edit: boolean = true; //per template crear/editar

  //id per editar
  public id:string = "";

  //file
  public img_pre: any; //per imatge preview
  public fitxers_upload: any;

  //per url imatge
  public url:string;

  //variables resposta
  public project_updated: any;
  public project_ok: string = "";
  public project_fatal: string = "";
  
  //per resposta edit
  public project: Project; //model
  public error: any;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.titol = 'Editar Projecte';
    this.langs = Global.langs; //importem de Global
    this.project = new Project( '', '', '', '', [''], this.any_actual,'')
    
    
    //per imatge
    this.img_pre= '';
    this.url = _projectService.url + '/get-image/' 
    
    this.fitxers_upload = null;
   }

  ngOnInit(): void {

    //paràmetres url
    this._route.params.subscribe( (params: Params) => {
    //id
      this.id = params['id']
    })
    
    //crida get
    this.error = false;
    this._projectService.getProject(this.id).subscribe(
      {
      next: (res) => {
        console.log(res);
        this.project = res.project; //retornem .project
        console.log(this.project)

        //imatge preview la que retorna del servidor, sinó per defecte
        if (this.project.image == 'null') {
          this.img_pre= 'assets/img/NOIMG.png'; //imatge preview per defecte
        } else {
        this.img_pre = this.url + this.project.image
        }
        
      },
      error: (err) => {
        console.error(err);
        this.error = err;
      },
      complete: () => console.info('complet!')
      }
      );
  
  }

  //submit
  onSubmit(form: any) {
    console.log('Form Capturat!');
    console.log(form);
    console.log(this.project);

    //si no s'ha seleccionat imatge a NODE --> "NOIMG.png"
    console.log(this.fitxers_upload);
    
    //servei editar projecte

    //node: router.put('/project/:id', ProjectController.updateProject);
    //cal passar objecte project
    this._projectService.editProject(this.id,this.project).subscribe(
      {
        next: (res) => {
        console.log('resposta edit!');
        console.log(res);
        this.project_updated = res;

        //pujar fitxer
        //node: router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
        
        if (res && this.fitxers_upload) {
        this._uploadService.makeFileRequest(
          this._uploadService.url + '/upload-image/' + this.project_updated.project._id,
                [],                   //opcional en blanc
                this.fitxers_upload,  //array files
                'image'               //nom del camp model que rep node
                ).then ( (result: any) => {
                  console.log('imatge upload!')
                  console.log(result);
                });
            }
        form.reset(); //reset form
        this.project_ok = 'Projecte editat correctament!';
        //this.router.navigate(['/'])
        //window.location.href = '/project/'+ this.id;

        

      },
        error: (err) => {
        console.log(err); 
        this.project_fatal = '* FATAL ERROR * al guardar projecte';
      },
        complete: () => {
          console.info('complet!');
          //window.location.href = '/project/'+ this.id
          this._router.navigate([`project/${this.id}`])
        }
      }
      );
  }

	fileChangeEvent(event: any) { //Angular 11, for stricter type
		
    //per pujar arxiu
    this.fitxers_upload = <Array<File>>event.target.files;

    //per preview imatge
    //https://roytuts.com/how-to-upload-and-display-image-using-angular/
    var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			//this.msg = "";
			this.img_pre = reader.result; 
		}
	}


}
