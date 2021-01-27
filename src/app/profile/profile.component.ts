import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../authentification.service';
import {AvitoService} from '../avito.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
declare const mytt: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  utilisateur;
  photoAnnonce;photosAnnonce;
  url= "http://localhost:9080/logo/";
  villeUtilisateur;
  article;
  typeUtilisateur;
  photoUtilisateur;
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  username;

  fileInfos: Observable<any>;
  constructor(private authentificationService:AuthentificationService, private avitoService:AvitoService
  ,private route:Router) {



  }

  ngOnInit(): void {
    this.selectedFiles = undefined;
    mytt();
    this.avitoService.getUtilisateur(this.authentificationService.utilisateur)
      .subscribe(value => {
        this.utilisateur= value;
        console.log(value);
      });
    this.avitoService.getVilleUtilisateur(this.authentificationService.utilisateur)
      .subscribe(value => {
        this.villeUtilisateur= value;
        console.log(value);

      });
    this.avitoService.getAnnoncesUtilisateur(this.authentificationService.utilisateur)
      .subscribe(value => {
        this.article= value;
        console.log(value);

      });
    this.avitoService.getTypeUtilisateur(this.authentificationService.utilisateur)
      .subscribe(value => {
        this.typeUtilisateur = value;
        console.log(value);

      });


  }
  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  submit(data) {
    if(!this.selectedFiles)
    {
             console.log(data.value['username']);
             this.avitoService.patchRessource(this.utilisateur)
               .subscribe(value => {
                 this.utilisateur = value;
                 location.reload();
               },error => {
                 console.log(error);
               })
    }
    else {
      this.message = '';

      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
      this.avitoService.patchRessource(this.utilisateur)
        .subscribe(value => {
          this.utilisateur = value;
          location.reload();

        },error => {
          console.log(error);
        })
    }

  }
  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    console.log(this.utilisateur.id);
    this.avitoService.uploadPhoto(file,this.utilisateur.id).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }



}
