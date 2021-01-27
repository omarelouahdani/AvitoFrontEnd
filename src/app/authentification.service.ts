import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  utilisateur: any;
  private _utilisateurSource = new BehaviorSubject<any>(this.utilisateur);
  public utilisateur$ = this._utilisateurSource.asObservable();
  host2:string= "http://localhost:9080";
  jwt: string;

  username: string;
  roles: Array<String>;
  constructor(private http:HttpClient) { }

  saveUtilisateur(data){
    this._utilisateurSource.next(data);



  }
   login(data){
    return this.http.post(this.host2+"/login",data,{observe: 'response'})
   }

  saveToken(jwt){
     localStorage.setItem('token',jwt);
     this.jwt=jwt;
     this.parseJWT();
  }
  saveUtilisateurS(value){
    localStorage.setItem('utilisateur',value.id);
    this.utilisateur=value.id;

  }
  parseJWT(){

      let jwtHelper = new JwtHelperService();
      let objJWT= jwtHelper.decodeToken(this.jwt);
      this.username = objJWT.obj;
      this.roles = objJWT.roles;

  }

  isAdmin(){
    return this.roles.indexOf('ADMIN')>=  0;
  }
  isUser(){
    return this.roles.indexOf('USER')>=  0;
  }
  isAuthenticated(){
    return this.roles;
  }
  loadToken(){
    this.jwt = localStorage.getItem('token');
    this.utilisateur = localStorage.getItem('utilisateur');
    this.parseJWT();
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('utilisateur');
    this.initParams();
  }
  initParams(){
    this.jwt=undefined;
    this.username=undefined;
    this.roles=undefined;
    this.utilisateur= undefined;
  }
  onRegister(data){
    return this.http.post(this.host2+"/register",data,{observe : 'response'})
  }
  saveUtl(utl){
    this.utilisateur = utl;
  }
  getUtl(){
    return this.utilisateur;
  }


}
