import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../../services/fetch-data.service';
import { Data } from './data';



@Component({
  selector: 'app-pagetitle',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.scss']
})
export class PagetitleComponent implements OnInit {
  jsonData: Data;
  objectKeys = Object.keys;
  
  constructor(private _fetchDataService: FetchDataService) {
    this.jsonData = undefined;
  }
  ngOnInit() {
  }
 
  fetchData(){
    this._fetchDataService.getData().subscribe(data => {
      this.jsonData = data;
      console.log("Data Fetched");
      console.log(JSON.stringify(this.jsonData));
    });
  }
  companyName = 'Account: GlobalEnglish SQA ONLY';
  pageTitle = 'Upload File';
}
