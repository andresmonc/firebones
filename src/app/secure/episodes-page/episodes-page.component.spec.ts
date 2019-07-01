import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesPageComponent } from './episodes-page.component';

describe('EpisodesPageComponent', () => {
  let component: EpisodesPageComponent;
  let fixture: ComponentFixture<EpisodesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
