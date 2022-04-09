import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubreddintComponent } from './subreddint.component';

describe('SubreddintComponent', () => {
  let component: SubreddintComponent;
  let fixture: ComponentFixture<SubreddintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubreddintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubreddintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
