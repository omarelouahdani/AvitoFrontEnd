import { Component, OnInit } from '@angular/core';
import {AvitoService} from '../avito.service';
import {CarouselComponent, OwlOptions} from 'ngx-owl-carousel-o';
import {NgForm} from '@angular/forms';
import {AuthentificationService} from '../authentification.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {
  public categories;
  public currentCategorie;
  public sousCategories;
  public currentSouCategorie;
  public villes;
  public currentVille;
  public color;
  public articles;
  nombreArticle;
  totalRecords: Number;
  page: Number=1;
  public disableVille;
  public typeAnnonce;
  public categoriesFiltrer;
  public sousCategoriesFiltrer;
  public villesfiltrer;
  public secteursF: any;
  public categorieName;
  public villeName;
  public requiredVille;
  public requiredScat;
  public statusCategorie;
  public statusSCategorie;
  public statusVille;
  public utilisateur;

  constructor(private avitoService : AvitoService,private authentificationService:AuthentificationService) {

  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  ngOnInit(): void {
    console.log("test");
    this.requiredScat = false;
    this.requiredVille= false;
    this.villeName = "Tout le maroc";
    this.categorieName= "Toutes les catégories";
    this.disableVille = true;
      this.avitoService.getCategories()
        .subscribe(data => {
          this.categories = data;

        }),err => {
        console.log(err);
      }
    this.avitoService.getVilles()
      .subscribe(data => {
        this.villes= data;

      }),err => {
      console.log(err);
    }
    this.avitoService.onGetAllCategories()
      .subscribe(data => {
        this.categoriesFiltrer = data;


      }),err => {
      console.log(err);
    }
    this.avitoService.onGetAllVilles()
      .subscribe(data => {
      this.villesfiltrer = data;
      }),err => {
      console.log(err);
    }
    this.authentificationService.getUtl()
      .subscribe(value => {
        this.utilisateur = value;

        console.log(this.utilisateur);
      },err => { console.log(err);
      });

  }

  onGetSousCategories(categorie) {

    this.disableVille = false;
    this.currentCategorie = categorie;
    this.typeAnnonce = categorie.designation;
    this.avitoService.getSousCatByCat(categorie.id)
      .subscribe(value => {
        this.sousCategories = value;
      },error => {
        console.log(error);
      });
    this.getProduitScat(categorie);


  }
  getProduitScat(categorie){
    this.avitoService.getAnnonceByCategory(categorie.id)
      .subscribe(data => {

        this.articles = data;
        this.nombreArticle= this.articles.length;



      }),err => {
      console.log(err);
    }
  }
  onGetAnnones(s){


  }
  getRandomColor() {
   const letters = '0123456789ABCDEF';
    this.color = '#';
    for (var i = 0; i < 6; i++) {
      this.color +=  letters[Math.floor(Math.random() * 16)];
    }
    return this.color;
  }

  handler(owlCar: CarouselComponent) {
    owlCar.prev();
  }
  onGetAnnoceBySousCategories(s)
  {
    this.currentSouCategorie = s;
    this.typeAnnonce = s.designation;
    this.avitoService.getAnnonceBySCategory(s.id)
      .subscribe(data => {
       this.articles = data;
        this.nombreArticle= this.articles.length;
      }),err=>{
      console.log(err);
    }
  }
  onChange(newVaue)
  {
    if(newVaue == "Toutes les catégories")
    {

      this.disableVille = true;
      this.sousCategoriesFiltrer = null;
      console.log("mezyan");
    }
    else{
      this.requiredScat = true;
      this.currentCategorie = newVaue;
      const  cat = this.categories;
      this.categories = null;
      this.categories = cat;
      this.sousCategoriesFiltrer = newVaue.sousCategories;
      this.disableVille = false;
      console.log(newVaue.designation);
      this.statusCategorie = newVaue.designation;
      this.avitoService.getAnnonceByCategory(newVaue.id)
        .subscribe(data => {
          this.articles = data;
          this.nombreArticle= this.articles.length;

        }),err => {
        console.log(err);
      }
    }

  }
  onChangeVille(newVaue)
  {
    if(newVaue == "Tout le maroc")
    {
      this.statusVille = "Tout le maroc";
      console.log("mezyan");
    }
    else {
      this.statusVille = newVaue.nom;
      this.requiredVille = true;
      this.secteursF = newVaue.secteurs;
    }

  }

  onChangeSousCategories(newVaue) {
    console.log(newVaue);
    this.disableVille = false;
    this.currentSouCategorie = newVaue;
    this.statusSCategorie = newVaue.designation;
    this.avitoService.getAnnonceBySCategory(newVaue.id)
      .subscribe(data => {
        this.articles = data;
        this.nombreArticle= this.articles.length;

      }), err => {
      console.log(err);

    }
  }
  onSubmit(form: NgForm) {
    const nameAnnonce = form.value['annonceName'];


    const typeAnnonce = form.value['typeAnnonce'];
    const SecteurrName = form.value['statusSecetur'];
    console.log(nameAnnonce+this.statusCategorie+this.statusVille+typeAnnonce);
    if((this.statusCategorie == "Toutes les catégories") && (this.statusVille =="Tout le maroc") )
    {
      this.avitoService.onGetAnnanceOne(nameAnnonce,typeAnnonce)
        .subscribe(data => {
          this.disableVille = false;
          this.articles = data;
          this.nombreArticle= this.articles.length;

        }), err => {
        console.log(err);

      }
    }
    if((this.statusCategorie == "Toutes les catégories") && (this.statusVille != "Tout le maroc") )
    {
      console.log(this.statusVille);
      this.disableVille = true;
      this.avitoService.onGetAnnanceTwo(nameAnnonce,typeAnnonce,this.statusVille,SecteurrName)
        .subscribe(data => {
          this.disableVille = false;
          this.articles = data;
          this.nombreArticle= this.articles.length;

        }), err => {
        console.log(err);

      }
    }
    if((this.statusCategorie != "Toutes les catégories") && (this.statusVille == "Tout le maroc") )
    {
      this.disableVille = true;
      this.avitoService.onGetAnnanceThree(nameAnnonce,typeAnnonce,this.statusCategorie,this.statusSCategorie)
        .subscribe(data => {
          this.disableVille = false;
          this.articles = data;
          this.nombreArticle= this.articles.length;

        }), err => {
        console.log(err);

      }
    }
    if((this.statusCategorie != "Toutes les catégories") && (this.statusVille != "Tout le maroc") )
    {
      this.disableVille = true;
      this.avitoService.onGetAnnanceFour(nameAnnonce,typeAnnonce,this.statusSCategorie,SecteurrName,this.statusVille)
        .subscribe(data => {
          this.disableVille = false;
          this.articles = data;
          this.nombreArticle= this.articles.length;

        }), err => {
        console.log(err);

      }
    }




  }
}
