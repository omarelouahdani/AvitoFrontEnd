import {Component, Input, OnInit} from '@angular/core';
import {AvitoService} from '../avito.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  @Input() photos:any;

  photo;

  constructor(private avitoService : AvitoService) {

  }

  ngOnInit(): void {

    this.photo= this.photos[0];

  }

}
