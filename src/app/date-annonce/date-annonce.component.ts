import {Component, Input, OnInit} from '@angular/core';
import {AvitoService} from '../avito.service';

@Component({
  selector: 'app-date-annonce',
  templateUrl: './date-annonce.component.html',
  styleUrls: ['./date-annonce.component.scss']
})
export class DateAnnonceComponent implements OnInit {
  @Input() annonce : any;

  constructor(private  avitoService :  AvitoService) { }

  ngOnInit(): void {

  }

}
