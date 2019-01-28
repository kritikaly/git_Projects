import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Item } from './item.model';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
   itemList: Observable<Item[]>;
  constructor(private http: HttpClient) { }

  getItemList() {
    return this.http.get(environment.listApiUrl).toPromise();
  }
  getPosts()  {
    return this.http.get<Item[]>(environment.listApiUrl);
  }
}
