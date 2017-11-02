import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  constructor(private http:Http) {
    console.log("Constructor created");
    this.getContacts();
    this.getData();
  }
  ngOnInit() {
  }

  private apiUrl = "assets/data/company.json";
  data:any = [];
  
  getData() {
    return this.http.get(this.apiUrl)
    .map((res: Response) => res.json())
  }
  getContacts() {
    this.getData().subscribe(data => {
      this.data = data
      console.log(data);
    })
  }
}
