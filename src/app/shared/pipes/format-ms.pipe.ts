import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMs'
})
export class FormatMsPipe implements PipeTransform {

  transform(ms:number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}min ${seconds.padStart(2, '0')}s`;
  }

}
