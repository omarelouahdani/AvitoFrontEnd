import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RechercheComponent } from './recherche/recherche.component';
import {RouterModule, Routes} from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { AnnonceComponent } from './annonce/annonce.component';
import { PhotoComponent } from './photo/photo.component';
import { DateAnnonceComponent } from './date-annonce/date-annonce.component';
import { AddAnnonceComponent } from './add-annonce/add-annonce.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AnnonceDetailComponent } from './annonce-detail/annonce-detail.component';
import {AvitoService} from './avito.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EmailComponent } from './email/email.component';


const appRoutes: Routes = [
  { path: 'recherche', component: RechercheComponent },
  { path: "addAnnonce", component: AddAnnonceComponent},
  { path : 'annonces/message',component:EmailComponent},
  { path : 'annonces/detail/:id',component : AnnonceDetailComponent},
  { path: "login", component: LoginComponent},
  { path : 'digitalAdvisor/utilisateur/profile',component : ProfileComponent},
  {path : '**', redirectTo : '/recherche'},
  { path : '', redirectTo : '/recherche', pathMatch: 'full'},





];

@NgModule({
  declarations: [
    AppComponent,
    RechercheComponent,
    FooterComponent,
    AnnonceComponent,
    PhotoComponent,
    DateAnnonceComponent,
    AddAnnonceComponent,
    LoginComponent,
    PageNotFoundComponent,
    ProfileComponent,
    AnnonceDetailComponent,
    EmailComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({ timeOut: 3000 }),
    FormsModule,
    RouterModule.forRoot(appRoutes, {

}),
    CarouselModule,
    ReactiveFormsModule,
    NgxPaginationModule

  ],
  providers: [AvitoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
