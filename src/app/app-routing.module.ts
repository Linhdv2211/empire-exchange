import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './view/main-view/main-view.component';

const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: '',   redirectTo: '/home-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
