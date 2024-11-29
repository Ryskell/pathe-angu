import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomeComponent implements OnInit {
  pseudo: string | null = null;

  ngOnInit() {
    this.pseudo = localStorage.getItem('pseudo');
  }
}
