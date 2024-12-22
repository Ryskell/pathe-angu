import { AbstractControl, ValidationErrors } from '@angular/forms';

export function forbiddenWordsValidator(words: string[]) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const hasForbiddenWord = words.some((word) =>
      control.value.toLowerCase().includes(word)
    );

    return hasForbiddenWord ? { forbiddenWords: true } : null;
  };
}
