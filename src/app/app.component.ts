import {Component, Input, OnInit} from '@angular/core';
import {AvitoService} from './avito.service';
import {Router} from '@angular/router';
import {AuthentificationService} from './authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements  OnInit{
  public categoriesFiltrer;
  title = 'avito';
  public statusCategorie :string;
  public sousCategoriesFiltrer;
  public statusScategorie;
  public disableForm;
  declare jQuery : any;
  idModal;
  utilisateur;
  public constructor(private router: Router, private avitoService: AvitoService,private authentificationService:AuthentificationService) {

  }
  ngOnInit(): void {


    this.authentificationService.loadToken();
    this.disableForm = false;

    this.avitoService.onGetAllCategories()
      .subscribe(data => {
        this.categoriesFiltrer = data;


      }),err => {
      console.log(err);
    }
    console.log("test");
    this.avitoService.getUtilisateur(this.authentificationService.utilisateur)
      .subscribe(value => {
        this.utilisateur= value;
      });


  }
  onDisplay(){

  }
  onSubmit(data){


    this.router.navigate(['/addAnnonce']);



  }
  onChange(newVaue){


      this.sousCategoriesFiltrer = newVaue.sousCategories;


      this.statusCategorie = newVaue.designation;
      this.avitoService.saveCategorieName(this.statusCategorie);



  }
  onChangeScategorie(newValue){
    console.log(newValue.designation);

    this.statusScategorie = newValue.designation;
    this.avitoService.saveSCategorieName(this.statusScategorie);

  }
  isAdmin(){
    return this.authentificationService.isAdmin();
  }
  isUser(){
    return this.authentificationService.isUser();
  }
  isAuthenticated(){
    return this.authentificationService.isAuthenticated();
  }
  logOut(){
    this.authentificationService.logout();
    this.router.navigate(['/recherche']);
  }
  verifierCnx(){
    if(!this.isAuthenticated()){

      this.idModal = 'exampleModal2';
      this.router.navigate(['/login']);
    }
    else {

      this.idModal='exampleModal';
    }

  }

}
