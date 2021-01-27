import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../authentification.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AvitoService} from '../avito.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  actv = false;
  register=true;
  host = 'http://localhost:9080'
  data = {
    typeUtl: ' ',
    username: ' ',
    telephone: ' ',
    ville: ' ',
    email: ' ',
    password: ' ',
    confirmedPassword: ' ',
  };
  errorLogin;
  erLogin;
  dataAuth = {
    username: ' ',
    password: ' '
  };
  email;
  errorMessage;
  er = true;
  villes;
  currentVille;
  dog :any;
  utilisateur;

  constructor(private  authentificationService: AuthentificationService,private avitoService:AvitoService, private route:Router) { }

  ngOnInit(): void {
    this.er=true;
    this.erLogin =true;
    this.avitoService.onGetAllVilles()
      .subscribe(data => {
        this.villes = data;
      }),err => {
      console.log(err);
    }
  }
  onLogin(dt){
    this.errorLogin = 'email ou mot de passe est incorrect ';
    this.erLogin = false;
    this.authentificationService.login(dt)
      .subscribe(data  => {
        this.erLogin = true;
         let jwt = data.headers.get('Authorization');
         this.authentificationService.saveToken(jwt);
        this.avitoService.gettRessource(this.host+'/utilisateurs/utl?email='+dt.username)
          .subscribe(value => {
            this.authentificationService.saveUtilisateurS(value);


          },error => {


          });
         this.route.navigate(['/recherche']);


      }), err => {



    }


  }
  changeForm(){
    this.register = false;
    this.actv = true;
    this.er=true;
  }
  onRegister(f)
  {

    if(f.value['password'] != f.value['confirmedPassword'] ){
      this.er=false;
      this.errorMessage = 'Vos mots de passe sont différents. Saisissez à nouveau votre mot de passe.';
    }
    else if(f.value['email'] != f.value['email2']) {
      this.er = false;
      this.errorMessage = 'Vos emails sont différents. Saisissez à nouveau Email.\'';
    }
    else {
      console.log(f.value['typeUtl']);

      this.data.typeUtl = f.value['typeUtl'];
      this.data.username = f.value['username'];
      this.data.telephone = f.value['telephone'];
      this.data.ville = this.currentVille;
      this.data.email = f.value['email'];
      this.data.password = f.value['password'];
      this.data.confirmedPassword = f.value['confirmedPassword'];
      console.log(this.data);

      this.authentificationService.onRegister(this.data)
        .subscribe(resp => {
          console.log("Mezyan");
          this.actv = false;
          this.register = true;
          this.dataAuth.username = this.data.email;
          this.dataAuth.password = this.data.password;
          this.onLogin(this.dataAuth);
        }, err => {
          console.log(err.error.message);
          this.er = false;
          this.errorMessage = 'Un compte existe déjà pour cette adresse e-mail!\n' +
            '            Cliquez ici si vous ne pouvez pas accéder à votre compte!';
        });
    }

  }
  onChangeForm(){
      this.actv = false;
      this.register = true;
  }
  onChangeVille(event){

    this.currentVille = event.nom;
    console.log(event.nom);

  }
  onItemChange(value){
    console.log(" Value is : ", value );
  }


}
