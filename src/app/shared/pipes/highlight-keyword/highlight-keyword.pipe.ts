import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightKeyword'
})
export class HighlightKeywordPipe implements PipeTransform {

  transform(value: string, keywords: string[] | null): string {
    if (!keywords || !keywords.length) {
      return value.replace(/<\/?span[^>]*>/g, '');
    }

    const escaped = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const re = new RegExp(`(${escaped.join('|')})`, 'gi');
    return value.replace(re, `<span class="highlight">$1</span>`);
  }
}
