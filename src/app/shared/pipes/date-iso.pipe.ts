import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateISO'
})
export class DateISOPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }

    const day = String(date.getDate() + 1).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

}
