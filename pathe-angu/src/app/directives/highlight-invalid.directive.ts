import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appHighlightInvalid]',
})
export class HighlightInvalidDirective {
  constructor(private el: ElementRef, private renderer: Renderer2, private control: NgControl) { }

  ngOnInit() {
    this.control.statusChanges?.subscribe((status) => {
      if (status === 'INVALID' && this.control.touched) {
        this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#ffcccc');
      } else {
        this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
      }
    });
  }
}
