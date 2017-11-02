import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { Ng2FileInputModule } from 'ng2-file-input';
import { Ng2TableModule } from 'ng2-table/ng2-table';

// Custom Modules
import { AppBootstrapModule } from './modules/app-bootstrap.module';
import { Approute } from './modules/app-routes.module';

//Custom Services
import { FetchDataService } from './services/fetch-data.service';

//Custom Components
import { AppComponent } from './app.component';
import { BatchtoolsComponent } from './components/batchtools/batchtools.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { Ng2DatatableComponent } from './components/ng2-datatable/ng2-datatable.component';
import { WorkoutComponent } from './components/workout/workout.component';

@NgModule({
  declarations: [
    AppComponent,
    BatchtoolsComponent,
    DashboardComponent,
    PagetitleComponent,
    Ng2DatatableComponent,
    WorkoutComponent
  ],
  imports: [
    BrowserModule,
    AppBootstrapModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(Approute),
    Ng2TableModule,
    AngularFontAwesomeModule,
    Ng2FileInputModule.forRoot()
  ],
  providers: [
    FetchDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
