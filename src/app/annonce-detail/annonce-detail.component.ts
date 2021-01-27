import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AvitoService} from '../avito.service';
import {AuthentificationService} from '../authentification.service';
import {NgForm} from '@angular/forms';
declare const mytest: any;
@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.component.html',
  styleUrls: ['./annonce-detail.component.scss']
})
export class AnnonceDetailComponent implements OnInit {
  annonceDetail= false;mailSection = true;
  utilisateurConnecter;
  article;
  photos;
  photo;
  utilisateur;
  ville;
  mail = {
    to : '',
    from : '',
    subject : '',
    message : ''
  };
  constructor(private route: ActivatedRoute,private avitoService:AvitoService
  ,private authentificationService: AuthentificationService) { }
  ngOnInit(): void {
    mytest();

   this.article= this.route.snapshot.params.id;
   console.log(this.article);
    this.avitoService.getAnnonceDetails(this.article)
      .subscribe(value => {
        console.log(value);
        this.article = value;
        this.photos = this.article.photos;
        this.photo= this.photos[0];
        this.avitoService.getAnnonce(this.article.annonce.id)
          .subscribe(value1 => {
            this.utilisateur = value1;
            console.log(value1);
            this.avitoService.getVilleUtilisateur(this.utilisateur.id)
              .subscribe(value2 => {
                this.ville = value2;
              });
          });
      },error => {
        console.log(error);
      });
    this.avitoService.getUtilisateur(this.authentificationService.utilisateur)
      .subscribe(value => {
        this.utilisateurConnecter= value;
      });

  }

  changePhoto(p){
this.photo = p;

  }
  change(){
    this.annonceDetail = true;
    this.mailSection = false;
  }


  onSubmit(form: NgForm) {
    this.mail.to = this.utilisateur.email;
    this.mail.from = this.utilisateurConnecter.email;
    this.mail.subject= form.value['subject'];
    this.mail.message = form.value['message'];
    console.log(this.mail);
    this.avitoService.postRessource("http://localhost:9080/email",this.mail)
      .subscribe(value => {
        console.log(value);
      },error => {
        console.log(error);
      })
  }
}
