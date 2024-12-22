import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService, Review } from '../services/review.service';
import { forbiddenWordsValidator } from '../validators/forbidden-words.validator';

@Component({
  selector: 'app-cinema-review',
  templateUrl: './cinema-review.component.html',
  styleUrls: ['./cinema-review.component.scss'],
})
export class CinemaReviewComponent {
  reviewForm: FormGroup;
  @Output() reviewAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private reviewService: ReviewService) {
    this.reviewForm = this.fb.group({
      titre: ['', [Validators.required]],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(10), forbiddenWordsValidator(['nul', 'mauvais'])]],
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const review: Review = this.reviewForm.value;

      this.reviewService.addReview(review).subscribe(
        (response) => {
          console.log('Commentaire ajouté avec succès :', response);
          this.reviewForm.reset();
          this.reviewAdded.emit();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du commentaire :', error);
        }
      );
    } else {
      console.log('Formulaire invalide.');
    }
  }
}
