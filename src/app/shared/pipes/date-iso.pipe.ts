import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateISO'
})
export class DateISOPipe implements PipeTransform {

  transform(value : string ): string {
    const date = new Date(value)

    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
  }

}
