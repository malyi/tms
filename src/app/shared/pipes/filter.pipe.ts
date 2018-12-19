import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
    name: 'listFilter'
})

export class FilterPipe implements PipeTransform {
    transform(items: any, value: string, field: string): any {

        if (items === undefined || items.length === 0 || !value) {
            return items;
        }
        return items.filter((i) => {

            const t = Object.assign({}, i);

            if (!isNaN(t[field])) {
                t[field] += '';
            }

            if (field === 'user' || field === 'author') {
                if (t[field]['firstName'].toLowerCase().indexOf(value.toLowerCase()) !== -1 || t[field]['lastName'].toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                    return true;
                }
            } else {
                return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
            }

        });
    }
}
