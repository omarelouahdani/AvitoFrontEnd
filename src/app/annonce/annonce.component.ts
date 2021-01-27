import {Component, Input, OnInit} from '@angular/core';
import {AvitoService} from '../avito.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss']
})
export class AnnonceComponent implements OnInit {
  @Input() articles:any;
  @Input() villes: any;
  @Input() typeAnnonce: any;
  articleParticulier = new Array();
  nombreArtParticulier;nombreArtProff;
  articleProfessionnele = new Array();
  typeActive;
  j=0;
  articleT;
  nombreArticles;
  public currentVille;
  public secteurs;
  public annonces;
  totalRecords: string;
  page: number=1;
  villeName;
  sortArticle;
  constructor(private avitoService: AvitoService,private route:Router) { }

  ngOnInit(): void {
    this.villeName = "Maroc";
    this.typeActive = "TOUT";
    console.log(this.articles);
    this.nombreArticles = this.articles.length;
    console.log(this.nombreArticles);
    this.currentVille = null;
    this.totalRecords = this.articles.length;
    for(let i=0; i< this.nombreArticles; i++){

    }
    this.articles.forEach(article =>{
      if(article.annonce.utilisateur.typeUtl.type == "Particulier"){
         this.articleParticulier[this.j++] = article;


      }
    });
    this.nombreArtParticulier = this.articleParticulier.length;
    this.articles.forEach(article =>{
      if(article.annonce.utilisateur.typeUtl.type == "Professionnel"){
        this.articleProfessionnele[this.j++] = article;


      }
    });
    this.nombreArtProff = this.articleProfessionnele.length;



 this.articleT= this.articles;



  }

  onGetAnnonces(ville){
    console.log(this.totalRecords);
    this.currentVille = ville;
    this.villeName = ville.nom;
    this.avitoService.onGetAnnonceByVille(ville.id)
      .subscribe(data => {
        this.articles = data;
        this.nombreArticles = this.articles.length;
        console.log(data);
      }), err => {
      console.log(err);
    };


  }
  getToutProduit(){
    this.articles = this.articleT;
    this.typeActive = "TOUT";
  }
  getArticleP(){
    this.articles= this.articleParticulier;
    this.typeActive = "particulier";
  }
  getArticlePrf(){
    this.articles = this.articleProfessionnele;
    this.typeActive = "professionnel";
  }
  getSortArticle(event){
    console.log(this.villeName);
    this.sortArticle = this.articles.sort((a,b) => a.annonce.datePub.getTime - b.annonce.datePub.getTime
    );
    this.articles = this.sortArticle;
    console.log(this.sortArticle);
  }






}
