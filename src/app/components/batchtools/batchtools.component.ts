import { Component, OnInit } from '@angular/core';
import { Ng2FileInputService, Ng2FileInputAction } from 'ng2-file-input';
import { Http, Response } from '@angular/http';
//import the do function to be used with the http library.
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";

//define the constant url we would be uploading to.
const URL = window.location.origin+'/wheelhouse/batch/manageusergroups';

@Component({
  selector: 'app-batchtools',
  templateUrl: './batchtools.component.html',
  styleUrls: ['./batchtools.component.scss']
})

export class BatchtoolsComponent implements OnInit {
  
  public max: number = 100;
  public dynamic: number = 0;
  private myFileInputIdentifier:string = "tHiS_Id_IS_sPeeCiAL";
  public actionLog:string="";
  public isVisible = false;
  public file_name:string="";
  public steps:string = "Step 1 : Upload File";   
  public status:string = ""; 
  public visible = true;
  public uploadElementvisible = true;
  public event;
  public errorVisible = true;
  public users = 0;
  public isValid;
  public continue_btn_name:string = "Continue Validation";    
  public appearInput(visible){
  }
  public myEvent() {
    console.log("Clicked");
  }
  
  ngOnInit() {
	  
  }
  
  
  constructor(private ng2FileInputService: Ng2FileInputService,private http: Http) {
  }

  public onAction(event: any){
    console.log(event);
    this.actionLog += "\n currentFiles: " + this.getFileNames(event.currentFiles);
	
    this.status = "Uploading file";
	this.isVisible = true;
	let formData = new FormData();
    
	formData.append('batch',event.currentFiles[0]);
	
	this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
                .post(URL+"?stage=upload", formData).map((res:Response) => res.json()).subscribe(
                //map the success function and alert the response
                 (success) => {
					 this.uploadElementvisible = false;
           this.dynamic = 33;
           this.steps = "Step 2: Validate File"
					 this.status = "Read Successfully";
					 this.isVisible = true;
					 document.getElementById("upload_title").classList.remove("active");
					 document.getElementById("validate_title").classList.add("active");
					 this.validateFile(event);
                         
                },
                (error) => { 
				this.uploadElementvisible = false;
				this.status = "Failed to Read"; 
				
				});
	
    
	this.file_name = this.getFileNames(event.currentFiles);
  }
  public onAdded(event: any){
    this.actionLog += "\n FileInput: "+event.id;
    this.actionLog += "\n Action: File added";
  }
  public onInvalidDenied(event: any){
    this.actionLog += "\n FileInput: "+event.id;
    this.actionLog += "\n Action: File denied";
  }
  
  public ignoreErrors(event: any){
	  this.errorVisible = true;
	  this.status = "Validation Completed";
    this.dynamic = 100;
    this.isValid = false;
    this.continue_btn_name = "Continue";
  }
  
  public triggerDownload(event: any){
	  window.location.href = window.location.origin+"/wheelhouse/batch/download?file=validation_errors";
  }
  
  public validateFile(event: any){
	  
	  if(this.status == "Validation Completed"){
		  window.location.href = window.location.origin+"/wheelhouse/batch/search";
	  }else if(this.status == "Read Successfully"){
	  this.dynamic = 47;
	  this.status = "Validating users...";
    this.isValid = true;
	  this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
                .get(URL,{search:{"stage": "validateUsers"}}).subscribe( // Successful responses call the first callback.
    data => {			 
					 this.dynamic = 66;
					 
					 //this.status = "Validation Completed";
					 let responsetext = data.json();
					 
					 if(responsetext["invalidUsers"] > 0){
						 this.errorVisible = false;
						 this.status = "Validation Pending";
						 this.users = responsetext["invalidUsers"];
						
					 }else{
						 this.dynamic = 100;
						 this.status = "Validation Completed";
						 window.location.href = window.location.origin+"/wheelhouse/batch/search";
					 }
					 
                                           
						 },
    // Errors will call this callback instead:
    err => {
      console.log('Something went wrong!');
    });
                
	}
	  
  }
  
  public cancelProgress(event: any){
	  
  this.dynamic = 0;
  this.myFileInputIdentifier = "tHiS_Id_IS_sPeeCiAL";
  this.steps = "Step 1 : Upload File";  
  this.actionLog ="";
  this.isVisible = false;
  this.file_name ="";
  this.status = ""; 
  this.visible = true;
  this.uploadElementvisible = true;
  this.errorVisible = true;
  this.users = 0;
  document.getElementById("upload_title").classList.add("active");
  document.getElementById("validate_title").classList.remove("active");
  }
  
  public logCurrentFiles():void{
    let files=this.ng2FileInputService.getCurrentFiles(this.myFileInputIdentifier);
    this.actionLog += "\n The currently added files are: " + this.getFileNames(files);
  }
  private getFileNames(files:File[]):string{
    let names=files.map(file => file.name);
    return names ? names.join(", "): "No files currently added.";
  }
}
