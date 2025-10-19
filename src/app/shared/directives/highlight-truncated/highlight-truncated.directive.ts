import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appHighlightTruncated]'
})
export class HighlightTruncatedDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.checkEllipsis();
  }

  private checkEllipsis() {
    const container = this.el.nativeElement as HTMLElement;
    const textContent = container.textContent || '';
    const highlighted = container.querySelector('.highlight') as HTMLElement;

    if (highlighted) {
      const rect = highlighted.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();

      const isVisible =
        rect.bottom > parentRect.top &&
        rect.top < parentRect.bottom &&
        rect.right > parentRect.left &&
        rect.left < parentRect.right;

      if (!isVisible) {
        const highlightedText = highlighted.textContent || '';
        const fullText = container.innerText;

        const index = fullText.indexOf(highlightedText);
        const after = fullText.slice(index + highlightedText.length, textContent.length);

        container.innerHTML = `...<span class="highlight">${highlightedText}</span>${after}`;
      }
    }
  }
}
