import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {AuthentificationService} from './authentification.service';
import {BehaviorSubject, Observable} from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Message} from './message';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';

@Injectable({
  providedIn: 'root'
})
export class AvitoService {
  public host : string = "http://localhost:9080"

  utilisateur: any;
  private _categorieDesignationSource = new BehaviorSubject<string>("defaulat data");
  public categorieDesignation$ = this._categorieDesignationSource.asObservable();
  private _scategorieDesignationSource = new BehaviorSubject<string>("defaulat data");
  public scategorieDesignation$ = this._scategorieDesignationSource.asObservable();


  constructor( private http: HttpClient, private authentificationService:AuthentificationService) {

  }
  getRessource(url){
    return this.http.get(url);
  }
  public getCategories()
  {
    return this.http.get(this.host+"/categories")
  }
  public getSousCategories(c)
  {
    return this.http.get(c._links.sousCategories.href);
  }
  public getVilles()
  {
    return this.http.get(this.host+"/villes")
  }
  public getAnnonceBySCategory(id : any)
  {
    return this.http.get(this.host+"/articles/sousCategories?id="+id)
  }
  public getAnnonceByCategory(id : any)
  {
    return this.http.get(this.host+"/articles/typeCategories?id="+id)
  }
  onGetPhotos(a : any){
    return this.http.get(a._links.photos.href)
  }
  onGetAnnonce(a : any){
    return this.http.get(a._links.annonce.href)
  }
  onGetAnnonceByVille(id: any)
  {
    return this.http.get(this.host+"/articles/ville?id="+id)
  }
  onGetAllCategories()
  {
    return this.http.get(this.host+"/categories/Sc")
  }
  onGetAllVilles()
  {
    return this.http.get(this.host+"/villes/secteurs")
  }
  onGetCategorie(id: any)
  {
    return this.http.get(this.host+"/categories/"+id)
  }
  onGetAnnanceOne(name,type)
  {

    return this.http.get(this.host+"/articles/findOne?typeAnnonce="+type+"&nameArticle="+name)
  }
  onGetAnnanceTwo(name,type,nameVille,nameSecteur)
  {

    return this.http.get(this.host+"/articles/findTwo?typeAnnonce="+type+"&nameArticle="+name+"&nameVille="+nameVille+"&nameSecteur="+nameSecteur)
  }
  onGetAnnanceThree(name,type,statusCategorie,statusSCategorie)
  {

    return this.http.get(this.host+"/articles/findThree?typeAnnonce="+type+"&nameArticle="+name+"&sCatNamt="+statusSCategorie+"&catName="+statusCategorie)
  }
  onGetAnnanceFour(name,type,statusSCategorie,secteurName,villeName)
  {

    return this.http.get(this.host+"/articles/findFour?typeAnnonce="+type+"&nameArticle="+name+"&sCatNamt="+statusSCategorie+"&secteurName="+secteurName+"&villeName="+villeName)
  }
  deleteRessource(c){
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
   return this.http.delete(c,{headers:headers});
  }
  postRessource(url,data){
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    return this.http.post(url,data,{headers:headers});
  }
  posttRessource(data){
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    return this.http.post(this.host+"/addAnnonce",data,{headers:headers});
  }
  patchRessource(data){
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    return this.http.patch(this.host+"/utilisateurs/"+data.id,data,{headers:headers});
  }
  gettRessource(url){
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    return this.http.get(url,{headers:headers});
  }
  upload(file: File,id): Observable<HttpEvent<any>> {
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.host}/upload?id=`+id, formData, {
      reportProgress: true,
      responseType: 'json',
      headers:headers
    });

    return this.http.request(req);
  }
  uploadPhoto(file: File,id): Observable<HttpEvent<any>> {
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.host}/uploadPhoto?id=`+id, formData, {
      reportProgress: true,
      responseType: 'json',
      headers:headers
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    return this.http.get(`${this.host}/files`,{headers:headers});
  }
  saveCategorieName(data){
    this._categorieDesignationSource.next(data);
  }
  saveSCategorieName(data){
    this._scategorieDesignationSource.next(data);
  }
  getUtilisateur(id){
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    return this.http.get(this.host+"/utilisateurs/"+id,{headers:headers});
  }
  getAnnonce(id){
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    return this.http.get(this.host+"/annonces/"+id+"/utilisateur",{headers:headers});
  }
  getVilleUtilisateur(id){
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    return this.http.get(this.host+"/utilisateurs/"+id+"/ville",{headers:headers});
  }
  getAnnoncesUtilisateur(id){
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    return this.http.get(this.host+"/utilisateurs/annonces?id="+id,{headers:headers});
  }
  getTypeUtilisateur(id){
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    return this.http.get(this.host+"/utilisateurs/"+id+"/typeUtl",{headers:headers});
  }
  getAnnonceDetails(id){
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    return this.http.get(this.host+"/annonces/details?id="+id,{headers:headers});
  }
  getSousCatByCat(id){
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    return this.http.get(this.host+"/sousCategories/categorie?id="+id,{headers:headers});
  }
  post(data: Message){
    let headers =  new HttpHeaders({'Authorization':'Bearer '+this.authentificationService.jwt});
    return this.http.post(this.host+"/api/socket", data,{headers:headers})
      .map((data: Message) => { return data; })
      .catch(error => {
        return new ErrorObservable(error);
      })
      ;
  }
  public getUtl(c)
  {
    return this.http.get("http://localhost:8080/registration/"+c);
  }



}
