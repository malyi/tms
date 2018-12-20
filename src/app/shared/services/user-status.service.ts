import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class UserStatusService {
    private subject = new Subject<any>();
    constructor() { }

    setStatus(status: boolean) {
        this.subject.next({status});
    }

    getStatus(): Observable<any> {
        return this.subject.asObservable();
    }
}