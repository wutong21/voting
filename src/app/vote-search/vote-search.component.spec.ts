import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteSearchComponent } from './vote-search.component';

describe('VoteSearchComponent', () => {
  let component: VoteSearchComponent;
  let fixture: ComponentFixture<VoteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
