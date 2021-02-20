import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Vote } from '../vote';
import { VoteService } from '../vote.service';

@Component({
  selector: 'app-vote-search',
  templateUrl: './vote-search.component.html',
  styleUrls: ['./vote-search.component.scss']
})
export class VoteSearchComponent implements OnInit {
  votes$: Observable<Vote[]>
  private searchTerms = new Subject<string>();
  constructor(private voteService: VoteService) { }
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.votes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.voteService.searchVotes(term)),
    );
  }

}
