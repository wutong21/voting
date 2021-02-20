import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { NgxEchartsModule } from 'ngx-echarts'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VotesComponent } from './votes/votes.component';
import { VoteDetailComponent } from './vote-detail/vote-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VoteSearchComponent } from './vote-search/vote-search.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VotesComponent,
    VoteDetailComponent,
    MessagesComponent,
    VoteSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    FormsModule,
    NgxEchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
