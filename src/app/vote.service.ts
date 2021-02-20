import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Vote } from './vote';
import { MessageService } from './messages.service';

@Injectable({       
  providedIn: 'root'
})
export class VoteService {
  private votesUrl = 'api/votes'; 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  addVote(vote: Vote): Observable<Vote> {
    return this.http.post<Vote>(this.votesUrl, vote, this.httpOptions).pipe(
      tap((newVote: Vote) => this.log(`added hero w/ id=${newVote.id}`)),
      catchError(this.handleError<Vote>('addVote'))
    );
  }
  /** PUT: update the hero on the server */
  updateVote(vote: Vote): Observable<any> {
    return this.http.put(this.votesUrl, vote, this.httpOptions).pipe(
      tap(_ => this.log(`updated vote id=${vote.id}`)),
      catchError(this.handleError<any>('updateVote'))
    );
  }
  getVotes(): Observable<Vote[]> {
    return  this.http.get<Vote[]>(this.votesUrl)
    .pipe(
      tap(_ => this.log('fetched votes')),
      catchError(this.handleError<Vote[]>('getVotes', []))
    )
  }
  /** DELETE: delete the hero from the server */
  deleteVote(vote: Vote | number): Observable<Vote> {
    const id = typeof vote === 'number' ? vote : vote.id;
    const url = `${this.votesUrl}/${id}`;

    return this.http.delete<Vote>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted vote id=${id}`)),
      catchError(this.handleError<Vote>('deleteVote'))
    );
  }
  
  /* GET heroes whose name contains search term */
  searchVotes(term: string): Observable<Vote[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Vote[]>(`${this.votesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found votes matching "${term}"`) :
        this.log(`no votes matching "${term}"`)),
      catchError(this.handleError<Vote[]>('searchVotes', []))
    );
  }

  getVote(id: number): Observable<Vote> {
    const url = `${this.votesUrl}/${id}`;
  return this.http.get<Vote>(url).pipe(
    tap(_ => this.log(`fetched Vote id=${id}`)),
    catchError(this.handleError<Vote>(`getVote id=${id}`))
  );
  }
  private log(message: string) {
    this.messageService.add(`VoteService: ${message}`);
  }
  constructor(    
    private http: HttpClient,
    private messageService: MessageService
  ) { }
}
