import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'textLength'
})
export class TextLengthPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const limit = 100;

    const spanRegex = /<span[^>]*class=["']highlight["'][^>]*>.*?<\/span>/i;
    const match = value.match(spanRegex);

    if (!match) {
      const textOnly = value.replace(/<[^>]+>/g, '');
      if (textOnly.length <= limit) return value;
      return textOnly.substring(0, limit) + `<span class="select-none">...</span>`;
    }

    const span = match[0];
    const spanIndex = match.index!;
    const beforeSpan = value.slice(0, spanIndex);
    const afterSpan = value.slice(spanIndex + span.length);

    const spanText = span.replace(/<[^>]+>/g, '');
    const spanLength = spanText.length;

    if ((beforeSpan.replace(/<[^>]+>/g, '').length + spanLength) > limit) {
      const allowedAfterLength = Math.max(0, limit - spanLength);
      const afterTextOnly = afterSpan.replace(/<[^>]+>/g, '');
      const trimmedAfter = afterTextOnly.substring(0, allowedAfterLength);

      return `<span class="select-none">...</span>${span}${trimmedAfter}`;
    }

    let textCount = 0;
    let result = '';
    const regex = /(<[^>]+>|[^<]+)/g;
    const parts = value.match(regex) || [];

    for (const part of parts) {
      if (part.startsWith('<')) {
        result += part;
      } else {
        if (textCount + part.length <= limit) {
          result += part;
          textCount += part.length;
        } else {
          const remaining = limit - textCount;
          result += part.substring(0, remaining);
          break;
        }
      }
    }

    const totalTextLength = value.replace(/<[^>]+>/g, '').length;
    if (totalTextLength > limit) {
      result += `<span class="select-none">...</span>`;
    }

    return result;
  }
}
