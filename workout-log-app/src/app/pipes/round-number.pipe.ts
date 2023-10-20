import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rounder',
})
export class RoundNumberPipe implements PipeTransform {
  transform(value: number) {
    const roundedValue = Math.round(+value);
    const decimalValue = value % 1;

    if (decimalValue === 0) {
      return roundedValue;
    } else {
      const formattedValue = (+value).toFixed(2);
      return formattedValue.replace(/\.?0+$/, '');
    }
  }
}
