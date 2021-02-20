import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotesComponent } from './votes/votes.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { VoteDetailComponent } from './vote-detail/vote-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'votes', component: VotesComponent},
  { path: 'detail/:id', component: VoteDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
