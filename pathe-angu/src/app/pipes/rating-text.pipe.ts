import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingText',
})
export class RatingTextPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return 'Non noté';
    switch (value) {
      case 1:
        return 'Très mauvais';
      case 2:
        return 'Mauvais';
      case 3:
        return 'Moyen';
      case 4:
        return 'Bon';
      case 5:
        return 'Excellent';
      default:
        return 'Note invalide';
    }
  }
}
