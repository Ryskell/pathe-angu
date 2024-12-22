import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReviewService, Review } from '../services/review.service';

@Component({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentImage = 1;
  intervalId: any;
  images = [
    'https://m.media-amazon.com/images/I/815qtzaP9iL._AC_UF1000,1000_QL80_.jpg',
    'https://musicart.xboxlive.com/7/912b1000-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080',
    'https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF1000,1000_QL80_.jpg'
  ];
  isModalActive: boolean = false;
  reviews: Review[] = [];
  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.startImageInterval();
    this.loadReviews();
  }

  ngOnDestroy(): void {
    this.stopImageInterval();
  }

  startImageInterval(): void {
    this.intervalId = setInterval(() => this.changeImage(), 2000);
  }

  stopImageInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  changeImage(): void {
    this.currentImage = (this.currentImage % this.images.length) + 1;
  }

  navigateTo(index: number): void {
    this.currentImage = index;
  }


  openModal() {
    this.isModalActive = true;
  }

  closeModal() {
    this.isModalActive = false;
  }

  loadReviews(): void {
    this.reviewService.getReviews().subscribe(
      (reviews) => {
        this.reviews = reviews;
      },
      (error) => {
        console.error('Erreur lors du chargement des commentaires :', error);
      }
    );
    this.closeModal();
  }
}
