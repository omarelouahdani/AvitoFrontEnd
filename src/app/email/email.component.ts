import {Component, Input, OnInit} from '@angular/core';
import * as firebase  from 'firebase';
const config ={
  apiKey: 'AIzaSyCvHaGnqKBfzBBKEsdnVhmS1jiyRs41IZU',
  databaseURL: 'https://angularchat-34417.firebaseio.com'
}
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  onstructor() {
    firebase.initializeApp(config);
  }
  ngOnInit(): void {
  }


}
