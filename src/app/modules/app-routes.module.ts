import { Routes } from '@angular/router';
import { BatchtoolsComponent } from '../components/batchtools/batchtools.component';
import { Ng2DatatableComponent } from '../components/ng2-datatable/ng2-datatable.component';
import { WorkoutComponent } from '../components/workout/workout.component';
import { PagetitleComponent } from '../components/pagetitle/pagetitle.component';

export const Approute:Routes = [
	{
		path: 'batchtools',
		component: BatchtoolsComponent
	},
	{
		path: 'ng2datatable',
		component: Ng2DatatableComponent
	},
	{
		path: 'workouts',
		component: WorkoutComponent
	},
	{
		path: 'pagetitle',
		component: PagetitleComponent
	}
];