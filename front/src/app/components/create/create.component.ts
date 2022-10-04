import { Component, OnInit } from '@angular/core';

//model
import { Project } from 'src/app/models/project';

//servei global
import { Global } from 'src/app/services/global';

//serveis
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';

//test rutes; de vegades és millor fer refresc.
import {Router} from "@angular/router"

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
   
  public titol: string;
  public project: Project; //model
  public any_actual = new Date().getFullYear(); //any actual
  public langs: string[]; //llista llenguatges
  //users:string[]=[]
  public edit: boolean = false; //per template crear/editar

  //file
  public img_pre: any; //per imatge preview
  public fitxers_upload: any;

  //variables resposta
  public project_desat: any;
  public project_ok: string = "";
  public project_fatal: string = "";

  //passem serveis
  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private router: Router

  ) {
    this.titol = 'Crear Projecte';
    this.langs = Global.langs; //importem de Global
    this.project = new Project( '', '', '', '', [''], this.any_actual,'')
    this.img_pre= 'assets/img/NOIMG.png'; //imatge preview per defecte
    this.fitxers_upload = null;
   }

  ngOnInit(): void {
  }

  //submit
  onSubmit( form: any ) {
    console.log('Form Capturat!');
    console.log(form);
    console.log(this.project);

    //si no s'ha seleccionat imatge a NODE --> "NOIMG.png"
    console.log(this.fitxers_upload);
    
    //servei guardar projecte
    //node: router.post('/save', ProjectController.saveProject);
    
    this._projectService.saveProject(this.project).subscribe(
      {
        next: (res) => {
        console.log(res);
        this.project_desat = res;

        //pujar fitxer
        //node: router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
        this._uploadService.makeFileRequest(
          this._uploadService.url + '/upload-image/' + this.project_desat.project._id,
                [],                   //opcional en blanc
                this.fitxers_upload,  //array files
                'image'               //nom del camp model que rep node
                ).then ( (result: any) => {
                  console.log(result);
                });
        
        form.reset(); //reset form
        this.project_ok = 'Projecte afegit correctament!';
        //this.router.navigate(['/'])
        window.location.href = '/project/'+ this.project_desat.project._id;

      },
        error: (err) => {
        console.log(err); 
        this.project_fatal = '* FATAL ERROR * al guardar projecte';
      },
        complete: () => {
          console.info('complet!'); 
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

