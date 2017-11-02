import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Data } from '../components/pagetitle/data';
import 'rxjs/add/operator/map';


@Injectable()
export class FetchDataService {

  private baseUrl = "./assets/data/data.json";
  
    constructor(private http: Http) { }
    ngOnInit(){}
    getData() {
      return this.http.get(this.baseUrl).map((res: Response) => {
        return res.json();
      });
    }

}
