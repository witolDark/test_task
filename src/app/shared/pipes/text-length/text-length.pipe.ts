import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'textLength'
})
export class TextLengthPipe implements PipeTransform {
  transform(value: string): string {
    return value; // temp unused
  }
}
