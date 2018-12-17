import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
    name: 'search'
})

export class FilterPipe implements PipeTransform{
    transform(items: any, value: string, field: string): any {
    }
}