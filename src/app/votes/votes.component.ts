import { Component, OnInit } from '@angular/core';

import { Vote } from '../vote'
import { VoteService } from '../vote.service';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {
  votes: Vote[];

  getVotes(): void {
    this.voteService.getVotes().subscribe(votes => this.votes = votes);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.voteService.addVote({ name } as Vote)
      .subscribe(vote => {
        this.votes.push(vote);
      });
  }
  delete(vote: Vote): void {
    this.votes = this.votes.filter(h => h !== vote);
    this.voteService.deleteVote(vote).subscribe();
  }
  constructor(private voteService: VoteService) { }

  ngOnInit(): void {
    this.getVotes();
  }

}
