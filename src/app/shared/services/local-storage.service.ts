import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  get(key: string){
    return window.localStorage.getItem(key);
  }

  set(key: string, value: string){
    window.localStorage.setItem(key, value);
  }

  remove(key){
    window.localStorage.removeItem(key);
  }

}
