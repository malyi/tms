import {Injectable} from '@angular/core';

@Injectable()
export class TableService {

    constructor () {}

    sort(sorted, list: Array<any>, by: string | any, key: string) {
        list.sort((a: any, b: any) => {
            let sortA;
            let sortB;

            if (typeof a[by] === 'object') {
                sortA = a[by][key];
                sortB = b[by][key];
            } else {
                sortA = a[by];
                sortB = b[by];
            }
            if (sortA < sortB) {
                return sorted ? 1 : -1;
            }
            if (sortA > sortB) {
                return sorted ? -1 : 1;
            }

            return 0;
        });

        return sorted = !sorted;
    }
}
