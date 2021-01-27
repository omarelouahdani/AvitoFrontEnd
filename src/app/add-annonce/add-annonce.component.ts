import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AvitoService} from '../avito.service';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthentificationService} from '../authentification.service';
declare const showTab: any;
declare const readImage: any;

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.scss']
})
export class AddAnnonceComponent implements OnInit {
  public villesfiltrer;
  public statusVille;
  public secteursF;
  public utilisateur;
  images = [];
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  data = {
    categorie: ' ',
    sousCategorie: ' ',
    typeAnnonce: '',
    ville : ' ',
    secteur : ' ',
    titreAnnonce : ' ',
    prix : 0.00,
    descAnnonce: ' ',
    idUtl : 0,
  };
  selectedFiles: FileList;
  selectedFiless :Array<{idx:number,file:any}>=[];
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>;
  size=0;errorFile;disablfile;

  constructor(private http: HttpClient, private avitoService: AvitoService,private route:Router,private authentificationService:AuthentificationService) {
  }

  ngOnInit(): void {

    this.fileInfos = this.avitoService.getFiles();
    this.avitoService.categorieDesignation$
      .subscribe(value => {
        this.data.categorie = value;

      });
    this.avitoService.getUtilisateur(this.authentificationService.utilisateur)
      .subscribe(value => {
        this.utilisateur= value;
        console.log(value);
      });


    this.avitoService.scategorieDesignation$
      .subscribe(value => {
        this.data.sousCategorie = value;
      });

    this.avitoService.onGetAllVilles()
      .subscribe(data => {
        this.villesfiltrer = data;
      }), err => {
      console.log(err);
    }
    showTab(0);
    this.disablfile=false;
    this.errorFile = "";

  }

  submit() {
    this.data.idUtl = this.utilisateur.id;
    this.avitoService.posttRessource(this.data)
      .subscribe(value => {
        this.upload(value);
      },error => {

      })
    this.route.navigate(['/recherche']);


  }


  onChangeVille(newVaue) {


    this.statusVille = newVaue.nom;
    this.data.ville = newVaue.nom;
    this.secteursF = newVaue.secteurs;


  }

  get f(){
    return this.myForm.controls;
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event:any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);

          this.myForm.patchValue({
            fileSource: this.images
          });
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  test(){
    console.log(this.data.secteur);
    console.log(this.data.titreAnnonce);
    console.log(this.data.prix);
    console.log(this.data.descAnnonce);
    console.log(this.data.ville);
    console.log(this.data.typeAnnonce);
  }
  onSelectedFile(event){

  }
  selectFiles(event) {
    this.size += 1;
    if(this.size>=6){
     this.errorFile = "vous avez passé le nombre maximun des photos";
      this.disablfile=true;
    }
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event:any) => {

          this.images.push(event.target.result);

          this.myForm.patchValue({
            fileSource: this.images
          });
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
    this.uploadFiles();
  }
  uploadFiles() {
    this.message = '';


    for (let i = 0; i < this.selectedFiles.length; i++) {


        this.save(i,this.selectedFiles[i]);



    }

  }
  save(idx, file) {
    this.selectedFiless.push({idx,file});

  }
  upload(id) {
    for(let i = 0 ; i<this.selectedFiless.length;i++)
    {

    this.progressInfos[this.selectedFiless[i].idx] = { value: 0, fileName: this.selectedFiless[i].file.name };

    this.avitoService.upload(this.selectedFiless[i].file,id).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[this.selectedFiless[i].idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.avitoService.getFiles();
        }
      },
      err => {
        this.progressInfos[this.selectedFiless[i].idx].value = 0;
        this.message = 'Could not upload the file:' + this.selectedFiless[i].file.name;
      });
    }
  }
}
