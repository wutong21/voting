import { Component, OnInit , Input} from '@angular/core';
import { Vote } from '../vote';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { VoteService } from '../vote.service';

@Component({
  selector: 'app-vote-detail',
  templateUrl: './vote-detail.component.html',
  styleUrls: ['./vote-detail.component.scss']
})
export class VoteDetailComponent implements OnInit {
  @Input() vote: Vote;

  constructor(
    private route: ActivatedRoute,
    private voteService: VoteService,
    private location: Location
  ) { }
  
  getVotes(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.voteService.getVote(id)
      .subscribe(vote => this.vote = vote);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.voteService.updateVote(this.vote)
      .subscribe(() => this.goBack());
  }

  ngOnInit(): void {
    this.getVotes()
  }

}
