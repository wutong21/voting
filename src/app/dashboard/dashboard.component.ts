import { Component, OnInit } from '@angular/core';
import { Vote } from '../vote';
import { VoteService } from '../vote.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  votes: Vote[] = [];
  options: any;

  constructor(private voteService: VoteService) { }

  ngOnInit() {
    this.getVotes();
    this.options = {
      title: {
          text: '热度折线图'
      },
      tooltip: {},
      legend: {
          data:['微博']
      },
      xAxis: {
          data: ["2020-10-11","2020-10-12","2020-10-13","2020-10-14","2020-10-15","2020-10-16"]
      },
      yAxis: {},
      series: [{
          name: '微博',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
      }]
    };
  }

  getVotes(): void {
    this.voteService.getVotes()
      .subscribe(votes => this.votes = votes.slice(1, 5));
  }
}